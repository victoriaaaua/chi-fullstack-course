import React from 'react';
import Box from '@mui/material/Box';
import { useSearchParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { fetchPosts } from '../api/exhibitActions';
import { Typography } from '@mui/material';
import StripePosts from './StripePosts';

const StripePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1');
  const limit = 10;
  const { data, error, loading } = useRequest(
    () => fetchPosts(currentPage, limit),
    { refreshDeps: [currentPage] }
  );
  return (
    <Box sx={{ flexGrow: 1, m: 0, p: 0 }}>
      {loading && !data?.data.length ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography>Error: {error.message}</Typography>
      ) : (
        <StripePosts {...data} />
      )}
    </Box>
  );
};

export default StripePage;
