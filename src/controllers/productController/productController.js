import Product from "../../models/product-model.js";


export const getProducts = async (req, res) => {
    try {
        const produtos = await Product.find();
        return res.status(200).json(produtos);
    } catch (error) {
        return res.status(500).json({
            erro: error.message
        });
    }
};





export const createProduct = async (req, res) => {
    const {produto,preco,descricao,image}=req.body
    try {
        if(!produto){
            return res.status(401).json({message:"O Nome do produto é obrigatório"})
        }
        if(!preco){
            return res.status(401).json({message:"O Preco é obrigatório"})
        }
        if(!descricao){
            return res.status(401).json({message:"A descriçao do produto é obrigatório"})
        }
        if(!image){
            return res.status(401).json({message:"O link da imagem é obrigatória"})
        }
        await Product.create({produto,preco,descricao,image})
        return res.status(201).json({produto,preco,descricao,image})
        
        
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};



export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const {
        produto,
        preco,
        descricao,
        image,
        isVisible
    } = req.body;

    try {

        const product = await Product.findById(id);


        if (!product) {
            return res.status(404).json({
                message: "Produto não encontrado"
            });
        }

        const produtoUpdated={
            produto,
            preco,
            descricao,
            image,
            isVisible
        }
       

        await Product.findByIdAndUpdate(id,produtoUpdated,{new:true})


        return res.status(200).json({
            product
        });
    } catch (error) {

        return res.status(500).json({
            error: error.message
        });
    }
};





export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    try {

        const product = await Product.findById(id);


        if (!product) {
            return res.status(404).json({
                message: "Produto não encontrado"
            });
        }
       

        await Product.findByIdAndDelete(id)


        return res.status(200).json({message:"Produto deletado com sucesso"});
    } catch (error) {

        return res.status(500).json({
            error: error.message
        });
    }
};



export const getProductById = async (req, res) => {
    const {id} = req.params;
    try {

        const product = await Product.findById(id);


        if (!product) {
            return res.status(404).json({
                message: "Produto não encontrado"
            });
        }


        return res.status(200).json(product);
    } catch (error) {

        return res.status(500).json({
            error: error.message
        });
    }
};