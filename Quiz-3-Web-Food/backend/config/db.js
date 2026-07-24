const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL Connected via Sequelize");
    // sync() akan otomatis membuat tabel jika belum ada (aman dipakai untuk tugas kuliah)
    await sequelize.sync();
    console.log("Semua tabel sudah tersinkronisasi");
  } catch (error) {
    console.error(`Gagal konek MySQL: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
