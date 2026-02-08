import { fetchSupply } from './_shared.js';

/**
 * GET /supply
 * Returns full supply data as JSON object
 */
export async function onRequestGet(context) {
  try {
    const supply = await fetchSupply();
    return new Response(JSON.stringify({
      total_supply: supply.totalSupplyPrecise,
      circulating_supply: supply.circulatingSupplyPrecise,
      unit: 'MCM',
      note: 'Total supply equals circulating supply for Mochimo'
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60'
      }
    });
  } catch (error) {
    console.error('Error fetching supply:', error);
    return new Response(JSON.stringify({ error: 'Error fetching supply data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
