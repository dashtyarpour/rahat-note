import styles from "./ConfirmDialog.module.css";

function ConfirmDialog({
  open,
  title = "حذف مطلب",
  message = "آیا مطمئن هستید که می‌خواهید این مطلب را حذف کنید؟",
  onConfirm,
  onCancel,
  loading = false,
}) {
  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.icon}>
          !
        </div>

        <h2>{title}</h2>

        <p>{message}</p>

        <div className={styles.actions}>
          <button
            className={styles.cancel}
            onClick={onCancel}
            disabled={loading}
          >
            انصراف
          </button>

          <button
            className={styles.confirm}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "در حال حذف..." : "بله، حذف کن"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;