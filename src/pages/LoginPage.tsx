import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store/store';
import { setLogin } from '../store/login';
import { httpPost } from '../utils/axiosService';

import { Button, Card, Grid, TextField, CardContent, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import { StyledHeadline3, StyledErrorMessage } from '../styled/styled';

type FormValues = {
  username: string;
  password: string;
};

const StyledCard = styled(Card)`
  width: 368px;
  margin: 0 auto;
  margin-top: 50px;
  box-shadow: 0px 16px 48px rgba(0, 0, 0, 0.175); // TODO předělat na global variable
`;

const StyledCardActions = styled(CardActions)`
  padding: 16px;
  justify-content: end;
`;

const LoginPage: React.FC = () => {
  // const { t } = useTranslation();
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

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    let response;
    let access_token;
    try {
      response = await httpPost('/login', data);
      access_token = await response.data.access_token;
      Cookies.set('token', access_token);
      dispatch(setLogin(true));
    } catch (error) {
      console.error(error);
      setErrorMessage((error as any)?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return login ? (
    <Navigate to="/articles" replace />
  ) : (
    <StyledCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <StyledHeadline3 variant="h3">Log In</StyledHeadline3>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="E-mail"
                {...register('username', {
                  required: 'Item is required'
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
                  required: 'Item is required'
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
            <StyledErrorMessage variant="h6" id="error">
              {errorMessage}
            </StyledErrorMessage>
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
