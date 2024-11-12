import axiosInstance from '../api/axiosInstance';

export const fetchPosts = async (page: number, limit: number): Promise<any> => {
  try {
    const resp = await axiosInstance.get(`api/exhibits`, {
      params: {
        page,
        limit
      }
    });
    return resp.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};


export const fetchMyPosts = async (page: number, limit: number): Promise<any> => {
  try {
    const resp = await axiosInstance.get(`api/exhibits/my-posts`, {
      params: {
        page,
        limit
      }
    });
    return resp.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const fetchPostById = async (id: number): Promise<any> => {
  const resp = await axiosInstance.get(`api/exhibits/post/${id}`);
  return resp.data;
};

export const addPost = (formData: FormData): Promise<any> => {
  return axiosInstance.post('api/exhibits', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

};

export const deleteMyPost = async (id: number): Promise<any> => {
  return axiosInstance.delete(`api/exhibits/${id}`);
};



