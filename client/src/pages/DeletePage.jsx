import { useSelector } from 'react-redux';
import '../css/style.css';
import { Layout } from "../layout/Layout"
import { logout } from '../store/slices/auth';
import { useDispatch } from "react-redux";
import { deleteUser } from '../utils';
import Swal from 'sweetalert2';

export function DeletePage() {
    const { uid } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const onSubmit = (event) => {
        event.preventDefault();

        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar cuenta',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser({ uid });
                dispatch(logout());
                Swal.fire({
                    title: 'Tu cuenta ha sido borrada.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2500
                })
            }
        })
    }

    return (
        <Layout>
            <div className="jumbotron star-background vertical-align-custom"></div>

            <div className="container main">
                <div className="home-break"></div>

                <div className="row">
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-header">
                                <span className="task-dropdown-text text-white">Administrar cuenta</span>
                            </div>
                            <div className="card-body row card-body-color" style={{ gap: "10px", marginLeft: "10px" }}>
                                <a href="/profile">Detalles de la cuenta</a>
                                <a href="/security">Contraseña y seguridad</a>
                                <a href="/delete" className="account-link">Eliminar cuenta</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <div className="card">
                            <div className="card-header">
                                <i className="far fa-exclamation-triangle text-white" style={{ marginRight: "5px", }}></i>
                                <span className="task-dropdown-text text-white">Eliminar cuenta</span>
                            </div>
                            <div className="card-body row">
                                <form onSubmit={onSubmit}>
                                    <div className="row" style={{ margin: "10px" }}>
                                        <div className="form-group">
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <h5 style={{ fontSize: "1.25em", textAlign: "justify" }}>
                                                    Si eliminas tu cuenta perderás el acceso definitivo a ella sin posibilidad de recuperación.
                                                    Tus datos personales y tu progreso se borrarán y perderán.
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <button type="submit" className="btn btn-primary" style={{ marginLeft: "20px" }}>Borrar cuenta</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="home-break"></div>
            </div>
        </Layout>
    )
}