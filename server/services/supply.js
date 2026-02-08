/**
 * Mochimo Supply Service
 * Fetches circulating supply from the Mochimo API and caches it
 */

const MOCHIMO_API_URL = 'https://api.mochimo.org/stats/richlist';
const CACHE_TTL_MS = 60 * 1000; // Cache for 60 seconds

let cachedSupply = null;
let lastFetchTime = 0;

/**
 * Convert nanoMCM to MCM (divide by 10^9)
 * @param {string} nanoMcm - Amount in nanoMCM
 * @returns {string} Amount in MCM as a whole number string
 */
function nanoMcmToMcm(nanoMcm) {
  return (BigInt(nanoMcm) / BigInt(1e9)).toString();
}

/**
 * Convert nanoMCM to MCM with decimal precision
 * @param {string} nanoMcm - Amount in nanoMCM
 * @returns {string} Amount in MCM with 9 decimal places
 */
function nanoMcmToMcmPrecise(nanoMcm) {
  const value = BigInt(nanoMcm);
  const mcmPart = value / BigInt(1e9);
  const nanoPart = value % BigInt(1e9);
  return `${mcmPart}.${nanoPart.toString().padStart(9, '0')}`;
}

/**
 * Fetch circulating supply from Mochimo API
 * @returns {Promise<{circulatingSupplyNano: string, circulatingSupplyMcm: string, circulatingSupplyPrecise: string}>}
 */
async function fetchSupplyFromApi() {
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
    throw new Error(`Mochimo API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  
  // The circulating_supply is an object with a value property
  const circulatingSupplyNano = data.circulating_supply?.value;
  
  if (!circulatingSupplyNano) {
    throw new Error('circulating_supply.value not found in API response');
  }

  return {
    circulatingSupplyNano,
    circulatingSupplyMcm: nanoMcmToMcm(circulatingSupplyNano),
    circulatingSupplyPrecise: nanoMcmToMcmPrecise(circulatingSupplyNano)
  };
}

/**
 * Get supply data with caching
 * @returns {Promise<{circulatingSupplyNano: string, circulatingSupplyMcm: string, circulatingSupplyPrecise: string, totalSupplyMcm: string, totalSupplyPrecise: string}>}
 */
async function getSupply() {
  const now = Date.now();
  
  // Return cached value if still valid
  if (cachedSupply && (now - lastFetchTime) < CACHE_TTL_MS) {
    return cachedSupply;
  }

  // Fetch fresh data
  const supplyData = await fetchSupplyFromApi();
  
  // Total supply equals circulating supply for Mochimo
  cachedSupply = {
    ...supplyData,
    totalSupplyMcm: supplyData.circulatingSupplyMcm,
    totalSupplyPrecise: supplyData.circulatingSupplyPrecise
  };
  lastFetchTime = now;
  
  return cachedSupply;
}

/**
 * Force refresh the cached supply data
 */
async function refreshSupply() {
  lastFetchTime = 0;
  return getSupply();
}

module.exports = {
  getSupply,
  refreshSupply,
  nanoMcmToMcm,
  nanoMcmToMcmPrecise
};
