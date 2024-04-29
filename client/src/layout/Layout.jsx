import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { useNavbar } from "../hooks";
import { logout } from "../store/slices/auth";

import "../css/dropDownProfile.css";

export const Layout = ({ children, halfScreen }) => {

  const { status, username, role } = useSelector(state => state.auth);
  const { points } = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  const backgroundColor = useNavbar();
  const navbarStyle = halfScreen ? { justifyContent: 'center', width: '50%', backgroundColor } : { backgroundColor };
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  useEffect(() => {
    const closeMenu = (e) => {
      if (!e.target.closest('.dropDown')) {
        setOpenProfile(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, []);

  return (
    <div className="main-container">
      <nav className="navbar navbar-expand-md navbar-dark fixed-top colores" style={navbarStyle}>
        <div className="container">
          <div className="navbar-brand mr-4" href="/">
            <a href="/">
              <img width="90" src="/images/CustomNavigationLogo.png"
                alt="LogoUS" className="logo" />
            </a>
          </div>

          <div className="navbar-collapse" id="navbar">
            <ul className="navbar-nav navbar-pagelinks">
              <Header text="Aprender" icon="chalkboard-teacher" href="learn" />
              <Header text="Practicar" icon="briefcase" href="practice" />
              <Header text="Repositorio" icon="stream" href="repository" />
              <Header text="Logros" icon="trophy" href="leaderboard" />
            </ul>
          </div>

          <ul className="navbar-nav horizontal-align-custom">
            {
              (status !== 'authenticated')
                ? <>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">Iniciar sesión</a>
                  </li>

                  <li className="nav-item">
                    <a id="navbar-signup" className="nav-link" href="/register">
                      <button className="btn btn-light">
                        Registrarse
                      </button>
                    </a>
                  </li>
                </>
                : <>
                  <li
                    className="nav-item"
                    style={{ position: 'relative', marginRight: '2rem' }}
                    onMouseEnter={() => setPopoverVisible(true)}
                    onMouseLeave={() => setPopoverVisible(false)}
                  >
                    <p className="text-white">{points} CP</p>
                    {isPopoverVisible && (
                      <div className="dropDownPopover">
                        ¡Resuelve desafíos para ganar CyberPoints!
                      </div>
                    )}
                  </li>

                  <li className="nav-item dropDown" style={{ position: 'relative' }}>
                    <a className="user-btn btn btn-light"
                      style={{ color: 'black' }}
                      onClick={() => setOpenProfile(!openProfile)}
                    >
                      {username}
                    </a>
                    {openProfile &&
                      <div className="flex flex-col dropDownProfile">
                        <ul className="flex flex-col gap-2">
                          <li><a href="/profile">Perfil</a></li>
                          <li><a href="/myrepository">Mi Repositorio</a></li>
                          <li><a href="/settings">Opciones</a></li>
                          {role === 'admin' &&
                            <li><a href="/admin">Admin</a></li>
                          }
                          <li role="button" onClick={() => dispatch(logout())}>Logout</li>
                        </ul>
                      </div>}
                  </li>
                </>
            }
          </ul>
        </div>
      </nav>
      {
        children
      }
      <div className="star-background footer">
        <footer className="container pt-5 pb-5" style={{ margin: 'auto' }}>
          <div className="row">
            <div className="col-md-12 col-lg-4 mt-4">
              <img src="/images/logo-ETSII-US-Vertical-Color.png"
                alt="LogoETSII" className="logo" width="200" />
            </div>
            <div className="col-md-4 col-lg-3">
              <h5 className="bold-header mt-4">Productos</h5>
              <ul className="list-unstyled text-small mb-0">
                <li><a href="/learn">Aprender</a></li>
                <li><a href="/practice">Practicar</a></li>
                <li><a href="/repository">Repositorio</a></li>
                <li><a href="/achievements">Logros</a></li>
              </ul>
            </div>
            <div className="col-md-4 col-lg-3">
              <h5 className="bold-header mt-4">Recursos</h5>
              <ul className="list-unstyled text-small mb-0">
                <li><a href="https://cybersecuritynews.es/" target="_blank">Noticias</a></li>
                <li><a href="https://ciberseguridad.blog/" target="_blank">Blog</a></li>
                <li><a href="/glossary">Glosario</a></li>
                <li><a href="/about">About Us</a></li>
              </ul>
            </div>
            <div className="col-md-4 col-lg-2">
              <h5 className="bold-header mt-4">Social</h5>
              <ul className="list-unstyled text-small mb-0">
                <li><a href="https://twitter.com/unisevilla" target="_blank">Twitter</a></li>
                <li><a href="https://www.instagram.com/unisevilla" target="_blank">Instagram</a></li>
                <li><a href="mailto:soporte@ciberseguridad.us.es">Email</a></li>
                <li><a href="/forum">Foro</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}