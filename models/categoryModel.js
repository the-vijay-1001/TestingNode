const categorySchema = (sequelize, DataTypes) => {
    const Category = sequelize.define("category", {
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Category;
}

export default categorySchema;