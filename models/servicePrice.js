const srvicePriceSchema = (sequelize, DataTypes) => {
    const ServicePrice = sequelize.define("service_price", {
        serviceId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM,
            values: ['HOURLY', 'WEEKLY', 'MONTHLY'],
            allowNull: false
        },
    })
    return ServicePrice;
}

export default srvicePriceSchema;