import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { DialogDataType } from '../types/Articles';

type DialogPropsType = {
  isOpenDialog: boolean;
  closeDialog: () => void;
  dialogData: DialogDataType;
  deleteArticle: (articleId: number) => void;
};

const StyledDialogTitle = styled(DialogTitle)`
  background-color: #4dabf5;
  color: #ffffff;
  margin-bottom: 20px;
`;

const SimpleDialog: React.FC<DialogPropsType> = ({
  isOpenDialog,
  closeDialog,
  dialogData,
  deleteArticle
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpenDialog} onClose={closeDialog}>
      <StyledDialogTitle>{t('deleteArticle')}</StyledDialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('dialog.deleteArticle', { title: dialogData.title })}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>{t('cancel')}</Button>
        <Button variant="contained" onClick={() => deleteArticle(dialogData.articleId)}>
          {t('delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleDialog;
