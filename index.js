window.onload = function () {
  // Pick DOM
  let firstNum = document.getElementById('first-num');
  let secondNum = document.getElementById('second-num');
  let layout = document.getElementById('layout');
  let result = document.getElementById('result');
  let timer = document.getElementById('timer');
  let highScore = document.getElementById('high-score');
  let rand1 = 0
  let rand2 = 0

  // Shared functions
  const startTimer = () => {
    timer.innerText = '0';

    return setInterval(function () {
      timer.innerText = (+timer.innerText + 0.01).toFixed(2);
    }, 10);
  };
  const randomCalculation = () => {
    rand1 = randomInt(3);
    rand2 = randomInt(3);

    firstNum.innerText = rand1;
    secondNum.innerText = rand2;
  };
  const setHighScore = () => {
    let currentHighScore = +highScore.innerText;
    let currentScore = +timer.innerText;

    if (currentScore < currentHighScore) {
      highScore.innerText = currentScore;
    }
  };

  // Event listeners
  layout.addEventListener("click", function () {
    if (result.innerText === '=') {
      // Show result
      result.innerText = `= ${rand1 + rand2}`;
      clearInterval(interval)
      setHighScore()
    } else {
      // Reset calculation
      result.innerText = '=';
      randomCalculation();

      interval = startTimer();
    }
  });

  // Main action
  randomCalculation();
  let interval = startTimer();
}

function randomInt(numOfDigits) { let num = 0
  do {
    num = Math.floor(Math.random() * 10**numOfDigits);
  } while (num < 10**(numOfDigits - 1))

  return num
}

