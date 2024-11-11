import React from 'react';
import Box from '@mui/material/Box';
import ControlBar from '../components/ControlBar';
import PostsList from '../components/posts/PostsList';

const StripePage: React.FC = () => {

  return (
    <Box sx={{ flexGrow: 1, m: 0, p: 0 }}>
      <ControlBar />
      <PostsList  /> 
    </Box>
  );
};

export default StripePage;
