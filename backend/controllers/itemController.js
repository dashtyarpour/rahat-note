const Item = require("../models/Item");

const createItem = async (req, res) => {
  try {
    const { title, category, description } = req.body;

    const item = await Item.create({
      title,
      category,
      description,
      userId: req.user.userId,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({
      message: "خطا در ایجاد مطلب",
      error: error.message,
    });
  }
};

const getItems = async (req, res) => {
  try {
    const items = await Item.find({
      userId: req.user.userId,
    }).sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({
      message: "خطا در دریافت مطالب",
      error: error.message,
    });
  }
};

const getItemById = async (req, res) => {
  try {
    const item = await Item.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!item) {
      return res.status(404).json({
        message: "مطلب پیدا نشد",
      });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({
      message: "خطا در دریافت مطلب",
      error: error.message,
    });
  }
}; 

const updateItem = async (req, res) => {
  try {
    const { title, category, description } = req.body;

    const item = await Item.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId,
      },
      {
        title,
        category,
        description,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!item) {
      return res.status(404).json({
        message: "مطلب پیدا نشد",
      });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({
      message: "خطا در ویرایش مطلب",
      error: error.message,
    });
  }
};

const deleteItem = async (req, res) => {
  try {
    const item = await Item.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!item) {
      return res.status(404).json({
        message: "مطلب پیدا نشد",
      });
    }

    res.json({
      message: "مطلب با موفقیت حذف شد",
    });
  } catch (error) {
    res.status(500).json({
      message: "خطا در حذف مطلب",
      error: error.message,
    });
  }
};

module.exports = {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
};
