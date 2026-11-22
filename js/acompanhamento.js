const ORDER_STEPS = [
    {
        id: 'confirmed',
        title: 'Pedido confirmado',
        description: 'Recebemos seu pedido.'
    },
    {
        id: 'preparing',
        title: 'Em preparação',
        description: 'Nossa equipe está preparando seu pedido.'
    },
    {
        id: 'ready',
        title: 'Pronto para retirada',
        description: 'Seu pedido está pronto no balcão.'
    },
    {
        id: 'picked',
        title: 'Retirado',
        description: 'Pedido finalizado. Bom apetite!'
    }
];

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (character) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[character]);
}

function renderTracking() {
    const order = Raizes.getOrder();
    const tracking = document.getElementById('tracking');
    const controls = document.getElementById('demoControls');
    const advanceButton = document.getElementById('advance');

    if (!order) {
        tracking.innerHTML = `
            <div class="empty">
                <h2>Nenhum pedido encontrado</h2>
                <p>Finalize um pedido demonstrativo para acompanhar seu andamento.</p>
                <a class="btn btn-wine" href="cardapio.html">Ir ao cardápio</a>
            </div>
        `;
        controls.classList.add('hidden');
        return;
    }

    const currentIndex = ORDER_STEPS.findIndex((step) => step.id === order.status);
    const safeIndex = currentIndex < 0 ? 0 : currentIndex;
    const items = Array.isArray(order.items) ? order.items : [];

    const statusMarkup = ORDER_STEPS.map((step, index) => {
        const stateClass = index < safeIndex
            ? 'done'
            : index === safeIndex
                ? 'current'
                : '';

        const marker = index < safeIndex
            ? '✓'
            : String(index + 1).padStart(2, '0');

        return `
            <li class="${stateClass}">
                <span class="status-dot">${marker}</span>
                <div>
                    <strong>${escapeHtml(step.title)}</strong>
                    <small>${escapeHtml(step.description)}</small>
                </div>
            </li>
        `;
    }).join('');

    const itemsMarkup = items.map((line) => {
        const product = RAIZES_PRODUCTS.find((item) => item.id === line.id);
        const name = product?.name || line.id;
        const quantity = Number(line.qty) || 0;
        const subtotal = (product?.price || 0) * quantity;

        return `
            <div class="summary-line">
                <span>${escapeHtml(name)} × ${quantity}</span>
                <strong>${Raizes.money(subtotal)}</strong>
            </div>
        `;
    }).join('');

    const createdAt = order.createdAt
        ? new Date(order.createdAt).toLocaleString('pt-BR')
        : 'Data não informada';

    tracking.innerHTML = `
        <div class="eyebrow">Pedido ${escapeHtml(order.id)}</div>
        <h2 class="tracking-title">${escapeHtml(ORDER_STEPS[safeIndex].title)}</h2>
        <p class="subtle">${escapeHtml(order.unitName)} · ${escapeHtml(createdAt)}</p>

        <div class="summary-line">
            <span>Total do pedido</span>
            <strong>${Raizes.money(Number(order.total) || 0)}</strong>
        </div>
        <div class="summary-line">
            <span>Pagamento</span>
            <strong>${order.payment === 'approved' ? 'APROVADO (simulação)' : 'Não confirmado'}</strong>
        </div>

        <ul class="status-list">${statusMarkup}</ul>

        <h3>Itens do pedido</h3>
        ${itemsMarkup || '<p class="subtle">Não há itens registrados neste pedido.</p>'}
        ${Number(order.loyaltyPointsAwarded) > 0
            ? `<div class="notice">Você recebeu <strong>${Number(order.loyaltyPointsAwarded)} pontos</strong> neste pedido.</div>`
            : ''}
    `;

    controls.classList.toggle('hidden', safeIndex >= ORDER_STEPS.length - 1);
    if (advanceButton && safeIndex < ORDER_STEPS.length - 1) {
        advanceButton.textContent = safeIndex === ORDER_STEPS.length - 2
            ? 'Finalizar retirada ↗'
            : `Avançar para ${ORDER_STEPS[safeIndex + 1].title} ↗`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderTracking();

    const advanceButton = document.getElementById('advance');
    advanceButton?.addEventListener('click', () => {
        const order = Raizes.getOrder();
        if (!order) return;

        const currentIndex = ORDER_STEPS.findIndex((step) => step.id === order.status);
        if (currentIndex < 0 || currentIndex >= ORDER_STEPS.length - 1) return;

        order.status = ORDER_STEPS[currentIndex + 1].id;
        order.history = Array.isArray(order.history) ? order.history : ['confirmed'];
        order.history.push(order.status);

        Raizes.setOrder(order);
        renderTracking();
    });
});
