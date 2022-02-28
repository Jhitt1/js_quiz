const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

// -------Questions-------//

let questions = [
    {
        question: 'What is JavaScript?',
        choice1: 'Backend Language',
        choice2: 'Frontend Language',
        choice3: 'Both backend and frontend language',
        choice4: 'Markup language',
        answer: 3,
    },
    {
        question: 'How to declare a numeric viariable JavaScript?',
        choice1: 'var',
        choice2: 'float',
        choice3: 'double',
        choice4: 'int',
        answer: 1,
    },
    {
        question: 'How to get an element id called app?',
        choice1: 'document.getElementByid("app")',
        choice2: 'getElementById("app")',
        choice3: 'document.id("app")',
        choice4: 'id("app")',
        answer: 1,
    },
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        choice1: '&lt;js&gt;',
        choice2: '&lt;javascript&gt;',
        choice3: '&lt;script&gt;',
        choice4: '&lt;scripting&gt;',
        answer: 3,
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        choice1: 'alertBox("Hello World");',
        choice2: 'alert("Hello World");',
        choice3: 'msg("Hello World");',
        choice4: 'msgBox("Hello World");',
        answer: 2,
    },
    {
        question: 'What is an object that represents the eventual completion or failure of an asynchronous operation?',
        choice1: 'A Class',
        choice2: 'An Object',
        choice3: 'A Promise',
        choice4: 'None Of The Above',
        answer: 3,
    },
    {
        question: 'Which of these is a programming language?',
        choice1: 'Bite',
        choice2: 'Gnaw',
        choice3: 'Itch',
        choice4: 'Scratch',
        answer: 4,
    },
    {
        question: 'Which of these is NOT a programming language?',
        choice1: 'Java',
        choice2: 'Python',
        choice3: 'Ruby',
        choice4: 'Saphire',
        answer: 4,
    },
    {
        question: 'What do shell windows show in python?',
        choice1: 'Code',
        choice2: 'PrintCommand',
        choice3: 'IDLE',
        choice4: 'Program Output',
        answer: 4,
    },
    {
        question: 'What word describes the set of instructions that computers need to do work?',
        choice1: 'Agenda',
        choice2: 'Blueprint',
        choice3: 'Program',
        choice4: 'Synopsis',
        answer: 3,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()

}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
