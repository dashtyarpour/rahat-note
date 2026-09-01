import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

import styles from "./EditItem.module.css";

function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    priority: 1,
    status: "NOT_STARTED",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.get(`/items/${id}`);

        setForm({
          title: response.data.title,
          category: response.data.category,
          priority: response.data.priority,
          status: response.data.status,
          description: response.data.description,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.category ||
      !form.priority ||
      !form.description
    ) {
      return;
    }

    try {
      setSaving(true);

      await api.put(`/items/${id}`, {
        ...form,
        priority: Number(form.priority),
      });

      navigate(`/item/${id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>در حال بارگذاری...</div>;
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>ویرایش مطلب</span>

          <h1>ویرایش مطلب</h1>

          <p>
            اطلاعات مطلب را تغییر دهید و ذخیره کنید.
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
            />
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label htmlFor="category">دسته‌بندی</label>

              <input
                id="category"
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="priority">اولویت</label>

              <input
                id="priority"
                type="number"
                name="priority"
                min="1"
                value={form.priority}
                onChange={handleChange}
              />

              <span className={styles.helper}>
                عدد کوچک‌تر یعنی اولویت بالاتر
              </span>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="status">وضعیت</label>

            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="NOT_STARTED">شروع نشده</option>
              <option value="IN_PROGRESS">در حال انجام</option>
              <option value="COMPLETED">تمام شده</option>
              <option value="DEFERRED">به تعویق افتاده</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">توضیحات</label>

            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="8"
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => navigate(`/item/${id}`)}
            >
              انصراف
            </button>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={saving}
            >
              {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default EditItem;