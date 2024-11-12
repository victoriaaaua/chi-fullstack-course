import React, { useEffect, useState } from 'react';
import { fetchPosts, fetchMyPosts, deleteMyPost } from '../../api/exhibitActions';
import { Typography, Box } from '@mui/material';
import UserCard from './UserCard';
import { useRequest } from 'ahooks';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import PaginationComponent from '../PaginationСomponent';
import { usePage } from '../../contexts/PageContext';
import { useRefresh } from '../../contexts/RefreshPageContext';
import { Post } from '../../interfaces/Post';

const PostsList = ({ isSortedByDateDescending = true, isShowMyPosts = false }) => {
  const currentUserId = useSelector((state: RootState) => state.user.userId);
  const [posts, setPosts] = useState<Post[]>([]);
  const [lastPage, setLastPage] = useState(1);
  const limit = 10;
  const { currentPage, setCurrentPage } = usePage();
  const { change } = useRefresh();
  const { loading, error, run: fetchAllPosts } = useRequest(() =>
    (isShowMyPosts ? fetchMyPosts(currentPage, limit) : fetchPosts(currentPage, limit)),
    {
      manual: true,
      onSuccess: (data) => {
        const sortedData = data.data.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return isSortedByDateDescending ? dateB - dateA : dateA - dateB;
        });
        setPosts(sortedData);
        setLastPage(data.lastPage);
      },
      onError: (error) => {
        console.error('Error fetching posts:', error);
      },
    });

  useEffect(() => {
    fetchAllPosts();
  }, [currentPage, isShowMyPosts, isSortedByDateDescending, change]);  

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

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Box>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography>Error fetching posts.</Typography>}
      {posts.length > 0 ? (
        posts.map(post => (
          <Box
            key={`post-${post.id}`}
            sx={{
              border: '1px solid #ddd',
              borderRadius: 2,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              width: 600,
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto',
              mb: 6,
              mt: 6,
            }}
          >
            <UserCard
              isAuthor={currentUserId === post.user.id}
              exhibitId={post.id}
              imageUrl={post.imageUrl}
              description={post.description}
              user={post.user}
              createdAt={post.createdAt}
              commentCount={post.commentCount}
              deletePost={handleDelete}
            />
          </Box>
        ))
      ) : (
        <Typography variant="body1" color="textSecondary" align="center">
          No photos available
        </Typography>
      )}
      <PaginationComponent
        onPageChange={handlePageChange}
        page={currentPage}
        lastPage={lastPage}
      />
    </Box>
  );
};

export default PostsList;