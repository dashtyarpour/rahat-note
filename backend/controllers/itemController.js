const Item = require("../models/Item");

const {
  addPriority,
  updatePriority,
} = require("../services/itemPriorityService");

const createItem = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      priority,
      status,
    } = req.body;

    const userId = req.user.userId;

    await addPriority({
      userId,
      category,
      priority,
    });

    const item = await Item.create({
      title,
      category,
      description,
      priority,
      status,
      userId,
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
    }).sort({
      category: 1,
      priority: 1,
    });

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
    const {
      title,
      category,
      description,
      priority,
      status,
    } = req.body;

    const userId = req.user.userId;

    const item = await Item.findOne({
      _id: req.params.id,
      userId,
    });

    if (!item) {
      return res.status(404).json({
        message: "مطلب پیدا نشد",
      });
    }

    await updatePriority({
      itemId: item._id,
      userId,
      oldCategory: item.category,
      newCategory: category,
      oldPriority: item.priority,
      newPriority: priority,
    });

    item.title = title;
    item.category = category;
    item.description = description;
    item.priority = priority;
    item.status = status;

    await item.save();

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
    const item = await Item.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!item) {
      return res.status(404).json({
        message: "مطلب پیدا نشد",
      });
    }

    await removePriority({
      userId: req.user.userId,
      category: item.category,
      priority: item.priority,
    });

    await item.deleteOne();

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