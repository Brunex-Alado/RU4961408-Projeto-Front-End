function loadUser() {
    let user = null;
    try {
        user = JSON.parse(localStorage.getItem('raizes_user') || 'null');
    } catch {
        user = null;
    }

    const consent = Raizes.getConsent();
    const loyaltyAllowed = Boolean(consent?.loyalty);

    document.getElementById('points').textContent = `${user?.points || 0} pontos`;
    document.getElementById('greeting').textContent = user
        ? (loyaltyAllowed
            ? `Olá, ${user.name}. Seus pontos estão salvos neste navegador.`
            : `Olá, ${user.name}. Para acumular novos pontos, autorize a fidelidade na Central de Privacidade.`)
        : 'Entre ou cadastre um perfil demonstrativo para visualizar seus pontos.';
    document.getElementById('loyaltyConsentNotice').textContent = loyaltyAllowed
        ? 'Consentimento para fidelidade ativo neste navegador. Você pode retirá-lo a qualquer momento na Central de Privacidade.'
        : 'Consentimento para fidelidade não ativo. Para acumular pontos, revise suas preferências na Central de Privacidade.';
}

function redeem(points, rewardName) {
    let user = null;
    try {
        user = JSON.parse(localStorage.getItem('raizes_user') || 'null');
    } catch {
        user = null;
    }

    if (!user) {
        Raizes.toast('Cadastre um perfil demonstrativo primeiro.');
        return;
    }

    if (!Raizes.getConsent()?.loyalty) {
        Raizes.toast('Autorize a fidelidade na Central de Privacidade primeiro.');
        return;
    }

    if ((user.points || 0) < points) {
        Raizes.toast('Você ainda não tem pontos suficientes.');
        return;
    }

    user.points -= points;
    user.rewards = user.rewards || [];
    user.rewards.push({ name: rewardName, at: new Date().toISOString() });
    localStorage.setItem('raizes_user', JSON.stringify(user));
    loadUser();
    Raizes.toast(`${rewardName} resgatado na simulação.`);
}

document.addEventListener('DOMContentLoaded', loadUser);
