import express from "express";
import { verifyToken } from "../middleware/index.js";
import { addService, getService } from "../controller/serviceController.js";

const router = express.Router();

router.post("/create", verifyToken, addService)
router.get("/get", verifyToken, getService)
// router.put("/delete/:categoryId", verifyToken, deleteById)
// router.put("/update/:categoryId/:categoryName", verifyToken, updateById)

export default router;