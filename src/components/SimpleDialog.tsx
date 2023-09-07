import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { DialogDataType } from '../model/Articles';

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
  return (
    <Dialog open={isOpenDialog} onClose={closeDialog}>
      <StyledDialogTitle>Delete article</StyledDialogTitle>
      <DialogContent>
        <DialogContentText>
          You are about to delete an article {dialogData.title}. Do you really want to continue?
          action is irreversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button variant="contained" onClick={() => deleteArticle(dialogData.articleId)}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleDialog;
