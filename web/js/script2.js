const API_URL = 'http://localhost:3000';
let professor = JSON.parse(localStorage.getItem('professor'));

if (!professor) {
    window.location.href = 'index.html';
}

document.getElementById('professorNome').textContent = `Professor: ${professor.nome}`;

async function carregarTurmas() {
    try {
        const response = await fetch(`${API_URL}/turmas?professorId=${professor.id}`);
        const turmas = await response.json();

        const listaTurmas = document.getElementById('listaTurmas');
        listaTurmas.innerHTML = '';

        if (turmas.length === 0) {
            listaTurmas.innerHTML = '<p>Nenhuma turma cadastrada.</p>';
            return;
        }

        turmas.forEach(turma => {
            const turmaCard = document.createElement('div');
            turmaCard.className = 'turma-card';
            turmaCard.innerHTML = `
                <h3>${turma.nome_turma}</h3>
                <p>${turma.descricao || 'Sem descrição'}</p>
                <p>Atividades: ${turma.atividades?.length || 0}</p>
                <div class="turma-actions">
                    <button onclick="verAtividades(${turma.id}, '${turma.nome_turma}')" class="btn-primary">Visualizar</button>
                    <button onclick="excluirTurma(${turma.id})" class="btn-danger">Excluir</button>
                </div>
            `;
            listaTurmas.appendChild(turmaCard);
        });
    } catch (error) {
        console.error('Erro ao carregar turmas:', error);
    }
}

document.getElementById('cadastroTurmaForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nomeTurma = document.getElementById('nomeTurma').value;
    const descricaoTurma = document.getElementById('descricaoTurma').value;

    try {
        const response = await fetch(`${API_URL}/turmas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome_turma: nomeTurma,
                descricao: descricaoTurma,
                professorId: professor.id
            })
        });

        if (response.ok) {
            alert('Turma cadastrada com sucesso!');
            fecharCadastroTurma();
            carregarTurmas();
            document.getElementById('cadastroTurmaForm').reset();
        } else {
            const data = await response.json();
            alert(data.error || 'Erro ao cadastrar turma');
        }
    } catch (error) {
        alert('Erro ao conectar com o servidor');
    }
});

async function excluirTurma(turmaId) {
    if (!confirm('Tem certeza que deseja excluir esta turma?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/turmas/${turmaId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Turma excluída com sucesso!');
            carregarTurmas();
        } else {
            const data = await response.json();
            alert(data.error || 'Erro ao excluir turma');
        }
    } catch (error) {
        alert('Erro ao conectar com o servidor');
    }
}

function verAtividades(turmaId, nomeTurma) {
    localStorage.setItem('turmaSelecionada', JSON.stringify({ id: turmaId, nome: nomeTurma }));
    window.location.href = 'atividades.html';
}

function abrirCadastroTurma() {
    document.getElementById('cadastroTurmaModal').style.display = 'block';
}

function fecharCadastroTurma() {
    document.getElementById('cadastroTurmaModal').style.display = 'none';
}

function logout() {
    localStorage.removeItem('professor');
    window.location.href = 'index.html';
}

carregarTurmas();