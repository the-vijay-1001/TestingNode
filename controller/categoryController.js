import { where } from "sequelize";
import db from "../models/index.js";
import jwt from "jsonwebtoken"

const Category = db.categories;

export const createCategory = async (request, response) => {
    try {

        jwt.verify(request.token, process.env.SECRET_KEY, async (error, res) => {
            if (!error) {
                const { categoryName } = request.body;
                if (!categoryName) {
                    return response.status(200).json({ message: "Category Name required" })
                }
                const isCategoryExists = await Category.findOne({
                    where: {
                        categoryName: categoryName
                    }
                })
                if (!isCategoryExists) {
                    const category = await Category.create({ categoryName });
                    if (category) {
                        return response.status(200).json({ message: "Category Created", data: category })
                    }
                    else {
                        return response.status(200).json({ message: "Something went wrong", data: null })
                    }
                }
                else {
                    return response.status(200).json({ message: "this category is already exists" })
                }
            }
            else {
                return response.status(500).json({ message: "something went wrong", error })
            }
        })
    } catch (error) {
        return response.status(500).json({ message: "Internal Error" })
    }
}

export const deleteById = async (request, response) => {
    try {
        jwt.verify(request.token, process.env.SECRET_KEY, async (error, res) => {
            if (!error) {
                const { categoryId } = request.params;
                if (!categoryId) {
                    return response.status(200).json({ message: "Category id required" })
                }
                const isCategoryDeleted = await Category.destroy({
                    where: {
                        id: parseInt(categoryId)
                    }
                })
                if (isCategoryDeleted) {
                    return response.status(200).json({ message: "category deleted" })
                }
                else {
                    return response.status(200).json({ message: "something went wrong" })
                }
            }
            else {
                return response.status(500).json({ message: "something went wrong", error })
            }
        })
    } catch (error) {
        return response.status(500).json({ message: "Internal Error" })
    }
}

export const updateById = async (request, response) => {
    try {
        jwt.verify(request.token, process.env.SECRET_KEY, async (error, res) => {
            if (!error) {
                const { categoryId, categoryName } = request.params;
                if (!categoryId) {
                    return response.status(200).json({ message: "Category id required" })
                }
                const isCategoryExists = await Category.findOne({
                    where: {
                        id: parseInt(categoryId)
                    }
                })
                if (isCategoryExists) {
                    isCategoryExists.categoryName = categoryName;
                    await isCategoryExists.save()
                    return response.status(200).json({ message: "updated" })
                }
                else {
                    return response.status(400).json({ message: "Category Not found" })
                }
            }
            else {
                return response.status(500).json({ message: "something went wrong", error })
            }
        })
    } catch (error) {
        return response.status(500).json({ message: "Internal Error" })
    }
}

export const getCategory = async (request, response) => {
    try {
        const categories = await Category.findAll();
        if (categories) {
            return response.status(200).json({ message: "All Category", data: categories })
        }
        else {
            return response.status(200).json({ message: "Category not found", data: null })
        }
    } catch (error) {
        return response.status(500).json({ message: "Internal Error" })
    }
}

