const points = {
  "Very Likely": 5,
  "Very Often": 5,
  Always: 5,
  "Whenever I feel like it": 5,
  Likely: 4,
  Often: 4,
  "After a few hours": 4,
  Sometimes: 3,
  Occasionally: 3,
  "Within an hour": 3,
  Rarely: 2,
  "Within a few minutes": 2,
  Never: 1,
  Immediately: 1,
};

var quiz = {
  JS: [
    {
      id: 1,
      question: "I act on Impulse",
      options: [
        {
          a: "Rarely / Never",
          b: "Occasionally",
          c: "Often",
          d: "Always",
        },
        {
          a: 1,
          b: 2,
          c: 3,
          d: 4,
        },
      ],
      score: 0,
    },
    {
      id: 2,
      question: "I act on spur of the moment",
      options: [
        { a: "Always", b: "Often", c: "Occassionally", d: "Rarely / Never" },
        { a: 4, b: 3, c: 2, d: 1 },
      ],
      score: 0,
    },
    {
      id: 3,
      question: "I do things without thinking",
      options: [
        { a: "Always", b: "Often", c: "Occassionally", d: "Rarely / Never" },
        { a: 4, b: 3, c: 2, d: 1 },
      ],
      score: 0,
    },
    {
      id: 4,
      question: "I say things without thinking",
      options: [
        { a: "Always", b: "Often", c: "Occassionally", d: "Rarely / Never" },
        { a: 4, b: 3, c: 2, d: 1 },
      ],
      score: 0,
    },
    {
      id: 5,
      question: "I buy things on impulse",
      options: [
        { a: "Always", b: "Often", c: "Occassionally", d: "Rarely / Never" },
        { a: 4, b: 3, c: 2, d: 1 },
      ],
      score: 0,
    },
    {
      id: 6,
      question: "I plan for job security",
      options: [
        { a: "Rarely / Never", b: "Occasionally", c: "Often", d: "Always" },
        { a: 4, b: 3, c: 2, d: 1 },
      ],
      score: 0,
    },
    {
      id: 7,
      question: "I plan for future",
      options: [
        { a: "Rarely / Never", b: "Occasionally", c: "Often", d: "Always" },
        { a: 4, b: 3, c: 2, d: 1 },
      ],
      score: 0,
    },
    {
      id: 8,
      question: "I save regularly",
      options: [
        { a: "Rarely / Never", b: "Occasionally", c: "Often", d: "Always" },
        { a: 4, b: 3, c: 2, d: 1 },
      ],
      score: 0,
    },
    {
      id: 9,
      question: "I plan tasks carefully",
      options: [
        { a: "Rarely / Never", b: "Occasionally", c: "Often", d: "Always" },
        { a: 4, b: 3, c: 2, d: 1 },
      ],
      score: 0,
    },
    {
      id: 10,
      question: "I am a careful thinker",
      options: [
        { a: "Rarely / Never", b: "Occasionally", c: "Often", d: "Always" },
        { a: 4, b: 3, c: 2, d: 1 },
      ],
      score: 0,
    },
    {
      id: 11,
      question: "I am restless at lectures",
      options: [
        { a: "Always", b: "Often", c: "Occassionally", d: "Rarely / Never" },
        { a: 4, b: 3, c: 2, d: 1 },
      ],
      score: 0,
    },
    {
      id: 12,
      question: "I squirm at plays or lectures",
      options: [
        { a: "Always", b: "Often", c: "Occassionally", d: "Rarely / Never" },
        { a: 4, b: 3, c: 2, d: 1 },
      ],
      score: 0,
    },
    {
      id: 13,
      question: "I concentrate easily",
      options: [
        { a: "Rarely / Never", b: "Occasionally", c: "Often", d: "Always" },
        { a: 4, b: 3, c: 2, d: 1 },
      ],
      score: 0,
    },
    {
      id: 14,
      question: "I don't pay attention",
      options: [
        { a: "Always", b: "Often", c: "Occassionally", d: "Rarely / Never" },
        { a: 4, b: 3, c: 2, d: 1 },
      ],
      score: 0,
    },
    {
      id: 15,
      question: "Easily bored solving thought problems",
      options: [
        { a: "Always", b: "Often", c: "Occassionally", d: "Rarely / Never" },
        { a: 4, b: 3, c: 2, d: 1 },
      ],
      score: 0,
    },
  ],
};

var quizApp = function () {
  this.score = 0;
  this.qno = 1;
  this.currentque = 0;
  var totalque = quiz.JS.length;

  this.displayQuiz = function (cque) {
    this.currentque = cque;
    if (this.currentque < totalque) {
      $("#tque").html(totalque);
      $("#previous").attr("disabled", false);
      $("#next").attr("disabled", false);
      $("#qid").html(quiz.JS[this.currentque].id + ".");

      $("#question").html(quiz.JS[this.currentque].question);
      $("#question-options").html("");
      for (var key in quiz.JS[this.currentque].options[0]) {
        if (quiz.JS[this.currentque].options[0].hasOwnProperty(key)) {
          $("#question-options").append(
            "<div class='form-check option-block'>" +
              "<label class='form-check-label'>" +
              "<input type='radio' class='form-check-input' name='option'   id='q" +
              key +
              "' value='" +
              quiz.JS[this.currentque].options[0][key] +
              "'><span id='optionval'>" +
              quiz.JS[this.currentque].options[0][key] +
              "</span></label>"
          );
        }
      }
    }
    if (this.currentque <= 0) {
      $("#previous").attr("disabled", true);
    }
    if (this.currentque >= totalque) {
      $("#next").attr("disabled", true);
      for (var i = 0; i < totalque; i++) {
        this.score = this.score + quiz.JS[i].score;
      }
      return this.showResult(this.score);
    }
  };

  this.showResult = function (scr) {
    const maxScore = totalque * 5;
    const percentage = (scr / maxScore) * 100;
    let impulsivityLevel;
    let resultImage;

    if (scr < 40) {
      impulsivityLevel = "Low Impulsivity";
      resultImage = "../images/low_impulsivity.png";
    } else if (scr >= 40 && scr <= 45) {
      impulsivityLevel = "Moderate Impulsivity";
      resultImage = "../images/moderate_impulsivity.png";
    } else if (scr >= 46) {
      impulsivityLevel = "High Impulsivity";
      resultImage = "../images/high_impulsivity.png";
    } else {
      impulsivityLevel = "Undefined";
      resultImage = "../images/very_high_impulsivity.png";
    }

    const resultMessage = `
    <div class="result-message">
    <img class='quiz-result-image' src='${resultImage}'>
    <h3 class='res-header'>${impulsivityLevel}</h3>
    <h4 class='res-text'>Total Score: &nbsp;${scr}/${maxScore}</h4>
         <a href='../index.html'><button class='btn btn-success'>Home</button></a>                
    </div>
    `;

    $("#result").addClass("result");
    $("#result").html(resultMessage);
  };

  this.checkAnswer = function (option) {
    var selectedKey;
    for (var key in quiz.JS[this.currentque].options[0]) {
      if (quiz.JS[this.currentque].options[0][key] == option) {
        selectedKey = key;
      }
    }
    quiz.JS[this.currentque].score =
      quiz.JS[this.currentque].options[1][selectedKey];
    console.log(option);
  };

  this.changeQuestion = function (cque) {
    this.currentque = this.currentque + cque;
    this.displayQuiz(this.currentque);
  };
};

var jsq = new quizApp();

var selectedopt;
$(document).ready(function () {
  jsq.displayQuiz(0);

  $("#question-options").on(
    "change",
    "input[type=radio][name=option]",
    function (e) {
      //var radio = $(this).find('input:radio');
      $(this).prop("checked", true);
      selectedopt = $(this).val();
    }
  );
});

$("#next").click(function (e) {
  e.preventDefault();
  if ($("input[type=radio][name=option]:checked").length > 0) {
    var selectedopt = $("input[type=radio][name=option]:checked").val();
    jsq.checkAnswer(selectedopt);
    $("input[type=radio][name=option]").prop("checked", false);
    jsq.changeQuestion(1);
  } else {
    alert("Please answer this question to proceed");
  }
});

$("#previous").click(function (e) {
  e.preventDefault();
  if (selectedopt) {
    jsq.checkAnswer(selectedopt);
  }
  jsq.changeQuestion(-1);
});
