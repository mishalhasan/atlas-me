const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Pin = sequelize.define(
  "Pin",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255],
      },
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
        min: -90,
        max: 90,
      },
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
        min: -180,
        max: 180,
      },
    },
    type: {
      type: DataTypes.ENUM("wishlist", "visited"),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    country_code: {
      type: DataTypes.STRING(2),
      allowNull: false,
      validate: {
        len: [2, 2],
        notEmpty: true,
        isUppercase: true,
      },
      continent: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isIn: [
            [
              "Africa",
              "Antarctica",
              "Asia",
              "Europe",
              "North America",
              "South America",
              "Australia",
            ],
          ],
        },
      },
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

// | Field | Type | Required | Notes |
// |-------|------|----------|-------|
// | id | INTEGER | auto | Primary key, auto-increment |
// | user_id | INTEGER | yes | FK → users.id, cascades on delete |
// | name | STRING | yes | Place name e.g. "Paris", "Tokyo" |
// | latitude | FLOAT | yes | -90 to 90 |
// | longitude | FLOAT | yes | -180 to 180 |
// | type | ENUM | yes | 'visited' or 'wishlist' only |
// | country_code | STRING(2) | yes | ISO 3166-1 alpha-2 e.g. 'FR', 'JP' |
// | continent | STRING | yes | Derived from Mapbox or lookup table |
// | region | STRING | yes | From Mapbox Geocoding response |
// | created_at | TIMESTAMP | auto | Auto-generated |
// | updated_at | TIMESTAMP | auto | Auto-updated |

module.exports = Pin;
