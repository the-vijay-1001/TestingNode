import { where } from "sequelize";
import db from "../models/index.js"
import jwt from "jsonwebtoken"

const User = db.users;
export const signup = async (request, response) => {
    try {
        const { userName, email, password } = request.body
        if (userName && email && password) {
            const user = await User.create({ userName, email, password })
            if (user) {
                return response.status(200).json({ message: "signup success" });
            }
            else {
                return response.status(400).json({ message: "somthing went wrong" });
            }
        }
        else {
            return response.status(200).json({ message: "All Fields are require" });
        }
    } catch (error) {
        return response.status(500).json({ message: "internal server error" })
    }
}

export const login = async (request, response) => {
    try {
        const { email, password } = request.body
        if (email && password) {
            const isEmailExists = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!isEmailExists) {
                return response.status(200).json({ message: "invalid credential" });
            }
            else {
                const isMatchPassword = (isEmailExists.password == password);
                if (isMatchPassword) {
                    const payload = { subject: email };
                    const token = jwt.sign(payload, process.env.SECRET_KEY);
                    if (token) {
                        isEmailExists.dataValues.token = token;
                        delete isEmailExists.dataValues.password
                        return response.status(200).json({ message: "login success", data: isEmailExists })
                    }
                }
                else {
                    return response.status(400).json({ message: "Invalid Credential" })
                }
            }
        }
        else {
            return response.status(200).json({ message: "credential required" });
        }
    } catch (error) {
        return response.status(500).json({ message: "internal server error" })
    }
}