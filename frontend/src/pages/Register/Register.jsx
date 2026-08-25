import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import styles from "./Register.module.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.password) {
      setError("تمام فیلدها را پر کنید.");
      return;
    }

    if (form.password.length < 6) {
      setError("رمز عبور باید حداقل ۶ کاراکتر باشد.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.post("/auth/register", form);

      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "ثبت نام انجام نشد."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>R</div>

          <h1>ایجاد حساب</h1>

          <p>
            برای شروع استفاده از راحت نوت حساب خود را بسازید.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>نام</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="نام شما"
            />
          </div>

          <div className={styles.formGroup}>
            <label>شماره موبایل</label>

            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="09123456789"
              dir="ltr"
            />
          </div>

          <div className={styles.formGroup}>
            <label>رمز عبور</label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="حداقل ۶ کاراکتر"
              dir="ltr"
            />
          </div>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className={styles.submit}
            disabled={loading}
          >
            {loading
              ? "در حال ثبت نام..."
              : "ایجاد حساب"}
          </button>
        </form>

        <div className={styles.footer}>
          قبلاً حساب ساخته‌اید؟

          <Link to="/login">
            وارد شوید
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Register;