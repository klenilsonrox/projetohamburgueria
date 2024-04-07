import { Schema, model } from "mongoose";

const productSchema = new Schema({
    produto: {
        type: String,
    },
    preco: {
        type: String
    },
    descricao:{
        type:String,
    },
    image:{
        type:String,
    },
    categoria:{
        type:String,
    },
    isVisible: {
        type: Boolean,
        default: false
    }
});

const Product = model("Product", productSchema);

export default Product;
