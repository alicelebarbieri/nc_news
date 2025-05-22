import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { deleteCommentById } from "../utils/api";

function CommentCard({ comment, setComments }) {
  const user = useContext(UserContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = () => {
    setIsDeleting(true);
    setError(null);

    deleteCommentById(comment.comment_id)
      .then(() => {
        setComments((currComments) =>
          currComments.filter((c) => c.comment_id !== comment.comment_id)
        );
      })
      .catch(() => {
        setError("❌ Failed to delete comment.");
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return (
    <div className="comment-card">
      <p><strong>{comment.author}</strong> commented:</p>
      <p>{comment.body}</p>
      <p>🗓️ {new Date(comment.created_at).toLocaleDateString()}</p>

      {comment.author === user && (
        <button onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "🗑️ Delete"}
        </button>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default CommentCard;