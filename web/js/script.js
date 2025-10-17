const API_URL = 'http://localhost:3000';

// Login - CORRIGIDO
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch(`${API_URL}/login`, {  // ← MUDOU AQUI
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('professor', JSON.stringify(data.professor));
            window.location.href = 'professor.html';
        } else {
            alert(data.error || 'Erro no login');
        }
    } catch (error) {
        alert('Erro ao conectar com o servidor');
    }
});

// Registro - CORRIGIDO
document.getElementById('registroForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('emailRegistro').value;
    const senha = document.getElementById('senhaRegistro').value;

    try {
        const response = await fetch(`${API_URL}/register`, {  // ← MUDOU AQUI
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Professor registrado com sucesso!');
            fecharRegistro();
            document.getElementById('email').value = email;
            document.getElementById('senha').value = senha;
        } else {
            alert(data.error || 'Erro no registro');
        }
    } catch (error) {
        alert('Erro ao conectar com o servidor');
    }
});

function mostrarRegistro() {
    document.getElementById('registroModal').style.display = 'block';
}

function fecharRegistro() {
    document.getElementById('registroModal').style.display = 'none';
}