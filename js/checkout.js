function getCheckoutTotal() {
    return Raizes.getCart().reduce((total, line) => {
        const product = RAIZES_PRODUCTS.find((item) => item.id === line.id);
        return total + (product ? product.price * line.qty : 0);
    }, 0);
}

function renderCheckoutSummary() {
    const cart = Raizes.getCart();
    const total = getCheckoutTotal();
    const summary = document.getElementById('summary');
    const payButton = document.getElementById('pay');

    if (!cart.length) {
        summary.innerHTML = `
            <p class="subtle">
                Carrinho vazio.
                <a href="cardapio.html"><u>Voltar ao cardápio</u></a>
            </p>
        `;
        payButton.disabled = true;
        return;
    }

    summary.innerHTML = cart.map((line) => {
        const product = RAIZES_PRODUCTS.find((item) => item.id === line.id);
        const name = product?.name || line.id;
        const subtotal = (product?.price || 0) * line.qty;

        return `
            <div class="summary-line">
                <span>${name} × ${line.qty}</span>
                <strong>${Raizes.money(subtotal)}</strong>
            </div>
        `;
    }).join('') + `
        <div class="summary-line summary-total">
            <span>Total</span>
            <strong>${Raizes.money(total)}</strong>
        </div>
    `;

    payButton.disabled = false;
}

function readUser() {
    try {
        return JSON.parse(localStorage.getItem('raizes_user') || 'null');
    } catch {
        return null;
    }
}

function showPaymentMessage(message, isError = false) {
    const result = document.getElementById('paymentResult');
    result.innerHTML = `
        <div class="notice${isError ? ' payment-error' : ''}">
            ${message}
        </div>
    `;
}

function awardLoyaltyPoints(order, user) {
    const consent = Raizes.getConsent();
    if (!user || !consent?.loyalty) {
        order.loyaltyPointsAwarded = 0;
        return {
            awarded: false,
            points: 0,
            reason: !user ? 'profile' : 'consent'
        };
    }

    let transactions = [];
    try {
        transactions = JSON.parse(
            localStorage.getItem('raizes_loyalty_transactions') || '[]'
        );
    } catch {
        transactions = [];
    }

    const alreadyProcessed = transactions.some(
        (transaction) => transaction.orderId === order.id
    );

    if (alreadyProcessed) {
        const previous = transactions.find(
            (transaction) => transaction.orderId === order.id
        );
        order.loyaltyPointsAwarded = previous?.points || 0;

        return {
            awarded: order.loyaltyPointsAwarded > 0,
            points: order.loyaltyPointsAwarded,
            reason: 'already-processed'
        };
    }

    const points = Math.floor(Number(order.total) || 0);
    user.points = (Number(user.points) || 0) + points;

    transactions.push({
        orderId: order.id,
        points,
        createdAt: new Date().toISOString()
    });

    localStorage.setItem('raizes_user', JSON.stringify(user));
    localStorage.setItem(
        'raizes_loyalty_transactions',
        JSON.stringify(transactions)
    );

    order.loyaltyPointsAwarded = points;

    return {
        awarded: points > 0,
        points,
        reason: 'credited'
    };
}

document.addEventListener('DOMContentLoaded', () => {
    renderCheckoutSummary();

    const payButton = document.getElementById('pay');
    payButton.addEventListener('click', () => {
        const cart = Raizes.getCart();
        if (!cart.length || payButton.disabled) return;

        const response = document.getElementById('result').value;
        const output = document.getElementById('paymentResult');
        output.innerHTML = '';

        if (response === 'declined') {
            showPaymentMessage(
                '<strong>Pagamento recusado.</strong><br>O serviço externo recusou a solicitação. Seu carrinho foi preservado e nenhum pedido foi confirmado.',
                true
            );
            return;
        }

        if (response === 'unavailable') {
            showPaymentMessage(
                '<strong>Serviço temporariamente indisponível.</strong><br>Não foi possível obter uma resposta. Tente novamente; seu carrinho continua salvo.',
                true
            );
            return;
        }

        payButton.disabled = true;

        const order = {
            id: `RN-${Date.now().toString().slice(-6)}`,
            unit: Raizes.getUnit(),
            unitName: Raizes.unitName(),
            items: cart,
            total: getCheckoutTotal(),
            method: document.getElementById('method').value,
            status: 'confirmed',
            payment: 'approved',
            createdAt: new Date().toISOString(),
            history: ['confirmed'],
            loyaltyPointsAwarded: 0
        };

        const user = readUser();
        const loyaltyResult = awardLoyaltyPoints(order, user);

        Raizes.setOrder(order);
        Raizes.clearCart();

        let pointsMessage;
        if (loyaltyResult.awarded) {
            pointsMessage = `
                Foram creditados <strong>${loyaltyResult.points} pontos</strong>
                no seu perfil. Consulte o saldo na
                <a href="fidelidade.html"><u>página Fidelidade</u></a>.
            `;
        } else if (loyaltyResult.reason === 'profile') {
            pointsMessage = `
                Nenhum ponto foi creditado porque não existe perfil cadastrado
                neste navegador. Para os próximos pedidos, faça seu cadastro em
                <a href="login.html"><u>Entrar / Cadastrar</u></a> e autorize a
                fidelidade na <a href="privacidade.html"><u>Central de Privacidade</u></a>.
            `;
        } else {
            pointsMessage = `
                Nenhum ponto foi creditado porque o consentimento para fidelidade
                não está ativo. Você pode autorizar essa finalidade na
                <a href="privacidade.html"><u>Central de Privacidade</u></a>.
            `;
        }

        showPaymentMessage(`
            <strong>Pagamento aprovado (simulação).</strong><br>
            Pedido ${order.id} criado com sucesso.<br>
            ${pointsMessage}
        `);

        output.insertAdjacentHTML(
            'beforeend',
            '<a class="btn btn-gold" href="acompanhamento.html">Acompanhar pedido ↗</a>'
        );
    });
});
