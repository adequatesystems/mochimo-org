import { fetchSupply } from '../_shared.js';

/**
 * GET /supply/circulating/json
 * Returns circulating supply as JSON object
 */
export async function onRequestGet(context) {
  try {
    const supply = await fetchSupply();
    return new Response(JSON.stringify({
      circulating_supply: supply.circulatingSupplyPrecise,
      unit: 'MCM'
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60'
      }
    });
  } catch (error) {
    console.error('Error fetching circulating supply:', error);
    return new Response(JSON.stringify({ error: 'Error fetching supply data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
