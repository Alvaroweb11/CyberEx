import '../css/style.css';
import { Layout } from "../layout/Layout"
import { TeoryList } from "../components/TeoryList"

export function LearnPage() {
    return (
        <Layout>
            <div className="jumbotron star-background vertical-align-custom"></div>

            <div className="container main">
                <div className="home-break"></div>
                <TeoryList />
                <div className="home-break"></div>
            </div>
        </Layout>
    )
}