import { useSelector } from 'react-redux';
import { useState } from 'react';
import '../css/style.css';
import { Layout } from "../layout/Layout"
import { updatePassword } from "../utils";
import Swal from 'sweetalert2';
import { useForm } from '../hooks/useForm';

export function SecurityPage() {
    const { uid } = useSelector(state => state.auth);

    const { isValidPassword } = useForm();

    const [inputValues, setInputValues] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleInputChange = (event) => {
        setInputValues({
            ...inputValues,
            [event.target.name]: event.target.value
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (inputValues.newPassword !== inputValues.confirmPassword) {
            return Swal.fire('error', 'Las contraseñas no coinciden', 'error');
        }
        if (inputValues.newPassword.length < 8) {
            return Swal.fire('Error', 'La nueva contraseña debe tener 8 caracteres o más', 'error');
        }
        if (!isValidPassword(inputValues.newPassword)) {
            return Swal.fire('Error', 'La contraseña debe contener al menos un número, una letra mayúscula y una letra minúscula.', 'error');
        }

        updatePassword({ uid, oldPassword: inputValues.oldPassword, newPassword: inputValues.newPassword }).then(response => {
            if (response.ok) {
                Swal.fire({
                    title: 'Contraseña actualizada',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })

                setInputValues({
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            }});
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
                                <a href="/security" className="account-link">Contraseña y seguridad</a>
                                <a href="/delete">Eliminar cuenta</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <div className="card">
                            <div className="card-header">
                                <i className="far fa-cog text-white" style={{ marginRight: "5px", }}></i>
                                <span className="task-dropdown-text text-white">Cambiar contraseña</span>
                            </div>
                            <div className="card-body row">
                                <form onSubmit={onSubmit}>
                                    <div className="row" style={{ margin: "10px" }}>
                                        <div className="form-group" style={{ marginTop: "10px" }}>
                                            <label>Contraseña actual</label>
                                            <input
                                                className="form-control"
                                                value={inputValues.oldPassword}
                                                type="password"
                                                name="oldPassword"
                                                placeholder="Escribe tu contraseña actual..."
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row" style={{ margin: "10px", marginTop: "30px" }}>
                                        <div className="form-group">
                                            <label>Nueva contraseña</label>
                                            <input
                                                className="form-control"
                                                value={inputValues.newPassword}
                                                type="password"
                                                name="newPassword"
                                                placeholder="Escribe tu nueva contraseña..."
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row" style={{ margin: "10px", marginTop: "30px" }}>
                                        <div className="form-group">
                                            <label>Repite la nueva contraseña</label>
                                            <input
                                                className="form-control"
                                                value={inputValues.confirmPassword}
                                                type="password"
                                                name="confirmPassword"
                                                placeholder="Repite tu nueva contraseña..."
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <button type="submit" className="btn btn-primary" style={{ marginLeft: "20px" }}>Cambiar contraseña</button>
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