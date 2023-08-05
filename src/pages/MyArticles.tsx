/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// import { useGetArticles } from '../hooks/useGetArticles';
// import { useQuery } from '@tanstack/react-query';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { Article } from '../model/Articles';
// import { request } from '../utils/axiosClient';
import Cookies from 'js-cookie';
import axios from 'axios';

import { Box, Typography, Button, Grid, IconButton, SvgIcon } from '@mui/material';
import { styled } from '@mui/material/styles';

import { ReactComponent as DeleteIcon } from '../assets/deleteIcon.svg';
import { ReactComponent as EditIcon } from '../assets/editIcon.svg';
import LoadingPage from '../components/Loading';
import DataTable from '../components/DataTable';

const StyledTypography = styled(Typography)`
  font-size: 32px;
`;

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
  const [listArticles, setListArticles] = useState<Article[]>([]);
  // const { data: articles, isLoading, isError } = useGetArticles();

  const config = {
    headers: {
      'X-API-KEY': 'd4234190-5f6b-4d51-b3f3-80cc4810d0b7',
      Validation: Cookies.get('token')
    }
  };

  /** Get articles from API */
  const getArticles = async (): Promise<Article> => {
    console.log('fetch');
    const { data } = await axios.get(`https://fullstack.exercise.applifting.cz/articles`, config);
    console.log('data', data);
    return data;
  };

  // const { isError, isSuccess, isLoading, data, error } = useQuery({
  //   queryKey: ['articles'],
  //   queryFn: getArticles
  // });

  // const articles = data;
  // console.log('articles', articles);

  // if (isLoading) {
  //   return <LoadingPage />;
  // }

  // if (isError) {
  //   console.log('error', error);
  // }

  useEffect(() => {
    console.log('mounted');
    getArticles();
  }, [setListArticles]);

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
          <IconButton aria-label="Edit" onClick={() => handleEdit(params.row.id)}>
            <SvgIcon>
              <EditIcon />
            </SvgIcon>
          </IconButton>
          <IconButton aria-label="Delete" onClick={() => handleCancel(params.row.id)}>
            <SvgIcon>
              <DeleteIcon />
            </SvgIcon>
          </IconButton>
        </>
      )
    }
  ];

  const handleEdit = (id: number) => {
    console.log(`Edit record with ID ${id}`);
  };

  const handleCancel = (id: number) => {
    console.log(`Delete record with ID ${id}`);
  };

  return (
    <StyledBox>
      <StyledGrid container rowSpacing={3}>
        <Grid item xs={2}>
          <StyledTypography variant="h1">My articles</StyledTypography>
        </Grid>

        <Grid item xs={6}>
          <NavLink to={'/article/new'}>
            <Button variant="contained">New article</Button>
          </NavLink>
        </Grid>

        <Grid item xs={9}>
          {!listArticles ? (
            <Typography variant="body1">Nejsou k dispozici žádná data.</Typography>
          ) : (
            <DataTable headerColumns={columns} articles={listArticles} />
          )}
        </Grid>
      </StyledGrid>
    </StyledBox>
  );
};

export default MyArticles;
