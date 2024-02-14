import { getRegister, getLogin, getRenewToken } from "../../../utils";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  }
}

export const startCreatingUser = ({ email, password, username }) => {

  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await getRegister({ username, email, password });

    if (!result.ok) return dispatch(logout(result));
    dispatch(login(result));
  }
}

export const startLoginUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await getLogin({ email, password });

    if (!result.ok) return dispatch(logout(result));
    dispatch(login(result));
  }
}

export const startRenewingUser = ({ uid, token }) => {
  return async (dispatch) => {
    if (!token) return dispatch(logout({msg: 'No hay token en la petición'}));

    const result = await getRenewToken({ uid, token });
    
    if (!result.ok) return dispatch(logout(result));
    dispatch(login(result));
  }
}