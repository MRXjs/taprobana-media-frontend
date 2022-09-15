import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

export const getComments = () => API.get(`/comment/get`);

export const createComment = (data) => API.post(`/comment/create`, data);

export const deleteCommentApi = (id) => {
  API.delete(`/comment/delete/${id}`);
};

export const updateCommentApi = (id, data) => {
  API.put(`/comment/update/${id}`, data);
};
