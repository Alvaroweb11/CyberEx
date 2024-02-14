import '../css/style.css';
import { Layout } from "../layout/Layout"
import { startCreatingUser } from "../store/slices/auth"
import { useDispatch } from "react-redux"
import { useForm } from "../hooks/useForm"
import Swal from 'sweetalert2'

export function RegisterPage() {

    const dispatch = useDispatch();

    const { onChange, username, email, password, password1, isValidEmail, isValidPassword } = useForm({
        username: "",
        email: "",
        password: "",
        password1: ""
    });

    const onSubmit = (event) => {
        event.preventDefault();
        if (password !== password1) {
            return Swal.fire('Error', 'Passwords do not match', 'error');
        }
        if (!isValidEmail(email)) {
            return Swal.fire('Error', 'Invalid email', 'error');
        }
        if (password.length < 8) {
            return Swal.fire('Error', 'Password must be at least 8 characters long', 'error');
        }
        if (!isValidPassword(password)) {
            return Swal.fire('Error', 'Password must contain at least one number, one uppercase letter, one lowercase letter, one special character and be at least 8 characters long', 'error');
        }
        dispatch(startCreatingUser({email, username, password}));
    }

    return (
        <Layout>
            <div className="jumbotron-login star-background vertical-align-custom"></div>

            <div className="container main">
                <div className="home-break"></div>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            className="form-control"
                            value={username}
                            onChange={onChange}
                            type="text"
                            name="username"
                            placeholder="Username"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            className="form-control"
                            value={email}
                            onChange={onChange}
                            type="text"
                            name="email"
                            placeholder="example@example.com"
                        />
                    </div>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label>Password</label>
                            <input
                                className="form-control"
                                value={password}
                                onChange={onChange}
                                type="password"
                                name="password"
                                required
                                placeholder="Password"
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Repeat Password</label>
                            <input
                                className="form-control"
                                value={password1}
                                onChange={onChange}
                                type="password"
                                name="password1"
                                required
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>

                <div className="home-break"></div>
            </div>
        </Layout>
    )
}