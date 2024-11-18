import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box,  Typography } from '@mui/material';
import PaginationComponent from '../components/PaginationСomponent';
import UserCard from '../components/posts/UserCard';
import { useRequest } from 'ahooks';
import { fetchPosts, fetchMyPosts, deleteMyPost } from '../api/exhibitActions';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useRefresh } from '../contexts/RefreshPageContext';
import { useControlBar } from '../contexts/ControlBarContext';

const HomePage: React.FC = () => {
  const { isSortedByDateDescending, isShowMyPosts } = useControlBar();
  const currentUserId = useSelector((state: RootState) => state.user.userId);
  const { change } = useRefresh();

  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') || '1');
  const limit = 10;

  const { data, loading, error, run: fetchAllPosts } = useRequest(
    () =>
      isShowMyPosts
        ? fetchMyPosts(currentPage, limit)
        : fetchPosts(currentPage, limit),
    {
      refreshDeps: [currentPage, isShowMyPosts, isSortedByDateDescending, change],

      onSuccess: (data) => {
        data.data.sort((a: any, b: any) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return isSortedByDateDescending ? dateB - dateA : dateA - dateB;
        });
      }

    }
  );

  const { run: deletePostRequest } = useRequest(deleteMyPost, {
    manual: true,
    onSuccess: () => {
      fetchAllPosts();
    },
    onError: (err) => {
      console.error('Error deleting post:', err);
    },
  });

  const handleDelete = (postId: number) => {
    deletePostRequest(postId);
  };


  return (
    <Box sx={{ flexGrow: 1, m: 0, p: 0 }}>

      {loading && !data?.data.length ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography>Error: {error.message}</Typography>
      ) : (
        <>
          <PaginationComponent navigationPath="/home/?page=" lastPage={data.lastPage} page={+currentPage} />
          {data?.data.map((post: any) => (
            <UserCard key={post.id} isAuthor={currentUserId === post.user.id} deletePost={handleDelete} {...post} />
          ))}
           <PaginationComponent navigationPath="/home/?page=" lastPage={data.lastPage} page={+currentPage} />
        </>
      )}
    </Box>
  );
};

export default HomePage;
