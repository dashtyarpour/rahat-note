const Item = require("../models/Item");

const addPriority = async ({ userId, category, priority }) => {
  await Item.updateMany(
    {
      userId,
      category,
      priority: { $gte: priority },
    },
    {
      $inc: { priority: 1 },
    }
  );
};

const updatePriority = async ({
  itemId,
  userId,
  oldCategory,
  newCategory,
  oldPriority,
  newPriority,
}) => {
  // اگر دسته‌بندی تغییر کرده باشد
  if (oldCategory !== newCategory) {
    // مرتب کردن دسته‌بندی قبلی
    await Item.updateMany(
      {
        userId,
        category: oldCategory,
        priority: { $gt: oldPriority },
      },
      {
        $inc: { priority: -1 },
      }
    );

    // ایجاد جا در دسته‌بندی جدید
    await Item.updateMany(
      {
        userId,
        category: newCategory,
        priority: { $gte: newPriority },
      },
      {
        $inc: { priority: 1 },
      }
    );

    return;
  }

  // اگر priority کمتر شده باشد
  if (newPriority < oldPriority) {
    await Item.updateMany(
      {
        userId,
        category: oldCategory,
        priority: {
          $gte: newPriority,
          $lt: oldPriority,
        },
      },
      {
        $inc: { priority: 1 },
      }
    );
  }

  // اگر priority بیشتر شده باشد
  if (newPriority > oldPriority) {
    await Item.updateMany(
      {
        userId,
        category: oldCategory,
        priority: {
          $gt: oldPriority,
          $lte: newPriority,
        },
      },
      {
        $inc: { priority: -1 },
      }
    );
  }
};

const removePriority = async ({
  userId,
  category,
  priority,
}) => {
  await Item.updateMany(
    {
      userId,
      category,
      priority: { $gt: priority },
    },
    {
      $inc: { priority: -1 },
    }
  );
};

module.exports = {
  addPriority,
  updatePriority,
};