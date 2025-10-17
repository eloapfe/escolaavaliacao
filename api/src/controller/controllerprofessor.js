const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    try {
        const professors = await prisma.professor.findMany();
        res.json(professors);
    } catch {
        res.status(500).json({ error: 'Erro ao buscar professores.' });
    }
}

const register = async (req, res) => {
    try {
        const professor = await prisma.professor.create({
            data: req.body
        });
        res.status(201).json(professor);
    } catch {
        res.status(500).json({ error: 'Erro ao registrar professor.' });
    }
};

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const professor = await prisma.professor.findUnique({ where: { email, senha } });
        if (!professor) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        } else {
            res.json({ message: 'Login realizado com sucesso!', professor });
        }
    } catch {
        res.status(500).json({ error: 'Erro ao fazer login.' });
    }
};

module.exports = {
    read,
    register,
    login
};
