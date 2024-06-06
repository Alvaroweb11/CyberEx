import '../css/style.css';
import { Layout } from "../layout/Layout"

export function LearnPagePhishing() {
    return (
        <Layout>
            <div className="jumbotron star-background vertical-align-custom"></div>

            <div className="container main" style={{ textAlign: "justify" }}>
                <div className="home-break"></div>

                <h3 className="bold-header size-18">¿Qué es el Phishing?</h3>
                <div className="titleunderline"></div>
                <p className="text-lgray size-18">
                    El phishing es una técnica de ingeniería social utilizada por ciberdelincuentes para
                    engañar a las personas y hacer que revelen información confidencial, como nombres de
                    usuario, contraseñas, números de tarjetas de crédito y otra información personal. Esto
                    se realiza mediante el envío de mensajes fraudulentos que aparentan ser de fuentes
                    confiables.
                </p>

                <div className="home-break"></div>

                <h3 className="bold-header size-18">Características Claves del Phishing</h3>
                <div className="titleunderline"></div>
                <p className="text-lgray size-18">
                    <li><strong>Falsificación de Identidad:</strong> Los atacantes se hacen pasar por entidades legítimas, como bancos, servicios de correo electrónico o redes sociales.</li>
                    <li><strong>Urgencia o Amenaza:</strong> Los mensajes suelen contener amenazas o situaciones urgentes para incitar a la víctima a actuar rápidamente sin pensar.</li>
                    <li><strong>Enlaces Falsos:</strong> Los correos electrónicos o mensajes de phishing a menudo contienen enlaces que redirigen a sitios web falsificados.</li>
                </p>

                <div className="home-break"></div>

                <h3 className="bold-header size-18">Tipos Comunes de Phishing</h3>
                <div className="titleunderline"></div>
                <p className="text-lgray size-18">
                    <li><strong>Phishing por Correo Electrónico:</strong> El método más común, donde los atacantes envían correos electrónicos fraudulentos para engañar a las víctimas.</li>
                    <li><strong>Smishing:</strong> Phishing a través de mensajes SMS.</li>
                    <li><strong>Vishing:</strong> Phishing a través de llamadas telefónicas, donde los atacantes se hacen pasar por representantes de entidades confiables.</li>
                    <li><strong>Phishing Spear:</strong> Ataques de phishing dirigidos específicamente a individuos o empresas particulares, utilizando información personalizada.</li>
                </p>

                <div className="home-break"></div>

                <h3 className="bold-header size-18">Conclusión</h3>
                <div className="titleunderline"></div>
                <p className="text-lgray size-18">
                    El phishing es una amenaza seria en ciberseguridad que se basa en engañar a las personas 
                    para que revelen información confidencial. Aprender a reconocer y evitar los intentos de 
                    phishing es crucial para proteger tu información personal y mantener la seguridad en línea.
                </p>

                <div className="home-break"></div>
            </div>
        </Layout>
    )
}