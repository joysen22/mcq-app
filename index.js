import { data } from "./data.js";

const home = document.querySelector(".home");
const winer = document.querySelector(".winer");
const result = document.querySelector(".result");
const pagination = document.querySelector(".time-full");
const time = document.querySelector(".time");
const quizQuistion = document.querySelector(".quiz-title");
const examPage = document.querySelector(".exam-page");
const page = document.querySelector(".page");
const rule = document.querySelector(".rule");
const quiz = document.querySelector(".quiz");
const startBtn = document.getElementById("home-btn");
const exist = document.getElementById("exist");
const continus = document.getElementById("continus");
const nextQuiz = document.getElementById("next-quiz");
const quistion = document.querySelectorAll(".quistion");

rule.classList.add("close");
quiz.classList.add("close");
result.classList.add("close");

console.log(result);
// home start btn oparation
startBtn.addEventListener("click", function () {
  home.classList.add("close");
  rule.classList.remove("close");
});
// home exist btn oparation
exist.addEventListener("click", function () {
  home.classList.remove("close");
  rule.classList.add("close");
  quiz.classList.add("close");
});
// time and pagination
let timeInterval;
let parts = 0;
let next = 0;
let correctAns = 0;
let falseAns = 0;
let correctIcon = `<i class="check fa-solid fa-check"></i>`;
let closeIcon = `<i class="rong fa-solid fa-xmark"></i>`;
const timeStart = () => {
  let seconds = 20;
  let paginationWith = 100;
  timeInterval = setInterval(count, 1000);
  function count() {
    seconds -= 1;
    paginationWith -= 5;
    if (seconds == 0) {
      clearInterval(timeInterval);
      time.setAttribute("style", "color:red");
      // next Quiz btn stop
      nextQuiz.classList.remove("close");
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    time.innerHTML = seconds;

    pagination.setAttribute("style", `width:${paginationWith}%`);
  }
};

// continus start quiz
continus.addEventListener("click", function () {
  quiz.classList.remove("close");
  home.classList.add("close");
  rule.classList.add("close");
  // first quiz start
  showQuiz(0, 0);
});
function showQuiz(part, next) {
  const { exam, ans, quesition, option, id } = getData(part, next);
  // quistion
  quizQuistion.innerHTML = quesition;
  // part
  examPage.innerHTML = exam;
  // page
  page.innerHTML = `${id} of 5 Questions`;
  // next Quiz btn stop
  nextQuiz.classList.add("close");

  for (let i = 0; i < quistion.length; i++) {
    quistion[i].innerHTML = option[i];
    quistion[i].onclick = (e) => {
      if (ans === e.target.innerHTML) {
        quistion[i].insertAdjacentHTML("beforeend", correctIcon);

        clearInterval(timeInterval);
        nextQuiz.classList.remove("close");
        correctAns += 1;
        console.log(correctAns);
      } else {
        quistion[i].insertAdjacentHTML("beforeend", closeIcon);
        for (let i = 0; i < quistion.length; i++) {
          if (quistion[i].innerHTML === ans) {
            quistion[i].insertAdjacentHTML("beforeend", correctIcon);
          }
        }
        falseAns += 1;
        clearInterval(timeInterval);
        nextQuiz.classList.remove("close");
        console.log(falseAns);
      }
    };
  }
  // correctAns(ans, quistion);
  timeStart();
  let winerText = `Congratulation &#9757 , You Got ${correctAns}, Out Of 5`;
  nextQuiz.onclick = () => {
    if (next == 0) {
      next = 1;
      showQuiz(parts, next);
    } else if (next == 1) {
      next = 2;
      showQuiz(parts, next);
    } else if (next == 2) {
      next = 3;
      showQuiz(parts, next);
    } else if (next == 3) {
      next = 4;
      showQuiz(parts, next);
    } else if (next == 4) {
      result.classList.remove("close");
      quiz.classList.add("close");
      winer.innerHTML = winerText;
    } else {
      console.log("eroor");
    }
    // console.log("nextQuiz");
  };
}

function getData(part = 0, next = 0) {
  return data[part][next];
}
