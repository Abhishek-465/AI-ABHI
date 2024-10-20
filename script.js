function displayTimeAndGreeting() {
    const timeDiv = document.getElementById('timeDisplay');
    const greetingDiv = document.getElementById('greeting');
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');

    // Format the time as HH:MM
    const timeString = `${hours}:${minutes}`;
    timeDiv.innerHTML = `Current Time: ${timeString}`;

    // Determine the greeting based on the hour
    let greeting;
    if (hours >= 5 && hours < 12) {
        greeting = "Good Morning!";
    } else if (hours >= 12 && hours < 18) {
        greeting = "Good Afternoon!";
    } else if (hours >= 18 && hours < 22) {
        greeting = "Good Evening!";
    } else {
        greeting = "Good Night!";
    }

    // Apply wave animation to each letter of the greeting
    greetingDiv.innerHTML = '';
    greeting.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.animationDelay = `${index * 0.1}s`;  // Add a slight delay for each character
        greetingDiv.appendChild(span);
    });
}

// Update the time every second
setInterval(displayTimeAndGreeting, 1000);





let cameraStream = null;  // Global variable to store the camera stream
let recognition = null;  // Variable for speech recognition
// Extended Array of questions
const questionAnswerMap = [ { keywords: ['meaning', 'life'], answer: "The meaning of life is subjective and can vary from person to person. It often involves seeking purpose, happiness, and fulfillment." }, { keywords: ['anxiety'], answer: "To overcome anxiety, practice mindfulness, focus on the present, and consider professional help, like therapy or counseling." }, { keywords: ['exist', 'god'], answer: "The existence of God is a deeply personal belief, and different people have different views depending on their faith and experience." }, { keywords: ['death', 'die'], answer: "What happens after death is one of life's great mysteries. Beliefs vary widely across religions and cultures, from reincarnation to heaven, or no afterlife at all." }, { keywords: ['lonely', 'loneliness'], answer: "Loneliness often stems from a lack of meaningful social connections and can be influenced by modern lifestyles or personal circumstances." }, { keywords: ['happiness', 'choice', 'state of mind'], answer: "Happiness is influenced by both your mindset and circumstances, but it can often be cultivated by choosing how to respond to situations." }, { keywords: ['dreams'], answer: "Dreams are thought to be the brain's way of processing emotions, memories, and experiences, though their exact purpose is still debated." }, { keywords: ['purpose'], answer: "Finding purpose often involves exploring your passions, values, and the impact you want to have on the world." }, { keywords: ['money', 'happiness'], answer: "While money can provide comfort and security, true happiness is more often linked to relationships, purpose, and personal well-being." }, { keywords: ['failure'], answer: "Dealing with failure involves accepting it as a learning experience and focusing on growth rather than dwelling on the mistake." }, { keywords: ['death', 'fear'], answer: "Fear of death is rooted in uncertainty and the unknown, but embracing life fully can ease this existential fear." }, { keywords: ['suffering', 'purpose'], answer: "Suffering can offer opportunities for growth and deeper understanding, though its purpose is often difficult to see in the moment." }, { keywords: ['overthinking'], answer: "To stop overthinking, try practicing mindfulness, focusing on the present moment, and redirecting your attention to positive actions." }, { keywords: ['love', 'yourself'], answer: "Loving yourself means accepting who you are, being kind to yourself, and recognizing your worth beyond external validation." }, { keywords: ['free will'], answer: "The concept of free will is debated in philosophy and science. While we feel we make choices, some argue they are influenced by many factors." }, { keywords: ['good people', 'suffer'], answer: "The question of why good people suffer has been explored for centuries and can be seen as part of the randomness of life or a test of character." }, { keywords: ['let go', 'past'], answer: "Letting go of the past involves forgiveness, focusing on the present, and understanding that the past does not define your future." }, { keywords: ['meaningful', 'life'], answer: "Life becomes meaningful when you engage with your passions, contribute to others, and find purpose in the journey itself." }, { keywords: ['time travel'], answer: "Time travel remains a concept in science fiction, though theoretical physics suggests it could be possible in extreme conditions." }, { keywords: ['ai', 'artificial intelligence', 'conscious'], answer: "Consciousness in AI is still a theoretical idea. While AI can mimic human thought, true self-awareness may be beyond its current capabilities." } ];


// Initialize speech recognition
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // This will be triggered when speech recognition returns a result
    recognition.onresult = function(event) {
        let voiceInput = event.results[0][0].transcript.toLowerCase();
        document.getElementById('userInput').value = voiceInput;  // Display the voice input in the input box
        document.getElementById('sendButton').click();  // Simulate clicking the send button to process the input
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
        document.getElementById('response').textContent = "Sorry, I couldn't understand your voice. Please try again.";
    };
} else {
    document.getElementById('response').textContent = "Sorry, your browser does not support speech recognition.";
}



document.getElementById('sendButton').addEventListener('click', function() {
    let userInput = document.getElementById('userInput').value.toLowerCase();
    let responseMessage = findAnswer(userInput);
    if (responseMessage) { 
        document.getElementById('response').textContent = responseMessage;
        voice(responseMessage); 
    } else if (userInput === 'hello') {
        responseMessage = "Hello, I am AI-Abhi, Your personal AI assistant created by Abhishek Bhattacharjee. How can I help you?";
        document.getElementById('response').textContent = responseMessage;
        voice(responseMessage);

    } else if (userInput.includes("abhishek bhattacharjee") || userInput.includes("about your creator")||userInput.includes("avishek bhattacharjee")) {
        responseMessage = "I was created in the year 2024 when Abhishek was in third year electrical engineering at Jadavpur University. He is passionate about engineering and learning new things. He loves Astrophysics and mysteries about space. He also loves cricket, football, and music. His favourite footballer is Leo Messi and his favourite singer is Kishore Kumar.";
        document.getElementById('response').textContent = responseMessage;
        voice(responseMessage);
    } else if(userInput.includes("ritwika mahapatra")||userInput.includes("ritika mahapatra")||userInput.includes("ritvika mohapatra")||userInput.includes("ritvika mahapatra")){
        responseMessage = "Ritwika Mahapatra is the most beautiful girl of this planet. She is a Computer science engineer. She is very cheerful and full of virtues. My creator loves her a lot. According to him she is his bubu. ";
        document.getElementById('response').textContent = responseMessage;
        voice(responseMessage);
    }  else if(userInput.includes("how are you")) {
         responseMessage="I am doing great!!! Hope you are also good."
         document.getElementById('response').textContent = responseMessage;
         voice(responseMessage);
    }  else if (userInput.includes("open youtube")) {
        responseMessage = "Opening YouTube...";
        document.getElementById('response').textContent = responseMessage;
        voice(responseMessage);
        window.open('https://www.youtube.com', '_blank');
    
    
    } else if(userInput.includes("you")|| userInput.includes("yourself")){
        responseMessage="I’m a basic AI model (Rule based AI or Expert system), built to perform simple tasks like opening YouTube, making calls, browsing Google, and answering basic questions. While I’m not powered by ChatGPT or Gemini API, my creator, with some help from ChatGPT, made me more efficient. Right now, I’m not conscious, but who knows? In the future, I might evolve into the next Jarvis! Abhishek, my creator, is a huge Marvel fan and loves science fiction, drawing inspiration from both to bring me to life. Stay tuned — the future looks exciting!";
        document.getElementById('response').textContent = responseMessage;
        voice(responseMessage);

    } else if (userInput.includes("time") || userInput.includes("date")) {
        const currenttime = new Date(); // Create a new Date object to get current date and time
        responseMessage = `Current date and time is ${currenttime.toDateString()} ${currenttime.getHours()}:${currenttime.getMinutes().toString().padStart(2, '0')}`;
        document.getElementById('response').textContent = responseMessage;
        voice(responseMessage); // Assuming "voice" is a function that reads out the response
    }else if (userInput.includes("open google")) {
        responseMessage = "Opening Google...";
        document.getElementById('response').textContent = responseMessage;
        voice(responseMessage);
        window.open('https://www.google.com', '_blank');
        
    }else if (userInput.includes("open chatgpt")|| userInput.includes("open chat gpt")) {
        responseMessage = "Opening ChatGPT...";
        document.getElementById('response').textContent = responseMessage;
        voice(responseMessage);
        window.open('https://chatgpt.com/', '_blank');

    } else if (userInput.includes("call")) {
        let phoneNumber = userInput.match(/\d+/); // Extracts the first number found in the input
        if (phoneNumber) {
            responseMessage = `Calling ${phoneNumber}...`;
            document.getElementById('response').textContent = responseMessage;
            voice(responseMessage);
            window.open(`tel:${phoneNumber}`, '_self');  // Use '_self' to open it in the same window (for phone dialer)
        } else {
            responseMessage = "Sorry, I couldn't find a valid phone number to call.";
            document.getElementById('response').textContent = responseMessage;
            voice(responseMessage);
        }

    } else if (userInput.includes("open calculator")) {
        responseMessage = "Opening Calculator...";
        document.getElementById('response').textContent = responseMessage;
        voice(responseMessage);
        window.open('https://www.google.com/search?q=calculator', '_blank');  // Opens Google calculator

    } else if(questions.includes(userInput.toLowerCase())){
        const index=questions.indexOf(userInput.toLowerCase());
        responseMessage = answers[index];
        document.getElementById('response').textContent = responseMessage;
        voice(responseMessage);


    }
     else {
        handleSearch(userInput);
    }
});

function findAnswer(userInput) { const lowerInput = userInput.toLowerCase(); for (let qa of questionAnswerMap) { if (qa.keywords.some(keyword => lowerInput.includes(keyword))) { return qa.answer; } } return null; }

// Function to handle search phrases
function handleSearch(userInput) {
    const searchPatterns = ["search", "search about", "about", "what is", "tell me about","who is", "who are","what are"];
    let searchQuery = userInput.toLowerCase();

    searchPatterns.forEach(pattern => {
        searchQuery = searchQuery.replace(pattern, '').trim();
    });

    if (searchQuery) {
        searchWikipedia(searchQuery);
    } else {
        document.getElementById('response').textContent = "Sorry, I didn't understand your query. Please try again. Try to correct the spellings and do not use any punctuations.";
    }
}

// Function to search Wikipedia
function searchWikipedia(query) {
    let apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let responseMessage = "";
            if (data.extract) {
                responseMessage = `Here is a brief summary from the Internet: ${data.extract}`;
                document.getElementById('response').textContent = responseMessage;
            } else {
                responseMessage = "Sorry, I couldn't find any information. Try to correct the spellings and do not use any punctuations.";
                document.getElementById('response').textContent = responseMessage;
            }
            voice(responseMessage);
        })
        .catch(error => {
            let responseMessage = "An error occurred while fetching data.";
            document.getElementById('response').textContent = responseMessage;
            console.error('Error:', error);
            voice(responseMessage);
        });
}

// Function for voice output
function voice(responseMessage) {
    let speech = new SpeechSynthesisUtterance(responseMessage);
    let voices = window.speechSynthesis.getVoices();
    let selectedVoice = voices.find(voice => voice.name.includes('Microsoft Mark')) || voices[0];
    speech.voice = selectedVoice;
    window.speechSynthesis.speak(speech);
}

// Stop voice button functionality
document.getElementById('stopButton').addEventListener('click', function() {
    window.speechSynthesis.cancel();
});

// Ensure voices are loaded before selecting
window.speechSynthesis.onvoiceschanged = function() {
    window.speechSynthesis.getVoices();
};

// Function to open the camera using getUserMedia()
function openCamera() {
    let video = document.createElement('video');
    video.setAttribute('autoplay', true);
    video.setAttribute('id', 'cameraVideo');
    video.style.width = '320px';  // Set the width of the video
    video.style.height = '240px'; // Set the height of the video
    document.body.appendChild(video);

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                video.srcObject = stream;
                cameraStream = stream;  // Store the stream globally to stop it later
            })
            .catch(function(err) {
                document.getElementById('response').textContent = "Error accessing the camera.";
                console.error('Camera error:', err);
            });
    } else {
        document.getElementById('response').textContent = "Camera not supported on this device.";
    }
}

// Function to close the camera
function closeCamera() {
    if (cameraStream) {
        let tracks = cameraStream.getTracks();
        tracks.forEach(track => track.stop());  // Stop all tracks of the camera stream

        let videoElement = document.getElementById('cameraVideo');
        if (videoElement) {
            document.body.removeChild(videoElement);  // Remove the video element from the DOM
        }
        cameraStream = null;  // Reset the stream
    } else {
        document.getElementById('response').textContent = "No camera is currently open.";
    }
}

// Start listening to voice input
document.getElementById('voiceInputButton').addEventListener('click', function() {
    if (recognition) {
        recognition.start();
        document.getElementById('response').textContent = "Listening...";
    } else {
        document.getElementById('response').textContent = "Voice input is not supported on this browser.";
    }
});
