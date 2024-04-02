window.onload = function () {
  // Pick DOM
  let firstNum = document.getElementById('first-num');
  let secondNum = document.getElementById('second-num');
  let operator = document.getElementById('operator');
  let main = document.getElementById('main');
  let result = document.getElementById('result');
  let timer = document.getElementById('timer');
  let solved = document.getElementById('solved');
  let highScore = document.getElementById('high-score');
  let configNum1 = document.getElementById('config-num-1');
  let configNum2 = document.getElementById('config-num-2');
  let configOperator = document.getElementById('config-operator');

  const numberOfRounds = 10;
  let rand1 = 0;
  let rand2 = 0;
  let duration = 0;

  // Shared functions
  const formatTimer = (time) => {
    let min = Math.floor(time / 60);
    let sec = (time % 60).toFixed(1);
    return (min > 0 ? `${min}m` : '') + `${sec}s`;
  }
  const resumeTimer = () => {
    return setInterval(function () {
      duration += 0.1
      timer.innerText = formatTimer(duration)
    }, 100);
  };
  const randomCalculation = () => {
    rand1 = randomInt(configNum1.value);
    rand2 = randomInt(configNum2.value);

    firstNum.innerText = rand1;
    secondNum.innerText = rand2;
    operator.innerText = configOperator.value;
  };
  const setHighScore = () => {
    let solvedScore = +solved.innerText
     
    if (solvedScore <= 0 || solvedScore % numberOfRounds !== 0) return;
    let currentHighScore = +highScore.innerText;
    let currentScore = duration.toFixed(1);

    if (currentScore < currentHighScore || currentHighScore === 0) {
      highScore.innerText = currentScore;
      alert(`Congratz! It's a high score for ${numberOfRounds} rounds in ${formatTimer(duration)}`)
    } else {
      alert(`You did ${numberOfRounds} rounds in ${formatTimer(duration)}`)
    }

    // Reset timer after end of rounds
    duration = 0;
  };

  // Event listeners
  main.addEventListener("click", function () {
    if (result.innerText === '=') {
      // Pause and show result
      result.innerText = `= ${calculateNum(rand1, rand2, configOperator.value)}`;
      solved.innerText = +solved.innerText + 1;
      clearInterval(interval);
      setTimeout(setHighScore, 500);
    } else {
      // Reset calculation
      result.innerText = '=';
      randomCalculation();

      interval = resumeTimer();
    }
  });

  // Main action
  let interval = resumeTimer();
  randomCalculation();
}

function calculateNum(num1, num2, op) {
  switch (op) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
  }
}

function randomInt(numOfDigits) { let num = 0
  do {
    num = Math.floor(Math.random() * 10**numOfDigits);
  } while (num < 10**(numOfDigits - 1))

  return num;
}

