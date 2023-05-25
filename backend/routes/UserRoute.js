import express from "express";
import {
    getUsers,
    getPers, 
    getUsersById,
    getPersById,
    //createUser, diganti register
    updateUser,
    deleteUser,
    register,
    login,
    logout
} from "../controllers/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get('/users', verifyToken, getUsers);
//router.get('/pers', getPers);
router.get('/users/:id',getUsersById);
router.get('/pers/:id',getPersById);
//router.post('/users', createUser); diganti register
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/users', register);
router.post('/login', login);
router.get('/token', refreshToken);
router.delete('/logout', logout);

export default router;