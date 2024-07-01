import express from "express";
import { createCategory, deleteById, getCategory, updateById } from "../controller/categoryController.js";
import { verifyToken } from "../middleware/index.js";

const router = express.Router();

router.post("/create", verifyToken, createCategory)
router.get("/get", getCategory)
router.put("/delete/:categoryId", verifyToken, deleteById)
router.put("/update/:categoryId/:categoryName", verifyToken, updateById)

export default router;