

const campoEmail = document.getElementById('email');
const campoSenha = document.getElementById('senha');
const botaoEntrar = document.getElementById('btn-entrar');

configurarOlhoSenha();


if (obterToken()) {
    window.location.href = 'Home.html';
}

async function entrar() {
    mostrarErro('');

    const email = campoEmail.value.trim();
    const senha = campoSenha.value;

    if (!email || !senha) {
        mostrarErro('Preencha o e-mail e a senha.');
        return;
    }

    botaoEntrar.disabled = true;
    try {
        const dados = await api('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, senha })
        });
        salvarSessao(dados);
        window.location.href = 'Home.html';
    } catch (erro) {
        mostrarErro(erro.message);
    } finally {
        botaoEntrar.disabled = false;
    }
}

botaoEntrar.addEventListener('click', entrar);
[campoEmail, campoSenha].forEach(function (campo) {
    campo.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') entrar();
    });
});


configurarBotaoGoogle(async function (idToken) {
    mostrarErro('');
    try {
        const dados = await api('/auth/google', {
            method: 'POST',
            body: JSON.stringify({ idToken })
        });
        salvarSessao(dados);
        window.location.href = 'Home.html';
    } catch (erro) {
        mostrarErro(erro.message);
    }
});