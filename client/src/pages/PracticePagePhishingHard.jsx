import '../css/style.css';
import { Layout } from "../layout/Layout"
import React, { useState, useEffect } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { useForm } from "../hooks/useForm"
import Swal from 'sweetalert2'
import { useSelector, useDispatch } from "react-redux";
import { updateTasks, updateTraceability } from "../store/slices/auth"

export function PracticePagePhishingHard() {
    const { uid } = useSelector(state => state.auth);
    const { points, phishingHardTask1 } = useSelector(state => state.tasks);
    const [point, setPoints] = useState(points);

    useEffect(() => {
        setPoints(points);
    }, [points]);

    const [isOpen1, setIsOpen1] = useState(false);

    const [isAnswer1Correct, setIsAnswer1Correct] = useState(phishingHardTask1);
    const [isAnswer1Hinted, setIsAnswer1Hinted] = useState(false);

    useEffect(() => {
        setIsAnswer1Correct(phishingHardTask1);
    }, [phishingHardTask1]);

    const { onChange, answer1 } = useForm({
        answer1: "",
    });

    const dispatch = useDispatch();

    const [pointsTask1, setPointsTask1] = useState(200);
    const [phishingHardTask1Started, setPhishingHardTask1Started] = useState(localStorage.getItem('phishingHardTask1Started') === 'true');

    useEffect(() => {
        let task1Timer1;
        let task1Timer2;
        if (phishingHardTask1Started) {
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
    }, [phishingHardTask1Started, pointsTask1]);

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

                        <div className="card" id="task-1" style={{ marginBottom: "15px" }}>
                            <div className="card-header" role="button" onClick={() => {
                                setIsOpen1(!isOpen1);
                                setPhishingHardTask1Started(true);
                                localStorage.setItem('phishingHardTask1Started', 'true');
                            }}>
                                <div className="card-link">
                                    <span className="task-dropdown-title">
                                        <span className={`task-dropdown-text ${isAnswer1Correct ? 'text-green' : 'text-red'}`}>Task 1</span>
                                        <span className="task-dropdown-icon">
                                            <i className={`far ${isAnswer1Correct ? 'fa-check-circle text-green' : 'fa-circle text-lgray'}`}></i>
                                        </span>
                                    </span>
                                    <span className="exercise-text">Detección de Phishing</span>
                                    <i className="fas fa-chevron-down float-right"></i>
                                </div>
                            </div>

                            <Collapse in={isOpen1} style={{ visibility: isOpen1 ? 'visible' : 'collapse' }}>
                                <div className="card-container">
                                    <div className="card-body">
                                        <div className="room-task-desc">
                                            <p style={{ textAlign: "justify", marginBottom: "10px" }}>
                                                A continuación se muestra un correo electrónico que podría ser sospechoso de ser un intento de phishing. Identifica los elementos que indican que es un correo fraudulento:
                                            </p>

                                            <p style={{ textAlign: "justify", marginBottom: "10px", fontFamily: "monospace", backgroundColor: "#f8f9fa", padding: "10px", borderRadius: "5px" }}>
                                                <b>De:</b> security@amazon-support.com<br />
                                                <b>Asunto:</b> Urgente: Problema con tu cuenta<br />
                                                <b>Mensaje:</b><br />
                                                Estimado cliente,<br /><br />
                                                Hemos encontrado un problema con tu cuenta de Amazon. Para resolverlo, por favor inicia sesión a través del siguiente enlace:<br />
                                                <a href="https://amazon-suport.com/login" style={{ color: "blue" }}>https://amazon-suport.com/login</a><br /><br />
                                                Si no resuelves este problema en 24 horas, tu cuenta será suspendida.<br /><br />
                                                Gracias,<br />
                                                Equipo de Seguridad de Amazon
                                            </p>
                                        </div>

                                        <div className="card-questions vertical-align-custom text-lgray">
                                            <div>Responde las siguientes preguntas</div>
                                        </div>

                                        <div className="card-answer">
                                            <p style={{ textAlign: "justify", marginTop: "10px", marginBottom: "10px" }}>
                                                Identifica al menos tres indicios de que este correo es un intento de phishing:
                                            </p>

                                            <div className="card-answer-input row">
                                                <div className="card-answer-text col-sm-8">
                                                    <input
                                                        className="form-control"
                                                        value={answer1}
                                                        onChange={onChange}
                                                        type="text"
                                                        name="answer1"
                                                        placeholder={`${isAnswer1Correct ? 'https://amazon-suport.com/login' : 'Answer format: *******************************'}`}
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
                                                                    text: 'Verifica el dominio del enlace.'
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
                                                                text: 'Verifica el dominio del enlace.'
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
                                                            if (answer1 !== "https://amazon-suport.com/login") {
                                                                return Swal.fire({
                                                                    icon: 'error',
                                                                    title: 'Respuesta incorrecta'
                                                                })
                                                            }
                                                            setIsAnswer1Correct(true);
                                                            dispatch(updateTasks({ uid, points: point + pointsTask1, phishingHardTask1: 1 }))
                                                            dispatch(updateTraceability({ uid, phishingHardTask1: pointsTask1 }))
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

                        <div className="home-break"></div>
                    </div>
                </Layout>
            </div>

        </div>
    )
}