module.exports = (sequelize, DataTypes) => {
  const Pin = sequelize.define(
    "Pin",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      mapboxId: {
        type: DataTypes.STRING,
        allowNull: false,
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

      types: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
          notEmptyArray(value) {
            if (value.length < 1) {
              throw new Error("type must not be empty");
            }
          },
        },
      },

      countryCode: {
        type: DataTypes.STRING(2),
        allowNull: false,
        validate: {
          len: [2, 2],
          isUppercase: true,
        },
      },

      continent: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [
            [
              "Africa",
              "Antarctica",
              "Asia",
              "Europe",
              "North America",
              "South America",
              "Oceania",
            ],
          ],
        },
      },

      region: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "pins",
      timestamps: true,
    },
  );

  return Pin;
};
