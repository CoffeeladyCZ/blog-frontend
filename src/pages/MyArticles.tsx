/// <reference types="vite-plugin-svgr/client" />

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { RootState } from '../store/store';
import { setArticleList } from '../store/article';
import { StyledBox } from '../styled/styled';

import { Button, Grid, IconButton, SvgIcon } from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '../assets/deleteIcon.svg?react';
import EditIcon from '../assets/editIcon.svg?react';

import { StyledH1, StyledButtonGrid } from '../styled/styled';
import { DialogDataType } from '../types/Articles';
import { useArticle } from '../hooks/useArticle';

import DataTable from '../components/DataTable';
import SimpleDialog from '../components/SimpleDialog';
import Notification from '../components/Notification';

const StyledGrid = styled(Grid)`
  max-width: 1152px;
`;

const MyArticles: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [dialogData, setDialogData] = useState<DialogDataType>({
    title: '',
    article_id: '',
    image_id: ''
  });
  const [alert, setAlert] = useState<{
    show: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  }>({ show: false, message: '', severity: 'success' });

  const dispatch = useDispatch();
  const articles = useSelector((state: RootState) => state.articleList.articleList);
  const { t } = useTranslation();
  const { getArticleList, deleteArticle } = useArticle();

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

  const handleDeleteArticle = async (articleId: string, imageId: string) => {
    setIsLoading(true);
    try {
      await deleteArticle(articleId, imageId);
      setIsOpenDialog(false);
      await fetchArticleList();
    } catch (error) {
      setAlert({ show: true, message: String(error), severity: 'error' });
    } finally {
      setIsLoading(false);
      setAlert({ show: true, message: 'Článek byl úspěšné smazán', severity: 'success' });
    }
  };

  useEffect(() => {
    fetchArticleList();
  }, []);

  const columns: GridColDef[] = [
    { field: 'title', headerName: t('table.articleTitle'), flex: 1 },
    { field: 'perex', headerName: t('table.perex'), flex: 2 },
    { field: 'author', headerName: t('table.author'), flex: 1 },
    {
      field: 'lastUpdatedAt',
      headerName: t('table.lastUpdate'),
      sortingOrder: ['desc', 'asc', null],
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <>{dayjs(params.row.lastUpdatedAt).format('DD/MM/YY')}</>
      )
    },
    {
      field: 'actions',
      headerName: t('table.actions'),
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
              deleteArticle={() => handleDeleteArticle(dialogData.article_id, dialogData.image_id)}
            />
          )}
        </>
      )
    }
  ];

  return (
    <>
      {alert && (
        <Notification
          severity={alert.severity}
          message={alert.message}
          open={alert.show}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
      <StyledBox data-testid="box_myArticles">
        <StyledGrid container rowSpacing={3}>
          <Grid container justifyContent="space-between" spacing={0}>
            <Grid item xs={12} sm="auto">
              <StyledH1 variant="h1">{t('myArticles')}</StyledH1>
            </Grid>
            <StyledButtonGrid item xs={12} sm={3}>
              <Link to={'/article/new'}>
                <Button variant="contained">{t('newArticle')}</Button>
              </Link>
            </StyledButtonGrid>
          </Grid>
          <Grid item xs={12}>
            <DataTable headerColumns={columns} articles={articles} loading={isLoading} />
          </Grid>
        </StyledGrid>
      </StyledBox>
    </>
  );
};

export default MyArticles;
