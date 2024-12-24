// Handle form submission
document.getElementById('additionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the input values
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);

    // Perform the addition
    const result = add(num1, num2);

    // Display the result
    const resultElement = document.getElementById('result');
    resultElement.textContent = `Result: ${num1} + ${num2} = ${result}`;

    // Update the code block with the real values
    const codeBlock = document.getElementById('codeBlock');
    codeBlock.innerHTML = `
<code>
// JavaScript function for addition
function add(a, b) {
    return a + b;
}

// Selected values:
let a = ${num1};
let b = ${num2};

// Performing addition:
a + b = ${result}
</code>
    `;

    // Animate the result
    gsap.fromTo(resultElement, { opacity: 0 }, { opacity: 1, duration: 1 });
    gsap.fromTo(codeBlock, { opacity: 0 }, { opacity: 1, duration: 1 });

    // Show Lottie Animation for success
    showLottieAnimation();
});

// Function for addition
function add(a, b) {
    return a + b;
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
    const lottieContainer = document.getElementById('    lottieContainer');
    lottieContainer.style.display = 'flex'; // Make the Lottie container visible

    // Load the Lottie animation
    lottie.loadAnimation({
        container: document.getElementById('lottie-animation'), // the dom element that will contain the animation
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