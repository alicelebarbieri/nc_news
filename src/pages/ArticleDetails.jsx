import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../utils/api";

function ArticleDetails() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    getArticleById(article_id)
      .then(({ data }) => {
        setArticle(data.article);
      })
      .catch((err) => {
        console.error("Error fetching article:", err);
      });
  }, [article_id]);

  if (!article) return <p>Loading article...</p>;

  return (
    <article>
      <h2>{article.title}</h2>
      <p>
        By {article.author} | Topic: {article.topic} | 🗓 {new Date(article.created_at).toLocaleDateString()}
      </p>
      <p>{article.body}</p>
      <p>👍 {article.votes} votes</p>
    </article>
  );
}

export default ArticleDetails;
