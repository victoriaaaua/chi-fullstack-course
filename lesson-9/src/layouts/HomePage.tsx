import React, { useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import ControlBar from '../components/ControlBar';
import PostsList from '../components/posts/PostsList'

const HomePage: React.FC = () => {
  const [isSortedByDateDescending, setIsSortedByDateDescending] = useState(true);
  const [isShowMyPosts, setIsShowMyPosts] = useState<boolean>(false);

  const handleSort = () => {
    setIsSortedByDateDescending(!isSortedByDateDescending);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value === 'myPosts';
    setIsShowMyPosts(newValue);
  };

  return (
    <>
      <ControlBar handleSelectChange={handleSelectChange} isShowMyPosts={isShowMyPosts} handleSort={handleSort} />
      <PostsList isShowMyPosts={isShowMyPosts} isSortedByDateDescending={isSortedByDateDescending} />
    </>
  );
};

export default HomePage;

