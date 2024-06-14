import '../css/style.css';
import { Layout } from "../layout/Layout"
import React, { useState, useEffect } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { useForm } from "../hooks/useForm"
import Swal from 'sweetalert2'
import { useSelector, useDispatch } from "react-redux";
import { updateTasks, updateTraceability } from "../store/slices/auth"

export function PracticePageHashHard() {
    const { uid } = useSelector(state => state.auth);
    const { points, hashHardTask1, hashHardTask2 } = useSelector(state => state.tasks);
    const [point, setPoints] = useState(points);

    useEffect(() => {
        setPoints(points);
    }, [points]);

    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const [isAnswer1Correct, setIsAnswer1Correct] = useState(hashHardTask1);
    const [isAnswer1Hinted, setIsAnswer1Hinted] = useState(false);

    useEffect(() => {
        setIsAnswer1Correct(hashHardTask1);
    }, [hashHardTask1]);

    const [isAnswer2Correct, setIsAnswer2Correct] = useState(hashHardTask2);
    const [isAnswer2Hinted, setIsAnswer2Hinted] = useState(false);

    useEffect(() => {
        setIsAnswer2Correct(hashHardTask2);
    }, [hashHardTask2]);

    const { onChange, answer1, answer2 } = useForm({
        answer1: "",
        answer2: "",
    });

    const dispatch = useDispatch();

    const [pointsTask1, setPointsTask1] = useState(200);
    const [pointsTask2, setPointsTask2] = useState(200);
    const [hashHardTask1Started, setHashHardTask1Started] = useState(localStorage.getItem('hashHardTask1Started') === 'true');
    const [hashHardTask2Started, setHashHardTask2Started] = useState(localStorage.getItem('hashHardTask2Started') === 'true');
   
    useEffect(() => {
        let task1Timer1;
        let task1Timer2;
        if (hashHardTask1Started) {
            task1Timer1 = setTimeout(() => {
                task1Timer2 = setInterval(() => {
                    setPointsTask1((pointsTask1) => pointsTask1 > 0 ? pointsTask1 - 1 : 0);
                }, 60000);
            }, 600000);
        }
        return () => {
            clearTimeout(task1Timer1);
            clearInterval(task1Timer2);
        };
    }, [hashHardTask1Started, pointsTask1]);

    useEffect(() => {
        let task2Timer1;
        let task2Timer2;
        if (hashHardTask2Started) {
            task2Timer1 = setTimeout(() => {
                task2Timer2 = setInterval(() => {
                    setPointsTask2((pointsTask2) => pointsTask2 > 0 ? pointsTask2 - 1 : 0);
                }, 60000);
            }, 600000);
        }
        return () => {
            clearTimeout(task2Timer1);
            clearInterval(task2Timer2);
        };
    }, [hashHardTask2Started, pointsTask2]);

    const [machineStarted, setMachineStarted] = useState(false);

    const [timeLeft, setTimeLeft] = useState(60 * 60);

    useEffect(() => {
        if (machineStarted && timeLeft > 0) {
            const timerId = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            return () => clearTimeout(timerId);
        } else if (timeLeft === 0) {
            setMachineStarted(false);
        }
    }, [machineStarted, timeLeft]);

    useEffect(() => {
        if (machineStarted) {
            setTimeLeft(60 * 60);
        }
    }, [machineStarted]);

    return (
        <div className="practice-container" style={{ display: 'flex', flexDirection: 'row' }}>
            <div className="content-container" style={{ flex: machineStarted ? 0.5 : 1 }}>
                <Layout halfScreen={machineStarted}>
                    <div className="jumbotron star-background vertical-align-custom"></div>

                    <div className="container main">

                        <div className="home-break"></div>

                        {
                            (machineStarted) && (
                                <div className="card" id="machine-info" style={{ marginBottom: "15px", textAlign: "center" }}>
                                    <div className="card-header">
                                        <span className="task-dropdown-text text-white">Machine Information</span>
                                    </div>

                                    <div className="card-body row">
                                        <div className="col-md-3 mr-3">
                                            <p style={{ fontWeight: "bold" }}>Expires</p>
                                            <p>{Math.floor(timeLeft / 3600)}h {Math.floor((timeLeft % 3600) / 60)}m {timeLeft % 60}s</p>
                                        </div>

                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary col-md-4"
                                            onClick={() => { setTimeLeft(prevTime => prevTime + 60 * 60 >= 7200 ? 10800 : prevTime + 60 * 60); }}>
                                            Add 1 hour
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-danger col-md-4 ml-3"
                                            onClick={() => { setMachineStarted(false); }}>
                                            Terminate
                                        </button>
                                    </div>
                                </div>
                            )
                        }

                        <div className="card" id="task-1" style={{ marginBottom: "15px" }}>
                            <div className="card-header" role="button" onClick={() => setIsOpen1(!isOpen1)}>
                                <div className="card-link">
                                    <span className="task-dropdown-title">
                                        <span className={`task-dropdown-text ${isAnswer1Correct ? 'text-green' : 'text-red'}`}>Task 1</span>
                                        <span className="task-dropdown-icon">
                                            <i className={`far ${isAnswer1Correct ? 'fa-check-circle text-green' : 'fa-circle text-lgray'}`}></i>
                                        </span>
                                    </span>
                                    <span className="exercise-text">Hash</span>
                                    <i className="fas fa-chevron-down float-right"></i>
                                </div>
                            </div>

                            <Collapse in={isOpen1} style={{ visibility: isOpen1 ? 'visible' : 'collapse' }}>
                                <div className="card-container">
                                    <div className="card-body">
                                        <div className="room-task-desc">
                                            <button
                                                type="button"
                                                className="btn btn-success start-btn"
                                                disabled={isAnswer1Correct || machineStarted}
                                                onClick={() => {
                                                    setHashHardTask1Started(true);
                                                    localStorage.setItem('task1Started', 'true');
                                                    setMachineStarted(true);
                                                }}>
                                                <i className="fas fa-play mr-2"></i> Start Machine
                                            </button>

                                            <p style={{ textAlign: "justify", marginBottom: "10px" }}>
                                                Una empresa de seguridad avanzada ha implementado una política de contraseñas extremadamente estricta.
                                                Las contraseñas deben cumplir con los siguientes requisitos:
                                            </p>

                                            <p style={{ textAlign: "justify", marginLeft: "50px" }}>
                                                1. Deben tener como mínimo 12 caracteres.
                                            </p>

                                            <p style={{ textAlign: "justify", marginLeft: "50px" }}>
                                                2. Deben incluir al menos un carácter de cada uno de los siguientes cuatro grupos:
                                            </p>

                                            <p style={{ textAlign: "justify", marginLeft: "100px" }}>
                                                a. Letras (mayúsculas y minúsculas): A, B, C, … a, b, c …
                                            </p>

                                            <p style={{ textAlign: "justify", marginLeft: "100px" }}>
                                                b. Caracteres numéricos: 0, 1, 2, 3,.., 8, 9
                                            </p>

                                            <p style={{ textAlign: "justify", marginLeft: "100px" }}>
                                                c. Símbolos: ! @ # $ % & *^( ) - = { } [ ] \ : ; &lt; &gt; ? , . /
                                            </p>

                                            <p style={{ textAlign: "justify", marginBottom: "10px", marginLeft: "100px" }}>
                                                d. Caracteres especiales: é, ñ, ü, å, ø, ß, etc.
                                            </p>

                                            <p style={{ textAlign: "justify", marginBottom: "10px" }}>
                                                La empresa sospecha que algunas de las contraseñas en su base de datos no cumplen con
                                                estos requisitos. A continuación se muestran tres contraseñas cifradas y sus usuarios
                                                correspondientes:
                                            </p>

                                            <div className="tabla-ejercicios-container">
                                                <table className="tabla-ejercicios">
                                                    <thead>
                                                        <tr>
                                                            <th>Usuario</th>
                                                            <th>Contraseña</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>alexsmith</td>
                                                            <td>fbbfbffbc5d5e055f5fdbafd3c8450fc18badfc17d239ba2ad1f8d70d1eddd6b</td>
                                                        </tr>
                                                        <tr>
                                                            <td>sarah_jones</td>
                                                            <td>a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea</td>
                                                        </tr>
                                                        <tr>
                                                            <td>john_doe</td>
                                                            <td>7bcf94a22f44edd39838d05ee1811869f19eca8797a0e9699fe149ba0c1066b4</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div className="card-questions vertical-align-custom text-lgray">
                                            <div>Answer the questions below</div>
                                        </div>

                                        <div className="card-answer">
                                            <p style={{ textAlign: "justify", marginTop: "10px", marginBottom: "10px" }}>
                                                Determina qué contraseña no cumple con los requisitos de la empresa:
                                            </p>

                                            <div className="card-answer-input row">
                                                <div className="card-answer-text col-sm-8">
                                                    <input
                                                        className="form-control"
                                                        value={answer1}
                                                        onChange={onChange}
                                                        type="text"
                                                        name="answer1"
                                                        placeholder={`${isAnswer1Correct ? 'Password12345' : 'Answer format: *************'}`}
                                                        disabled={isAnswer1Correct}
                                                    />
                                                </div>

                                                <div className="card-answer-submit col-sm-2">
                                                    <button
                                                        type="button"
                                                        className={`btn ${isAnswer1Hinted ? 'btn-info' : 'btn-outline-info'}`}
                                                        disabled={isAnswer1Correct}
                                                        onClick={() => {
                                                            if (isAnswer1Hinted) {
                                                                return Swal.fire({
                                                                    icon: 'info',
                                                                    title: 'Pista',
                                                                    text: 'Utiliza hashcut con SHA-256 para obtener la contraseña'
                                                                })
                                                            }
                                                            if (pointsTask1 < 20) {
                                                                setPointsTask1(0);
                                                            } else {
                                                                setPointsTask1((pointsTask1) => pointsTask1 - 20);
                                                            }
                                                            Swal.fire({
                                                                icon: 'info',
                                                                title: 'Pista',
                                                                text: 'Utiliza hashcut con SHA-256 para obtener la contraseña'
                                                            })
                                                            setIsAnswer1Hinted(true);
                                                        }}
                                                    >
                                                        <i className="fas fa-lightbulb"></i> Hint
                                                    </button>
                                                </div>

                                                <div className="card-answer-submit col-sm-2">
                                                    <button
                                                        type="button"
                                                        className={`btn ${isAnswer1Correct ? 'btn-success' : 'btn-outline-success'}`}
                                                        disabled={isAnswer1Correct}
                                                        onClick={() => {
                                                            if (answer1 !== "Password12345") {
                                                                return Swal.fire({
                                                                    icon: 'error',
                                                                    title: 'Respuesta incorrecta'
                                                                })
                                                            }
                                                            setIsAnswer1Correct(true);
                                                            dispatch(updateTasks({ uid, points: point + pointsTask1, hashHardTask1: 1 }))
                                                            dispatch(updateTraceability({ uid, hashHardTask1: pointsTask1 }))
                                                            setPoints(point => point + pointsTask1);
                                                            Swal.fire({
                                                                icon: 'success',
                                                                title: '¡Tarea completada!',
                                                                text: `Has ganado ${pointsTask1} puntos`,
                                                                showConfirmButton: false,
                                                                timer: 2500
                                                            })
                                                            setMachineStarted(false);
                                                        }}>
                                                        {isAnswer1Correct ? 'Correcto' : <><i className="far fa-paper-plane"></i> Submit</>}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Collapse>
                        </div>

                        <div className="card" id="task-2" style={{ marginBottom: "15px" }}>
                            <div className="card-header" role="button" onClick={() => setIsOpen2(!isOpen2)}>
                                <div className="card-link">
                                    <span className="task-dropdown-title">
                                        <span className={`task-dropdown-text ${isAnswer2Correct ? 'text-green' : 'text-red'}`}>Task 2</span>
                                        <span className="task-dropdown-icon">
                                            <i className={`far ${isAnswer2Correct ? 'fa-check-circle text-green' : 'fa-circle text-lgray'}`}></i>
                                        </span>
                                    </span>
                                    <span className="exercise-text">Hash with salt</span>
                                    <i className="fas fa-chevron-down float-right"></i>
                                </div>
                            </div>

                            <Collapse in={isOpen2} style={{ visibility: isOpen2 ? 'visible' : 'collapse' }}>
                                <div className="card-container">
                                    <div className="card-body">
                                        <div className="room-task-desc">
                                            <button
                                                type="button"
                                                className="btn btn-success start-btn"
                                                disabled={isAnswer2Correct || machineStarted}
                                                onClick={() => {
                                                    setHashHardTask2Started(true);
                                                    localStorage.setItem('task2Started', 'true');
                                                    setMachineStarted(true);
                                                }}>
                                                <i className="fas fa-play mr-2"></i> Start Machine
                                            </button>

                                            <p style={{ textAlign: "justify", marginBottom: "10px" }}>
                                                Para mejorar la seguridad de las contraseñas almacenadas en la base de datos, la empresa decide
                                                utilizar un mecanismo de hashing con salt. Cada contraseña se hashea junto con un valor único de
                                                salt antes de ser almacenada.
                                            </p>

                                            <p style={{ textAlign: "justify", marginBottom: "10px" }}>
                                                La empresa sigue sospechando que algunas de las contraseñas en su base de datos no cumplen con
                                                estos requisitos. A continuación se muestran las contraseñas cifradas junto a su salt, sus usuarios
                                                correspondientes y un comentario del usuario:
                                            </p>

                                            <div className="tabla-ejercicios-container">
                                                <table className="tabla-ejercicios">
                                                    <thead>
                                                        <tr>
                                                            <th>Usuario</th>
                                                            <th>Contraseña</th>
                                                            <th>Salt</th>
                                                            <th>Comentario del usuario</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>alexsmith</td>
                                                            <td>P0tZ0EBMWn4K2k9zBNjZtpkpu9uTAhtsStjCuM8BX6s=</td>
                                                            <td>3d</td>
                                                            <td>"Mi contraseña es una combinación de letras, números y un carácter especial con más de 15 caracteres."</td>
                                                        </tr>
                                                        <tr>
                                                            <td>sarah_jones</td>
                                                            <td>SkkQ4XWppFiKyO8NGPhBVsjWpxXTpF4mBWAUM0pzI0k=</td>
                                                            <td>9a</td>
                                                            <td>"Mi contraseña es mi fecha de nacimiento en formato DD/MM/AAAA seguida de una palabra y un signo de exclamación."</td>
                                                        </tr>
                                                        <tr>
                                                            <td>john_doe</td>
                                                            <td>KSaCDNls4CEPUW+EwfUkBDozfgcIMq64FmXnK7RTdK0=</td>
                                                            <td>f4</td>
                                                            <td>"Mi contraseña es una frase de 19 caracteres con espacios y signos de puntuación."</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div className="card-questions vertical-align-custom text-lgray">
                                            <div>Answer the questions below</div>
                                        </div>

                                        <div className="card-answer">
                                            <p style={{ textAlign: "justify", marginTop: "10px", marginBottom: "10px" }}>
                                                Determina qué contraseña no cumple con los requisitos de la empresa:
                                            </p>

                                            <div className="card-answer-input row">
                                                <div className="card-answer-text col-sm-8">
                                                    <input
                                                        className="form-control"
                                                        value={answer2}
                                                        onChange={onChange}
                                                        type="text"
                                                        name="answer2"
                                                        placeholder={`${isAnswer2Correct ? '10/10/1970pass!' : 'Answer format: ***************'}`}
                                                        disabled={isAnswer2Correct}
                                                    />
                                                </div>

                                                <div className="card-answer-submit col-sm-2">
                                                    <button
                                                        type="button"
                                                        className={`btn ${isAnswer2Hinted ? 'btn-info' : 'btn-outline-info'}`}
                                                        disabled={isAnswer2Correct}
                                                        onClick={() => {
                                                            if (isAnswer2Hinted) {
                                                                return Swal.fire({
                                                                    icon: 'info',
                                                                    title: 'Pista',
                                                                    text: 'Pasa a hexadecimal y usa hashcat con SHA-256'
                                                                })
                                                            }
                                                            if (pointsTask2 < 20) {
                                                                setPointsTask2(0);
                                                            } else {
                                                                setPointsTask2((pointsTask2) => pointsTask2 - 20);
                                                            }
                                                            Swal.fire({
                                                                icon: 'info',
                                                                title: 'Pista',
                                                                text: 'Pasa a hexadecimal y usa hashcat con SHA-256'
                                                            })
                                                            setIsAnswer2Hinted(true);
                                                        }}
                                                    >
                                                        <i className="fas fa-lightbulb"></i> Hint
                                                    </button>
                                                </div>

                                                <div className="card-answer-submit col-sm-2">
                                                    <button
                                                        type="button"
                                                        className={`btn ${isAnswer2Correct ? 'btn-success' : 'btn-outline-success'}`}
                                                        disabled={isAnswer2Correct}
                                                        onClick={() => {
                                                            if (answer2 !== "10/10/1970pass!") {
                                                                return Swal.fire({
                                                                    icon: 'error',
                                                                    title: 'Respuesta incorrecta'
                                                                })
                                                            }
                                                            setIsAnswer2Correct(true);
                                                            dispatch(updateTasks({ uid, points: point + pointsTask2, hashHardTask2: 1 }))
                                                            dispatch(updateTraceability({ uid, hashHardTask2: pointsTask2 }))
                                                            setPoints(point => point + pointsTask2);
                                                            Swal.fire({
                                                                icon: 'success',
                                                                title: '¡Tarea completada!',
                                                                text: `Has ganado ${pointsTask2} puntos`,
                                                                showConfirmButton: false,
                                                                timer: 2500
                                                            })
                                                            setMachineStarted(false);
                                                        }}>
                                                        {isAnswer2Correct ? 'Correcto' : <><i className="far fa-paper-plane"></i> Submit</>}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Collapse>
                        </div>

                        <div className="home-break"></div>
                    </div>
                </Layout>
            </div>

            {
                (machineStarted) && (
                    <div style={{ position: 'fixed', right: 0, width: '50%', height: '100vh' }}>
                        <iframe
                            title="Interfaz del SO"
                            src="https://localhost:6901"
                            width="100%"
                            height="100%"
                            style={{ border: 'none' }}
                            allowFullScreen
                        ></iframe>
                    </div>
                )
            }

        </div>
    )
}