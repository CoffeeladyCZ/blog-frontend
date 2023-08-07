import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setLogin } from '../store/login';

import { Button, Card, Grid, TextField, Typography, CardContent, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';

type FormValues = {
  username: string;
  password: string;
};

const StyledTypography = styled(Typography)`
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
`;

const StyledCard = styled(Card)`
  width: 368px;
  margin: 0 auto;
  margin-top: 50px;
  box-shadow: "0px 16px 48px rgba(0, 0, 0, 0.175);
`;

const StyledCardActions = styled(CardActions)`
  padding: 16px;
  justify-content: end;
`;

const apiLogin = 'https://fullstack.exercise.applifting.cz/login';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const login = useSelector((state: RootState) => state.login.login);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    mode: 'onChange'
  });

  const config = {
    headers: {
      'X-API-KEY': 'd4234190-5f6b-4d51-b3f3-80cc4810d0b7'
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    console.log('data', data);
    let response;
    let access_token;
    try {
      response = await axios.post(apiLogin, data, config);
      access_token = await response.data.access_token;
      Cookies.set('token', access_token);
      dispatch(setLogin(true));
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setErrorMessage((error as any)?.response?.data?.message);
    }
    console.log('token', access_token);
  };

  return login ? (
    <Navigate to="/articles" replace />
  ) : (
    <StyledCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <StyledTypography variant="h3">Log In</StyledTypography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="E-mail"
                {...register('username', {
                  required: t('errorMessage:email')
                })}
                error={Boolean(errors.username)}
                helperText={errors.username?.message}
                id="username"
                placeholder="Login"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                {...register('password', {
                  required: t('errorMessage:password')
                })}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                id="password"
                placeholder="********"
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
          {errorMessage && (
            <Typography variant="h6" sx={{ color: '#d32f2f' }} id="error">
              {errorMessage}
            </Typography>
          )}
        </CardContent>
        <StyledCardActions>
          <Button
            size="small"
            color="primary"
            type="submit"
            disabled={isLoading}
            variant="contained">
            Log In
          </Button>
        </StyledCardActions>
      </form>
    </StyledCard>
  );
};

export default LoginPage;
