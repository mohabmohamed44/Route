// declarations
let form = document.querySelector("#quizOptions");
let categoryMenu = document.querySelector("#categoryMenu");
let questionNumbers = document.querySelector("#questionsNumber");
let difficultyOptions = document.querySelector("#difficultyOptions");
let btn = document.querySelector("#startQuiz");
let myRow = document.querySelector(".questions .row");

// variables
let questions;
let myQuiz;

btn.addEventListener("click", async (e) => {
    let category = categoryMenu.value;
    let difficulty = difficultyOptions.value;
    let number = questionNumbers.value;
    // create new Instance
    myQuiz = new Quiz(category, difficulty, number);
    questions = await myQuiz.getAllQuestions();
    console.log(questions);

    let myQuestion = new Questions(0);
    form.classList.replace("d-flex", "d-none");
    myQuestion.display();
});

class Quiz {
    constructor(category, difficulty, number) {
        this.category = category;
        this.difficulty = difficulty;
        this.number = number;
        this.score = 0;
    }

    getApi() {
        return `https://opentdb.com/api.php?amount=${this.number}&category=${this.category}&difficulty=${this.difficulty}`;
    }

    async getAllQuestions() {
        let res = await fetch(this.getApi());
        let data = await res.json();
        return data.results;
    }

    showResults() {
        let resultDiv = document.createElement("div");
        resultDiv.classList.add("question", "shadow-lg", "col-lg-12", "rounded-3", "d-flex", "flex-column", "justify-content-center", "align-items-center", "gap-3", "py-3", "mx-3");

        let resultMessage = document.createElement("h2");
        resultMessage.classList.add("mb-0");
        resultMessage.innerHTML = this.score == this.number ? `Congratulations 👏` : `Your score is ${this.score} of ${this.number}`;
        resultDiv.appendChild(resultMessage);

        let againButton = document.createElement("button");
        againButton.classList.add("again", "btn", "btn-primary", "rounded-pill");
        againButton.innerHTML = `Again <i class="bi bi-arrow-right"></i>`;
        againButton.addEventListener("click", () => {
            window.location.reload();
        });

        resultDiv.appendChild(againButton);
        return resultDiv;
    }
}

class Questions {
    constructor(index) {
        this.index = index;
        this.question = questions[index].question;
        this.difficulty = questions[index].difficulty;
        this.correctAnswer = questions[index].correct_answer;
        this.category = questions[index].category;
        this.incorrectAnswers = questions[index].incorrect_answers;
        this.myAllAnswers = this.getAllAnswers();
        this.isAnswered = false;
    }

    getAllAnswers() {
        let allAnswers = [...this.incorrectAnswers, this.correctAnswer];
        allAnswers.sort(() => Math.random() - 0.5); // Randomize order of answers
        return allAnswers;
    }

    display() {
        // Clear previous question
        myRow.innerHTML = "";

        let questionDiv = document.createElement("div");
        questionDiv.classList.add("question", "shadow-lg", "col-lg-6", "offset-lg-3", "p-4", "rounded-3", "d-flex", "flex-column", "justify-content-center", "align-items-center", "gap-3", "animate__animated", "animate__bounceIn");

        // Category and Question Number
        let headerDiv = document.createElement("div");
        headerDiv.classList.add("w-100", "d-flex", "justify-content-between");

        let categorySpan = document.createElement("span");
        categorySpan.classList.add("btn", "btn-category");
        categorySpan.innerHTML = this.category;

        let questionNumSpan = document.createElement("span");
        questionNumSpan.classList.add("fs-6", "btn", "btn-questions");
        questionNumSpan.innerHTML = `${this.index + 1} of ${questions.length}`;

        headerDiv.appendChild(categorySpan);
        headerDiv.appendChild(questionNumSpan);
        questionDiv.appendChild(headerDiv);

        // Question text
        let questionText = document.createElement("h2");
        questionText.classList.add("text-capitalize", "h4", "text-center");
        questionText.innerHTML = this.question;
        questionDiv.appendChild(questionText);

        // Choices
        let choicesList = document.createElement("ul");
        choicesList.classList.add("choices", "w-100", "list-unstyled", "m-0", "d-flex" , "flex-wrap", "justify-content-center", "text-center");



        this.myAllAnswers.forEach(answer => {
            let li = document.createElement("li");
            li.classList.add("btn", "btn-outline-primary", "m-1", "p-2", "rounded");
            li.innerHTML = answer;

            li.addEventListener("click", () => {
                this.checkAnswer(li);
                this.nextQuestion();
            });

            choicesList.appendChild(li);
        });

        questionDiv.appendChild(choicesList);

        // Score Display
        let scoreDisplay = document.createElement("h2");
        scoreDisplay.classList.add("text-capitalize", "text-center", "score-color", "h3", "fw-bold");
        scoreDisplay.innerHTML = `<i class="bi bi-emoji-laughing"></i> Score: ${myQuiz.score}`;
        questionDiv.appendChild(scoreDisplay);

        myRow.appendChild(questionDiv);
    }

    checkAnswer(choice) {
        if (!this.isAnswered) {
            this.isAnswered = true;
            if (choice.innerHTML === this.correctAnswer) {
                myQuiz.score++;
                choice.classList.add("correct", "animate__animated", "animate__pulse");
            } else {
                choice.classList.add("incorrect", "animate__animated", "animate__shakeX");
            }
        }
    }

    nextQuestion() {
        setTimeout(() => {
            this.index++;
            if (this.index < questions.length) {
                let newQuestion = new Questions(this.index);
                newQuestion.display();
            } else {
                let resultDiv = myQuiz.showResults();
                myRow.innerHTML = "";
                myRow.appendChild(resultDiv);
            }
        }, 2000);
    }
}
