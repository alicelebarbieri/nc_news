import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import ArticleCard from "../components/ArticleCard";
import { useSearchParams } from "react-router-dom";


function Home() {
  const [articles, setArticles] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  const handleSortChange = (e) => {
    searchParams.set("sort_by", e.target.value);
    setSearchParams(searchParams);
  };
  const handleOrderChange = (e) => {
    searchParams.set("order", e.target.value);
    setSearchParams(searchParams);
  }

  useEffect(() => {
    getArticles({ sort_by: sortBy, order })
    .then(({ data }) => {
      setArticles(data.articles);
    })
    .catch((err) => {
        console.error("Error fetching articles:", err);
  });
  }, [sortBy, order]);

  return (
    <main>
      <nav>
        <h3>Topics</h3>
        <div className="topics-buttons">
            {["coding", "football", "cooking"].map((topic) => (
                <li key={topic}>
                    <Link to={`/topics/${topic}`} key={topic} className="topic-button">
                    {topic}
                    </Link> 
                </li>
            ))}
        </div>
      </nav>
        <div>
          <h1>Welcome to the News App</h1>
          <h2>All Articles</h2>
          <div className="sort-controls">
            <label>
              Sort by:
              <select value={sortBy} onChange={handleSortChange}>
                <option value="date">Date</option>
                <option value="votes">Votes</option>
                <option value="comment_count">Comments</option>
              </select>
            </label>
          <label>
            Sort by: {" "}
            <select value={sortBy} onChange={handleSortChange}>
              <option value="date">Date</option>
              <option value="votes">Votes</option>
              <option value="comment_count">Comments</option>
            </select>
          </label>

          <label>
            Order:{" "}
            <select value={order} onChange={handleOrderChange}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
          <div className="articles-grid">
            {articles.map((article) => (
              <ArticleCard key={article.article_id} article={article} />
            ))}
          </div>
        </div>
        </div>
    </main>
  );
}

export default Home;
