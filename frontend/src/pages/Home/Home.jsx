import { useEffect, useState } from "react";

import { Link, useSearchParams } from "react-router-dom";

import api from "../../services/api";

import { useAuth } from "../../context/AuthContext";

import ItemCard from "../../components/ItemCard/ItemCard";

import styles from "./Home.module.css";

function Home() {
  const { user, logout } = useAuth();

  const [items, setItems] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "همه";

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get("/items");

        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, []);

  const categories = [
    "همه",
    ...new Set(items.map((item) => item.category)),
  ];

  const filteredItems =
    category === "همه"
      ? items
      : items.filter((item) => item.category === category);

  const handleCategoryChange = (itemCategory) => {
    if (itemCategory === "همه") {
      setSearchParams({});
    } else {
      setSearchParams({
        category: itemCategory,
      });
    }
  };

  return (
    <main className={styles.home}>
      <header className={styles.hero}>
        <div>
          <span className={styles.heroBadge}>
            Rahat Note
          </span>

          <h1>
            مطالب و یادداشت‌های
            <br />
            <strong>منظم و کاربردی</strong>
          </h1>

          <p>
            مطالب خودت را ذخیره کن، دسته‌بندی کن و هر زمان
            که خواستی به آن‌ها دسترسی داشته باش.
          </p>

          {user && (
            <div className={styles.userInfo}>
              <span>
                سلام، {user.name}
              </span>

              <button onClick={logout}>
                خروج
              </button>
            </div>
          )}
        </div>

        <Link
          to="/create"
          className={styles.createButton}
        >
          + افزودن مطلب
        </Link>
      </header>

      <section className={styles.content}>
        <div className={styles.sectionHeader}>
          <h2>مطالب</h2>

          <div className={styles.categories}>
            {categories.map((itemCategory) => (
              <button
                key={itemCategory}
                className={
                  category === itemCategory
                    ? styles.active
                    : ""
                }
                onClick={() =>
                  handleCategoryChange(itemCategory)
                }
              >
                {itemCategory}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.itemsGrid}>
          {filteredItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;