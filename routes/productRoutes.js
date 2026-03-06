const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.post("/add", async(req,res)=>{
    try{
        const product = new Product(req.body);
        await product.save();
        res.json(product);
    }
    catch(err){
        res.status(500).json(err);
    }
});

router.get("/", async(req,res)=>{
    const products = await Product.find();
    res.json(products);
});

router.get("/avg-rating", async(req,res)=>{
    const result = await Product.aggregate([
        {
            $group:{
                _id:"$name",
                avgRating:{$avg:"$reviews.rating"}
            }
        }
    ]);
    res.json(result);
});

module.exports = router;