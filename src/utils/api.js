import axios from "axios";

const API = axios.create({
  baseURL: "https://aliceleblog-api.onrender.com/api",
});

export const getArticles = (params = {}) => {
  return API.get("/articles", { params });
};

export const getArticleById = (id) => {
  return API.get(`/articles/${id}`);
};
export const getCommentsByArticleId = (article_id) => {
    return API.get(`/articles/${article_id}/comments`);
};
export const postComment = (article_id, comment) => {
    return API.post(`/articles/${article_id}/comments`, comment);
};
  
export const patchArticleVotes = (article_id, vote) => {
    return API.patch(`/articles/${article_id}`, { inc_votes: vote });
};
export const deleteCommentById = (comment_id) => {
    return API.delete(`/comments/${comment_id}`);
}; 
export const getArticlesByTopic = (topic, params = {}) => {
    return API.get(`/articles?topic=${topic}`, { params });
};