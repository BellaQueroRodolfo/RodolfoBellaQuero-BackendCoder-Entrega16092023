const fs = require('fs');
const path = require('path');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  async addProduct(product) {
    const products = await this.getProducts();
    const newProduct = {
      ...product,
      id: products.length + 1,
    };
    products.push(newProduct);
    await this.saveProducts(products);
    return newProduct;
  }

  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find((product) => product.id === id);
  }

  async updateProduct(id, updatedProduct) {
    const products = await this.getProducts();
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
      products[index] = {
        ...updatedProduct,
        id: id, // Ensure the ID remains the same
      };
      await this.saveProducts(products);
      return products[index];
    }
    return null;
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
      products.splice(index, 1);
      await this.saveProducts(products);
    }
  }

  async saveProducts(products) {
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
  }
}

module.exports = ProductManager;
