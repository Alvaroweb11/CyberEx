import { useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import '../css/style.css';
import { Layout } from "../layout/Layout"
import { updateUser } from "../store/slices/auth"
import { useDispatch } from "react-redux"
import { uploadAvatars } from '../utils';
import { getAvatars } from '../utils';

export function ProfilePage() {
    const { uid, username, email, fullName } = useSelector(state => state.auth);
    const fileInput = useRef();

    const dispatch = useDispatch();

    const [inputValues, setInputValues] = useState({
        username: '',
        email: '',
        fullName: ''
    });

    const [defaultValues, setDefaultValues] = useState({
        username: '',
        email: '',
        fullName: ''
    });

    
    const [avatar, setAvatar] = useState(null);
    const [avatarChanged, setAvatarChanged] = useState(false);

    useEffect(() => {
        setInputValues({
            username: username,
            email: email,
            fullName: fullName
        });
        setDefaultValues({
            username: username,
            email: email,
            fullName: fullName
        });
        getAvatars({uid}).then(avatarBlob => {
            const objectURL = URL.createObjectURL(avatarBlob);
            setAvatar(objectURL);
            setAvatarChanged(false);
        });
    }, [username, email, fullName, avatarChanged]);

    const handleAvatarClick = () => {
        document.getElementById('upload-avatar').click();
    }

    const handleInputChange = (e) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
    }

    const hasChanges = inputValues.username !== defaultValues.username || inputValues.email !== defaultValues.email || inputValues.fullName !== defaultValues.fullName;

    const onSubmit = (event) => {
        event.preventDefault();

        dispatch(updateUser({
            uid,
            username: inputValues.username,
            email: inputValues.email,
            fullName: inputValues.fullName
        }));

        setDefaultValues({ ...inputValues });
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
                                <a href="/profile" className="account-link">Detalles de la cuenta</a>
                                <a href="/security">Contraseña y seguridad</a>
                                <a href="/delete">Eliminar cuenta</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <div className="card">
                            <div className="card-header">
                                <i className="far fa-cog text-white" style={{ marginRight: "5px", }}></i>
                                <span className="task-dropdown-text text-white">Información general</span>
                            </div>
                            <div className="card-body row">
                                <form onSubmit={onSubmit}>
                                    <div className="row" style={{ margin: "10px" }}>
                                        <div className="form-group col-md-6">
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <img
                                                    className='avatar'
                                                    alt="avatar"
                                                    src={avatar}
                                                    width="90rem"
                                                    height="90rem"
                                                    style={{ marginRight: '1rem', borderRadius: '50%', cursor: 'pointer' }}
                                                    onClick={handleAvatarClick}
                                                />
                                                <div>
                                                    <input
                                                        type="file"
                                                        ref={fileInput}
                                                        id="upload-avatar"
                                                        accept=".png, .jpeg, .jpg"
                                                        style={{ display: 'none' }}
                                                        onChange={() => {
                                                            uploadAvatars(uid, fileInput.current.files[0])
                                                                .then(uploadedAvatarBlob => {
                                                                    const objectURL = URL.createObjectURL(uploadedAvatarBlob);
                                                                    setAvatar(objectURL);
                                                                    setAvatarChanged(true);
                                                                })
                                                                .catch(error => {
                                                                    console.error(error);
                                                                });
                                                        }}
                                                    />
                                                    <label htmlFor="upload-avatar" className="btn btn-outline-primary">
                                                        <i className="far fa-upload" style={{ marginRight: "5px" }}></i>Subir Avatar
                                                    </label>
                                                    <div>
                                                        <small>Max size 2MB. Formats: JPG, PNG.</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-6" style={{ marginTop: "10px" }}>
                                            <label>Username</label>
                                            <input
                                                className="form-control"
                                                value={inputValues.username}
                                                type="text"
                                                name="username"
                                                placeholder={username}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row" style={{ margin: "10px", marginTop: "30px" }}>
                                        <div className="form-group col-md-6">
                                            <label>Email</label>
                                            <input
                                                className="form-control"
                                                value={inputValues.email}
                                                type="text"
                                                name="email"
                                                required
                                                placeholder={email}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Nombre Completo</label>
                                            <input
                                                className="form-control"
                                                value={inputValues.fullName}
                                                type="text"
                                                name="fullName"
                                                placeholder={fullName}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <button type="submit" className="btn btn-primary" style={{ marginLeft: "20px" }} disabled={!hasChanges}>Guardar cambios</button>
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