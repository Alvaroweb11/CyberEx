import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import '../css/style.css';
import { Layout } from "../layout/Layout";
import { ExerciseList } from "../components/ExerciseList";

export function PracticePage() {
    const { points, status } = useSelector(state => state.tasks);

    useEffect(() => {
        if (status) {
            if (points === 0) {
                Swal.fire({
                    title: 'Bienvenido a los ejercicios',
                    html: `<p>Los ejercicios fáciles puntúan sobre 100.</p>
                           <p>Los ejercicios difíciles puntúan sobre 200.</p>
                           <br>
                           <p>Tras 10 minutos, la puntuación bajará 1 CP por minuto.</p>
                           <p>El tiempo comienza a correr al iniciar la máquina.</p>
                           <br>
                           <p>Puedes canjear pistas por 20 CP.</p>
                           <br>
                           <p>(La constraseña para las máquinas es: CyberEx)</p>`,
                    icon: 'info',
                    confirmButtonText: 'Entendido'
                });
            }
        }
    }, [points, status]);

    return (
        <Layout>
            <div className="jumbotron star-background vertical-align-custom"></div>
            <div className="container main">
                <div className="home-break"></div>
                <ExerciseList />
                <div className="home-break"></div>
            </div>
        </Layout>
    );
}