const API_URL = 'http://localhost:3000';
let professor = JSON.parse(localStorage.getItem('professor'));
let turma = JSON.parse(localStorage.getItem('turmaSelecionada'));

if (!professor || !turma) {
    window.location.href = 'professor.html';
}

document.getElementById('tituloTurma').textContent = `Turma: ${turma.nome}`;

async function carregarAtividades() {
    try {
        const response = await fetch(`${API_URL}/atividades?turmaId=${turma.id}`);

        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const atividades = await response.json();

        const listaAtividades = document.getElementById('listaAtividades');
        listaAtividades.innerHTML = '';

        if (!Array.isArray(atividades)) {
            listaAtividades.innerHTML = '<p>Erro: Formato de dados inválido</p>';
            return;
        }

        if (atividades.length === 0) {
            listaAtividades.innerHTML = '<p>Nenhuma atividade cadastrada.</p>';
            return;
        }

        atividades.forEach((atividade, index) => {
            const atividadeItem = document.createElement('div');
            atividadeItem.className = 'atividade-item';

            const titulo = atividade.titulo || 'Sem título';
            const descricao = atividade.descricao || 'Sem descrição';
            let dataEntregaHTML = '';

            if (atividade.data_entrega) {
                try {
                    const dataFormatada = new Date(atividade.data_entrega).toLocaleDateString('pt-BR');
                    dataEntregaHTML = `<p><strong>Data de entrega:</strong> ${dataFormatada}</p>`;
                } catch (e) {
                    dataEntregaHTML = `<p><strong>Data de entrega:</strong> Data inválida</p>`;
                }
            }

            atividadeItem.innerHTML = `
                        <div class="atividade-info">
                            <h3>${index + 1}. ${titulo}</h3>
                            <p>${descricao}</p>
                            ${dataEntregaHTML}
                        </div>
                    `;
            listaAtividades.appendChild(atividadeItem);
        });
    } catch (error) {
        console.error('Erro ao carregar atividades:', error);
        const listaAtividades = document.getElementById('listaAtividades');
        listaAtividades.innerHTML = `
                    <div class="error-message">
                        <p>Erro ao carregar atividades</p>
                        <p><small>${error.message}</small></p>
                    </div>
                `;
    }
}

document.getElementById('cadastroAtividadeForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const titulo = document.getElementById('tituloAtividade').value;
    const descricao = document.getElementById('descricaoAtividade').value;
    const dataEntrega = document.getElementById('dataEntrega').value;

    if (!titulo.trim()) {
        alert('Por favor, informe o título da atividade');
        return;
    }

    try {
        const dados = {
            titulo: titulo.trim(),
            descricao: descricao.trim() || null,
            turmaId: parseInt(turma.id)
        };

        if (dataEntrega) {
            dados.data_entrega = new Date(dataEntrega + 'T00:00:00.000Z').toISOString();
        }

        console.log('Enviando dados:', dados);

        const response = await fetch(`${API_URL}/atividades`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
        });

        if (response.ok) {
            alert('Atividade cadastrada com sucesso!');
            fecharCadastroAtividade();
            carregarAtividades();
            document.getElementById('cadastroAtividadeForm').reset();
        } else {
            const errorText = await response.text();
            console.log('Erro do servidor:', errorText);
            alert('Erro ao cadastrar atividade: ' + errorText);
        }
    } catch (error) {
        console.error('Erro completo:', error);
        alert('Erro ao conectar com o servidor: ' + error.message);
    }
});

function abrirCadastroAtividade() {
    document.getElementById('cadastroAtividadeModal').style.display = 'block';
}

function fecharCadastroAtividade() {
    document.getElementById('cadastroAtividadeModal').style.display = 'none';
}

function voltar() {
    window.location.href = 'professor.html';
}

function logout() {
    localStorage.removeItem('professor');
    localStorage.removeItem('turmaSelecionada');
    window.location.href = 'index.html';
}

carregarAtividades();