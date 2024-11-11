import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PaginationProps {
  lastPage: number; 
  page: number; 
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void; 
}

const PaginationComponent: React.FC<PaginationProps> = ({ lastPage, page, onPageChange }) => {
  return (
    <Stack spacing={2} alignItems="center" sx={{ mt: 2 }}>
      <Pagination
        count={lastPage}
        page={page}
        onChange={onPageChange}
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


