const questions = [
  {
    question: "how old are you ?",
    answer: [
      { text: 12, correct: false },
      { text: 20, correct: true },
      { text: 10, correct: false },
      { text: 30, correct: false },
    ],
  },
  {
    question: "what is color sky ?",
    answer: [
      { text: "blue", correct: true },
      { text: "red", correct: false },
      { text: "gray", correct: false },
      { text: "purple", correct: false },
    ],
  },
  {
    question: "2 + 2 ?",
    answer: [
      { text: 4, correct: true },
      { text: 10, correct: false },
    ],
  },
];

const questionBox = document.querySelector(".question-box");
const startButton = document.querySelector(".start-btn");
const nextButton = document.querySelector(".next-btn");
const questionContainerElement = document.querySelector(".question-container");
const buttonGroups = document.querySelector(".button-group");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (buttonGroups.firstChild) {
    buttonGroups.removeChild(buttonGroups.firstChild);
  }
}

function showQuestion(question) {
  questionBox.innerText = question.question;
  question.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    buttonGroups.appendChild(button);
  });
}

function selectAnswer(e) {
  const selectButton = e.target;
  const correct = selectButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(buttonGroups.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
    button.disabled = true;
    button.classList.add("disable");
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
