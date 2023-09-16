import { LinearProgress } from '@mui/material';
import React from 'react';

type LinearLoadingPropsType = {
  loading: boolean;
};

const LinearLoading: React.FC<LinearLoadingPropsType> = ({ loading }) => {
  return loading ? <LinearProgress /> : null;
};

export default LinearLoading;
