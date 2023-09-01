/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../store/store';
import { setListArticles } from '../store/article';
import { httpDelete } from '../utils/axiosService';

import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  IconButton,
  SvgIcon
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { ReactComponent as DeleteIcon } from '../assets/deleteIcon.svg';
import { ReactComponent as EditIcon } from '../assets/editIcon.svg';

import DataTable from '../components/DataTable';
import { StyledH1, StyledButtonGrid } from '../styled/styled';
import { getListArticles } from '../utils/apiUtils';

const StyledBox = styled(Box)`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const StyledGrid = styled(Grid)`
  max-width: 1152px;
  padding: 0 48px;
`;

const StyledDialogTitle = styled(DialogTitle)`
  background-color: #4dabf5;
  color: #ffffff;
  margin-bottom: 20px;
`;

const MyArticles: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const dispatch = useDispatch();
  const articles = useSelector((state: RootState) => state.article.listArticles);

  const closeDialog = () => {
    setIsOpenDialog(false);
  };

  const fetchListArticles = async () => {
    setIsLoading(true);
    try {
      const data = await getListArticles();
      if (data) {
        return dispatch(setListArticles(data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListArticles();
  }, []);

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Article title', flex: 1 },
    { field: 'perex', headerName: 'Perex', flex: 2 },
    { field: 'author', headerName: 'Author', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton aria-label="Edit">
            <Link to={`/article/edit/${params.row.articleId}`}>
              <SvgIcon>
                <EditIcon />
              </SvgIcon>
            </Link>
          </IconButton>
          <IconButton aria-label="Delete" onClick={() => setIsOpenDialog(true)}>
            <SvgIcon>
              <DeleteIcon />
            </SvgIcon>
          </IconButton>
          <Dialog open={isOpenDialog} onClose={closeDialog}>
            <StyledDialogTitle>Delete article</StyledDialogTitle>
            <DialogContent>
              <DialogContentText>
                <p>You are about to delete an article {params.row.title}.</p>
                <p>Do you really want to continue? The action is irreversible.</p>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsOpenDialog(false)}>Cancel</Button>
              <Button variant="contained" onClick={() => deleteArticle(params.row.articleId)}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )
    }
  ];

  const deleteArticle = async (id: number) => {
    setIsLoading(true);
    try {
      await httpDelete(`/articles/${id}`);
      setIsOpenDialog(false);
      await fetchListArticles();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledBox>
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
          {!articles.length ? (
            <Typography variant="body1">Nejsou k dispozici žádná data.</Typography>
          ) : (
            <DataTable headerColumns={columns} articles={articles} loading={isLoading} />
          )}
        </Grid>
      </StyledGrid>
    </StyledBox>
  );
};

export default MyArticles;
