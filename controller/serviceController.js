import db from "../models/index.js"
import jwt from "jsonwebtoken"

const Service = db.services;
const Category = db.categories;
const ServicePrice = db.service_prices;

export const addService = (request, response) => {
    try {
        jwt.verify(request.token, process.env.SECRET_KEY, async (error, res) => {
            if (!error) {
                const { categoryId, serviceName, type } = request.body;
                if (categoryId && serviceName && type) {
                    const service = await Service.create(request.body);
                    if (service) {
                        return response.status(200).json({ message: "Service Created", data: service })
                    }
                }
                else {
                    return response.status(200).json({ message: "Fields are require" })
                }
            }
            else {
                return response.status(500).json({ message: "something went wrong", error })
            }
        })
    } catch (error) {
        return response.status(500).json({ message: "Internal server error" })
    }
}

export const addServicePrice = (request, response) => {
    try {
        jwt.verify(request.token, process.env.SECRET_KEY, async (error, res) => {
            if (!error) {
                const { duration, serviceId, price, type } = request.body;
                if (serviceId && duration && type && price) {
                    const service = await ServicePrice.create(request.body);
                    if (service) {
                        return response.status(200).json({ message: "Service Price Created", data: service })
                    }
                }
                else {
                    return response.status(200).json({ message: "Fields are require" })
                }
            }
            else {
                return response.status(500).json({ message: "something went wrong", error })
            }
        })
    } catch (error) {
        return response.status(500).json({ message: "Internal server error" })
    }
}

export const getService = (request, response) => {
    try {
        jwt.verify(request.token, process.env.SECRET_KEY, async (error, res) => {
            if (!error) {
                const service = await Service.findAll({
                    include: [ServicePrice, Category]
                })
                if (service) {
                    return response.status(200).json({ message: "service listing", data: service })
                }
            }
            else {
                return response.status(500).json({ message: "something went wrong", error })
            }
        })
    } catch (error) {
        return response.status(500).json({ message: "Internal server error" })
    }
}

