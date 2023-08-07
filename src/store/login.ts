import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
  login: boolean;
}

const initialState: LoginState = {
  login: false
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.login = action.payload;
    }
  }
});

export const { setLogin } = loginSlice.actions;
export default loginSlice.reducer;
