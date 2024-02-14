import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../store/slices/auth";

export const useCheckAuth = () => {

    const { status } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch(login(user))
        }

    }, [dispatch]);

    return status;
}