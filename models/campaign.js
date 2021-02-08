const mongoose = require('mongoose');

const Campaign = mongoose.model('Campaign', {
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    // required: true,
  },

  keywords: {
    type: [String],
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  bidAmount: {
    type: Number,
    required: true,
    minimum: 10,
  },

  campaignFund: {
    type: Number,
    required: true,
  },

  status: {
    type: Boolean,
    default: true,
  },

  town: {
    type: String,
  },

  radius: {
    type: Number,
    required: true,
  },
});

module.exports = Campaign;
