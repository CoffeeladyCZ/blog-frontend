import React from 'react';
import { DataGrid, GridRowsProp, GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { Article } from '../model/Articles';

type DataTablePropsType = {
  headerColumns: GridColDef<GridValidRowModel>[];
  articles: Article[];
  loading: boolean;
};

const StyledDataGrid = styled(DataGrid)`
  border: none;

  & .MuiDataGrid-columnHeaderTitle {
    font-weight: 600 !important;
`;

const rows: GridRowsProp = [
  { id: 1, title: 'Tieldfefdcvjdvdv', perex: 'Snow ntofefeefe', author: 'Jon', comments: 3 },
  { id: 2, title: 'Something important', perex: 'Lannister', author: 'Cersei', comments: 42 },
  { id: 3, title: 'Other interesting think', parex: 'Lannister', author: 'Jaime', comments: 45 }
];

const DataTable: React.FC<DataTablePropsType> = ({
  headerColumns,
  articles,
  loading
}: DataTablePropsType) => {
  return (
    <StyledDataGrid
      rows={rows}
      columns={headerColumns}
      loading={loading}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 }
        }
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
    />
  );
};

export default DataTable;
