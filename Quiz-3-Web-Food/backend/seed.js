// Jalankan dengan: npm run seed
// Membuat akun admin default dan mengisi beberapa menu contoh
require("dotenv").config();
const bcrypt = require("bcryptjs");
const { connectDB } = require("./config/db");
const { Admin, Menu } = require("./models");

const seed = async () => {
  await connectDB();

  // Seed admin
  const existingAdmin = await Admin.findOne({ where: { username: process.env.ADMIN_USERNAME } });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await Admin.create({ username: process.env.ADMIN_USERNAME, password: hashedPassword });
    console.log(`Admin '${process.env.ADMIN_USERNAME}' berhasil dibuat.`);
  } else {
    console.log("Admin sudah ada, dilewati.");
  }

  // Seed menu jika masih kosong
  const menuCount = await Menu.count();
  if (menuCount === 0) {
    await Menu.bulkCreate([
      { name: "Cyber Ramen", description: "Ramen kuah pedas dengan topping robotik crispy.", price: 85000, emoji: "🍜", category: "Makanan" },
      { name: "Neon Sushi", description: "Sushi salmon segar dengan saus signature menyala.", price: 120000, emoji: "🍣", category: "Makanan" },
      { name: "Quantum Burger", description: "Burger daging premium dengan keju leleh dan saus rahasia.", price: 95000, emoji: "🍔", category: "Makanan" },
      { name: "Galaxy Milkshake", description: "Milkshake vanila dengan taburan galaxy sprinkles.", price: 45000, emoji: "🥤", category: "Minuman" },
    ]);
    console.log("4 menu contoh berhasil ditambahkan.");
  } else {
    console.log("Menu sudah ada data, dilewati.");
  }

  console.log("Seeding selesai.");
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
