// In-memory product controller (no MongoDB)

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = {
      _id: global.nextId.toString(),
      name,
      description,
      price: Number(price),
      category,
      createdAt: new Date(),
    };

    global.products.push(product);
    global.nextId++;

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Products + Search + Sort
exports.getProducts = async (req, res) => {
  try {
    const { search, sort } = req.query;

    let filtered = [...global.products];

    // Search by name
    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort by price
    if (sort === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Product
exports.getProductById = async (req, res) => {
  try {
    const product = global.products.find((p) => p._id === req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const productIndex = global.products.findIndex(
      (p) => p._id === req.params.id
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found" });
    }

    global.products[productIndex] = {
      ...global.products[productIndex],
      name,
      description,
      price: Number(price),
      category,
    };

    res.json(global.products[productIndex]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const productIndex = global.products.findIndex(
      (p) => p._id === req.params.id
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found" });
    }

    global.products.splice(productIndex, 1);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
