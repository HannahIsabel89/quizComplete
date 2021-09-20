const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
      "question": "What fruit does Hannah dislike?",
      "choice1": "Apple",
      "choice2": "Banana",
      "choice3": "Kiwi",
      "choice4": "Mango",
      "answer": 2
    },
    {
      "question": "What is Hannah's favourite food to eat out for dinner?",
      "choice1": "Italian",
      "choice2": "Vietnamese",
      "choice3": "Mexican",
      "choice4": "Korean",
      "answer": 2
    },
    {
      "question": "What animal did Hannah have as a pet while growing up?",
      "choice1": "Cat",
      "choice2": "Fish",
      "choice3": "Snake",
      "choice4": "Dog",
      "answer": 4
    },
    {
      "question": "Where was Hannah born?",
      "choice1": "UK",
      "choice2": "USA",
      "choice3": "Uzbekistan",
      "choice4": "Uruguay",
      "answer": 1
    },
    {
      "question": "What job has Hannah had the longest?",
      "choice1": "Bank manager",
      "choice2": "Sailor",
      "choice3": "Teacher",
      "choice4": "Waitress",
      "answer": 3
    },
    {
      "question": "What is Hannah studying?",
      "choice1": "Medicine",
      "choice2": "Software engineering",
      "choice3": "Cooking",
      "choice4": "Sewing",
      "answer": 2
    }
  ];

// Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 6;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; //spread operator
    getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign("/end.html");
  }

    questionCounter++; // increase counter by one
    questionCounterText.innerText =  `${questionCounter}/${MAX_QUESTIONS}`;
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length); // get random number between 1 and 3
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach( choice => {
  choice.addEventListener('click', e => {
    if(!acceptingAnswers) return; // if not accepting answers, ignore the click

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply = 
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"; 

      if(classToApply === "correct") {
        incrementScore(CORRECT_BONUS);
      }

      selectedChoice.parentElement.classList.add(classToApply);

      setTimeout( () => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 1000);
      

  });
});

incrementScore = num => {
  score +=num;
  scoreText.innerText = score;
}
startGame();