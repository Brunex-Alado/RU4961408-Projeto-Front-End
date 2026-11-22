document.addEventListener('DOMContentLoaded', () => {
    const loyaltyInput = document.getElementById('loyaltyConsent');
    const campaignInput = document.getElementById('campaignConsent');
    const status = document.getElementById('consentStatus');
    const form = document.getElementById('privacyConsentForm');
    const revokeButton = document.getElementById('revokeConsent');
    const clearButton = document.getElementById('clearLocalData');

    function readConsent() {
        return Raizes.getConsent();
    }

    function renderConsent() {
        const consent = readConsent();
        loyaltyInput.checked = Boolean(consent?.loyalty);
        campaignInput.checked = Boolean(consent?.campaign);

        if (!consent) {
            status.textContent = 'Nenhuma preferência foi salva neste navegador.';
            return;
        }

        const savedAt = consent.updatedAt
            ? new Date(consent.updatedAt).toLocaleString('pt-BR')
            : 'data não informada';
        const loyaltyStatus = consent.loyalty
            ? 'Fidelidade autorizada.'
            : 'Fidelidade não autorizada.';
        const campaignStatus = consent.campaign
            ? 'Campanhas personalizadas autorizadas.'
            : 'Campanhas personalizadas não autorizadas.';

        status.textContent = `Preferências salvas em ${savedAt}. ${loyaltyStatus} ${campaignStatus}`;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const loyalty = loyaltyInput.checked;
        const campaign = campaignInput.checked;
        const consent = {
            loyalty,
            campaign,
            updatedAt: new Date().toISOString(),
            purposes: [
                ...(loyalty ? ['pontos', 'benefícios e administração da fidelidade'] : []),
                ...(campaign ? ['campanhas e ofertas personalizadas'] : [])
            ],
            version: '2.4'
        };

        localStorage.setItem('raizes_privacy_consent', JSON.stringify(consent));
        renderConsent();
        Raizes.toast('Preferências de privacidade salvas.');
    });

    revokeButton.addEventListener('click', () => {
        const consent = {
            loyalty: false,
            campaign: false,
            updatedAt: new Date().toISOString(),
            purposes: [],
            version: '2.4'
        };

        localStorage.setItem('raizes_privacy_consent', JSON.stringify(consent));
        renderConsent();
        Raizes.toast('Consentimentos opcionais retirados.');
    });

    clearButton.addEventListener('click', () => {
        [
            'raizes_unit',
            'raizes_cart',
            'raizes_order',
            'raizes_user',
            'raizes_cookie',
            'raizes_privacy_consent',
            'raizes_loyalty_transactions'
        ].forEach((key) => localStorage.removeItem(key));

        renderConsent();
        Raizes.toast('Dados locais removidos.');
    });

    renderConsent();
});
