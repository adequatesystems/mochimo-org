import { fetchSupply } from '../_shared.js';

/**
 * GET /supply/total/json
 * Returns total supply as JSON object
 */
export async function onRequestGet(context) {
  try {
    const supply = await fetchSupply();
    return new Response(JSON.stringify({
      total_supply: supply.totalSupplyPrecise,
      unit: 'MCM'
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60'
      }
    });
  } catch (error) {
    console.error('Error fetching total supply:', error);
    return new Response(JSON.stringify({ error: 'Error fetching supply data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
