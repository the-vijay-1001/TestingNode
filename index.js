import express from "express"
import dotenv from "dotenv"
import db from "./models/index.js";
import cors from "cors"
import bodyParser from "body-parser";
import categoryRouter from "./routes/categoryRoute.js";
import userRouter from "./routes/userRoute.js";
import serviceRoute from "./routes/serviceRoute.js"
import servicePriceRoute from "./routes/servicePriceRoute.js"
dotenv.config();

//get the instance of express
const app = express()

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//define the specific route for the specific services
app.use("/user", userRouter)
app.use("/category", categoryRouter);
app.use("/service", serviceRoute);
app.use("/service-price", servicePriceRoute);

const port = process.env.PORT || 3002;

//start the server
app.listen(port, () => {
    console.log("server started on " + port)
});
