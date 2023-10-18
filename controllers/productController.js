// controllers/productController.js
const Product = require('../models/product');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error creating the product' });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching the product' });
    }
  };
  
  // Update a product by ID
  exports.updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: 'Error updating the product' });
    }
  };
  
  // Delete a product by ID
  exports.deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProduct = await Product.findByIdAndRemove(id);
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(204).send(); // No content (successful deletion)
    } catch (error) {
      res.status(500).json({ error: 'Error deleting the product' });
    }
  };

  //Delete a list of products by ID
  exports.deleteProduct = async(req,res) => {
    try{
      const { id } = await Product.deleteMany({});
      
      if (XPathResult.deletedCount === 0) {
        return res.status(404).json({error: 'No products found to be deltec'});
      }

      res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleteing products'});
    }
  };

  //Find all Products which name contains 'kw'
  exports.getProductsByNameContainsKW = async (req, res) => {
    try {
      const products = await Product.find({ name: { $regex: 'kw', $options: 'i' } });
  
      if (products.length === 0) {
        return res.status(404).json({ error: 'No products found matching the criteria' });
      }
  
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products' });
    }
  };