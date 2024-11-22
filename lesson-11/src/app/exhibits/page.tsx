import React from 'react';
import { fetchPosts } from '@/api/exhibitActions';
import { Typography } from '@mui/material';
import StripePosts from '@/components/StripePosts';


const StripePage: React.FC <{searchParams: {page: string}}> = async ({searchParams}) => {
  const page = parseInt(searchParams.page || '1');
  const limit = 10;
  try {
    const data = await fetchPosts(page, limit);
    console.log(data.data);
    console.log(data.lastPage);
    return  <StripePosts {...data} />
  } catch(error) {
    console.error("error: ", error);
    return <Typography>Error</Typography>
  }

};

export default StripePage;

