import React from 'react';

import { Card } from '@mui/material';
import { styled } from '@mui/material';

import { StyledH4 } from '../styled/styled';
import { CommentType } from '../types/Articles';

import Comment from './Comment';

type CommentsBoxPropsType = {
  comments: CommentType[];
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

const CommentsBox: React.FC<CommentsBoxPropsType> = ({ comments }) => {
  const commentsNumber = mockedComment.length;

  comments = mockedComment; // TODO - Delete after implementing the functionality of adding comments

  const sortedComments = comments.sort((a, b) => {
    const dateA = new Date(a.postedAt).getTime();
    const dateB = new Date(b.postedAt).getTime();
    return dateB - dateA;
  });

  return (
    <>
      <StyledCommentsCard>
        <StyledH4>Comments ({commentsNumber})</StyledH4>
        {sortedComments &&
          sortedComments.map((comment) => {
            return <Comment key={comment.commentId} comment={comment} />;
          })}
      </StyledCommentsCard>
    </>
  );
};

export default CommentsBox;
