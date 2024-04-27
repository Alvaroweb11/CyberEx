import '../css/style.css';
import { Layout } from "../layout/Layout"
import React, { useState, useEffect } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { useForm } from "../hooks/useForm"
import Swal from 'sweetalert2'
import { useSelector, useDispatch } from "react-redux";
import { updateTasks } from "../store/slices/auth"

export function PracticePageSteganography() {
    const { uid } = useSelector(state => state.auth);
    const { points, steganographyTask1 } = useSelector(state => state.tasks);
    const [point, setPoints] = useState(points);

    const [isOpen1, setIsOpen1] = useState(false);
    // const [isOpen2, setIsOpen2] = useState(false);
    // const [isOpen3, setIsOpen3] = useState(false);

    const [isAnswer1Correct, setIsAnswer1Correct] = useState(steganographyTask1);

    useEffect(() => {
        setIsAnswer1Correct(steganographyTask1);
    }, [steganographyTask1]);

    // const [isAnswer2Correct, setIsAnswer2Correct] = useState(hashTask2);

    // useEffect(() => {
    //     setIsAnswer2Correct(hashTask2);
    // }, [hashTask2]);

    // const [isAnswer3Correct, setIsAnswer3Correct] = useState(hashTask3);

    // useEffect(() => {
    //     setIsAnswer3Correct(hashTask3);
    // }, [hashTask3]);

    const { onChange, answer1, answer2, answer3 } = useForm({
        answer1: "",
        // answer2: "",
        // answer3: "",
    });

    const dispatch = useDispatch();

    const [pointsTask1, setPointsTask1] = useState(100);
    // const [pointsTask2, setPointsTask2] = useState(100);
    // const [pointsTask3, setPointsTask3] = useState(100);
    const [task1Started, setTask1Started] = useState(localStorage.getItem('task1Started') === 'true');
    // const [task2Started, setTask2Started] = useState(localStorage.getItem('task2Started') === 'true');
    // const [task3Started, setTask3Started] = useState(localStorage.getItem('task3Started') === 'true');

    useEffect(() => {
        let task1Timer1;
        let task1Timer2;
        if (task1Started) {
            task1Timer1 = setTimeout(() => {
                task1Timer2 = setInterval(() => {
                    setPointsTask1((pointsTask1) => pointsTask1 - 1);
                }, 60000); // 1 minute in milliseconds
            }, 600000); // 10 minutes in milliseconds
        }
        return () => {
            clearTimeout(task1Timer1);
            clearInterval(task1Timer2);
        };
    }, [task1Started, pointsTask1]);

    // useEffect(() => {
    //     let task2Timer1;
    //     let task2Timer2;
    //     if (task2Started) {
    //         task2Timer1 = setTimeout(() => {
    //             task2Timer2 = setInterval(() => {
    //                 setPointsTask2((pointsTask2) => pointsTask2 - 1);
    //             }, 60000); // 1 minute in milliseconds
    //         }, 600000); // 10 minutes in milliseconds
    //     }
    //     return () => {
    //         clearTimeout(task2Timer1);
    //         clearInterval(task2Timer2);
    //     };
    // }, [task2Started, pointsTask2]);

    // useEffect(() => {
    //     let task3Timer1;
    //     let task3Timer2;
    //     if (task3Started) {
    //         task3Timer1 = setTimeout(() => {
    //             task3Timer2 = setInterval(() => {
    //                 setPointsTask3((pointsTask3) => pointsTask3 - 1);
    //             }, 60000); // 1 minute in milliseconds
    //         }, 600000); // 10 minutes in milliseconds
    //     }
    //     return () => {
    //         clearTimeout(task3Timer1);
    //         clearInterval(task3Timer2);
    //     };
    // }, [task3Started, pointsTask3]);

    const [machineStarted, setMachineStarted] = useState(false);

    const [timeLeft, setTimeLeft] = useState(60 * 60); // Tiempo en segundos

    useEffect(() => {
        if (machineStarted && timeLeft > 0) {
            const timerId = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            return () => clearTimeout(timerId); // Limpiar el temporizador si el componente se desmonta
        } else if (timeLeft === 0) {
            setMachineStarted(false);
        }
    }, [machineStarted, timeLeft]);

    useEffect(() => {
        if (machineStarted) {
            setTimeLeft(60 * 60); // Restablecer el contador a 1 hora
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
                                            onClick={() => { setTimeLeft(prevTime => prevTime + 60 * 60); }}> {/* Añadir una hora */}
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
                                    <span className="exercise-text">Steganography</span>
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
                                                    setTask1Started(true);
                                                    localStorage.setItem('task1Started', 'true');
                                                    setMachineStarted(true);
                                                }}>
                                                <i className="fas fa-play mr-2"></i> Start Machine
                                            </button>

                                            <p style={{ textAlign: "justify", marginBottom: "25px" }}>
                                                La dirección de un Hospital tiene sospechas de que un Jefe de Servicio está enviando
                                                información confidencial de la misma a terceras personas ajenas a la entidad hospitalaria de
                                                forma codificada utilizando quizás algún método relacionado con la esteganografía. Hemos
                                                recibido una de las imágenes enviada (ver archivo adjunto “Dibujo.bmp”) sobre la que se cree
                                                existe información confidencial oculta.
                                            </p>
                                        </div>

                                        <div className="card-questions vertical-align-custom text-lgray">
                                            <div>Answer the questions below</div>
                                        </div>

                                        <div className="card-answer">
                                            <p style={{ textAlign: "justify", marginTop: "10px", marginBottom: "10px" }}>
                                                Determina el nombre del archivo oculto en la imagen:
                                            </p>

                                            <div className="card-answer-input row">
                                                <div className="card-answer-text col-sm-9">
                                                    <input
                                                        className="form-control"
                                                        value={answer1}
                                                        onChange={onChange}
                                                        type="text"
                                                        name="answer1"
                                                        placeholder={`${isAnswer1Correct ? 'a5fde.jpg' : 'Answer format: *****.***'}`}
                                                        disabled={isAnswer1Correct}
                                                    />
                                                </div>

                                                <div className="card-answer-submit col-sm-3">
                                                    <button
                                                        type="button"
                                                        className={`btn ${isAnswer1Correct ? 'btn-success' : 'btn-outline-success'}`}
                                                        disabled={isAnswer1Correct}
                                                        onClick={() => {
                                                            if (answer1 !== "a5fde.jpg") {
                                                                return Swal.fire('Error', 'Respuesta incorrecta', 'error');
                                                            }
                                                            setIsAnswer1Correct(true);
                                                            dispatch(updateTasks({ uid, points: point + pointsTask1, steganographyTask1: 1 }))
                                                            setPoints(point => point + pointsTask1);
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

                        {/* <div className="card" id="task-2" style={{ marginBottom: "15px" }}>
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
                                                    setTask2Started(true);
                                                    localStorage.setItem('task2Started', 'true');
                                                    setMachineStarted(true);
                                                }}>
                                                <i className="fas fa-play mr-2"></i> Start Machine
                                            </button>

                                            <p style={{ textAlign: "justify", marginBottom: "10px" }}>
                                                Para mejorar la seguridad de las contraseñas almacenadas en la base de datos, la empresa decide
                                                utilizar un mecanismo de hashing con salt. Cada contraseña se hashea junto con un valor único de
                                                salt antes de ser almacenada. El hash resultante se calcula mediante el algoritmo SHA-1.
                                            </p>

                                            <p style={{ textAlign: "justify", marginBottom: "10px" }}>
                                                La empresa sigue sospechando que algunas de las contraseñas en su base de datos no cumplen con
                                                estos requisitos. A continuación se muestran las contraseñas hasheadas con salt y sus usuarios
                                                correspondientes:
                                            </p>

                                            <p style={{ textAlign: "justify", marginLeft: "50px" }}>
                                                Usuario: alexsmith - Contraseña: +YVn8kryS74e8e/FjP5FZvrvwOa3Invj7K9sV5U+iZ0=
                                                - Salt: 11 - Comentario del usuario: "Mi constraseña usa dos números, dos letras mayusculas, dos
                                                números y dos minusculas"
                                            </p>

                                            <p style={{ textAlign: "justify", marginLeft: "50px" }}>
                                                Usuario: sarah_jones - Contraseña: PUzvoJ3EYBLJmLDtYRqWM0OWXaFS2NZLGASR3E1WG0A=
                                                - Salt: 45 - Comentario del usuario: "Mi contraseña es de las contraseñas más comunes que se ponen
                                                seguida de un punto y dos números"
                                            </p>

                                            <p style={{ textAlign: "justify", marginBottom: "25px", marginLeft: "50px" }}>
                                                Usuario: john_doe - Contraseña: ao/ry1TutMGkmJLjTSHD/KSjMN91M/D/QgrT35XbCSE=
                                                - Salt: 83 - Comentario del usuario: "Mi contraseña es la fecha de nacimiento de uno de mis hijos
                                                escribiendo el mes con letras"
                                            </p>
                                        </div>

                                        <div className="card-questions vertical-align-custom text-lgray">
                                            <div>Answer the questions below</div>
                                        </div>

                                        <div className="card-answer">
                                            <p style={{ textAlign: "justify", marginTop: "10px", marginBottom: "10px" }}>
                                                Determina qué contraseña no cumple con los requisitos de la empresa:
                                            </p>

                                            <div className="card-answer-input row">
                                                <div className="card-answer-text col-sm-9">
                                                    <input
                                                        className="form-control"
                                                        value={answer2}
                                                        onChange={onChange}
                                                        type="text"
                                                        name="answer2"
                                                        placeholder={`${isAnswer2Correct ? 'password.52' : 'Answer format: ***********'}`}
                                                        disabled={isAnswer2Correct}
                                                    />
                                                </div>

                                                <div className="card-answer-submit col-sm-3">
                                                    <button
                                                        type="button"
                                                        className={`btn ${isAnswer2Correct ? 'btn-success' : 'btn-outline-success'}`}
                                                        disabled={isAnswer2Correct}
                                                        onClick={() => {
                                                            if (answer2 !== "password.52") {
                                                                return Swal.fire('Error', 'Respuesta incorrecta', 'error');
                                                            }
                                                            setIsAnswer2Correct(true);
                                                            dispatch(updateTasks({ uid, points: point + pointsTask2, hashTask2: 1 }))
                                                            setPoints(point => point + pointsTask2);
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

                        <div className="card" id="task-3" style={{ marginBottom: "15px" }}>
                            <div className="card-header" role="button" onClick={() => setIsOpen3(!isOpen3)}>
                                <div className="card-link">
                                    <span className="task-dropdown-title">
                                        <span className={`task-dropdown-text ${isAnswer3Correct ? 'text-green' : 'text-red'}`}>Task 3</span>
                                        <span className="task-dropdown-icon">
                                            <i className={`far ${isAnswer3Correct ? 'fa-check-circle text-green' : 'fa-circle text-lgray'}`}></i>
                                        </span>
                                    </span>
                                    <span className="exercise-text">MAC</span>
                                    <i className="fas fa-chevron-down float-right"></i>
                                </div>
                            </div>

                            <Collapse in={isOpen3} style={{ visibility: isOpen3 ? 'visible' : 'collapse' }}>
                                <div className="card-container">
                                    <div className="card-body">
                                        <div className="room-task-desc">
                                            <button
                                                type="button"
                                                className="btn btn-success start-btn"
                                                disabled={isAnswer3Correct || machineStarted}
                                                onClick={() => {
                                                    setTask3Started(true);
                                                    localStorage.setItem('task3Started', 'true');
                                                    setMachineStarted(true);
                                                }}>
                                                <i className="fas fa-play mr-2"></i> Start Machine
                                            </button>

                                            <p style={{ textAlign: "justify", marginBottom: "10px" }}>
                                                La empresa de comercio electrónico utiliza códigos de autenticación de mensajes (MAC) para mantener 
                                                la integridad de las transmisiones entre sus servidores y clientes. Los MAC se generan con claves 
                                                secretas de 32 bits, entregadas anualmente a los clientes en dispositivos físicos.
                                            </p>

                                            <p style={{ textAlign: "justify", marginBottom: "10px" }}>
                                                Se solicita evaluar la seguridad del tamaño de clave utilizado. Para ello, se proporcionan tres 
                                                pares de mensajes y sus correspondientes MAC, generados con diferentes claves:
                                            </p>

                                            <p style={{ textAlign: "justify", marginLeft: "50px" }}>
                                                Mensaje: 531456 487654 200 - MAC: c5173b3e13fbed7f1b41c7dfa5fd6fd6368cd366
                                            </p>

                                        </div>

                                        <div className="card-questions vertical-align-custom text-lgray">
                                            <div>Answer the questions below</div>
                                        </div>

                                        <div className="card-answer">
                                            <p style={{ textAlign: "justify", marginTop: "10px", marginBottom: "10px" }}>
                                                Se requiere determinar la seguridad del tamaño de clave utilizado proporcionando la clave obtenida.
                                            </p>

                                            <div className="card-answer-input row">
                                                <div className="card-answer-text col-sm-9">
                                                    <input
                                                        className="form-control"
                                                        value={answer3}
                                                        onChange={onChange}
                                                        type="text"
                                                        name="answer3"
                                                        placeholder={`${isAnswer3Correct ? ' a6A' : 'Answer format: ****'}`}
                                                        disabled={isAnswer3Correct}
                                                    />
                                                </div>

                                                <div className="card-answer-submit col-sm-3">
                                                    <button
                                                        type="button"
                                                        className={`btn ${isAnswer3Correct ? 'btn-success' : 'btn-outline-success'}`}
                                                        disabled={isAnswer3Correct}
                                                        onClick={() => {
                                                            if (answer3 !== " a6A") {
                                                                return Swal.fire('Error', 'Respuesta incorrecta', 'error');
                                                            }
                                                            setIsAnswer3Correct(true);
                                                            dispatch(updateTasks({ uid, points: point + pointsTask3, hashTask3: 1 }))
                                                            setPoints(point => point + pointsTask3);
                                                            setMachineStarted(false);
                                                        }}>
                                                        {isAnswer3Correct ? 'Correcto' : <><i className="far fa-paper-plane"></i> Submit</>}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Collapse>
                        </div> */}

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