// Fonction pour traiter le test d’acceptation
function processAcceptanceTest() {
    const result = document.getElementById('testResult').value;

    if (result === "pass") {
        return "Le produit fonctionne comme prévu. Il est accepté !";
    } else if (result === "fail") {
        return "Le produit présente des problèmes. Il est rejeté.";
    } else {
        return "Veuillez sélectionner un résultat.";
    }
}

// Gérer le choix de l’utilisateur
document.getElementById('acceptanceButton').addEventListener('click', function() {
    const feedback = processAcceptanceTest();
    const feedbackElement = document.getElementById('acceptanceFeedback');
    feedbackElement.textContent = feedback;

    // Ajout d’une animation pour améliorer le retour visuel
    gsap.fromTo(feedbackElement, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 });
});

// Animations GSAP lors du chargement de la page
window.onload = function() {
    gsap.fromTo('#pageTitle', { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
    gsap.fromTo('#pageSubtitle', { x: -200, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2 });
    gsap.fromTo('#introTitle', { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, delay: 0.5 });
    gsap.fromTo('#introText', { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.8 });
    gsap.fromTo('#interactiveSection', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, delay: 1 });
}
