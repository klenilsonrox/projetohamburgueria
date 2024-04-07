import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "./productController.js";
import { authenticateUser } from "../userController/UserController.js";

const router = Router()

router.get("/produtos", getProducts)
router.get("/produtos/:id", getProductById)
router.post("/produtos", authenticateUser, createProduct)
router.put("/produtos/:id", authenticateUser, updateProduct)
router.delete("/produtos/:id", authenticateUser, deleteProduct)

export default router