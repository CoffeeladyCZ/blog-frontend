import React from 'react';
import { DataGrid, GridRowsProp, GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { Article } from '../model/Articles';

// type DataTableHeaderType = {
//   field: string;
//   headerName: string;
//   flex: number;
//   renderCell?: JSX.Element;
// };

type DataTablePropsType = {
  headerColumns: GridColDef<GridValidRowModel>[];
  articles: Article[];
};

const rows: GridRowsProp = [
  { id: 1, title: 'Tieldfefdcvjdvdv', perex: 'Snow ntofefeefe', author: 'Jon', comments: 3 },
  { id: 2, title: 'Something important', perex: 'Lannister', author: 'Cersei', comments: 42 },
  { id: 3, title: 'Other interesting think', parex: 'Lannister', author: 'Jaime', comments: 45 }
];

const StyledDataGrid = styled(DataGrid)`
  border: none;

  & .MuiDataGrid-columnHeaderTitle {
    font-weight: 600 !important;
`;

const DataTable: React.FC<DataTablePropsType> = ({
  headerColumns,
  articles
}: DataTablePropsType) => {
  return (
    <StyledDataGrid
      rows={articles}
      columns={headerColumns}
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
