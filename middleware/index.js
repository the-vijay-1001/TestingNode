export const verifyToken = (request, response, next) => {
    const bearerHeader = request.headers["authorization"];
    if (!bearerHeader) {
        return response.status(500).json({ message: "Invalid Token" })
    }
    const token = bearerHeader.split(" ")[1];
    if (token) {
        request.token = token
        next()
    }
    else {
        return response.status(500).json({ message: "Token Not Valid" })
    }
}