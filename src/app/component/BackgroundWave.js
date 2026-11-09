import { useEffect, useRef } from 'react';

const AMOUNTX = 60;
const AMOUNTZ = 20;
const FOV = 75;
const NEAR = 1;
const FAR = 2200;
const FRAME_MS = 1000 / 60;
// every wave frequency is a multiple of 0.1, so the motion repeats after 20 * PI seconds
const LOOP_SECONDS = 20 * Math.PI;
// no dot reaches past this fraction of the viewport height on any screen up to 8K, so the canvas stops here
const CANVAS_BOTTOM = 0.46;

const VERTEX_SHADER = `
  precision highp float;
  attribute vec2 grid;
  uniform float time;
  uniform float focal;
  uniform mat4 view;
  uniform mat4 projection;
  varying vec3 lightDirection;
  varying vec2 axis;
  varying float squash;
  varying float radius;
  varying float edge;
  varying float spriteScale;
  varying float fogAmount;
  varying float opacity;
  varying float facing;

  void main () {
    vec3 world = vec3(
      grid.x * 60.0 - 1800.0,
      (sin(0.5 * (grid.x + time)) + sin(0.5 * (grid.y + time))) * 50.0,
      grid.y * 60.0 - 600.0
    );
    float scale = (sin((grid.x + time) * 0.3) + sin((grid.y + time) * 0.5) + 1.0) / 4.0;
    vec4 viewPosition = view * vec4(world, 1.0);
    gl_Position = projection * viewPosition;
    // the wave is drawn upside down, with its dense edge at the top of the page
    gl_Position.xy *= -1.0;

    float fromTop = 0.5 - 0.5 * gl_Position.y / gl_Position.w;
    float fade = fromTop < 0.45 ? mix(1.0, 0.5, fromTop / 0.45) : mix(0.5, 0.0, (fromTop - 0.45) / 0.35);
    opacity = 0.26 * clamp(fade, 0.0, 1.0);

    // the sprite faces along the ray to the camera, so its shading frame is built around that ray
    vec3 toCamera = normalize(-viewPosition.xyz);
    // a sphere away from the center of the view projects to an ellipse, stretched along the line from the center
    squash = sqrt(toCamera.z);
    float size = 10.0 * abs(scale) * focal / (-viewPosition.z * squash);
    float major = size / squash;
    gl_PointSize = 2.0 * major + 2.0;
    axis = normalize(vec2(-viewPosition.x, viewPosition.y) + vec2(0.0001, 0.0));
    // the one pixel soft edge adds area that shows on small dots, so it is pulled in to keep each dot's area exact
    edge = size > 0.577 ? sqrt(size * size - 1.0 / 12.0) + 0.5 : pow(3.0 * size * size, 1.0 / 3.0);
    // stays above zero so the fragment shader's numbers fit the 16 bit precision phones use
    radius = max(size, 0.05);
    spriteScale = (major + 1.0) / radius;

    vec3 right = normalize(vec3(toCamera.z, 0.0, -toCamera.x));
    vec3 up = cross(toCamera, right);
    vec3 light = normalize((view * vec4(0.0, 1000.0, 0.0, 1.0)).xyz - viewPosition.xyz);
    lightDirection = vec3(dot(light, right), dot(light, up), dot(light, toCamera));
    // a negative scale turns the sphere inside out, which leaves its far side showing
    facing = scale < 0.0 ? -1.0 : 1.0;
    fogAmount = smoothstep(${(FAR / 2).toFixed(1)}, ${FAR.toFixed(1)}, -viewPosition.z);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  varying vec3 lightDirection;
  varying vec2 axis;
  varying float squash;
  varying float radius;
  varying float edge;
  varying float spriteScale;
  varying float fogAmount;
  varying float opacity;
  varying float facing;

  vec3 toneMap (vec3 color) {
    color = mat3(0.59719, 0.07600, 0.02840, 0.35458, 0.90834, 0.13383, 0.04823, 0.01566, 0.83777) * color / 0.6;
    color = (color * (color + 0.0245786) - 0.000090537) / (color * (0.983729 * color + 0.4329510) + 0.238081);
    return clamp(mat3(1.60475, -0.10208, -0.00327, -0.53108, 1.10813, -0.07276, -0.07367, -0.00605, 1.07602) * color, 0.0, 1.0);
  }

  void main () {
    // each sprite is shaded as a sphere: the point coordinate, unstretched into a circle, gives its surface normal
    vec2 raw = (gl_PointCoord * 2.0 - 1.0) * spriteScale;
    float along = dot(raw, axis);
    vec2 point = (raw - axis * along) / squash + axis * along * squash;
    float dist = length(point);
    float coverage = clamp(edge - dist * radius, 0.0, 1.0);
    if (coverage <= 0.0) discard;
    // the soft edge lies just outside the sphere, so it takes its normal from the sphere's rim
    vec2 rim = point / max(dist, 1.0);
    vec3 normal = vec3(-rim.x, rim.y, facing * sqrt(max(1.0 - dot(rim, rim), 0.0)));
    float light = max(dot(normal, lightDirection), 0.0);
    vec3 color = toneMap(light * vec3(0.0129, 1.1514, 0.4907));
    color = pow(color, vec3(0.41667)) * 1.055 - 0.055;
    color = max(color, vec3(0.0)) * (1.0 - fogAmount);
    float alpha = coverage * opacity;
    gl_FragColor = vec4(color * alpha, alpha);
  }
`;

function compile (gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

function perspective (aspect) {
  const f = 1 / Math.tan((FOV * Math.PI) / 360);
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, -(FAR + NEAR) / (FAR - NEAR), -1,
    0, 0, (-2 * FAR * NEAR) / (FAR - NEAR), 0
  ]);
}

// orbits with the pointer, aims at the origin, then lifts 600 units without re-aiming
function cameraView (mouseX, mouseY) {
  const ex = mouseX * 0.05;
  const ey = mouseY * 0.1 + 200;
  const ez = 1200;
  const zl = Math.hypot(ex, ey, ez);
  const zx = ex / zl;
  const zy = ey / zl;
  const zz = ez / zl;
  const xl = Math.hypot(zz, zx);
  const xx = zz / xl;
  const xz = -zx / xl;
  const yx = zy * xz;
  const yy = zz * xx - zx * xz;
  const yz = -zy * xx;
  const py = ey + 600;
  return new Float32Array([
    xx, yx, zx, 0,
    0, yy, zy, 0,
    xz, yz, zz, 0,
    -(xx * ex + xz * ez), -(yx * ex + yy * py + yz * ez), -(zx * ex + zy * py + zz * ez), 1
  ]);
}

export default function BackgroundWave () {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = motionQuery.matches;
    let gl = null;
    let uniforms = null;
    let frame = 0;
    let lastDraw = 0;
    let mouseX = 0;
    let mouseY = 0;

    const draw = (now) => {
      gl.uniform1f(uniforms.time, (now / 1000) % LOOP_SECONDS);
      gl.uniformMatrix4fv(uniforms.view, false, cameraView(mouseX, mouseY));
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, AMOUNTX * AMOUNTZ);
    };

    const tick = (now) => {
      frame = window.requestAnimationFrame(tick);
      if (now - lastDraw < FRAME_MS - 1) return;
      // a multiple of 60 Hz stays locked to the display's refresh, any other rate advances on a fixed timeline to still reach 60 fps
      lastDraw = Math.abs(now - lastDraw - FRAME_MS) < 1 ? now : Math.max(lastDraw + FRAME_MS, now - FRAME_MS);
      draw(now);
    };

    const resize = () => {
      if (!uniforms) return;
      // one canvas pixel per CSS pixel, as in the three.js version
      const width = canvas.clientWidth;
      const height = window.innerHeight;
      // the canvas starts below the header, so nothing animates behind the header's backdrop blur
      const header = document.querySelector('header');
      const top = header ? Math.ceil(header.getBoundingClientRect().height) : 0;
      const canvasHeight = Math.max(Math.round(height * CANVAS_BOTTOM) - top, 1);
      canvas.width = width;
      canvas.height = canvasHeight;
      canvas.style.top = `${top}px`;
      canvas.style.height = `${canvasHeight}px`;
      // keeps the projection of the full viewport while only part of it has pixels
      gl.viewport(0, canvasHeight + top - height, width, height);
      gl.uniformMatrix4fv(uniforms.projection, false, perspective(width / height));
      gl.uniform1f(uniforms.focal, height / (2 * Math.tan((FOV * Math.PI) / 360)));
      // changing the size clears the canvas, so it is redrawn straight away
      draw(reducedMotion ? 0 : window.performance.now());
    };

    const start = () => {
      uniforms = null;
      gl = canvas.getContext('webgl', {
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: 'low-power'
      });
      if (!gl || gl.isContextLost()) return;
      const program = gl.createProgram();
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
      gl.useProgram(program);
      uniforms = {
        time: gl.getUniformLocation(program, 'time'),
        focal: gl.getUniformLocation(program, 'focal'),
        view: gl.getUniformLocation(program, 'view'),
        projection: gl.getUniformLocation(program, 'projection')
      };
      // back rows first, so nearer dots paint over farther ones without a depth buffer
      const grid = new Float32Array(AMOUNTX * AMOUNTZ * 2);
      let index = 0;
      for (let iz = 0; iz < AMOUNTZ; iz++) {
        for (let ix = 0; ix < AMOUNTX; ix++) {
          grid[index++] = ix;
          grid[index++] = iz;
        }
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, grid, gl.STATIC_DRAW);
      const attribute = gl.getAttribLocation(program, 'grid');
      gl.enableVertexAttribArray(attribute);
      gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      // where dots overlap the brighter one wins, so overlaps do not add up into bright blobs
      const minmax = gl.getExtension('EXT_blend_minmax');
      if (minmax) gl.blendEquation(minmax.MAX_EXT);
      gl.clearColor(0, 0, 0, 0);
      resize();
      if (!reducedMotion) frame = window.requestAnimationFrame(tick);
    };

    const handleMouse = (event) => {
      if (event.isPrimary === false) return;
      mouseX = event.clientX - window.innerWidth / 2;
      mouseY = event.clientY - window.innerHeight / 2;
    };
    const handleMotionChange = () => {
      reducedMotion = motionQuery.matches;
      window.cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', handleMouse);
      if (!reducedMotion) window.addEventListener('mousemove', handleMouse);
      if (!uniforms || gl.isContextLost()) return;
      if (reducedMotion) draw(0);
      else frame = window.requestAnimationFrame(tick);
    };
    const handleLost = (event) => {
      event.preventDefault();
      uniforms = null;
      window.cancelAnimationFrame(frame);
    };

    start();
    window.addEventListener('resize', resize);
    // the header eases to its new height after a breakpoint, so the canvas has to follow it
    const header = document.querySelector('header');
    const headerObserver = window.ResizeObserver && header ? new window.ResizeObserver(resize) : null;
    if (headerObserver) headerObserver.observe(header);
    if (!reducedMotion) window.addEventListener('mousemove', handleMouse);
    // Safari before 14 has no addEventListener on a media query list
    if (motionQuery.addEventListener) motionQuery.addEventListener('change', handleMotionChange);
    canvas.addEventListener('webglcontextlost', handleLost);
    canvas.addEventListener('webglcontextrestored', start);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      if (headerObserver) headerObserver.disconnect();
      window.removeEventListener('mousemove', handleMouse);
      if (motionQuery.removeEventListener) motionQuery.removeEventListener('change', handleMotionChange);
      canvas.removeEventListener('webglcontextlost', handleLost);
      canvas.removeEventListener('webglcontextrestored', start);
      const lose = gl && gl.getExtension('WEBGL_lose_context');
      if (lose) lose.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'block',
        width: '100%',
        height: `${CANVAS_BOTTOM * 100}%`,
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
}
