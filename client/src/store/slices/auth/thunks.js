import { getRegister, getLogin, getRenewToken, getUpdateTasks, getPoints } from "../../../utils";
import { checkingCredentials, login, logout } from "./authSlice";
import { addPoints, updateTask } from "./tasksSlice";

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

export const updateTasks = (taskUpdates) => {
  return async (dispatch) => {
    const result = await getUpdateTasks(taskUpdates);
    dispatch(updateTask(result));
  }
}

export const getTasks = ({ uid }) => {
  if (!uid) return () => {};

  return async (dispatch) => {
    const result = await getPoints({ uid });
    dispatch(addPoints(result));
  }
}