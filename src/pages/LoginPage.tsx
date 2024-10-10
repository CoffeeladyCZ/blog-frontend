import React, { useState } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Button, Card, Grid, TextField, CardContent, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';

import { setLogin } from '../store/login';
import { FormLoginType } from '../types/Articles';
import { StyledH3, StyledErrorMessage } from '../styled/styled';
import useSupabase from '../hooks/useSupabase';
import Cookies from 'js-cookie';

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
  const [errorMessage, setErrorMessage] = useState<string>('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const supabase = useSupabase();

  const methods = useForm<FormLoginType>({
    mode: 'onChange'
  });

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = methods;

  const onSubmit = async (data: FormLoginType) => {
    try {
      const response = await loginUser(data);
      if (response.success) {
        dispatch(setLogin(true));
        console.log('redirect');
        navigate('/articles');
        return;
      } else {
        setErrorMessage(t('errorMessage.login'));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loginUser = async (dataLogin: FormLoginType) => {
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: dataLogin.username,
        password: dataLogin.password
      });
      if (data.session !== null) {
        Cookies.set('token', data.session.access_token);
      }

      if (error) {
        return { success: false, error };
      }
      return { success: true };
    }
    return { success: false };
  };

  return (
    <StyledCard>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <StyledH3 variant="h3">{t('login')}</StyledH3>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="username"
                  rules={{ required: true }}
                  defaultValue=""
                  render={({ field }) => {
                    return (
                      <TextField
                        label={t('email')}
                        id="email"
                        data-testid="loginEmail"
                        error={Boolean(errors.username)}
                        helperText={errors.username ? t('errorMessage.item') : ''}
                        placeholder={t('email')}
                        size="small"
                        fullWidth
                        {...field}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="password"
                  rules={{ required: true }}
                  defaultValue=""
                  render={({ field }) => {
                    return (
                      <TextField
                        label={t('password')}
                        id="password"
                        data-testid="loginPassword"
                        type="password"
                        error={Boolean(errors.password)}
                        helperText={errors.password ? t('errorMessage.item') : ''}
                        placeholder="********"
                        size="small"
                        fullWidth
                        {...field}
                      />
                    );
                  }}
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
              data-testid="loginButton"
              color="primary"
              type="submit"
              variant="contained">
              {t('login')}
            </Button>
          </StyledCardActions>
        </form>
      </FormProvider>
    </StyledCard>
  );
};

export default LoginPage;
