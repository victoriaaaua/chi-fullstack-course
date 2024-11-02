import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

const Home = () => {
  const { themeContext } = useContext(ThemeContext);

  return (
    <Box sx={{ height: '100vh', p: 4 }}>
      <Typography 
        variant="h1" 
        component="h1"  
        sx={{ 
          color: themeContext.palette.text.secondary, 
          fontSize: '2.7rem',
          mb: 4,
          textAlign: 'center',
        }}
      >
        Rick and Morty
      </Typography>

      <Box sx={{ color: themeContext.palette.text.paragraph, mt: 2 }}>
        {[
          "Rick and Morty is an animated science fiction television series created by Justin Roiland and Dan Harmon. The show premiered on Adult Swim in December 2013 and has quickly gained a massive following for its unique blend of dark humor, existential themes, and complex storytelling.",
          "The series follows the misadventures of an eccentric and alcoholic scientist named Rick Sanchez and his good-hearted but easily influenced grandson, Morty Smith. Together, they embark on interdimensional adventures, exploring bizarre alien worlds, encountering strange creatures, and facing various moral dilemmas along the way.",
          "The show is known for its sharp wit, intricate plotlines, and philosophical undertones, often delving into themes like the nature of existence, free will, and the consequences of one's actions. Its distinct animation style, memorable characters, and thought-provoking narratives have made it a cultural phenomenon, leading to a dedicated fan base and critical acclaim.",
          "As of now, Rick and Morty continues to entertain audiences with its innovative storytelling and rich universe, making it one of the standout animated series of its generation."
        ].map((text, index) => (
          <Typography key={index} sx={{ mb: 2, fontSize: '20px' }}>
            {text}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default Home;