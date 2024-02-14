import '../css/style.css';
import { startLoginUser } from "../store/slices/auth"
import { Layout } from "../layout/Layout"
import { useForm } from '../hooks/useForm';
import { useDispatch } from 'react-redux';

export function LoginPage() {

  const dispatch = useDispatch();

  const {onChange, email, password} = useForm({
    email: '',
    password: ''
  });

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(startLoginUser({email, password}))
  }

  return (
    <Layout>
      <div className="jumbotron-login star-background vertical-align-custom"></div>

      <div className="container main">
        <div className="home-break"></div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input id="email"
              className="form-control"
              value={email}
              onChange={onChange}
              name="email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input id="password"
              className="form-control"
              value={password}
              onChange={onChange}
              type="password"
              name="password"
              required
            />
          </div>
          <br />
          <button type="submit" className="btn btn-primary">Login</button>
        </form>

        <div className="home-break"></div>
      </div>
    </Layout>
  )
}