/**
 * Mochimo Supply - Shared logic for Cloudflare Functions
 */

const MOCHIMO_API_URL = 'https://api.mochimo.org/stats/richlist';

/**
 * Convert nanoMCM to MCM with decimal precision
 */
function nanoMcmToMcmPrecise(nanoMcm) {
  const value = BigInt(nanoMcm);
  const mcmPart = value / BigInt(1e9);
  const nanoPart = value % BigInt(1e9);
  return `${mcmPart}.${nanoPart.toString().padStart(9, '0')}`;
}

/**
 * Fetch supply data from Mochimo API
 */
export async function fetchSupply() {
  const response = await fetch(MOCHIMO_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      network_identifier: {
        blockchain: 'mochimo',
        network: 'mainnet'
      },
      limit: 1,
      offset: 0,
      ascending: false
    })
  });

  if (!response.ok) {
    throw new Error(`Mochimo API error: ${response.status}`);
  }

  const data = await response.json();
  const circulatingSupplyNano = data.circulating_supply?.value;

  if (!circulatingSupplyNano) {
    throw new Error('circulating_supply.value not found in API response');
  }

  const supplyPrecise = nanoMcmToMcmPrecise(circulatingSupplyNano);
  
  return {
    circulatingSupplyPrecise: supplyPrecise,
    totalSupplyPrecise: supplyPrecise // Same for Mochimo
  };
}
