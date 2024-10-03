class QuestionGame {
  constructor(data) {
    this.data = data;
    this.questionsLength = 6; // the number of questions in a set.
    this.currentQuestionSetIndex = 0; // the index of the current question Set
    this.currentQuestionSet = []; // the current set of questions.
    this.createQuestionSet();
    this.setElements();
  }

  setElements() {
    this.imageContainer = document.getElementById("image-container");
    this.itemContainer = document.getElementById("item-container");
    this.result = document.getElementById("result");
    this.name = document.getElementById("name");
  }

  getWinInfoMessage() {
    if (this.questionsLength === this.totalWins()) {
      return "Great you won : ) ";
    } else if (this.totalWins() > this.questionsLength / 2) {
      return "Not bad.";
    }
    return "";
  }

  createGameMessage() {
    return `${this.getWinInfoMessage()} You answered ${
      this.questionsLength
    } questions and got ${this.totalWins()} correct.`;
  }

  showResults() {
    this.imageContainer.innerHTML = "";
    const p = document.createElement("p");
    p.innerText = this.createGameMessage();

    const b = document.createElement("button");
    b.textContent = "Play again";
    b.addEventListener("click", () => this.setQuestion());

    this.imageContainer.appendChild(p);
    this.imageContainer.appendChild(b);
  }

  showResultDetails() {
    const ol = document.createElement("ol");

    this.currentQuestionSet.forEach((q) => {
      const d = data[q.index];
      ol.innerHTML += `<li> ${
        q.isCorrect ? "&#10004;" : "&#10008;"
      } You got this 
          ${q.isCorrect ? "Correct" : "Wrong"}. A 
          ${d.name} eats ${d.questions[d.answer]}. </li>`;
    });

    this.imageContainer.appendChild(ol);
  }

  totalAnsweredQuestions() {
    return this.currentQuestionSet.filter((x) => x.isCorrect !== null).length;
  }

  totalWins() {
    return this.currentQuestionSet.filter((x) => x.isCorrect === true).length;
  }

  answer() {
    this.itemContainer.innerText = "";
    if (this.totalAnsweredQuestions() >= this.questionsLength) {
      this.name.innerText = "";
      this.currentQuestionSetIndex = 0;
      this.showResults();
      this.showResultDetails();
      this.createQuestionSet();
    } else {
      this.currentQuestionSetIndex++;
      setTimeout(this.setQuestion(), 2000);
    }
  }

  setQuestion() {
    const question = this.currentQuestionSet[this.currentQuestionSetIndex];
    const currentItem = this.data[question.index];

    this.result.innerHTML = "";
    this.name.innerText = currentItem.name;
    this.imageContainer.innerHTML = "";

    const image = document.createElement("img");
    image.classList = "fade-in question-image";
    image.src = filesURL + currentItem.image;
    this.imageContainer.appendChild(image);

    currentItem.questions.map((value, index) => {
      const b = document.createElement("button");
      b.textContent = value;
      b.setAttribute(
        "data-question-result",
        index === currentItem.answer ? "correct" : "incorrect"
      );

      b.addEventListener("click", () => this.buttonClickEventHandler());
      b.classList.add("answer-button");
      this.itemContainer.appendChild(b);
    });
  }

  getRand() {
    return Math.floor(Math.random() * this.data.length);
  }

  createQuestionSet() {
    this.currentQuestionSet = [];
    while (this.currentQuestionSet.length < this.questionsLength) {
      let i = this.getRand();
      if (!this.currentQuestionSet.some((x) => x.index === i)) {
        this.currentQuestionSet.push({ index: i, isCorrect: null });
      }
    }
  }

  buttonClickEventHandler() {
    let isCorrect =
      event.target.getAttribute("data-question-result") === "correct";

    this.currentQuestionSet[this.currentQuestionSetIndex].isCorrect = isCorrect;

    this.answer();
  }
}
