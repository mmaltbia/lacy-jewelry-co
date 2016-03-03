var mongoose = require('mongoose'),
	fs = require('fs'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
  productName: String,
  itemNumber: String,
  unitPrice: Number,
  unitsInStock: Number,
  unitsOnOrder: Number,
  quantityPerUnit: Number, 
  reorderLevel: Number,
  discount: Number,
  weight: Number,
  description: String, 
  materials: String,
  measurements: String,
  images: []
});

var Product = mongoose.model('Product', ProductSchema);

module.exports = Product;

({productName: "Sammy", itemNumber: "TRE103", unitPrice: 32.00, unitsInStock: 100, unitsOnOrder: 50, quantityPerUnit: 1, reorderLevel: 50, discount: 0, weight: 0.025, description: "The Lo lends the perfect dose of pop to any arm party. Don't miss your chance to own this beauty", materials: "Lucite, gold plating", measurements: "7.5 in circumference."})