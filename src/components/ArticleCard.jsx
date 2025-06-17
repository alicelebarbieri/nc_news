import { Link } from "react-router-dom";
import "./ArticleCard.css"; 
import React from "react";

function ArticleCard({ article }) {
  return (
    <Link to={`/articles/${article.article_id}`}className="article-card">
      <img src={article.article_img_url} alt={article.title} className="article-img" />
      <div className="article-content">
        <h3>{article.title}</h3>
        <p>By {article.author} | 💬 {article.comment_count} | 👍 {article.votes}</p>
      </div>
    </Link>
  );
}

export default ArticleCard;


