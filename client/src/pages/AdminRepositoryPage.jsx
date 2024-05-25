import '../css/style.css';
import { Layout } from "../layout/Layout";
import { useEffect, useState } from 'react';
import { getAdminFiles, approveAdminFiles, deleteAdminFiles, downloadAdminFiles, addPoints } from '../utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Swal from 'sweetalert2';

export function AdminRepositoryPage() {
    const [files, setFiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filesPerPage, setFilesPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchUser, setSearchUser] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState("");

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const data = await getAdminFiles();
                setFiles(data.files);
            } catch (error) {
                console.error(error);
            }
        }

        fetchFiles();
    }, []);

    async function downloadAdminFile(username, fileName) {
        try {
            const blob = await downloadAdminFiles({ username, fileName });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();
        } catch (error) {
            console.error(error);
        }
    }

    async function approveAdminFile(username, fileName, selectedCategory, selectedDifficulty) {
        try {
            await approveAdminFiles({ username, fileName, selectedCategory, selectedDifficulty });

            // Añadir puntos al usuario
            const points = formatPoints(selectedDifficulty);
            await addPoints({ username, points });

            // Volver a buscar los archivos del servidor después de la eliminación
            const data = await getAdminFiles();
            setFiles(data.files);
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteAdminFile(username, fileName) {
        try {
            await deleteAdminFiles({ username, fileName });

            // Volver a buscar los archivos del servidor después de la eliminación
            const data = await getAdminFiles();
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

    function formatPoints(points) {
        const pointsMap = {
            "facil": 25,
            "media": 50,
            "dificil": 75,
        };

        return pointsMap[points] || 0;
    }

    const filteredFiles = files
        .filter(file => file.name.toLowerCase().includes(searchTerm.toLowerCase()) && file.user.toLowerCase().includes(searchUser.toLowerCase()))
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <Layout>
            <div className="jumbotron star-background vertical-align-custom"></div>

            <div className="container main">

                <div className="home-break"></div>

                <div>
                    <div className="filter-container">
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
                            <span>
                                Usuario:
                                <input type="text" placeholder="Nombre del Usuario" style={{ marginRight: "100px" }} onChange={(e) => setSearchUser(e.target.value)} />
                            </span>
                        </div>
                    </div>

                    <table className="repository-table">
                        <thead>
                            <tr>
                                <th>Nombre del fichero</th>
                                <th>Categoría</th>
                                <th>Dificultad</th>
                                <th>Usuario</th>
                                <th>Tamaño</th>
                                <th>Fecha de subida</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFiles
                                .slice((currentPage - 1) * filesPerPage, currentPage * filesPerPage)
                                .map((file, index) => (
                                    <tr key={index}>
                                        <td><button onClick={() => { downloadAdminFile(file.user, file.name) }}>{file.name}</button></td>
                                        <td>
                                            <select value={selectedCategory[index] || ''} onChange={(e) => setSelectedCategory({ ...selectedCategory, [index]: e.target.value })}>
                                                <option value="" disabled hidden>Categoría</option>
                                                <option value="hash">Hash</option>
                                                <option value="steganography">Steganography</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select value={selectedDifficulty[index] || ''} onChange={(e) => setSelectedDifficulty({ ...selectedDifficulty, [index]: e.target.value })}>
                                                <option value="" disabled hidden>Dificultad</option>
                                                <option value="facil">Fácil</option>
                                                <option value="media">Media</option>
                                                <option value="dificil">Difícil</option>
                                            </select>
                                        </td>
                                        <td>{file.user}</td>
                                        <td>{formatFileSize(file.size)}</td>
                                        <td>{formatDate(file.date)}</td>
                                        <td><button onClick={() => {
                                            if (selectedCategory[index] === "" || selectedCategory[index] === undefined) {
                                                return Swal.fire('Error', 'Especifica la categoría', 'error');
                                            } else if (selectedDifficulty[index] === "" || selectedDifficulty[index] === undefined) {
                                                return Swal.fire('Error', 'Especifica la dificultad', 'error');
                                            }
                                            approveAdminFile(file.user, file.name, selectedCategory[index], selectedDifficulty[index]);
                                            setSelectedCategory({});
                                            setSelectedDifficulty({});
                                        }}>&#10004;</button></td>
                                        <td><button onClick={() => { deleteAdminFile(file.user, file.name) }}>&#10060;</button></td>
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