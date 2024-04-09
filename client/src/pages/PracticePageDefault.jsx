import '../css/style.css';
import { Layout } from "../layout/Layout"

export function PracticePage() {
    return (
        <Layout>
            <div className="jumbotron star-background vertical-align-custom"></div>

            <div className="container main">

                <div className="home-break"></div>

                <div className="card" id="task-1">
                    <div className="card-header">
                        <a className="card-link">
                            <span className="task-dropdown-title">
                                <span className="task-dropdown-text">Task 1</span>
                                <span className="task-dropdown-icon">
                                    <i className="far fa-circle text-lgray"></i>
                                </span>
                            </span>
                            <span className="exercise-text">Example</span>
                            <i className="fas fa-chevron-down float-right"></i>
                        </a>
                    </div>

                    <div className="card-container">
                        <div className="card-body">
                            <div className="room-task-desc">
                                <button type="button" className="btn btn-success start-btn" onclick="deploy" disabled="">
                                    <i className="fas fa-play mr-2"></i> Start Machine
                                </button>

                                {/* <p style={{ textAlign: "center" }}>
                                    <img src="https://i.imgur.com/o9pyhyU.jpg" style={{ width: "161.484px", height: "161.484px" }}></img>
                                </p> */}

                                <p style={{ textAlign: "justify" }}>
                                    This Rick and Morty-themed challenge requires you to exploit a web server and find three ingredients
                                    to help Rick make his potion and transform himself back into a human from a pickle.
                                </p>

                                <p style={{ textAlign: "justify" }}>
                                    Deploy the virtual machine on this task and explore the web application.
                                </p>
                            </div>

                            <div className="card-questions vertical-align-custom text-lgray">
                                <div>Answer the questions below</div>
                            </div>

                            <div className="card-answer">
                                <p>
                                    What is the first ingredient that Rick needs?
                                </p>

                                <div className="card-answer-input row">
                                    <div className="card-answer-text col-sm-9">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Answer format: **. ******* ****"
                                            // value={answer}
                                            value="">
                                        </input>
                                    </div>

                                    <div className="card-answer-submit col-sm-3">
                                        <button type="button" className="btn btn-outline-success" onclick="answerQuestion">
                                            <i className="far fa-paper-plane"></i> Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="home-break"></div>
            </div>
        </Layout>
    )
}
