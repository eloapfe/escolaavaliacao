const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    try {
        const { professorId } = req.query;
        const turmas = await prisma.turma.findMany({
            where: { professorId: parseInt(professorId) },
            include: { atividades: true }
        });
        res.json(turmas);
    } catch {
        res.status(500).json({ error: 'Erro ao buscar turmas.' });
    }
};

const create = async (req, res) => {
    try {
        const turma = await prisma.turma.create({
            data: req.body
        });
        res.status(201).json(turma);
    } catch {
        res.status(500).json({ error: 'Erro ao cadastrar turma.' });
    }
};


const remove = async (req, res) => {
    try {
        await prisma.atividade.deleteMany({
            where: { turmaId: Number(req.params.id) }
        });
        
        await prisma.turma.delete({
            where: { id: Number(req.params.id) }
        });
        
        res.status(204).send();
    } catch {
        res.status(500).json({ error: 'Erro ao deletar turma.' });
    }
};

module.exports = { 
    create, 
    read, 
    remove 
};