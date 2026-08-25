import { Link } from "react-router-dom";
import styles from "./ItemCard.module.css";

function ItemCard({ item }) {
  return (
    <Link to={`/item/${item._id}`} className={styles.card}>
      <div className={styles.category}>{item.category}</div>

      <h3>{item.title}</h3>

      <p>{item.description}</p>

      <div className={styles.footer}>
        <span>مشاهده مطلب</span>
        <span className={styles.arrow}>←</span>
      </div>
    </Link>
  );
}

export default ItemCard;