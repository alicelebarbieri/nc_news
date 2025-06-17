import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticlesByTopic } from "../utils/api";
import ArticleCard from "../components/ArticleCard";
import { Link} from "react-router-dom";
import { useSearchParams } from "react";


function TopicArticles() {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getArticlesByTopic(topic)
      .then(({ data }) => {
        setArticles(data.articles);
        setError(null);
      })
      .catch(() => {
        setError("Topic not found");;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [topic]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <main>
        <h2>Articles on "{topic}"</h2>
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </main>
      <Link to="/">← Back to All Topics</Link>
    </>
  );
}

export default TopicArticles;