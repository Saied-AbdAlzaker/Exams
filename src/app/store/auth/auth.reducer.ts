import { createReducer, on } from "@ngrx/store";
import { AuthState } from "./auth.model";
import * as AuthActions from './auth.actions';

export const initialState: AuthState = {
    token: null
}

export const authReducer = createReducer(
    initialState,
    on(AuthActions.loginSuccess, (state, { token }) => ({ ...state, token })),
    on(AuthActions.logout, () => ({ token: null }))
)