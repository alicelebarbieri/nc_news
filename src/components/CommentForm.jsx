import { useState } from "react";
import { postComment } from "../utils/api";

function CommentForm({ article_id, setComments }) {
  const [username, setUsername] = useState(""); 
  const [body, setBody] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !body) {
      setError("Please fill in all fields.");
      return;
    }

    setIsPosting(true);
    setError(null);

    postComment(article_id, { username, body })
      .then(({ data }) => {
        setComments((curr) => [data.comment, ...curr]); 
        setBody("");
        setUsername("");
      })
      .catch(() => {
        setError("Failed to post comment.");
      })
      .finally(() => {
        setIsPosting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Leave a comment</h4>
      <input
        type="text"
        placeholder="Your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isPosting}
      />
      <br />
      <textarea
        placeholder="Your comment"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        disabled={isPosting}
      />
      <br />
      <button type="submit" disabled={isPosting}>
        {isPosting ? "Posting..." : "Submit"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default CommentForm;
