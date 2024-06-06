import '../css/style.css';
import { Layout } from "../layout/Layout"

export function LearnPageHash() {
    return (
        <Layout>
            <div className="jumbotron star-background vertical-align-custom"></div>

            <div className="container main" style={{ textAlign: "justify" }}>
                <div className="home-break"></div>

                <h3 className="bold-header size-18">¿Qué es un Hash?</h3>
                <div className="titleunderline"></div>
                <p className="text-lgray size-18">
                    Un hash es una función matemática que convierte un conjunto arbitrario de datos (como un
                    archivo o un mensaje) en una cadena de longitud fija. Esta cadena se conoce como valor
                    hash, resumen hash o simplemente hash. Los hashes son fundamentales en ciberseguridad
                    porque permiten verificar la integridad de los datos y autenticar información sin
                    necesidad de conocer su contenido.
                </p>

                <div className="home-break"></div>

                <h3 className="bold-header size-18">Características Claves de las Funciones Hash</h3>
                <div className="titleunderline"></div>
                <p className="text-lgray size-18">
                    <li><strong>Determinismo:</strong> La misma entrada siempre producirá el mismo hash.</li>
                    <li><strong>Eficiencia:</strong> Las funciones hash deben ser rápidas de calcular.</li>
                    <li><strong>Preimagen Resistente:</strong> Dado un hash <code>h</code>, debe ser difícil encontrar una entrada <code>x</code> tal que <code>hash(x) = h</code>.</li>
                    <li><strong>Segunda Preimagen Resistente:</strong> Dado un <code>x1</code> y su hash <code>h</code>, debe ser difícil encontrar otro <code>x2</code> tal que <code>hash(x2) = h</code>.</li>
                    <li><strong>Resistencia a Colisiones:</strong> Debe ser difícil encontrar dos entradas diferentes <code>x1</code> y <code>x2</code> que produzcan el mismo hash <code>h</code>.</li>
                </p>

                <div className="home-break"></div>

                <h3 className="bold-header size-18">Usos Comunes de los Hashes en Ciberseguridad</h3>
                <div className="titleunderline"></div>
                <p className="text-lgray size-18">
                    <li><strong>Verificación de Integridad:</strong> Los hashes aseguran que los datos no han sido alterados. Por ejemplo, al descargar software, los hashes permiten verificar que el archivo no ha sido modificado.</li>
                    <li><strong>Almacenamiento Seguro de Contraseñas:</strong> En lugar de almacenar contraseñas en texto plano, se almacenan los hashes de las contraseñas. Incluso si se compromete la base de datos, las contraseñas reales no quedan expuestas.</li>
                    <li><strong>Firmas Digitales:</strong> Las firmas digitales utilizan hashes para asegurar que un documento o mensaje no ha sido alterado desde que fue firmado.</li>
                </p>

                <div className="home-break"></div>

                <h3 className="bold-header size-18">Ejemplos de Funciones Hash</h3>
                <div className="titleunderline"></div>
                <p className="text-lgray size-18">
                <li><strong>MD5 (Message Digest Algorithm 5):</strong> Produce un hash de 128 bits. Aunque es rápido, ya no se considera seguro debido a sus vulnerabilidades a colisiones.</li>
                    <li><strong>SHA-1 (Secure Hash Algorithm 1):</strong> Produce un hash de 160 bits. También ha sido comprometido y no se recomienda para uso criptográfico.</li>
                    <li><strong>SHA-256:</strong> Parte de la familia SHA-2, produce un hash de 256 bits y es ampliamente utilizado y considerado seguro para la mayoría de las aplicaciones.</li>
                </p>

                <div className="home-break"></div>

                <h3 className="bold-header size-18">Conclusión</h3>
                <div className="titleunderline"></div>
                <p className="text-lgray size-18">
                    El hashing es una herramienta poderosa en ciberseguridad para proteger datos y verificar 
                    su integridad. Comprender cómo funcionan las funciones hash y sus aplicaciones te 
                    permitirá asegurar mejor la información en diversos contextos.
                </p>

                <div className="home-break"></div>
            </div>
        </Layout>
    )
}