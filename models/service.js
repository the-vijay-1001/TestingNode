const srviceSchema = (sequelize, DataTypes) => {
    const Service = sequelize.define("service", {
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        serviceName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM,
            values: ['NORMAL', 'VIP'],
            allowNull: false
        },
    })
    return Service;
}

export default srviceSchema;