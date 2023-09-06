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
      question:
        "When faced with a tempting dessert, how likely are you to indulge in it?",
      options: [
        {
          a: "Very Likely",
          b: "Likely",
          c: "Sometimes",
          d: "Rarely",
          e: "Never",
        },
      ],
      score: 0,
    },
    {
      id: 2,
      question:
        "How often do you make impulse purchases, such as buying items not on your shopping list?",
      options: [
        {
          a: "Very Often",
          b: "Often",
          c: "Occasionally",
          d: "Rarely",
          e: "Never",
        },
      ],
      score: 0,
    },
    {
      id: 3,
      question:
        "When you receive a text message or notification, how quickly do you check your phone?",
      options: [
        {
          a: "Immediately",
          b: "Within a few minutes",
          c: "Within an hour",
          d: "After a few hours",
          e: "Whenever I feel like it",
        },
      ],
      score: 0,
    },
    {
      id: 4,
      question:
        "Do you find it challenging to resist the urge to interrupt others during conversations?",
      options: [
        { a: "Always", b: "Often", c: "Sometimes", d: "Rarely", e: "Never" },
      ],
      score: 0,
    },
    {
      id: 5,
      question:
        "How often do you engage in impulsive behaviors like speeding while driving?",
      options: [
        {
          a: "Very Often",
          b: "Often",
          c: "Occasionally",
          d: "Rarely",
          e: "Never",
        },
      ],
      score: 0,
    },
    {
      id: 6,
      question:
        "Are you prone to making impulsive decisions without considering the consequences?",
      options: [
        { a: "Always", b: "Often", c: "Sometimes", d: "Rarely", e: "Never" },
      ],
      score: 0,
    },
    {
      id: 7,
      question:
        "How often do you find yourself procrastinating on important tasks until the last minute?",
      options: [
        {
          a: "Very Often",
          b: "Often",
          c: "Occasionally",
          d: "Rarely",
          e: "Never",
        },
      ],
      score: 0,
    },
    {
      id: 8,
      question:
        "When experiencing strong emotions like anger or frustration, do you tend to react impulsively?",
      options: [
        { a: "Always", b: "Often", c: "Sometimes", d: "Rarely", e: "Never" },
      ],
      score: 0,
    },
    {
      id: 9,
      question:
        "How likely are you to engage in impulsive eating when stressed or upset?",
      options: [
        {
          a: "Very Likely",
          b: "Likely",
          c: "Sometimes",
          d: "Rarely",
          e: "Never",
        },
      ],
      score: 0,
    },
    {
      id: 10,
      question:
        "Do you often find it challenging to save money and avoid impulsive spending?",
      options: [
        { a: "Always", b: "Often", c: "Sometimes", d: "Rarely", e: "Never" },
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

    if (scr <= 20) {
      impulsivityLevel = "Low Impulsivity";
      resultImage = "../images/low_impulsivity.png";
    } else if (scr >= 21 && scr <= 30) {
      impulsivityLevel = "Moderate Impulsivity";
      resultImage = "../images/moderate_impulsivity.png";
    } else if (scr >= 31 && scr <= 40) {
      impulsivityLevel = "High Impulsivity";
      resultImage = "../images/high_impulsivity.png";
    } else if (scr >= 41 && scr <= 50) {
      impulsivityLevel = "Very High Impulsivity";
      resultImage = "../images/very_high_impulsivity.png";
    } else {
      impulsivityLevel = "Undefined";
      resultImage = "../images/very_high_impulsivity.png";
    }

    const resultMessage = `
    <div class="result-message">
    <img class='quiz-result-image' src='${resultImage}'>
    <h3 class='res-header'>Impulsivity Level: ${impulsivityLevel}</h3>
    <h4 class='res-text'>Total Score: &nbsp;${scr}/${maxScore}</h4>
                         
    </div>
    `;

    $("#result").addClass("result");
    $("#result").html(resultMessage);
  };

  this.checkAnswer = function (option) {
    quiz.JS[this.currentque].score = points[option];
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
