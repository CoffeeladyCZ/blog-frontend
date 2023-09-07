import React from 'react';
import { DataGrid, GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { Article } from '../types/Articles';

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

const DataTable: React.FC<DataTablePropsType> = ({
  headerColumns,
  articles,
  loading
}: DataTablePropsType) => {
  const getRowId = (articles: any) => articles.articleId;
  return (
    <StyledDataGrid
      data-testid="dataTable"
      getRowId={getRowId}
      rows={articles}
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
