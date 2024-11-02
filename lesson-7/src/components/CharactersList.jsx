import React, { useContext, memo} from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { ThemeContext } from '../context/ThemeContext';
import Box from '@mui/material/Box';

const CharactersList = memo(({ results, page, setPage, totalPages }) => {
  const { themeContext } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/heroes/${id}`);
  };

  const rows = results.map((character) => ({
    id: character.id,
    name: character.name,
    status: character.status,
  }));

  return (
    <Box sx={{ height: '70vh' }}>
      <DataGrid 
        sx={{
          '& .MuiDataGrid-row': {
            backgroundColor: themeContext.palette.background.paper,
            color: themeContext.palette.text.primary,
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: themeContext.palette.hoverColor.main,
          },
        }}
        rows={rows}
        columns={[
          { field: 'id', headerName: 'ID', width: 90 },
          { field: 'name', headerName: 'Name', width: 200 },
          { field: 'status', headerName: 'Status', width: 100 },
        ]}
        pageSize={20} 
        pagination
        paginationMode="server"

        rowCount={totalPages * 20} 
        paginationModel={{
          page: page - 1, 
          pageSize: 20, 
        }}
        onPaginationModelChange={(newModel) => {
          setPage(newModel.page + 1)
        }}
        
        onRowClick={(params) => handleRowClick(params.row.id)}
      />
    </Box>
  );
});

export default CharactersList;
