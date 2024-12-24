// Variables pour suivre l’état du système
let paymentProcessed = false;
let inventory = {1: "Article 1", 2: "Article 2", 3: "Article 3"};
let googleUserName = ""; // Nouveau : stocke le nom récupéré lors de la connexion Google

// Bouton pour lancer le paiement
document.getElementById('triggerPayment').addEventListener('click', function() {
    document.getElementById('paymentSystem').classList.remove('hidden');
    document.getElementById('triggerPayment').disabled = true; // Désactive le bouton de paiement après le début du paiement
    gsap.fromTo('#paymentSystem', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 });
});

// Confirmation du paiement
document.getElementById('confirmPayment').addEventListener('click', function() {
    const cardNumber = document.getElementById('creditCardInput').value;
    const amount = document.getElementById('amountInput').value;
    const result = processPayment(cardNumber, amount);

    displayResult(result);

    if (paymentProcessed) {
        // Active la logique pour le système d’inventaire
        document.getElementById('triggerInventory').disabled = false;
    }

    updateCodeBlock();
});

// Bouton pour mettre à jour l’inventaire
document.getElementById('triggerInventory').addEventListener('click', function() {
    if (!paymentProcessed) {
        displayResult("L’inventaire ne peut pas être mis à jour sans paiement.");
    } else {
        document.getElementById('inventorySystem').classList.remove('hidden');
        displayResult(updateInventory());
        gsap.fromTo('#inventorySystem', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 });
    }
    updateCodeBlock();
});

// NEW: Bouton pour simuler la connexion Google
document.getElementById('googleSignIn').addEventListener('click', function() {
    const userName = handleGoogleSignIn();
    if (userName) {
        // Afficher le nom d’utilisateur Google
        document.getElementById('googleUserName').textContent = userName;
        document.getElementById('googleAuthSystem').classList.remove('hidden');
        gsap.fromTo('#googleAuthSystem', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 });

        // Mettre à jour le code block
        updateCodeBlock();
        displayResult(`Connexion réussie : Bienvenue, ${userName} !`);
    } else {
        displayResult("Impossible de récupérer le nom d’utilisateur Google.");
    }
});

// Fonction pour traiter le paiement
function processPayment(cardNumber, amount) {
    if (cardNumber && amount) {
        paymentProcessed = true;
        return "Paiement de " + amount + "€ effectué avec succès !";
    }
    return "Veuillez saisir un numéro de carte et un montant valides.";
}

// Fonction pour supprimer un article de l’inventaire
function removeItemFromInventory(itemId) {
    delete inventory[itemId];
    displayInventory();
    displayResult("Article expédié au client !");
    updateCodeBlock();
}

// Fonction pour mettre à jour l’inventaire
function updateInventory() {
    if (paymentProcessed) {
        return "Inventaire prêt pour l’expédition !";
    } else {
        return "L’inventaire ne peut pas être mis à jour sans paiement.";
    }
}

// Fonction pour simuler la connexion Google
function handleGoogleSignIn() {
    // Dans un vrai cas, on ferait appel à l’API Google pour récupérer le nom
    // Ici, on simule simplement un nom retourné
    googleUserName = "Nom d’utilisateur Google (exemple)";
    return googleUserName;
}

// Fonction pour afficher un message (résultat de l’intégration)
function displayResult(message) {
    const integrationResult = document.getElementById('integrationResult');
    integrationResult.textContent = message;

    // Anime le texte du résultat
    gsap.fromTo(integrationResult, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 });
}

// Fonction pour afficher la liste d’inventaire
function displayInventory() {
    const inventoryList = document.getElementById('inventoryList');
    inventoryList.innerHTML = '';

    for (const id in inventory) {
        const li = document.createElement('li');
        li.innerHTML = `
            ${inventory[id]}
            <button class="bg-red-400 px-2 py-1 ml-4" onclick="removeItemFromInventory(${id})">Expédier au client</button>
        `;
        inventoryList.appendChild(li);
    }
}

// Fonction pour mettre à jour le code affiché en temps réel
function updateCodeBlock() {
    const codeBlock = document.getElementById('codeBlock');
    codeBlock.innerHTML = `
<code>
// JavaScript pour l’intégration système
let paymentProcessed = ${paymentProcessed};
let inventory = ${JSON.stringify(inventory, null, 2)};
let googleUserName = "${googleUserName}";

// Fonction pour traiter le paiement
function processPayment(cardNumber, amount) {
    if (cardNumber && amount) {
        paymentProcessed = true;
        return "Paiement de " + amount + "€ effectué avec succès !";
    }
    return "Veuillez saisir un numéro de carte et un montant valides.";
}

// Fonction pour supprimer un article de l’inventaire
function removeItemFromInventory(itemId) {
    delete inventory[itemId];
    displayInventory();
    displayResult("Article expédié au client !");
}

// Fonction pour mettre à jour l’inventaire
function updateInventory() {
    if (paymentProcessed) {
        return "Inventaire prêt pour l’expédition !";
    } else {
        return "L’inventaire ne peut pas être mis à jour sans paiement.";
    }
}

// Fonction pour simuler la connexion Google
function handleGoogleSignIn() {
    googleUserName = "Nom d’utilisateur Google (exemple)";
    return googleUserName;
}
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
};
