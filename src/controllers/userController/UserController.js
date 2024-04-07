import User from "../../models/user-model.js";
import bcrypt from "bcrypt";
import {
    config
} from "dotenv";
import JWT from "jsonwebtoken";

config()

// Função para criar um token JWT
const generateToken = (userId) => {
    return JWT.sign({
        userId
    }, process.env.SECRET_KEY, {
        expiresIn: "1d"
    });
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({
            erro: error.message
        });
    }
};


export const createUser = async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;
    try {

        const userExist = await User.findOne({
            email
        });

        if (userExist) {
            return res.status(409).json({
                message: "Já existe um usuário cadastrado com esse email"
            })
        }

        const hashPass = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashPass
        });

        const token = generateToken(user._id);

        return res.status(201).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
            token
        });
    } catch (error) {
        return res.status(500).json({
            erro: error.message
        });
    }
};



export const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({
                message: "Usuário não encontrado"
            });
        }
        return res.status(200).json({
            user
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};




export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const {
        name,
        email,
        password,
        isAdmin
    } = req.body;

    try {

        const user = await User.findById(userId);


        if (!user) {
            return res.status(404).json({
                message: "Usuário não encontrado"
            });
        }


        user.name = name || user.name;
        user.email = email || user.email;
        user.isAdmin = isAdmin || user.isAdmin;

        //
        if (password) {
            const hashPass = await bcrypt.hash(password, 10);
            user.password = hashPass;
        }


        await user.save();


        return res.status(200).json({
            user
        });
    } catch (error) {

        return res.status(500).json({
            error: error.message
        });
    }
};



export const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {

        const result = await User.deleteOne({
            _id: userId
        });


        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Usuário não encontrado"
            });
        }


        return res.status(200).json({
            message: "Usuário excluído com sucesso"
        });
    } catch (error) {

        return res.status(500).json({
            error: error.message
        });
    }
};



export const loginUser = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    try {

        const user = await User.findOne({
            email
        });


        if (!user) {
            return res.status(404).json({
                message: "E-mail ou senha inválidos"
            });
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);


        if (!isPasswordValid) {
            return res.status(401).json({
                message: "E-mail ou senha inválidos"
            });
        }


        const token = JWT.sign({
            userId: user._id
        }, process.env.SECRET_KEY, {
            expiresIn: "1d"
        });

        return res.status(200).json({
            token,
            name: user.name,
            userId: user._id,
            isAdmin:user.isAdmin
        });
        
    } catch (error) {

        return res.status(500).json({
            error: error.message
        });
    }
};





export const authenticateUser = (req, res, next) => {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
        return res.status(401).json({
            message: "Token de autenticação não fornecido"
        });
    }

    // Verifica se o token está no formato correto ("Bearer token_aqui")
    const tokenParts = tokenHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res.status(401).json({
            message: "Formato de token inválido"
        });
    }

    const token = tokenParts[1];

    try {
        const decoded = JWT.verify(token, process.env.SECRET_KEY);

        req.userId = decoded.userId;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Token de autenticação inválido"
        });
    }
};