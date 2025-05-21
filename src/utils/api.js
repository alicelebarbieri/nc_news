import axios from "axios";

const API = axios.create({
  baseURL: "https://be-nc-news-example-46vu.onrender.com/api",
});

export const getArticles = () => {
  return API.get("/articles");
};

export const getArticleById = (id) => {
  return API.get(`/articles/${id}`);
};
export const getCommentsByArticleId = (article_id) => {
    return API.get(`/articles/${article_id}/comments`);
};
  
export const patchArticleVotes = (article_id, vote) => {
    return API.patch(`/articles/${article_id}`, { inc_votes: vote });
};
  