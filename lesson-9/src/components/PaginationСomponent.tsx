import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

interface PaginationProps {
  lastPage: number; 
  page: number; 
  navigationPath: string
}

const PaginationComponent: React.FC<PaginationProps> = ({ lastPage, page, navigationPath }) => {
  const navigate = useNavigate();

  const handlePageChange = (event: React.ChangeEvent<unknown>, nextPage: number) => {
    navigate(`${navigationPath}${nextPage}`, {replace: true});
  }
  return (
    <Stack spacing={2} alignItems="center" sx={{ mt: 2 }}>
      <Pagination
        count={lastPage}
        page={page}
        onChange={handlePageChange}
        color="primary"
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
        sx={{
          '& .MuiPaginationItem-root': {
            backgroundColor: 'transparent', 
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)', 
            },
          },
          '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: 'primary.main', 
            color: 'white', 
            border: '1px solid', 
            borderColor: 'primary.main',
          },
        }}
      />
    </Stack>
  );
};

export default PaginationComponent;


