window.onload = function () {
  // Pick DOM
  let firstNum = document.getElementById('first-num');
  let secondNum = document.getElementById('second-num');
  let operator = document.getElementById('operator');
  let main = document.getElementById('main');
  let result = document.getElementById('result');
  let timer = document.getElementById('timer');
  let highScore = document.getElementById('high-score');
  let configNum1 = document.getElementById('config-num-1');
  let configNum2 = document.getElementById('config-num-2');
  let configOperator = document.getElementById('config-operator');
  let rand1 = 0;
  let rand2 = 0;

  // Shared functions
  const startTimer = () => {
    timer.innerText = '0';

    return setInterval(function () {
      timer.innerText = (+timer.innerText + 0.1).toFixed(1);
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
    let currentHighScore = +highScore.innerText;
    let currentScore = +timer.innerText;

    if (currentScore < currentHighScore || currentHighScore === 0) {
      highScore.innerText = currentScore;
    }
  };

  // Event listeners
  main.addEventListener("click", function () {
    if (result.innerText === '=') {
      // Show result
      result.innerText = `= ${calculateNum(rand1, rand2, configOperator.value)}`;
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
  let interval = startTimer();
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

