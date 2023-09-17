import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';

import { RootState } from '../store/store';
import { setArticleList } from '../store/article';
import { httpDelete } from '../utils/axiosService';
import { StyledBox } from '../styled/styled';

import { Typography, Button, Grid, IconButton, SvgIcon } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactComponent as DeleteIcon } from '../assets/deleteIcon.svg';
import { ReactComponent as EditIcon } from '../assets/editIcon.svg';

import { StyledH1, StyledButtonGrid } from '../styled/styled';
import { getArticleList } from '../utils/apiUtils';
import { DialogDataType } from '../types/Articles';

import DataTable from '../components/DataTable';
import SimpleDialog from '../components/SimpleDialog';

const StyledGrid = styled(Grid)`
  max-width: 1152px;
  padding: 0 48px;
`;

const MyArticles: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [dialogData, setDialogData] = useState<DialogDataType>({ title: '', articleId: 0 });

  const dispatch = useDispatch();
  const articles = useSelector((state: RootState) => state.articleList.articleList);

  const openDialog = (data: DialogDataType) => {
    setDialogData(data);
    setIsOpenDialog(true);
  };

  const closeDialog = () => {
    setIsOpenDialog(false);
  };

  const fetchArticleList = async () => {
    setIsLoading(true);
    try {
      const data = await getArticleList();
      if (data) {
        return dispatch(setArticleList(data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteArticle = async (id: number) => {
    setIsLoading(true);
    try {
      await httpDelete(`/articles/${id}`);
      setIsOpenDialog(false);
      await fetchArticleList();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticleList();
  }, []);

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Article title', flex: 1 },
    { field: 'perex', headerName: 'Perex', flex: 2 },
    { field: 'author', headerName: 'Author', flex: 1 },
    {
      field: 'lastUpdatedAt',
      headerName: 'Last update date',
      sortingOrder: ['desc', 'asc', null],
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <>{dayjs(params.row.lastUpdatedAt).format('DD/MM/YY')}</>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton aria-label="Edit" data-testid="buttonEdit">
            <Link to={`/article/edit/${params.row.articleId}`}>
              <SvgIcon>
                <EditIcon />
              </SvgIcon>
            </Link>
          </IconButton>
          <IconButton
            aria-label="Delete"
            data-testid="buttonDelete"
            onClick={() => {
              openDialog(params.row);
            }}>
            <SvgIcon>
              <DeleteIcon />
            </SvgIcon>
          </IconButton>
          {isOpenDialog && (
            <SimpleDialog
              isOpenDialog={isOpenDialog}
              closeDialog={closeDialog}
              dialogData={dialogData}
              deleteArticle={deleteArticle}
            />
          )}
        </>
      )
    }
  ];

  return (
    <StyledBox data-testid="box_myArticles">
      <StyledGrid container rowSpacing={3}>
        <Grid container justifyContent="space-between" spacing={0}>
          <Grid item xs={12} sm="auto">
            <StyledH1 variant="h1">My articles</StyledH1>
          </Grid>
          <StyledButtonGrid item xs={12} sm={3}>
            <Link to={'/article/new'}>
              <Button variant="contained">New article</Button>
            </Link>
          </StyledButtonGrid>
        </Grid>
        <Grid item xs={12}>
          <DataTable headerColumns={columns} articles={articles} loading={isLoading} />
        </Grid>
      </StyledGrid>
    </StyledBox>
  );
};

export default MyArticles;
