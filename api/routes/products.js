const express = require('express');
const mongoose = require('mongoose');
const Campaign = require('../../models/campaign');
const Product = require('../../models/product');
const router = express.Router();

// @route    GET api/products/
// @desc     get all products
// @access   Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(400).json({ msg: 'There is no products' });
    }
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/products/:id
// @desc     get product by id
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: 'Invalid ID' });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(400).json({ msg: 'Product not defined' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/products/
// @desc     Add new product
// @access   Public
router.post('/', async (req, res) => {
  try {
    const product = await Product.findOne({
      name: req.body.name,
    }).exec();
    if (product) {
      res.status(400).json({ errors: [{ msg: 'Product already exists' }] });
      return;
    }

    const { name, description, price } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
    });

    await newProduct.save();

    res.status(200).json(newProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/products/:id
// @desc     Update a product
// @access   Public
router.put('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: 'Invalid ID' });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(400).json({ msg: 'Product not defined' });
    }
    await product.set(req.body);
    await product.save()
    await res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/products/:id
// @desc     delete product by id
// @access   Public
router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ msg: 'Invalid ID' });

    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      return res.status(400).json({ msg: 'Product not defined' });
    }
    
    //  Delete all camapigns for product
    const productCampaigns = await Campaign.find({productId: product._id})
    if(productCampaigns){
      productCampaigns.forEach(async campaign => {
        await campaign.remove()
      })
    }
    
    await product.remove();
    res.status(204).json({});
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
