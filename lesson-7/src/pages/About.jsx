import React, { useContext } from 'react';
import { Typography, Box, Divider } from '@mui/material';
import { ThemeContext } from '../context/ThemeContext';

const About = () => {
  const { themeContext } = useContext(ThemeContext);

  return (
    <Box sx={{ mt: 4, color: themeContext.palette.text.paragraph, height:'100vh'}}>
      <Typography
        variant="h2"
        component="h1"
        sx={{ 
          fontSize: '2.5rem', 
          color: themeContext.palette.text.secondary,
          textAlign: 'center', 
          mb: 4 
        }}
      >
        About Rick and Morty
      </Typography>

      <Divider sx={{ mb: 3, backgroundColor: themeContext.palette.text.paragraph }} />


      <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 3 }}>
        <strong>Rick and Morty</strong> is an animated science fiction series that dives deep into the complexities of the multiverse, 
        blending wild humor with thought-provoking themes. Created by Justin Roiland and Dan Harmon, the show follows Rick Sanchez, 
        an eccentric, genius scientist with a penchant for reckless adventures, and his anxious yet loyal grandson, Morty Smith.
      </Typography>

      <Typography variant="h4" sx={{ fontSize: '1.5rem', mt: 3, mb: 2 }}>
        An Unconventional Duo
      </Typography>
      <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 3 }}>
        Rick is a self-destructive, morally ambiguous character, always dragging Morty along on interdimensional journeys, where they encounter 
        strange creatures, high-stakes conflicts, and ethically challenging dilemmas. Despite Morty's reservations, he often finds himself 
        entangled in Rick's chaotic experiments, with each episode uncovering new layers of their unconventional bond.
      </Typography>

      <Typography variant="h4" sx={{ fontSize: '1.5rem', mt: 3, mb: 2 }}>
        Themes and Popularity
      </Typography>
      <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 3 }}>
        <strong>Rick and Morty</strong> explores philosophical questions about existence, free will, and the consequences of boundless knowledge, 
        often in ways that challenge the viewer’s own beliefs. Its satirical take on science fiction, blending the absurd with profound observations, 
        has captivated audiences worldwide. With a devoted fan base and critical acclaim, <em>Rick and Morty</em> continues to be a cultural 
        touchstone, admired for its layered storytelling and inventive humor.
      </Typography>

      <Typography variant="h4" sx={{ fontSize: '1.5rem', mt: 3}}>
        The Legacy of Rick and Morty
      </Typography>
      <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
        The series has become more than a show; it's a phenomenon with a lasting impact on pop culture. As new seasons expand the series’ universe, 
        <strong>Rick and Morty</strong> remains at the forefront of animated television, consistently pushing the boundaries of storytelling 
        and animation.
      </Typography>
    </Box>

  );
};

export default About;