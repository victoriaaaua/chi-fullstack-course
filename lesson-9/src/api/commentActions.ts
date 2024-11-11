import axiosInstance from '../api/axiosInstance';
import { Comment } from '../interfaces/Comment';

export const fetchAllComments = async (exhibitId: number): Promise<{data: Comment[]}> => {
  return axiosInstance.get(`api/exhibits/${exhibitId}/comments`);
}

export const addMyComment = async (exhibitId: number, text: string): Promise<Comment> => {
  return axiosInstance.post(`api/exhibits/${exhibitId}/comments`, { text });
}

export const deleteMyComment = async (exhibitId: number, commentId: number): Promise<any> => {
  return axiosInstance.delete(`api/exhibits/${exhibitId}/comments/${commentId}`);
}