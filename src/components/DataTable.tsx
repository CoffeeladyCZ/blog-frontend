import React from 'react';

import { DataGrid, GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';

import { ArticleType } from '../types/Articles';

import LinearLoading from './LinearLoading';

type DataTablePropsType = {
  headerColumns: GridColDef<GridValidRowModel>[];
  articles: ArticleType[];
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

  const CustomNoRowsOverlays = () => {
    return <div>No data found.</div>;
  };

  const CustomLoading = () => {
    return <LinearLoading loading={loading} />;
  };

  return (
    <StyledDataGrid
      data-testid="dataTable"
      getRowId={getRowId}
      rows={articles}
      columns={headerColumns}
      loading={loading}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 }
        },
        sorting: {
          sortModel: [{ field: 'lastUpdatedAt', sort: 'desc' }]
        }
      }}
      slots={{
        loadingOverlay: CustomLoading,
        noRowsOverlay: CustomNoRowsOverlays
      }}
      pageSizeOptions={[10, 25, 50]}
      checkboxSelection
    />
  );
};

export default DataTable;
