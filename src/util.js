
/* global BigInt */

export const applyObjDiff = (target, diff) => {
  for (const key in diff) {
    if (diff[key] === undefined) delete target[key];
    else if (!(key in target)) target[key] = diff[key];
    else if (diff[key] && typeof diff[key] === 'object' &&
      (typeof diff[key] === typeof target[key])) {
      // determine object vs array
      if (diff[key].constructor === Array &&
        ((diff[key].constructor === target[key].constructor))) {
        // handle arrays
        for (let i = 0; i < diff[key].length; i++) {
          if (diff[key][i]) target[key][i] = diff[key][i];
        }
      } else {
        // handle objects
        applyObjDiff(target[key], diff[key]);
      }
    } else target[key] = diff[key];
  }
};

export const asUint64String = (num) => {
  return BigInt.asUintN(64, BigInt(num)).toString(16).padStart(16, '0');
};

export const capitalize = (str) => {
  return str && str.length ? str[0].toUpperCase() + str.slice(1) : '';
};

export const dupObj = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export function geodist (lat1, lon1, lat2, lon2) {
  const [DEG_C, RAD_C] = [180 / Math.PI, Math.PI / 180];
  if ((lat1 === lat2) && (lon1 === lon2)) return 0;
  const lat1r = lat1 * RAD_C;
  const lat2r = lat2 * RAD_C;
  const thetar = (lon1 - lon2) * RAD_C;
  let distdeg = Math.sin(lat1r) * Math.sin(lat2r) +
    Math.cos(lat1r) * Math.cos(lat2r) * Math.cos(thetar);
  if (distdeg > 1) distdeg = 1;
  distdeg = Math.acos(distdeg) * DEG_C;
  return distdeg;
}

export const isTagged = (tag) => {
  return Boolean(
    typeof tag === 'string' && !['00', '42'].includes(tag.slice(0, 2))
  );
};

/**
 * Validates and sanitizes hexadecimal input
 * @param {string} input - The hex string to validate
 * @param {number} maxLength - Maximum allowed length (default: 128)
 * @returns {string|null} - Sanitized hex string or null if invalid
 */
export const validateHexInput = (input, maxLength = 128) => {
  if (typeof input !== 'string') return null;
  
  // Remove 0x prefix if present
  const cleaned = input.replace(/^0x/i, '');
  
  // Check length
  if (cleaned.length > maxLength) return null;
  
  // Validate hex characters
  if (!/^[0-9a-f]*$/i.test(cleaned)) return null;
  
  return cleaned;
};
