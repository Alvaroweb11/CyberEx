import '../css/style.css';
import { Layout } from "../layout/Layout";
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { getFiles } from '../utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { downloadFiles } from '../utils';

export function AdminRepositoryPage() {
    const [files, setFiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filesPerPage, setFilesPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const data = await getFiles();
                setFiles(data.files);
            } catch (error) {
                console.error(error);
            }
        }

        fetchFiles();
    }, []);

    async function downloadFile(uid, fileName) {
        try {
            const blob = await downloadFiles({ uid, fileName });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();
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

    const categories = [...new Set(files.map(file => file.category))];

    const filteredFiles = files
        .filter(file => file.name.includes(searchTerm) && (categoryFilter === "" || file.category === categoryFilter))
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
                            <span>Filtrar por categoría:
                                <select onChange={(e) => setCategoryFilter(e.target.value)}>
                                    <option value="">Todas las categorías</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                </select>
                            </span>
                        </div>
                    </div>

                    <table className="repository-table">
                        <thead>
                            <tr>
                                <th>Nombre del fichero</th>
                                <th>Categoría</th>
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
                                        <td><button onClick={() => { downloadFile(file.name) }}>{file.name}</button></td>
                                        <td>{file.category}</td>
                                        <td>{file.user}</td>
                                        <td>{formatFileSize(file.size)}</td>
                                        <td>{formatDate(file.date)}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <div className="pagination-container">
                        <span>Mostrando página {currentPage} de {Math.ceil(filteredFiles.length / filesPerPage)}</span>
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