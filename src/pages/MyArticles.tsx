/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setArticles } from '../store/article';

import { Box, Typography, Button, Grid, IconButton, SvgIcon } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactComponent as DeleteIcon } from '../assets/deleteIcon.svg';
import { ReactComponent as EditIcon } from '../assets/editIcon.svg';

import DataTable from '../components/DataTable';
import { StyledHeadline1 } from '../styled/styled';

const StyledBox = styled(Box)`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const StyledGrid = styled(Grid)`
  max-width: 1152px;
  padding: 0 24px;
`;

const MyArticles: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const articles = useSelector((state: RootState) => state.article.articles);

  const config = {
    headers: {
      'X-API-KEY': 'd4234190-5f6b-4d51-b3f3-80cc4810d0b7'
      // Autorization: `Bearer ${Cookies.get('token')}`
    }
  };

  /** Get articles from API */
  const getArticles = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`https://fullstack.exercise.applifting.cz/articles`, config);
      console.log('data', response);
      const data = await response.data.items;
      dispatch(setArticles(data));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Article title', flex: 1 },
    { field: 'perex', headerName: 'Perex', flex: 1 },
    { field: 'author', headerName: 'Author', flex: 1 },
    { field: 'comments', headerName: '# of comments', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton aria-label="Edit" onClick={() => handleEdit(params.row.articleId)}>
            <NavLink to={`/article/edit/${params.row.articleId}`}>
              <SvgIcon>
                <EditIcon />
              </SvgIcon>
            </NavLink>
          </IconButton>
          <IconButton aria-label="Delete" onClick={() => handleCancel(params.row.articleId)}>
            <SvgIcon>
              <DeleteIcon />
            </SvgIcon>
          </IconButton>
        </>
      )
    }
  ];
  /** Edits current article */
  const handleEdit = (id: number) => {
    console.log(`Edit record with ID ${id}`);
  };
  /** */
  const handleCancel = (id: number) => {
    console.log(`Delete record with ID ${id}`);
  };

  return (
    <StyledBox>
      <StyledGrid container rowSpacing={3}>
        <Grid item xs={2}>
          <StyledHeadline1 variant="h1">My articles</StyledHeadline1>
        </Grid>

        <Grid item xs={6}>
          <NavLink to={'/article/new'}>
            <Button variant="contained">New article</Button>
          </NavLink>
        </Grid>

        <Grid item xs={9}>
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
