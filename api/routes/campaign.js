const express = require('express');
const mongoose = require('mongoose');
const Campaign = require('../../models/campaign');
const router = express.Router();

// @route    GET api/campaign/
// @desc     get all campaign
// @access   Public
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    if (!campaigns) {
      return res.status(400).json({ msg: 'There is no campaigns' });
    }
    res.json(campaigns);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/campaign/
// @desc     get campaign by id
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: 'Invalid ID' });
    }

    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(400).json({ msg: 'Campaign not defined' });
    }
    res.json(campaign);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/campaign/
// @desc     Add new campaign
// @access   Public
router.post('/', async (req, res) => {
  try {

    // TODO: Only one campaign for product if needed

    // const campaign = await Campaign.findOne({
    //   productId: req.body.productId,
    // }).exec();
    // if (campaign) {
    //   res.status(400).json({ errors: [{ msg: 'Campaign fot this product already exists' }] });
    //   return;
    // }

    const {
      productId,
      keywords,
      name,
      bidAmount,
      campaignFund,
      status,
      town,
      radius,
    } = req.body;

    const newCampaign = new Campaign({
      productId,
      keywords,
      name,
      bidAmount,
      campaignFund,
      status,
      town,
      radius,
    });

    await newCampaign.save();

    return res.status(200).json(newCampaign);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/campaign/:id
// @desc     Update a campaign
// @access   Public
router.put('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: 'Invalid ID' });
    }

    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(400).json({ msg: 'Campaign not defined' });
    }
    await campaign.set(req.body);
    await campaign.save()
    await res.json(campaign);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/campaign/:id
// @desc     delete campaign by id
// @access   Public
router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ msg: 'Invalid ID' });

    const campaign = await Campaign.findOne({ _id: req.params.id });
    if (!campaign) {
      return res.status(400).json({ msg: 'Campaign not defined' });
    }
    await campaign.remove();
    res.status(204).json({});
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
