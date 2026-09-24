(function () {
  var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Anna", "Jill", "Mike"];

  // Частина 1: за першою літерою
  console.log("Частина 1: якщо ім'я починається на J/j — Goodbye, інакше — Hello");

  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    var firstLetter = name.charAt(0).toLowerCase();

    if (firstLetter === "j") {
      goodbyeSpeaker.speak(name);
    } else {
      helloSpeaker.speak(name);
    }
  }

  // Частина 2: сума ASCII-кодів
  console.log("");
  console.log("Частина 2: сума ASCII-кодів літер імені");
  console.log("Анотація: рахуємо суму кодів усіх літер імені. Якщо сума > 400 — Goodbye, інакше — Hello.");

  for (var k = 0; k < names.length; k++) {
    var currentName = names[k];
    var sum = 0;

    for (var j = 0; j < currentName.length; j++) {
      sum = sum + currentName.charCodeAt(j);
    }

    console.log(currentName + ": сума = " + sum);

    if (sum > 400) {
      goodbyeSpeaker.speak(currentName);
    } else {
      helloSpeaker.speak(currentName);
    }
  }
})();
