import React, { useState } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { Card, Grid, Button, TextField } from '@mui/material';
import { styled } from '@mui/material';
import { Send } from '@mui/icons-material';

import { RootState } from '../store/store';
import { StyledH4 } from '../styled/styled';
import { AlertType, CommentType, FormCommentType } from '../types/Articles';
import { createCommentData } from '../utils/apiUtils';

import Comment from './Comment';
import Loading from './Loading';
import Notification from './Notification';

type CommentsBoxPropsType = {
  comments: CommentType[];
  articleId: string;
};

const StyledCommentsCard = styled(Card)`
  box-shadow: none;
  border-top: 1px solid rgba(223, 223, 223, 1);
  margin: 16px;
`;

// mocked object for presentation purposes only
// TODO - Delete after implementing the functionality of adding comments
const mockedComment = [
  {
    commentId: 'jjjf211e-49c8-4ae2-bb7e-304508c7e67d',
    articleId: 'fd3f211e-49c8-4ae2-bb7e-304508c7e67d',
    author: 'Marcela',
    content:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phsellus et lorem id felis nonummy placerat. In enim a arcu imperdiet malesuada',
    postedAt: '2023-09-02T19:22:25.849298',
    score: 22
  },
  {
    commentId: 'ad4f211f-49c8-4ae2-bb7e-304508c7e67d',
    articleId: 'fe3f211e-49c8-4ae2-bb7e-304508c7e67d',
    author: 'Marcela',
    content:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phsellus et lorem id felis nonummy placerat. In enim a arcu imperdiet malesuada',
    postedAt: '2023-09-10T16:22:25.849298',
    score: 23
  }
];

const CommentsBox: React.FC<CommentsBoxPropsType> = ({ comments, articleId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertType>({ message: '', severity: 'success', show: false });
  const commentsNumber = mockedComment.length;

  const login = useSelector((state: RootState) => state.login.login);

  comments = mockedComment; // TODO - Delete after implementing the functionality of adding comments

  const sortedComments = comments.sort((a, b) => {
    const dateA = new Date(a.postedAt).getTime();
    const dateB = new Date(b.postedAt).getTime();
    return dateB - dateA;
  });

  const methods = useForm<FormCommentType>({
    mode: 'onChange'
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = methods;

  const onSubmit = async (data: FormCommentType) => {
    setIsLoading(true);
    await createComment(data);
  };

  const createComment = async (data: FormCommentType) => {
    const responseData = {
      content: data.content,
      articleId: articleId,
      author: data.author
    };

    setIsLoading(true);
    try {
      const response = await createCommentData(responseData);
      if (response.success) {
        setAlert({
          message: 'Comment has been successfully saved.',
          severity: 'success',
          show: true
        });
        reset();
      } else if (response.error) {
        console.log(response);
        setAlert({
          message: response.error.response.data.message,
          severity: 'error',
          show: true
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;

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
      <StyledCommentsCard>
        <StyledH4>Comments ({commentsNumber})</StyledH4>
        {login && (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item sm={3}>
                  <Controller
                    control={control}
                    name="author"
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => {
                      return (
                        <TextField
                          label="Author"
                          error={Boolean(errors.author)}
                          helperText={errors.author ? 'Item is required' : ''}
                          id="content"
                          size="small"
                          fullWidth
                          {...field}
                        />
                      );
                    }}
                  />
                </Grid>
                <Grid item sm={7}>
                  <Controller
                    control={control}
                    name="content"
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => {
                      return (
                        <TextField
                          error={Boolean(errors.content)}
                          helperText={errors.content ? 'Item is required' : ''}
                          id="content"
                          placeholder="Join the discussion"
                          size="small"
                          fullWidth
                          {...field}
                        />
                      );
                    }}
                  />
                </Grid>
                <Grid item lg={2}>
                  <Button variant="contained" endIcon={<Send />} type="submit">
                    Send
                  </Button>
                </Grid>
              </Grid>
            </form>
          </FormProvider>
        )}
        {sortedComments &&
          sortedComments.map((comment) => {
            return <Comment key={comment.commentId} comment={comment} />;
          })}
      </StyledCommentsCard>
    </>
  );
};

export default CommentsBox;
