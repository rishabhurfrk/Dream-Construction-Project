const express = require('express');
const router = express.Router();
const Plan = require('../models/Plan');

router.post('/search', async (req, res) => {
  try {
    const { plotLength, plotWidth } = req.body;
    console.log('Received search request:', { plotLength, plotWidth });

    // Build query object
    let query = {
      plotLength: Number(plotLength),
      plotWidth: Number(plotWidth)
    };
    
    console.log('Searching with query:', query);
    
    const plans = await Plan.find(query);
    console.log('Found plans:', plans);

    if (plans.length === 0) {
      return res.status(404).json({ message: 'No matching plans found' });
    }

    res.json(plans);

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Error searching for plans' });
  }
});

// Add this route to test database connection
router.get('/test', async (req, res) => {
  try {
    const plans = await Plan.find({});
    res.json({ count: plans.length, plans });
  } catch (error) {
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

module.exports = router;
