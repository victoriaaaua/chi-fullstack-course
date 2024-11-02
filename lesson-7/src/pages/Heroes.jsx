import React, { useContext, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Typography } from '@mui/material';
import { ThemeContext } from '../context/ThemeContext';
import Box from '@mui/material/Box';
import { useRequest } from 'ahooks';
import { fetchAllCharacters } from '../api/heroesApi';
import CharactersList from '../components/CharactersList';

const Heroes = () => {
  const { themeContext } = useContext(ThemeContext);
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { loading, error, run } = useRequest(fetchAllCharacters, {
    manual: true,
    onSuccess: (data) => {
        setCharacters(data.data.results);

        if (totalPages === 0) {
          setTotalPages(data.data.info.pages);
        }
      }
});

  useEffect(() => {
    run(page);
  }, [page]);

  return (
    <>
      <Typography
        variant="h1"
        component="h1"
        sx={{
          color: themeContext.palette.text.secondary,
          fontSize: '2.7rem',
          mt: 4,
          mb: 4,
          textAlign: 'center',
        }}
      >
        Character List
      </Typography>
      {loading && <Box sx={{ height: '100vh' }}>Loading...</Box>}
      {error && <Box sx={{ height: '100vh' }}>Error: {error.message}</Box>}
      {characters ? (
        <CharactersList
          results={characters}
          page={page}
          setPage={setPage} 
          totalPages={totalPages}
        />
      ): (
        <Typography variant="body1">Characters have not found</Typography>
    )}
      <Outlet />
    </>
  );
};

export default Heroes;
