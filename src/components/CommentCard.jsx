function CommentCard({ comment }) {
    return (
      <div className="comment-card">
        <p><strong>{comment.author}</strong> commented:</p>
        <p>{comment.body}</p>
        <p>🗓️ {new Date(comment.created_at).toLocaleDateString()}</p>
      </div>
    );
  }
  
  export default CommentCard;
  