const quotes = [
  "Inhale the future, exhale the past.",
  "Think twice, act once.",
  "Pause and ponder before you proceed.",
  "Control your impulses, or they will control you.",
  "Impulse is a poor guide.",
  "React less, think more.",
  "The ability to delay gratification is a key indicator of future success.",
  "Impulse is the enemy of progress.",
  "Don't let a moment of weakness ruin a lifetime of progress.",
  "Mastering impulse control leads to mastering life.",
  "Self-control is strength; right thought is mastery; calmness is power.",
  "Impulse control is the first step to success.",
  "Your choices today shape your tomorrow.",
  "Act with purpose, not on impulse.",
  "Impulsivity is the enemy of discipline.",
  "The cost of impulsive decisions can be high.",
  "Pause, breathe, and then decide.",
  "A moment of patience can prevent a lifetime of regret.",
  "Resist the urge to react immediately.",
  "Impulse decisions rarely lead to lasting happiness.",
  "Self-discipline begins with the mastery of your thoughts.",
  "Impulse control is a sign of emotional intelligence.",
  "Impulsive actions often lead to long-term regrets.",
  "Control your emotions, or they will control you.",
  "Mindfulness leads to better impulse control.",
  "Think before you act; think twice before you react.",
  "Don't let a temporary urge destroy your long-term goals.",
  "Self-control is the ultimate form of freedom.",
  "Impulse control is a skill that can be developed.",
  "Make decisions based on your values, not your impulses.",
  "Impulse decisions rarely lead to lasting happiness.",
  "Impulse is the enemy of rational thought.",
  "Master your impulses, master your destiny.",
  "Impulsivity is the enemy of progress.",
  "Resist the urge to react; respond with thoughtfulness.",
  "Impulse control is the key to personal growth.",
  "Impulse is a momentary madness; resist it.",
  "The ability to delay gratification leads to success.",
  "Acting impulsively is easy; exercising self-control is strength.",
  "Impulse control separates the wise from the foolish.",
  "Pause and reflect before you act.",
  "Impulse decisions are often driven by emotion.",
  "Embrace self-discipline; reject impulsivity.",
  "Resist immediate gratification for long-term satisfaction.",
  "Impulse is the enemy of patience.",
  "Conquer your impulses to conquer your life.",
  "Master your impulses; don't let them master you.",
  "Impulse control is a choice; make it wisely.",
  "Think before you act; it's a sign of wisdom.",
  "Impulse decisions can have lasting consequences.",
  "Control your impulses to control your destiny.",
  "Reacting on impulse rarely leads to good outcomes.",
  "Impulse control is a mark of maturity.",
  "Impulse decisions are often driven by fear.",
  "Impulsivity is the enemy of success.",
  "Practice restraint in the face of temptation.",
  "Impulse control leads to inner peace.",
  "Resist the urge to act without thinking.",
  "Impulsive actions often lead to regret.",
  "Mastering impulse control is mastering yourself.",
  "Impulse control is the key to personal power.",
  "Pause, evaluate, then decide.",
  "Self-control is a sign of strength, not weakness.",
  "Impulsivity is the enemy of rationality.",
  "Impulse decisions can derail your goals.",
  "Impulse control is a valuable life skill.",
  "Control your impulses, control your destiny.",
  "Impulse is a momentary urge; don't be a slave to it.",
  "Resist the urge to react in anger.",
  "Impulse control is a sign of emotional maturity.",
  "Act deliberately, not impulsively.",
  "Think about the consequences before you act.",
  "Impulsive decisions can lead to regret.",
  "Impulse control is the path to self-mastery.",
  "Resist the urge to act on emotion alone.",
  "Impulsivity is the enemy of self-discipline.",
  "Acting on impulse often leads to disappointment.",
  "Impulse control is a form of self-respect.",
  "Impulse decisions can lead to long-term pain.",
  "Reacting impulsively rarely leads to good outcomes.",
  "Pause and consider the bigger picture.",
  "Impulse control leads to better decision-making.",
  "Impulse is the enemy of rational thought.",
  "Resist the urge to give in to temptation.",
  "Impulse control is a sign of inner strength.",
  "Impulsive actions often lead to regret.",
  "Mastering impulse control is mastering life.",
  "Think before you act, and you'll act wisely.",
  "Impulsivity is the enemy of progress.",
  "Control your impulses to control your future.",
  "Impulse decisions rarely lead to lasting happiness.",
  "Resist the urge to react without thinking.",
  "Impulse control is a key to success.",
  "Impulse is the enemy of patience.",
  "Embrace self-control, reject impulsivity.",
  "Impulse decisions are often driven by emotion.",
  "Conquer your impulses, conquer your life.",
  "Impulse control is a choice; make it wisely.",
  "Impulse decisions can have lasting consequences.",
  "Think before you act; it's a sign of wisdom.",
  "Impulse control leads to inner peace.",
  "Resist the urge to act without thinking.",
  "Impulsive actions often lead to regret.",
  "Mastering impulse control is mastering yourself.",
  "Impulse control is the key to personal power.",
  "Pause, evaluate, then decide.",
  "Self-control is a sign of strength, not weakness.",
  "Impulsivity is the enemy of rationality.",
  "Impulse decisions can derail your goals.",
  "Impulse control is a valuable life skill.",
  "Control your impulses, control your destiny.",
  "Impulse is a momentary urge; don't be a slave to it.",
  "Resist the urge to react in anger.",
  "Impulse control is a sign of emotional maturity.",
  "Act deliberately, not impulsively.",
  "Think about the consequences before you act.",
  "Impulsive decisions can lead to regret.",
  "Impulse control is the path to self-mastery.",
  "Resist the urge to act on emotion alone.",
  "Impulsivity is the enemy of self-discipline.",
  "Acting on impulse often leads to disappointment.",
  "Impulse control is a form of self-respect.",
  "Impulse decisions can lead to long-term pain.",
  "Reacting impulsively rarely leads to good outcomes.",
  "Pause and consider the bigger picture.",
  "Impulse control leads to better decision-making.",
  "Impulse is the enemy of rational thought.",
  "Resist the urge to give in to temptation.",
  "Impulse control is a sign of inner strength.",
  "Impulsive actions often lead to regret.",
  "Mastering impulse control is mastering life.",
];

function getRandomQuote() {
  const randomNumber = Math.floor(Math.random() * quotes.length);
  return quotes[randomNumber];
}

function displayQuote() {
  const quoteElement = document.getElementById("quote");
  const randomQuote = getRandomQuote();
  quoteElement.textContent = `"${randomQuote}"`;
}

displayQuote();

jQuery(document).ready(function ($) {
  $("#tools_wrap_toggle").click(function () {
    $("#tools_wrap").slideToggle("slow");
  });
});

// table
function getAllEntries() {
  const entries = JSON.parse(localStorage.getItem("myEntries")) || [];
  return entries;
}

function populateBubbles() {
  const entries = getAllEntries();
  const bubbleContainer = document.getElementById("bubbleContainer");

  for (const entry of entries) {
    const bubble = document.createElement("div");
    bubble.classList.add(
      "bubble",
      !entry.stillWant ? "true-bubble" : "false-bubble"
    );
    const formattedTimestamp = new Date(entry.timestamp).toLocaleDateString(
      "en-US",
      {
        month: "long",
        day: "numeric",
      }
    );

    const textElement = document.createElement("span");
    textElement.classList.add("bubble-text");
    textElement.textContent = formattedTimestamp;
    bubble.appendChild(textElement);

    // Attach a click event listener to each bubble
    bubble.addEventListener("click", function () {
      // Populate the modal with entry details
      const modalTitle = document.querySelector(
        "#exampleModalLong .modal-title"
      );
      modalTitle.textContent = formattedTimestamp;

      const modalBody = document.querySelector("#exampleModalLong .modal-body");
      modalBody.innerHTML = `
                <p><strong>Impulse:</strong> ${entry.impulse}</p>
                <p><strong>Consequences:</strong> ${entry.consequences}</p>
            `;

      const entryIndexToDelete = entries.indexOf(entry);

      // Handle DELETE button click
      document
        .querySelector("#deleteEntryButton")
        .addEventListener("click", function () {
          // Remove the entry from local storage by index
          entries.splice(entryIndexToDelete, 1);
          localStorage.setItem("myEntries", JSON.stringify(entries));

          // Close the modal
          $("#exampleModalLong").modal("hide");

          // Refresh the bubbles after deletion
          bubbleContainer.innerHTML = "";
          populateBubbles();
        });

      // Open the Bootstrap modal when a bubble is clicked
      $("#exampleModalLong").modal("show");
    });

    // Append the bubble to the container
    bubbleContainer.appendChild(bubble);
  }
}

populateBubbles();
