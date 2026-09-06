let currentLang = 'hi'; // Default Language (hi = Hindi, en = English)
let currentQuizData = [];
let currentQuestionIndex = 0;
let score = 0;

// Language Switch Handler
function toggleLanguage() {
    currentLang = (currentLang === 'hi') ? 'en' : 'hi';
    
    // Toggle Button Label Update
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) {
        langBtn.innerText = (currentLang === 'hi') ? 'English' : 'हिंदी';
    }

    // Update Static UI Elements Text
    updateStaticUI();

    // If Quiz Screen is currently active, re-render question in new language
    const quizScreen = document.getElementById('quiz-screen');
    if (quizScreen && !quizScreen.classList.contains('hidden') && currentQuizData.length > 0) {
        showQuestion();
    }
}

// Update Static Elements Text across screens
function updateStaticUI() {
    const isHi = (currentLang === 'hi');

    // Start Screen Elements
    const appTitle = document.getElementById('app-title');
    const appDesc = document.getElementById('app-desc');
    const startBtn = document.getElementById('start-btn');
    if (appTitle) appTitle.innerText = isHi ? "ऑनलाइन क्विज़ पोर्टल" : "AB Mock";
    if (appDesc) appDesc.innerText = isHi ? "अपना क्विज़ सेट चुनें:" : "Select Your Challenge";
    if (startBtn) startBtn.innerText = isHi ? "क्विज़ शुरू करें" : "Start Now";

    // Quiz Screen Elements
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) nextBtn.innerText = isHi ? "अगला प्रश्न" : "Next Question";

    // Result Screen Elements
    const resultTitle = document.getElementById('result-title');
    const restartBtn = document.getElementById('restart-btn');
    if (resultTitle) resultTitle.innerText = isHi ? "क्विज़ समाप्त हुआ!" : "Finished...";
    if (restartBtn) restartBtn.innerText = isHi ? "फिर से प्रयास करें" : "Re-Test";
}

function startQuiz() {
    // Check if allQuizzes is loaded in memory
    if (typeof allQuizzes === 'undefined') {
        alert(currentLang === 'hi' 
            ? "क्विज़ डेटा की फ़ाइल (questions.js) सही तरीके से लोड नहीं हो पाई है!" 
            : "Quiz data file (questions.js) is not loaded properly!");
        return;
    }

    const selectedKey = document.getElementById('quiz-select').value;
    
    // Check if selected quiz exists in allQuizzes
    if (!allQuizzes || !allQuizzes[selectedKey]) {
        alert(currentLang === 'hi' 
            ? "चुना गया क्विज़ उपलब्ध नहीं है!" 
            : "Selected quiz set is not available!");
        return;
    }

    currentQuizData = allQuizzes[selectedKey].questions;
    
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    
    currentQuestionIndex = 0;
    score = 0;
    
    showQuestion();
}
function showQuestion() {
    const q = currentQuizData[currentQuestionIndex];
    const isHi = (currentLang === 'hi');

    // Header Counter & Score
    document.getElementById('question-number').innerText = isHi 
        ? `प्रश्न ${currentQuestionIndex + 1} / ${currentQuizData.length}` 
        : `Question ${currentQuestionIndex + 1} / ${currentQuizData.length}`;
        
    document.getElementById('score-counter').innerText = isHi 
        ? `स्कोर: ${score}` 
        : `Score: ${score}`;

    // Render Question Text
    const qText = (typeof q.question === 'object') ? (q.question[currentLang] || q.question['hi']) : q.question;
    document.getElementById('question-text').innerText = qText;
    
    // Render Options Container
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    document.getElementById('explanation-box').classList.add('hidden');
    document.getElementById('next-btn').classList.add('hidden');

    const optsArray = (typeof q.options === 'object' && !Array.isArray(q.options)) 
        ? (q.options[currentLang] || q.options['hi']) 
        : q.options;

    optsArray.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.innerText = opt;
        btn.onclick = () => selectOption(index);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(selectedIndex) {
    const q = currentQuizData[currentQuestionIndex];
    const buttons = document.querySelectorAll('.option-btn');
    const isHi = (currentLang === 'hi');

    buttons.forEach(btn => btn.disabled = true);

    if (selectedIndex === q.correct) {
        buttons[selectedIndex].classList.add('correct');
        score++;
    } else {
        buttons[selectedIndex].classList.add('wrong');
        buttons[q.correct].classList.add('correct');
    }

    // Update Score Bar
    document.getElementById('score-counter').innerText = isHi 
        ? `स्कोर: ${score}` 
        : `Score: ${score}`;

    // Render Explanation Text
    const expText = (typeof q.explanation === 'object') ? (q.explanation[currentLang] || q.explanation['hi']) : q.explanation;
    const expBox = document.getElementById('explanation-box');
    
    expBox.innerHTML = isHi 
        ? `<strong>व्याख्या:</strong> ${expText}` 
        : `<strong>Explanation:</strong> ${expText}`;
        
    expBox.classList.remove('hidden');

    document.getElementById('next-btn').classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuizData.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const isHi = (currentLang === 'hi');
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    
    document.getElementById('final-score').innerText = isHi 
        ? `आपका कुल स्कोर: ${score} / ${currentQuizData.length}` 
        : `Your Final Score: ${score} / ${currentQuizData.length}`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
}
