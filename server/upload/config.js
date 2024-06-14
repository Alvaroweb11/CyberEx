const fs = require('fs');
const path = require('path');
const { getUserName, getUserId } = require('../controllers/auth');

const uploadFiles = async (req, res) => {
    try {
        if (!req.files) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }

        const { uid } = req.body;
        const file = req.files.file;

        const ext = path.extname(file.name);
        const allowedExtensions = ['.rar', '.zip', '.tar.gz'];

        if (!allowedExtensions.includes(ext)) {
            return res.status(412).json({ msg: 'Invalid file extension' });
        }

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

        userDirs = userDirs.filter(dir => !isNaN(dir));

        const allFiles = [];

        for (const uid of userDirs) {
            const userDir = path.join(baseDir, uid);
            const categories = await fs.promises.readdir(userDir);

            for (const category of categories) {
                const categoryDir = path.join(userDir, category);
                const difficulties = await fs.promises.readdir(categoryDir);

                for (const difficulty of difficulties) {
                    const difficultyDir = path.join(categoryDir, difficulty);
                    const files = await fs.promises.readdir(difficultyDir);

                    const userName = await getUserName(Number(uid));

                    const data = files.map(file => {
                        const stats = fs.statSync(path.join(difficultyDir, file));
                        return {
                            uid: uid,
                            name: file,
                            user: userName,
                            size: stats.size,
                            date: stats.birthtime,
                            category: category,
                            difficulty: difficulty
                        }
                    });

                    allFiles.push(...data);
                }
            }
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

        let categories = [];
        if (fs.existsSync(userDir)) {
            categories = await fs.promises.readdir(userDir);
        }

        const allFiles = [];

        for (const category of categories) {
            const categoryDir = path.join(userDir, category);
            const difficulties = await fs.promises.readdir(categoryDir);

            for (const difficulty of difficulties) {
                const difficultyDir = path.join(categoryDir, difficulty);
                const files = await fs.promises.readdir(difficultyDir);

                const userName = await getUserName(Number(uid));

                const data = files.map(file => {
                    const stats = fs.statSync(path.join(difficultyDir, file));
                    return {
                        name: file,
                        user: userName,
                        size: stats.size,
                        date: stats.birthtime,
                        category: category,
                        difficulty: difficulty
                    }
                });

                allFiles.push(...data);
            }
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

const deleteFiles = async (req, res) => {
    try {
        const { uid, fileName, category, difficulty } = req.body;
        const userDir = path.resolve(__dirname, '..', '..', 'repository', String(uid));
        const categoryDir = path.join(userDir, category);
        const difficultyDir = path.join(categoryDir, difficulty);
        const filePath = path.join(difficultyDir, fileName);

        fs.unlinkSync(filePath);

        if (fs.readdirSync(difficultyDir).length === 0) {
            fs.rmdirSync(difficultyDir);
        }

        if (fs.readdirSync(categoryDir).length === 0) {
            fs.rmdirSync(categoryDir);
        }

        if (fs.readdirSync(userDir).length === 0) {
            fs.rmdirSync(userDir);
        }

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
        const { username, fileName, category, difficulty } = req.body;

        const userId = await getUserId(username);

        const userDir = path.resolve(__dirname, '..', '..', 'repository', String(userId));
        const filePath = path.join(userDir, category, difficulty, fileName);

        res.download(filePath, fileName);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const getAdminFiles = async (req, res) => {
    try {
        const baseDir = path.resolve(__dirname, '..', '..', 'repository', 'admin');
        let userDirs = await fs.promises.readdir(baseDir);

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
                    date: stats.birthtime
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

const approveAdminFiles = async (req, res) => {
    try {
        const { username, fileName, selectedCategory, selectedDifficulty } = req.body;

        const userId = await getUserId(username);

        const userDir = path.resolve(__dirname, '..', '..', 'repository', 'admin', String(userId));
        const filePath = path.join(userDir, fileName);

        const destDir = path.resolve(__dirname, '..', '..', 'repository', String(userId), selectedCategory, selectedDifficulty);
        const destPath = path.join(destDir, fileName);

        if (fs.existsSync(filePath)) {
            if (!fs.existsSync(destDir)) {
                fs.mkdirSync(destDir, { recursive: true });
            }
            fs.renameSync(filePath, destPath);

            if (fs.readdirSync(userDir).length === 0) {
                fs.rmdirSync(userDir);
            }

            res.json({ ok: true });
        } else {
            res.status(404).json({
                ok: false,
                msg: 'File not found'
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const deleteAdminFiles = async (req, res) => {
    try {
        const { username, fileName } = req.body;

        const userId = await getUserId(username);

        const userDir = path.resolve(__dirname, '..', '..', 'repository', 'admin', String(userId));
        const filePath = path.join(userDir, fileName);

        fs.unlinkSync(filePath);

        if (fs.readdirSync(userDir).length === 0) {
            fs.rmdirSync(userDir);
        }

        res.json({ ok: true });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const downloadAdminFiles = async (req, res) => {
    try {
        const { username, fileName } = req.body;

        const userId = await getUserId(username);

        const userDir = path.resolve(__dirname, '..', '..', 'repository', 'admin', String(userId));
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

const uploadAvatars = async (req, res) => {
    try {
        if (!req.files) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }

        const { uid } = req.body;
        const file = req.files.file;

        const ext = path.extname(file.name);
        const allowedExtensions = ['.png', '.jpg', '.jpeg'];

        if (!allowedExtensions.includes(ext)) {
            return res.status(412).json({ msg: 'Invalid file extension' });
        }

        const uploadDir = path.resolve(__dirname, '..', '..', 'repository', 'avatars');

        for (let oldExt of allowedExtensions) {
            const oldPath = path.join(uploadDir, `${uid}${oldExt}`);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }

        const uploadPath = path.join(uploadDir, `${uid}${ext}`);

        file.mv(uploadPath, err => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            res.json({
                ok: true,
                data: {
                    fileName: `${uid}${ext}`,
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

const getAvatars = async (req, res) => {
    try {
        const { uid } = req.body;

        const baseDir = path.resolve(__dirname, '..', '..', 'repository', 'avatars');
        const extensions = ['png', 'jpg', 'jpeg'];
        let avatarPath = null;

        for (let ext of extensions) {
            let tempPath = path.join(baseDir, `${uid}.${ext}`);
            if (fs.existsSync(tempPath)) {
                avatarPath = tempPath;
                break;
            }
        }

        if (!avatarPath) {
            avatarPath = path.join(baseDir, '0.png');
        }

        res.sendFile(avatarPath);

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
    downloadFiles,
    deleteAdminFiles,
    downloadAdminFiles,
    getAdminFiles,
    approveAdminFiles,
    uploadAvatars,
    getAvatars
}