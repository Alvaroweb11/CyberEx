import '../css/style.css';
import { Layout } from "../layout/Layout"
import { ExerciseList } from "../components/ExerciseList"

export function PracticePage() {
    return (
        <Layout>
            <div className="jumbotron star-background vertical-align-custom"></div>

            <div className="container main">

                <div className="home-break"></div>

                <ExerciseList />

                <div className="home-break"></div>
            </div>
        </Layout>
    )
}
