const Product = require('../models/productModel'); 
const natural = require('natural');
const TfIdf = natural.TfIdf;

// Helper functions for calculating similarity

const categorySimilarity = (cat1, cat2) => {
  return cat1 === cat2 ? 1 : 0;
};

const ratingSimilarity = (rating1, rating2) => {
  const maxRating = 5;
  return 1 - Math.abs(rating1 - rating2) / maxRating;
};

const descriptionSimilarity = (desc1, desc2) => {
  const tfidf = new TfIdf();
  tfidf.addDocument(desc1);
  tfidf.addDocument(desc2);
  return tfidf.tfidf(desc1, 0) * tfidf.tfidf(desc2, 1);
};

const nameSimilarity = (name1, name2) => {
  const tfidf = new TfIdf();
  tfidf.addDocument(name1);
  tfidf.addDocument(name2);
  return tfidf.tfidf(name1, 0) * tfidf.tfidf(name2, 1);
};

const calculateOverallSimilarity = (product1, product2) => {
  const weights = {
    category: 0.2,
    rating: 0.3,
    description: 0.3,
    name: 0.2
  };

  const categorySim = categorySimilarity(product1.category, product2.category);
  const ratingSim = ratingSimilarity(product1.averageRatings, product2.averageRatings);
  const descriptionSim = descriptionSimilarity(product1.description, product2.description);
  const nameSim = nameSimilarity(product1.name, product2.name);

   console.log(product1.averageRatings); 
  return (
    weights.category * categorySim +
    weights.rating * ratingSim +
    weights.description * descriptionSim +
    weights.name * nameSim
  );
};

// Fetch similar products
const getSimilarProducts = async (productId) => {
    try {
        const product = await Product.findById(productId);

        if (!product) return [];
         
        const allProducts = await Product.find({ _id: { $ne: productId } });

        const similarProducts = allProducts
          .map(p => ({
            product: p,
            similarity: calculateOverallSimilarity(product, p),
          }))
          .filter(p => p.similarity > 0) 
          .sort((a, b) => b.similarity - a.similarity) 
          .map(p => p.product);
      
        return similarProducts;
    } catch (error) {
         console.log(error);
    }
};

module.exports = {
  getSimilarProducts
};
