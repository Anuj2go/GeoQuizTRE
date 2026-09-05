let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestionIndex];
    document.getElementById('question-number').innerText = `प्रश्न ${currentQuestionIndex + 1} / ${questions.length}`;
    document.getElementById('question-text').innerText = q.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    document.getElementById('explanation-box').classList.add('hidden');
    document.getElementById('next-btn').classList.add('hidden');

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.innerText = opt;
        btn.onclick = () => selectOption(index);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(selectedIndex) {
    const q = questions[currentQuestionIndex];
    const buttons = document.querySelectorAll('.option-btn');

    buttons.forEach(btn => btn.disabled = true);

    if (selectedIndex === q.correct) {
        buttons[selectedIndex].classList.add('correct');
        score++;
        document.getElementById('score-counter').innerText = `स्कोर: ${score}`;
    } else {
        buttons[selectedIndex].classList.add('wrong');
        buttons[q.correct].classList.add('correct');
    }

    const expBox = document.getElementById('explanation-box');
    expBox.innerHTML = `<strong>व्याख्या:</strong> ${q.explanation}`;
    expBox.classList.remove('hidden');

    document.getElementById('next-btn').classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('final-score').innerText = `आपका कुल स्कोर: ${score} / ${questions.length}`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('score-counter').innerText = `स्कोर: 0`;
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
}
