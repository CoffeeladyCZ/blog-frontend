import React, { useState } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
// import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store/store';
import { setLogin } from '../store/login';
import { FormLoginType } from '../types/Articles';
import { loginUser } from '../utils/apiUtils';
import { StyledH3, StyledErrorMessage } from '../styled/styled';

import { Button, Card, Grid, TextField, CardContent, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const login = useSelector((state: RootState) => state.login.login);

  const methods = useForm<FormLoginType>({
    mode: 'onChange'
  });

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = methods;

  const onSubmit = async (data: FormLoginType) => {
    setIsLoading(true);
    try {
      const response = await loginUser(data);
      if (response.success) {
        dispatch(setLogin(true));
        return;
      } else if (response.error) {
        setErrorMessage(response.error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return login ? (
    <Navigate to="/articles" replace />
  ) : (
    <StyledCard>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <StyledH3 variant="h3">Log In</StyledH3>
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
                        label="E-mail"
                        error={Boolean(errors.username)}
                        helperText={errors.username ? 'Item is required' : ''}
                        placeholder="E-mail"
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
                        label="Password"
                        type="password"
                        error={Boolean(errors.password)}
                        helperText={errors.password ? 'Item is required' : ''}
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
              color="primary"
              type="submit"
              disabled={isLoading}
              variant="contained">
              Log In
            </Button>
          </StyledCardActions>
        </form>
      </FormProvider>
    </StyledCard>
  );
};

export default LoginPage;
