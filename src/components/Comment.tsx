import React from 'react';

import { Avatar, Card, CardContent, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import { StyledSmallLightText, StyledSmallText, StyledBodyBoldText } from '../styled/styled';
import { CommentType } from '../types/Articles';

type CommentPropsType = {
  comment: CommentType;
};

const StyledAuthorRow = styled(Grid)`
  display: flex;
`;

const StyledAvatar = styled(Avatar)`
  margin: 0 16px;
`;

const Comment: React.FC<CommentPropsType> = ({ comment }) => {
  const formatTimeAgo = () => {
    const now = new Date();
    const postedAt = new Date(comment.postedAt);
    const diffInMilliseconds = now.getTime() - postedAt.getTime();
    const hoursAgo = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const daysAgo = Math.floor(hoursAgo / 24);

    switch (true) {
      case daysAgo >= 2:
        return `${daysAgo} days ago`;
      case daysAgo === 1:
        return `${daysAgo} day ago`;
      case hoursAgo >= 2:
        return `${hoursAgo} hours ago`;
      case hoursAgo === 1:
        return `${hoursAgo} hour ago`;
      default:
        return 'recently published';
    }
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item sm={2}>
            <StyledAvatar alt="avatar" />
          </Grid>
          <Grid item sm={10}>
            <Grid container>
              <StyledAuthorRow item sm={12}>
                <StyledBodyBoldText pr={1}>{comment.author}</StyledBodyBoldText>
                <StyledSmallLightText>{formatTimeAgo()}</StyledSmallLightText>
              </StyledAuthorRow>
              <Grid item sm={12}>
                <StyledSmallText>{comment.content}</StyledSmallText>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Comment;
