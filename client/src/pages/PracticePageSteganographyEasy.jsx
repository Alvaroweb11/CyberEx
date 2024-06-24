import '../css/style.css';
import { Layout } from "../layout/Layout"
import React, { useState, useEffect } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { useForm } from "../hooks/useForm"
import Swal from 'sweetalert2'
import { useSelector, useDispatch } from "react-redux";
import { updateTasks, updateTraceability, startMachine, removeMachine } from "../store/slices/auth"

export function PracticePageSteganographyEasy() {
    const { uid } = useSelector(state => state.auth);
    const { points, steganographyEasyTask1 } = useSelector(state => state.tasks);
    const [point, setPoints] = useState(points);

    useEffect(() => {
        setPoints(points);
    }, [points]);

    const [isOpen1, setIsOpen1] = useState(false);

    const [isAnswer1Correct, setIsAnswer1Correct] = useState(steganographyEasyTask1);
    const [isAnswer1Hinted, setIsAnswer1Hinted] = useState(false);

    useEffect(() => {
        setIsAnswer1Correct(steganographyEasyTask1);
    }, [steganographyEasyTask1]);

    const { onChange, answer1 } = useForm({
        answer1: "",
    });

    const dispatch = useDispatch();

    const [pointsTask1, setPointsTask1] = useState(100);
    const [steganographyEasyTask1Started, setSteganographyEasyTask1Started] = useState(localStorage.getItem('steganographyEasyTask1Started') === 'true');
    useEffect(() => {
        let task1Timer1;
        let task1Timer2;
        if (steganographyEasyTask1Started) {
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
    }, [steganographyEasyTask1Started, pointsTask1]);

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
            dispatch(removeMachine());
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
                                            onClick={() => {
                                                setMachineStarted(false);
                                                dispatch(removeMachine());
                                            }}>
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
                                                    setSteganographyEasyTask1Started(true);
                                                    localStorage.setItem('steganographyEasyTask1Started', 'true');
                                                    dispatch(startMachine());
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
                                                <div className="card-answer-text col-sm-8">
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
                                                                    text: 'La extensión del archivo obtenido puede ser la de un archivo comprimido'
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
                                                                text: 'La extensión del archivo obtenido puede ser la de un archivo comprimido'
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
                                                            if (answer1 !== "a5fde.jpg") {
                                                                return Swal.fire({
                                                                    icon: 'error',
                                                                    title: 'Respuesta incorrecta'
                                                                })
                                                            }
                                                            setIsAnswer1Correct(true);
                                                            dispatch(updateTasks({ uid, points: point + pointsTask1, steganographyEasyTask1: 1 }))
                                                            dispatch(updateTraceability({ uid, steganographyEasyTask1: pointsTask1 }))
                                                            setPoints(point => point + pointsTask1);
                                                            Swal.fire({
                                                                icon: 'success',
                                                                title: '¡Tarea completada!',
                                                                text: `Has ganado ${pointsTask1} puntos`,
                                                                showConfirmButton: false,
                                                                timer: 2500
                                                            })
                                                            setMachineStarted(false);
                                                            dispatch(removeMachine());
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

                        <div className="home-break"></div>
                    </div>
                </Layout>
            </div>

            {
                (machineStarted) && (
                    <div style={{ position: 'fixed', right: 0, width: '50%', height: '100vh' }}>
                        <iframe
                            title="Interfaz del SO"
                            src="http://cyberex:6080/vnc.html?host=cyberex&port=6080"
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