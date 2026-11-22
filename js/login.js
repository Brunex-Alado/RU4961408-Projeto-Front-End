document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const result = document.getElementById('loginResult');

    let savedUser = null;
    try {
        savedUser = JSON.parse(localStorage.getItem('raizes_user') || 'null');
    } catch {
        savedUser = null;
    }

    if (savedUser) {
        nameInput.value = savedUser.name || '';
        emailInput.value = savedUser.email || '';
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const user = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            points: savedUser?.points || 0,
            rewards: savedUser?.rewards || []
        };

        localStorage.setItem('raizes_user', JSON.stringify(user));
        result.innerHTML = '<div class="notice">Perfil demonstrativo salvo neste navegador. <a href="fidelidade.html"><u>Ver fidelidade</u></a>. Gerencie suas preferências na <a href="privacidade.html"><u>Central de Privacidade</u></a>.</div>';
    });
});
