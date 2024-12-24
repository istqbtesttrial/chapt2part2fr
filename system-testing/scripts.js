// Initialiser un objet panier vide
let cart = {};

// Ajout d’écouteurs d’événements sur tous les boutons de fruits
const fruitButtons = document.querySelectorAll('.fruit-button');
fruitButtons.forEach(button => {
    button.addEventListener('click', function() {
        const fruit = button.getAttribute('data-fruit');
        addToCart(fruit);
        updateCartDisplay();
    });
});

// Fonction pour ajouter un fruit au panier
function addToCart(fruit) {
    // Si le fruit n’est pas encore dans le panier, l’ajouter avec une quantité de 1
    if (!cart[fruit]) {
        cart[fruit] = 1;
    } else {
        // Sinon, augmenter la quantité existante
        cart[fruit]++;
    }
}

// Fonction pour retirer un fruit du panier
function removeFromCart(fruit) {
    if (cart[fruit] && cart[fruit] > 1) {
        // Diminuer la quantité si elle est supérieure à 1
        cart[fruit]--;
    } else {
        // Retirer complètement le fruit du panier si la quantité est 1
        delete cart[fruit];
    }
}

// Fonction pour mettre à jour l’affichage du panier
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = ''; // Effacer la liste actuelle

    for (const fruit in cart) {
        const li = document.createElement('li');
        li.innerHTML = `
            ${fruit} (x${cart[fruit]})
            <button class="bg-green-400 px-2 py-1 ml-2" onclick="addToCart('${fruit}'); updateCartDisplay()">+</button>
            <button class="bg-red-400 px-2 py-1 ml-2" onclick="removeFromCart('${fruit}'); updateCartDisplay()">-</button>
        `;
        cartItems.appendChild(li);
    }

    // Mettre à jour le bloc de code pour refléter l’état actuel du panier
    const codeBlock = document.getElementById('codeBlock');
    codeBlock.innerHTML = `
<code>
// JavaScript pour gérer le panier et mettre à jour l’interface utilisateur
let cart = ${JSON.stringify(cart, null, 2)};

// Fonction pour ajouter un fruit au panier
function addToCart(fruit) {
    if (!cart[fruit]) {
        cart[fruit] = 1;
    } else {
        cart[fruit]++;
    }
    return cart[fruit];
}

// Fonction pour mettre à jour l’affichage du panier
updateCartDisplay();
</code>
    `;
}

// Animations GSAP au chargement de la page
window.onload = function() {
    gsap.fromTo('#pageTitle', { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
    gsap.fromTo('#pageSubtitle', { x: -200, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2 });
    gsap.fromTo('#introTitle', { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, delay: 0.5 });
    gsap.fromTo('#introText', { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.8 });
    gsap.fromTo('#interactiveSection', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, delay: 1 });
    gsap.fromTo('#codeSection', { opacity: 0 }, { opacity: 1, duration: 1, delay: 1.2 });
}

// Fonction pour afficher l’animation Lottie (optionnel)
function showLottieAnimation() {
    const lottieContainer = document.getElementById('lottie-container');
    lottieContainer.style.display = 'flex'; // Rendre le conteneur Lottie visible

    // Charger l’animation Lottie
    lottie.loadAnimation({
        container: document.getElementById('lottie-animation'),
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: 'https://assets9.lottiefiles.com/packages/lf20_FMr0gn.json' // URL de l’animation Lottie (succès du panier)
    });

    // Masquer l’animation Lottie une fois terminée
    setTimeout(function() {
        lottieContainer.style.display = 'none';
    }, 3000); // Masqué après 3 secondes
}
