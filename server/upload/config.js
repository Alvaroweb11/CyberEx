const fs = require('fs');
const path = require('path');
const { getUserName } = require('../controllers/auth');

const uploadFiles = async (req, res) => {
    try {
        if (!req.files) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }

        const { uid } = req.body;
        const file = req.files.file;

        // Verifica la extensión del archivo
        const ext = path.extname(file.name);
        const allowedExtensions = ['.rar', '.zip', '.tar.gz'];

        if (!allowedExtensions.includes(ext)) {
            return res.status(400).json({ msg: 'Invalid file extension' });
        }
        
        // Construye una ruta al directorio 'repository'
        const uploadDir = path.resolve(__dirname, '..', '..', 'repository', 'admin');

        const uploadPath = path.join(uploadDir, uid, file.name);

        file.mv(uploadPath, err => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            res.json({ 
                ok: true,
                data: {
                    fileName: file.name,
                    fileSize: file.size,
                    fileType: file.mimetype
                }
            });
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const getFiles = async (req, res) => {
    try {
        const baseDir = path.resolve(__dirname, '..', '..', 'repository');
        let userDirs = await fs.promises.readdir(baseDir);

        // Filtrar directorios que no son numéricos
        userDirs = userDirs.filter(dir => !isNaN(dir));

        const allFiles = [];

        for (const uid of userDirs) {
            const userDir = path.join(baseDir, uid);
            const files = await fs.promises.readdir(userDir);

            const userName = await getUserName(Number(uid));

            const data = files.map(file => {
                const stats = fs.statSync(path.join(userDir, file));
                return {
                    uid: uid,
                    name: file,
                    user: userName,
                    size: stats.size,
                    date: stats.birthtime,
                    category: 'Desconocida'
                }
            });

            allFiles.push(...data);
        }

        res.json({ files: allFiles });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const getOwnFiles = async (req, res) => {
    try {
        const { uid } = req.body;
        const userDir = path.resolve(__dirname, '..', '..', 'repository', String(uid));

        const files = await fs.promises.readdir(userDir);

        const data = files.map(file => {
            const stats = fs.statSync(path.join(userDir, file));
            return {
                name: file,
                size: stats.size,
                date: stats.birthtime,
                category: 'Desconocida'
            }
        });

        res.json({ files: data });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const deleteFiles = async (req, res) => {
    try {
        const { uid, fileName } = req.body;
        const userDir = path.resolve(__dirname, '..', '..', 'repository', String(uid));
        const filePath = path.join(userDir, fileName);

        fs.unlinkSync(filePath);

        res.json({ ok: true });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const downloadFiles = async (req, res) => {
    try {
        const { uid, fileName } = req.body;
        const userDir = path.resolve(__dirname, '..', '..', 'repository', String(uid));
        const filePath = path.join(userDir, fileName);

        res.download(filePath, fileName);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

module.exports = {
    uploadFiles,
    getFiles,
    getOwnFiles,
    deleteFiles,
    downloadFiles
}