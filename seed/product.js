const dbConnection = require("../config/mongodb")
const Product = require("../models/productModel"); 
const products = [
    { 
      name: "Smartphone X", 
      price: 699.99, 
      category: "Electronics", 
      description: "A high-end smartphone with a powerful processor and sleek design.",
      imageCover: "smartphone-x.jpg",
      quantity: 65
    },
    { 
      name: "Laptop Pro", 
      price: 1299.99, 
      category: "Computers", 
      description: "A lightweight laptop with powerful features for professionals.",
      imageCover: "laptop-pro.jpg",
      quantity: 78
    },
    { 
      name: "Wireless Earbuds", 
      price: 199.99, 
      category: "Audio", 
      description: "Compact and comfortable earbuds with excellent sound quality.",
      imageCover: "wireless-earbuds.jpg",
      quantity: 53
    },
    { 
      name: "4K Television", 
      price: 799.99, 
      category: "Electronics", 
      description: "A 55-inch 4K Ultra HD TV with stunning picture quality.",
      imageCover: "4k-television.jpg",
      quantity: 92
    },
    { 
      name: "Gaming Console", 
      price: 499.99, 
      category: "Gaming", 
      description: "The latest gaming console with immersive graphics and fast performance.",
      imageCover: "gaming-console.jpg",
      quantity: 67
    },
    { 
      name: "Smartwatch Series 6", 
      price: 399.99, 
      category: "Wearables", 
      description: "A smartwatch with advanced health tracking features.",
      imageCover: "smartwatch-series-6.jpg",
      quantity: 85
    },
    { 
      name: "Electric Scooter", 
      price: 349.99, 
      category: "Transportation", 
      description: "A lightweight electric scooter for easy commuting.",
      imageCover: "electric-scooter.jpg",
      quantity: 71
    },
    { 
      name: "Digital Camera", 
      price: 599.99, 
      category: "Photography", 
      description: "A compact digital camera with high resolution and multiple modes.",
      imageCover: "digital-camera.jpg",
      quantity: 60
    },
    { 
      name: "Smart Home Hub", 
      price: 149.99, 
      category: "Home Automation", 
      description: "A smart hub to control all your smart home devices seamlessly.",
      imageCover: "smart-home-hub.jpg",
      quantity: 95
    },
    { 
      name: "Blender", 
      price: 89.99, 
      category: "Kitchen Appliances", 
      description: "A high-speed blender for smoothies, soups, and more.",
      imageCover: "blender.jpg",
      quantity: 58
    }
  ];
  
async function seedProducts() {
  try {
    // Insert Products using Product model 
    for (let productData of products) {
      const newProduct = new Product(productData);
      await newProduct.save(); 
    }
    console.log("Products successfully seeded!");
    process.exit();
  } catch (err) {
    console.error("Error seeding products:", err);
    process.exit(1);
  }
}

seedProducts();

