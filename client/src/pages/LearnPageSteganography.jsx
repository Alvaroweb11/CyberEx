import '../css/style.css';
import { Layout } from "../layout/Layout"

export function LearnPageSteganography() {
    return (
        <Layout>
            <div className="jumbotron star-background vertical-align-custom"></div>

            <div className="container main" style={{ textAlign: "justify" }}>
                <div className="home-break"></div>

                <h3 className="bold-header size-18">¿Qué es la Esteganografía?</h3>
                <div className="titleunderline"></div>
                <p className="text-lgray size-18">
                    La esteganografía es la práctica de ocultar información dentro de otro conjunto de datos
                    aparentemente inocuos. A diferencia de la criptografía, que se centra en proteger la
                    información mediante el cifrado, la esteganografía se enfoca en ocultar la existencia de
                    la información. El objetivo es que nadie, salvo el destinatario previsto, sepa que existe
                    un mensaje secreto.
                </p>

                <div className="home-break"></div>

                <h3 className="bold-header size-18">Características Claves de la Esteganografía</h3>
                <div className="titleunderline"></div>
                <p className="text-lgray size-18">
                    <li><strong>Imperceptibilidad:</strong> La información oculta no debe ser perceptible para el observador casual.</li>
                    <li><strong>Resiliencia:</strong> El mensaje oculto debe resistir intentos de eliminación o alteración intencional o no intencional.</li>
                    <li><strong>Capacidad:</strong> La cantidad de información que puede ser oculta dentro de los datos de cubierta debe ser suficiente para el propósito deseado.</li>
                </p>

                <div className="home-break"></div>

                <h3 className="bold-header size-18">Usos Comunes de la Esteganografía</h3>
                <div className="titleunderline"></div>
                <p className="text-lgray size-18">
                    <li><strong>Comunicación Secreta:</strong> Enviar mensajes ocultos sin que terceros sospechen de su existencia.</li>
                    <li><strong>Marca de Agua Digital:</strong> Proteger los derechos de autor de imágenes, videos y otros contenidos digitales mediante la inserción de información de propiedad.</li>
                    <li><strong>Protección de Datos:</strong> Ocultar información sensible para evitar que sea fácilmente accesible.</li>
                </p>

                <div className="home-break"></div>

                <h3 className="bold-header size-18">Métodos Comunes de Esteganografía</h3>
                <div className="titleunderline"></div>
                <p className="text-lgray size-18">
                    <li><strong>Esteganografía en Imágenes:</strong> Ocultar datos dentro de las imágenes alterando ligeramente los píxeles. Un método común es el LSB (Least Significant Bit), donde se modifican los bits menos significativos de los píxeles.</li>
                    <li><strong>Esteganografía en Audio:</strong> Ocultar información en archivos de audio modificando las muestras de audio de manera que no sea perceptible para el oído humano.</li>
                    <li><strong>Esteganografía en Texto:</strong> Utilizar caracteres invisibles o modificaciones sutiles en el formato del texto para ocultar información.</li>
                </p>

                <div className="home-break"></div>

                <h3 className="bold-header size-18">Conclusión</h3>
                <div className="titleunderline"></div>
                <p className="text-lgray size-18">
                    La esteganografía es una técnica útil en ciberseguridad para ocultar información dentro 
                    de otros datos. Comprender cómo funcionan las técnicas esteganográficas y sus 
                    aplicaciones te permitirá proteger mejor la información en diversos contextos.
                </p>

                <div className="home-break"></div>
            </div>
        </Layout>
    )
}