import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  return (
    <Link to={`/articles/${article.article_id}`}>
      <div className="article-card">
        <h3>{article.title}</h3>
        <p>By {article.author} | 💬 {article.comment_count} | 👍 {article.votes}</p>
      </div>
    </Link>
  );
}

export default ArticleCard;

  