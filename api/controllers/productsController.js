const Product = require("../models/Product");
const mongoose = require("mongoose");

exports.getAllProducts = (req, res, next) => {
    Product.find()
        .select("name price _id productImage")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        productImage: doc.productImage,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:8700/products/" + doc._id
                        }
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.createProduct = (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product
        .save()
        .then(result => {
            res.status(201).json({
                message: "Created product successfully",
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: "POST",
                        url: "http://localhost:8700/products/" + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.getProduct = (req, res, next) => {
    const id = req.params.productID;
    Product.findById(id)
        .select("name price _id")
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: "GET",
                        url: "http://localhost:8700/products"
                    }
                });
            } else {
                res.status(404).json({
                    message: "No valid entry found for provided ID"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.updateProduct = (req, res, next) => {
    const updateOps = {};
    const id = req.params.productID;
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({
            _id: id
        }, {
            $set: updateOps
        })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Product Updated",
                request: {
                    type: "GET",
                    url: "http://localhost:8700/products/" + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.deleteProduct = (req, res, next) => {
    Product.findByIdAndDelete({
            _id: req.params.productID
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Product deleted",
                request: {
                    type: "POST",
                    url: "http://localhost:8700/products",
                    body: {
                        name: "String",
                        price: "Number"
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};