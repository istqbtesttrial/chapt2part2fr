// Handle form submission
document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the input message
    const messageInput = document.getElementById('messageInput').value;

    // Display the message
    const messageResult = document.getElementById('messageResult');
    messageResult.textContent = `Message sent: ${sendMessage(messageInput)}`;

    // Update the code block with the real values
    const codeBlock = document.getElementById('codeBlock');
    codeBlock.innerHTML = `
<code>
// JavaScript function for message handling
function sendMessage(input) {
    return input;
}

// Input:
let message = "${messageInput}";

// Sending message:
"Message sent: " + message
</code>
    `;

    // Animate the result
    gsap.fromTo(messageResult, { opacity: 0 }, { opacity: 1, duration: 1 });
    gsap.fromTo(codeBlock, { opacity: 0 }, { opacity: 1, duration: 1 });

    // Show Lottie Animation for success
    showLottieAnimation();
});

// Function for handling the message
function sendMessage(input) {
    return input;
}

// GSAP Animations on Page Load
window.onload = function() {
    gsap.fromTo('#pageTitle', { x: -200, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
    gsap.fromTo('#pageSubtitle', { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
    gsap.fromTo('#introTitle', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, delay: 0.5 });
    gsap.fromTo('#introText', { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.8 });
    gsap.fromTo('#interactiveSection', { opacity: 0 }, { opacity: 1, duration: 1, delay: 1 });
    gsap.fromTo('#codeSection', { opacity: 0 }, { opacity: 1, duration: 1, delay: 1.2 });
}

// Function to display Lottie animation
function showLottieAnimation() {
    const lottieContainer = document.getElementById('lottie-container');
    lottieContainer.style.display = 'flex'; // Make the Lottie container visible

    // Load the Lottie animation
    lottie.loadAnimation({
        container: document.getElementById('lottie-animation'),
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: 'https://assets1.lottiefiles.com/packages/lf20_ydo1amjm.json' // Lottie animation URL (Success animation)
    });

    // Hide the Lottie animation after it's done
    setTimeout(function() {
        lottieContainer.style.display = 'none';
    }, 3000); // Hide after 3 seconds
}
