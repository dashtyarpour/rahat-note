import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import styles from "./ItemDetails.module.css";

function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.get(`/items/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleDelete = async () => {
    try {
      setDeleting(true);

      await api.delete(`/items/${id}`);

      navigate("/");
    } catch (error) {
      console.error(error);
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.loading}>
          در حال بارگذاری...
        </div>
      </main>
    );
  }

  if (!item) {
    return (
      <main className={styles.page}>
        <div className={styles.notFound}>
          <h1>مطلب پیدا نشد</h1>

          <p>
            مطلبی که به دنبال آن هستید وجود ندارد.
          </p>

          <Link to="/" className={styles.backButton}>
            بازگشت به مطالب
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <div className={styles.topBar}>
          <button
            className={styles.back}
            onClick={() => navigate(-1)}
          >
            ← بازگشت
          </button>

          <div className={styles.actions}>
            <button
              className={styles.editButton}
              onClick={() => navigate(`/item/${id}/edit`)}
            >
              ویرایش
            </button>

            <button
              className={styles.deleteButton}
              onClick={() => setShowDeleteDialog(true)}
              disabled={deleting}
            >
              {deleting ? "در حال حذف..." : "حذف"}
            </button>
          </div>
        </div>

        <div className={styles.category}>
          {item.category}
        </div>

        <h1>{item.title}</h1>

        <div className={styles.date}>
          {new Date(item.createdAt).toLocaleDateString("fa-IR")}
        </div>

        <div className={styles.divider} />

        <div className={styles.description}>
          {item.description}
        </div>
      </article>

      <ConfirmDialog
        open={showDeleteDialog}
        title="حذف مطلب"
        message="این عملیات قابل بازگشت نیست. آیا مطمئن هستید که می‌خواهید این مطلب را حذف کنید؟"
        loading={deleting}
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
      />
    </main>
  );
}

export default ItemDetails;