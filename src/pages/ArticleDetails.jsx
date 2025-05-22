import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticleId  } from "../utils/api";
import CommentCard from "../components/CommentCard";
import CommentForm from "../components/CommentForm";
import { patchArticleVotes } from "../utils/api";




function ArticleDetails() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [voteChange, setVoteChange] = useState(0);
  const [error, setError] = useState(null);


 

  useEffect(() => {
    getCommentsByArticleId(article_id)
      .then(({ data }) => {
        setComments(data.comments);
      })
      .catch((err) => {
        console.error("Error fetching comments:", err);
      });
  }, [article_id]);

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

  const handleVote = (amount) => {
    setVoteChange((curr) => curr + amount); 
    setError(null);
  
    patchArticleVotes(article_id, amount).catch(() => {
      setVoteChange((curr) => curr - amount); 
      setError("Failed to update vote. Try again.");
    });
  };
  
  
  
  return (
    <>
      <article>
        <h2>{article.title}</h2>
        <p>
          By {article.author} | Topic: {article.topic} | 🗓 {new Date(article.created_at).toLocaleDateString()}
        </p>
        <p>{article.body}</p>
        <p>👍 {article.votes + voteChange} votes</p>
        <div>
            <button onClick={() => handleVote(1)}>⬆️ Upvote</button>
            <button onClick={() => handleVote(-1)}>⬇️ Downvote</button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}

      </article>
        <CommentForm article_id={article_id} setComments={setComments} />
      <section>
        <h3>Comments</h3>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <CommentCard key={comment.comment_id} comment={comment} />
          ))
        )}
      </section>
    </>
  );
}

export default ArticleDetails;
