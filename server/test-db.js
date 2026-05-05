const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: console.log, // turn on logging so you see the SQL queries
});

// Define a quick test model
const TestUser = sequelize.define(
  "TestUser",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "test_users",
  },
);

const runTest = async () => {
  try {
    // 1. Authenticate
    await sequelize.authenticate();
    console.log("✅ Connection working");

    // 2. Create table
    await sequelize.sync({ force: true });
    console.log("✅ Table created");

    // 3. INSERT
    const user = await TestUser.create({
      name: "Test User",
      email: "test@test.com",
    });
    console.log("✅ INSERT working — created:", user.toJSON());

    // 4. SELECT
    const found = await TestUser.findOne({ where: { email: "test@test.com" } });
    console.log("✅ SELECT working — found:", found.toJSON());

    // 5. UPDATE
    await found.update({ name: "Updated User" });
    console.log("✅ UPDATE working — name is now:", found.name);

    // 6. DELETE
    await found.destroy();
    console.log("✅ DELETE working");

    // 7. Confirm empty
    const all = await TestUser.findAll();
    console.log("✅ Table empty after delete — count:", all.length);

    // 8. Drop test table
    await sequelize.drop();
    console.log("✅ Test table cleaned up");

    console.log("\n🎉 All queries working — database is ready");
    process.exit(0);
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    process.exit(1);
  }
};

runTest();
