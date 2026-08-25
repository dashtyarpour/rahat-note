import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
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

    if (!form.phone || !form.password) {
      setError("شماره موبایل و رمز عبور را وارد کنید.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.post("/auth/login", form);

      login(
        response.data.token,
        response.data.user
      );

      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "ورود انجام نشد. دوباره تلاش کنید."
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

          <h1>خوش آمدید</h1>

          <p>
            برای ورود به حساب خود اطلاعاتتان را وارد کنید.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="phone">
              شماره موبایل
            </label>

            <input
              id="phone"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="09123456789"
              dir="ltr"
              autoComplete="tel"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">
              رمز عبور
            </label>

            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="رمز عبور"
              dir="ltr"
              autoComplete="current-password"
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
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </form>

        <div className={styles.footer}>
          حساب کاربری ندارید؟

          <Link to="/register">
            ثبت نام کنید
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Login;