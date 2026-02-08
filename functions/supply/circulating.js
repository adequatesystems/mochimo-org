import { fetchSupply } from './_shared.js';

/**
 * GET /supply/circulating
 * Returns circulating supply as raw text with decimals
 */
export async function onRequestGet(context) {
  try {
    const supply = await fetchSupply();
    return new Response(supply.circulatingSupplyPrecise, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=60'
      }
    });
  } catch (error) {
    console.error('Error fetching circulating supply:', error);
    return new Response('Error fetching supply data', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
