import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import ArticleCard from "../components/ArticleCard";

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then(({ data }) => {
      setArticles(data.articles);
    })
    .catch((err) => {
        console.error("Error fetching articles:", err);
  });
  }, []);

  return (
    <main>
      <h1>All Articles</h1>
      <div className="articles-grid">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </main>
  );
}

export default Home;
