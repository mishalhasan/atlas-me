const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");

//Initialize/Define sequelize models
const db = {
  User: require("./User.js")(sequelize, DataTypes),
  Pin: require("./Pin.js")(sequelize, DataTypes),
};

// Define relationships between models (after initialization to avoid circular dependency)
const { User, Pin } = db;
User.hasMany(Pin, { foreignKey: "userId", onDelete: "CASCADE"});
Pin.belongsTo(User, { foreignKey: "userId" });

// Attach sequelize instance for syncing / connection access
db.sequelize = sequelize;

module.exports = db;
