import {
    Router
} from "express";
import {
    authenticateUser,
    createUser,
    deleteUser,
    getUserById,
    getUsers,
    loginUser,
    updateUser
} from "./UserController.js";

const router = Router()

router.post("/login", loginUser)
router.get("/users", getUsers)
router.post("/users", createUser)
router.get("/users/:id", getUserById)
router.put("/users/:id", authenticateUser, updateUser)
router.delete("/users/:id", deleteUser)




export default router