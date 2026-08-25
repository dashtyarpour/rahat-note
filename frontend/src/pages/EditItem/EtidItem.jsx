import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import styles from "../CreateItem/createItem.module.css";

function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
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

    try {
      setSaving(true);

      await api.put(`/items/${id}`, form);

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

          <p>اطلاعات مطلب را تغییر دهید و ذخیره کنید.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>عنوان</label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>دسته‌بندی</label>

            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>توضیحات</label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="8"
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancel}
              onClick={() => navigate(`/item/${id}`)}
            >
              انصراف
            </button>

            <button
              type="submit"
              className={styles.save}
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