import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';

// function for add product
const addProduct = async (req, res) => {
    try {
        const {name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // if (!req.files || !req.files.image1) {
        //     return res.json({
        //         success: false, // change this to false
        //         message: "Image1 is required"
        //     });
        // }

        const image1 = req.files.image1 ? req.files.image1[0] : null;
        const image2 = req.files.image2 ? req.files.image2[0] : null;
        const image3 = req.files.image3 ? req.files.image3[0] : null;
        const image4 = req.files.image4 ? req.files.image4[0] : null;

        const images = [image1, image2, image3, image4].filter(image => image !== null);
        
        let imageUrl = await Promise.all(
            images.map(async (image) => {
                let result = await cloudinary.uploader.upload(image.path, {
                    resource_type: "image"
                });
                return result.secure_url;
            })
        );
        
        console.log(name, description, price, category, subCategory, sizes, bestseller);
        // console.log(image1, image2, image3, image4);
        // console.log(images);
        console.log(imageUrl);

        const productData = {
            name,
            description,
            price: Number(price),
            image: imageUrl,
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === 'true' ? true : false,
            date: Date.now()
        }

        console.log("Product Data:", productData);

        const product = new productModel(productData);
        await product.save();

        res.json({
            success: true,
            message: "Product added successfully"
        });
        
    } catch (error) {
        console.log("Error in adding product:", error);
        res.json({
            success: false,
            message: error.message
        }); 
    }

}

// function for list products
const listProducts = async (req, res) => {


}

// function for removing product
const removeProduct = async (req, res) => {


}

// function for single product info
const singleProduct = async (req, res) => {



}


export { addProduct, listProducts, removeProduct, singleProduct };