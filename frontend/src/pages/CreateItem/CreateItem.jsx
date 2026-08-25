import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import styles from "./CreateItem.module.css";

function CreateItem() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.category || !form.description) {
      return;
    }

    try {
      setLoading(true);

      await api.post("/items", form);

      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>ایجاد مطلب</span>

          <h1>مطلب جدید ایجاد کن</h1>

          <p>
            اطلاعات مطلب را وارد کن تا در کتابخانه مطالب
            ذخیره شود.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">عنوان</label>

            <input
              id="title"
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="مثلاً آموزش React"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">دسته‌بندی</label>

            <input
              id="category"
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="مثلاً برنامه نویسی"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">توضیحات</label>

            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="توضیحات کامل مطلب را وارد کنید..."
              rows="8"
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => navigate("/")}
            >
              انصراف
            </button>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "در حال ذخیره..." : "ذخیره مطلب"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default CreateItem;