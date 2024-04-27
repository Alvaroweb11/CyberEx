import '../css/style.css';
import { Layout } from "../layout/Layout"
import { Board } from '../components/board';
import { useEffect, useState } from 'react';
import { getRanking } from '../utils';

export function LeaderboardPage() {
    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const data = await getRanking();
                setRanking(data.ranking);
            } catch (error) {
                console.error(error);
            }
        }

        fetchRanking();
    }, []);

    return (
        <Layout>
            <div className="jumbotron star-background vertical-align-custom"></div>

            <div className="container main">

                <div className="home-break"></div>

                <Board ranking={ranking}></Board>

                <div className="home-break"></div>

            </div>

        </Layout>
    )
}