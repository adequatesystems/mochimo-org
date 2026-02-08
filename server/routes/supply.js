const express = require('express');
const router = express.Router();
const { getSupply } = require('../services/supply');

/**
 * GET /supply/total
 * Returns total supply as raw text with decimals
 * Used by: CoinGecko, CoinMarketCap, etc.
 */
router.get('/total', async (req, res) => {
  try {
    const supply = await getSupply();
    res.type('text/plain').send(supply.totalSupplyPrecise);
  } catch (error) {
    console.error('Error fetching total supply:', error);
    res.status(500).type('text/plain').send('Error fetching supply data');
  }
});

/**
 * GET /supply/circulating
 * Returns circulating supply as raw text with decimals
 * Used by: CoinGecko, CoinMarketCap, etc.
 */
router.get('/circulating', async (req, res) => {
  try {
    const supply = await getSupply();
    res.type('text/plain').send(supply.circulatingSupplyPrecise);
  } catch (error) {
    console.error('Error fetching circulating supply:', error);
    res.status(500).type('text/plain').send('Error fetching supply data');
  }
});

/**
 * GET /supply/total/json
 * Returns total supply as JSON object
 */
router.get('/total/json', async (req, res) => {
  try {
    const supply = await getSupply();
    res.json({
      total_supply: supply.totalSupplyMcm,
      total_supply_precise: supply.totalSupplyPrecise,
      unit: 'MCM'
    });
  } catch (error) {
    console.error('Error fetching total supply:', error);
    res.status(500).json({ error: 'Error fetching supply data' });
  }
});

/**
 * GET /supply/circulating/json
 * Returns circulating supply as JSON object
 */
router.get('/circulating/json', async (req, res) => {
  try {
    const supply = await getSupply();
    res.json({
      circulating_supply: supply.circulatingSupplyMcm,
      circulating_supply_precise: supply.circulatingSupplyPrecise,
      unit: 'MCM'
    });
  } catch (error) {
    console.error('Error fetching circulating supply:', error);
    res.status(500).json({ error: 'Error fetching supply data' });
  }
});

/**
 * GET /supply
 * Returns full supply data as JSON object
 */
router.get('/', async (req, res) => {
  try {
    const supply = await getSupply();
    res.json({
      total_supply: supply.totalSupplyMcm,
      total_supply_precise: supply.totalSupplyPrecise,
      circulating_supply: supply.circulatingSupplyMcm,
      circulating_supply_precise: supply.circulatingSupplyPrecise,
      unit: 'MCM',
      note: 'Total supply equals circulating supply for Mochimo'
    });
  } catch (error) {
    console.error('Error fetching supply:', error);
    res.status(500).json({ error: 'Error fetching supply data' });
  }
});

module.exports = router;
