import React, { useState, useEffect, useContext, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { fetchCharacterById } from '../api/heroesApi';
import { useRequest } from 'ahooks';
import OutsideClick from './OutsideClick'; 

const ModalCharacter = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [character, setCharacter] = useState(null);
    const { themeContext } = useContext(ThemeContext);
    const modalRef = useRef(null); 

    const { loading, error, run } = useRequest(fetchCharacterById, {
        manual: true,
        onSuccess: (data) => {
            setCharacter(data.data);
        }
    });

    useEffect(() => {
        run(id);
    }, [id]);

    const handleClose = () => navigate('/heroes'); 

    return (
        <>
            <Box onClick={handleClose} sx={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 100
            }} />

            <Box ref={modalRef} sx={{
                position: 'fixed', top: 0, right: 0, width: '350px', height: '100vh',
                backgroundColor: themeContext.palette.hoverColor.main, padding: 2, pt: 10, zIndex: 101
            }}>
                <OutsideClick elementRef={modalRef} onClose={handleClose} />

                {loading && <Box>Loading...</Box>}
                {error && <Box>Error: {error.message}</Box>}
                {character ? (
                    <>
                        <Typography variant="h6" sx={{
                            color: themeContext.palette.text.primary, fontSize: '1.5rem',
                            textAlign: 'center', mt: 2, mb: 4, fontWeight: 'bold'
                        }}>
                            {character.name}
                        </Typography>
                        <Card>
                            <CardMedia component="img" alt={character.name} image={character.image} sx={{ borderRadius: '12px' }} />
                        </Card>
                        <Typography variant="body1" sx={{
                            color: themeContext.palette.text.primary, fontSize: '20px',
                            textAlign: 'center', mt: 4, mb: 4
                        }}>
                            {character.status}
                        </Typography>
                        <Box style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button onClick={handleClose} variant="contained" sx={{
                                color: themeContext.palette.text.paragraph,
                                backgroundColor: themeContext.palette.primary.main
                            }}>
                                Close
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Typography variant="body1">Character has not found</Typography>
                )}
            </Box>
        </>
    );
};

export default ModalCharacter;
