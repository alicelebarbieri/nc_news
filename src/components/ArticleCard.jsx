function ArticleCard({ article }) {
    return (
      <div className="article-card">
        <h2>{article.title}</h2>
        <p>
          🧑 {article.author} | 🏷️ {article.topic} | 💬 {article.comment_count} | 👍 {article.votes}
        </p>
        <p>{new Date(article.created_at).toLocaleDateString()}</p>
      </div>
    );
  }
  
  export default ArticleCard;
  