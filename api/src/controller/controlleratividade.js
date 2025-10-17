const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    try {
        const { turmaId } = req.query;
        const atividades = await prisma.atividade.findMany({
            where: { turmaId: parseInt(turmaId) },
            include: { turma: true }
        });
        res.json(atividades);
    } catch {
        res.status(500).json({ error: 'Erro ao buscar atividades.' });
    }
};

const create = async (req, res) => {
    try {
        const atividade = await prisma.atividade.create({
            data: req.body
        });
        res.status(201).json(atividade);
    } catch {
        res.status(500).json({ error: 'Erro ao cadastrar atividade.' });
    }
};

module.exports = { 
    create, 
    read 
};