import express from 'express';
import { createUser, getAllUsers, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;