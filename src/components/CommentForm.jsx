import { useState, useContext } from "react";
import { postComment } from "../utils/api";
import UserContext from "../context/UserContext";


function CommentForm({ article_id, setComments }) {
  const username = useContext(UserContext);
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
      if (data.comment) {
        setComments((curr) => [data.comment, ...curr]);
        setBody("");
        setError(null);
      } else {
        setError("Failed to post comment.");
      }
    })
    .catch((err) => {
      console.error("Post failed:", err);
      setError("Failed to post comment.");
    })
    .finally(() => {
      setIsPosting(false);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4>Leave a comment</h4>
      
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
