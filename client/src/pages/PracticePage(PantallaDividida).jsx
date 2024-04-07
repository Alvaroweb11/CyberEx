import React from 'react';
import '../css/style.css';
import { Layout } from "../layout/Layout";

export function PracticePage() {
    return (
        <div className="practice-container">
            <div className="col-sm-6">
                <Layout halfScreen>
                    <div className="star-background vertical-align-custom">
                        <section className="short-home-container container seccion">
                            <div className="col-md-10">
                                <h2 className="display-4">‎</h2>
                            </div>
                        </section>
                    </div>

                    <div className="container main">
                        <div className="row vertical-align-custom">
                            <div className="home-break"></div>
                            <div className="row vertical-align-custom">
                                <div className="col-sm-7">
                                    <h3 className="bold-header">Aprende y compite</h3>
                                    <div className="titleunderline"></div>
                                    <p className="text-lgray size-18">Aprender ciberseguridad también puede ser divertido. Completa los
                                        objetivos y obtén puntos para escalar posiciones en el ranking.</p>
                                </div>
                                <div className="col-sm-5">
                                    <img src="/images/1.jpeg" style={{ width: '100%' }} />
                                </div>
                            </div>
                            <div className="home-break"></div>
                            <div className="row vertical-align-custom">
                                <div className="col-sm-5">
                                    <img src="/images/2.jpg" style={{ width: '100%' }} />
                                </div>
                                <div className="col-sm-7">
                                    <h3 className="bold-header">Elige tu camino</h3>
                                    <div className="titleunderline"></div>
                                    <p className="text-lgray size-18">Toma tu camino preferido en la ciberseguridad y mejora tus habilidades en
                                        simulaciones realistas realizando tareas guiadas y desafíos donde poner a prueba lo aprendido.
                                    </p>
                                </div>
                            </div>
                            <div className="home-break"></div>
                        </div>
                    </div>
                </Layout>
            </div>
            <div className="col-sm-6">
                {/* IFrame para mostrar la interfaz del sistema operativo */}
                <iframe
                    title="Interfaz del SO"
                    src="https://localhost:6901"
                    width="100%"
                    height="100%"
                    style={{ border: 'none' }}
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}
