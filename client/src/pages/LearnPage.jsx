import '../css/style.css';
import { Layout } from "../layout/Layout"

export function LearnPage() {
    return (
        <Layout>
            <div className="jumbotron star-background vertical-align-custom"></div>

            <div className="container main">
                <div className="home-break"></div>

                <h1 style={{textAlign: "center", fontSize: "100px", fontWeight: "bold" }}>PROXIMAMENTE</h1>               
                
                <div className="home-break"></div>
            </div>
        </Layout>
    )
}