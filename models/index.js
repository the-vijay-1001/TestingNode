import { DataTypes, Sequelize } from "sequelize";
import categorySchema from "./categoryModel.js"
import userSchema from "./userModel.js";
import serviceSchema from "./service.js";
import srvicePriceSchema from "./servicePrice.js";
const sequelize = new Sequelize("TestingNode", "root", "123456", {
    host: "localhost",
    dialect: "mysql"
});

sequelize.authenticate().then(() => {
    console.log("db connected");
}).catch(err => {
    console.log("db not connected " + err)
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.categories = categorySchema(sequelize, DataTypes);
db.users = userSchema(sequelize, DataTypes);
db.services = serviceSchema(sequelize, DataTypes);
db.service_prices = srvicePriceSchema(sequelize, DataTypes);

db.categories.hasMany(db.services)
db.services.belongsTo(db.categories);

db.services.hasMany(db.service_prices)
db.service_prices.belongsTo(db.services);


sequelize.sync({ force: false }).then(res => {
    console.log("db syncing")
})

export default db;