require("dotenv").config();

const dns = require("dns");

dns.setServers(["1.1.1.1", "1.0.0.1"]);

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const itemRoutes = require("./routes/itemRoutes");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());



app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use("/api/items", authMiddleware, itemRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
const Item = require("./models/Item");

const fixPriorities = async () => {
  try {
    const items = await Item.find({});

    const categories = {};

    items.forEach((item) => {
      if (!categories[item.category]) {
        categories[item.category] = [];
      }

      categories[item.category].push(item);
    });

    for (const category in categories) {
      const categoryItems = categories[category];

      categoryItems.sort((a, b) => {
        // آیتم دارای priority اول باشد
        if (a.priority == null && b.priority != null) return 1;
        if (a.priority != null && b.priority == null) return -1;

        // اگر هر دو priority دارند
        if (a.priority != null && b.priority != null) {
          if (a.priority !== b.priority) {
            return a.priority - b.priority;
          }
        }

        // اگر priority یکسان یا هر دو بدون priority بودند
        return a.createdAt - b.createdAt;
      });

      // تبدیل به 1, 2, 3, ...
      for (let i = 0; i < categoryItems.length; i++) {
        categoryItems[i].priority = i + 1;
        await categoryItems[i].save();
      }
    }

    console.log("✅ تمام دسته‌بندی‌ها اولویت‌بندی شدند");
  } catch (error) {
    console.error("❌ خطا:", error);
  }
};

const startServer = async () => {
  try {
    await connectDB();

    await fixPriorities();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

startServer();

