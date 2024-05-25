import '../css/style.css';
import { Layout } from "../layout/Layout";
import { useEffect, useState, useRef } from 'react';
import { useSelector } from "react-redux";
import { getOwnFiles, deleteFiles, downloadFiles } from '../utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { uploadFiles } from '../utils/uploadFiles';
import Swal from 'sweetalert2';

export function MyRepositoryPage() {
    const { uid } = useSelector(state => state.auth);
    const [files, setFiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filesPerPage, setFilesPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [difficultyFilter, setDifficultyFilter] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const data = await getOwnFiles({ uid });
                setFiles(data.files);
                setLoading(true);
            } catch (error) {
                console.error(error);
            }
        }

        fetchFiles();
    }, []);

    const fileInput = useRef();

    const handleClick = () => {
        fileInput.current.click();
    };

    async function downloadFile(username, fileName, category, difficulty) {
        try {
            const blob = await downloadFiles({ username, fileName, category, difficulty });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteFile(fileName, category, difficulty) {
        try {
            await deleteFiles({ uid, fileName, category, difficulty });

            // Actualizar la lista de archivos después de la eliminación
            const data = await getOwnFiles({ uid });
            setFiles(data.files);
        } catch (error) {
            console.error(error);
        }
    }

    function formatFileSize(size) {
        const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
        return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
    }

    function formatDate(date) {
        return format(new Date(date), "d 'de' MMMM 'de' yyyy, HH:mm'h'", { locale: es });
    }

    function formatDifficulty(difficulty) {
        const difficultyMap = {
            "facil": "Fácil",
            "media": "Media",
            "dificil": "Difícil",
        };
    
        return difficultyMap[difficulty] || difficulty;
    }

    const categories = [...new Set(files.map(file => file.category))];
    const difficulties = [...new Set(files.map(file => file.difficulty))];

    const filteredFiles = files
        .filter(file => file.name.toLowerCase().includes(searchTerm.toLowerCase()) && (categoryFilter === "" || file.category === categoryFilter) && (difficultyFilter === "" || file.difficulty === difficultyFilter))
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    useEffect(() => {
        if (loading) {
            if (files.length === 0) {
                Swal.fire({
                    title: 'Bienvenido a tu repositorio',
                    html: `<p>Aquí podrás subir tus propios ejercicios para que los resuelvan los demás usuarios.</p>
                           <br>
                           <p>Por cada fichero  subido al repositorio y aprobado por los administradores, recibirás:</p>
                           <p>• 25 CP por cada uno calificado como FÁCIL</p>
                           <p>• 50 CP por cada uno calificado como MEDIO</p>
                           <p>• 27 CP por cada uno calificado como DIFÍCIL</p>
                           <br>
                           <p>Adjunta también un .txt en el archivo que indique la categoría y dificultad del ejercicio.</p>`,
                    icon: 'info',
                    confirmButtonText: 'Entendido'
                });
            }
        }
    }, [loading]);

    return (
        <Layout>
            <div className="jumbotron star-background vertical-align-custom"></div>

            <div className="container main">

                <div className="home-break"></div>

                <div className="board">
                    <h1 className='leaderboard'>MI REPOSITORIO</h1>
                </div>

                <div>
                    <input type="file" ref={fileInput} onChange={() => uploadFiles(uid, fileInput.current.files[0])} style={{ display: 'none' }} />
                    <div className="upload-icon-container" onClick={handleClick}>
                        <img width="50" src="/images/nuevo.png" />
                        <label>Subir</label>
                    </div>
                </div>

                <div className="filter-table-own-container">
                    <div className="filter-own-container">
                        <span>
                            Mostrando
                            <select onChange={(e) => setFilesPerPage(e.target.value)}>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </select>
                            ficheros por página
                        </span>
                        <div>
                            <span>
                                Buscar:
                                <input type="text" placeholder="Nombre del Fichero" onChange={(e) => setSearchTerm(e.target.value)} />
                            </span>
                            <span>Filtrar por categoría:
                                <select onChange={(e) => setCategoryFilter(e.target.value)}>
                                    <option value="">Todas las categorías</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                </select>
                            </span>
                            <span>Filtrar por dificultad:
                                <select onChange={(e) => setDifficultyFilter(e.target.value)}>
                                    <option value="">Todas las dificultades</option>
                                    {difficulties.map((difficulty, index) => (
                                        <option key={index} value={difficulty}>{formatDifficulty(difficulty)}</option>
                                    ))}
                                </select>
                            </span>
                        </div>
                    </div>

                    <table className="own-repository-table">
                        <thead>
                            <tr>
                                <th>Nombre del fichero</th>
                                <th>Categoría</th>
                                <th>Dificultad</th>
                                <th>Tamaño</th>
                                <th>Fecha de subida</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFiles
                                .slice((currentPage - 1) * filesPerPage, currentPage * filesPerPage)
                                .map((file, index) => (
                                    <tr key={index}>
                                        <td><button onClick={() => { downloadFile(file.user, file.name, file.category, file.difficulty) }}>{file.name}</button></td>
                                        <td>{file.category.charAt(0).toUpperCase() + file.category.slice(1)}</td>
                                        <td>{formatDifficulty(file.difficulty)}</td>
                                        <td>{formatFileSize(file.size)}</td>
                                        <td>{formatDate(file.date)}</td>
                                        <td><button onClick={() => { deleteFile(file.name, file.category, file.difficulty) }}>&#10060;</button></td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>

                    <div className="pagination-container">
                        <span>Mostrando página {currentPage} de {filteredFiles.length === 0 ? 1 : Math.ceil(filteredFiles.length / filesPerPage)}</span>
                        <div>
                            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                                Anterior
                            </button>
                            {[...Array(Math.ceil(filteredFiles.length / filesPerPage)).keys()].map((page, index) => {
                                if (page === 0 || page === currentPage - 2 || page === currentPage - 1 || page === currentPage || page === Math.ceil(filteredFiles.length / filesPerPage) - 1) {
                                    return (
                                        <button key={index} onClick={() => setCurrentPage(page + 1)} className={currentPage === page + 1 ? 'active' : ''}>
                                            {page + 1}
                                        </button>
                                    )
                                } else if (page === currentPage - 3 || page === currentPage + 1) {
                                    return <span key={index}>...</span>
                                }
                            })}
                            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(filteredFiles.length / filesPerPage)}>
                                Siguiente
                            </button>
                        </div>
                    </div>
                </div>

                <div className="home-break"></div>
            </div>
        </Layout>
    )
}