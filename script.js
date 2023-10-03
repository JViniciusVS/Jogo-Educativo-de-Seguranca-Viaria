const questions = [
    {
      question: "Qual é a cor do semáforo que significa 'pare'?",
      options: ["Vermelho", "Amarelo", "Verde"],
      answer: 0,
      difficulty: "Fácil",
    },
    {
      question: "Qual é a velocidade máxima permitida em áreas escolares?",
      options: ["40 km/h", "60 km/h", "80 km/h"],
      answer: 0,
      difficulty: "Fácil",
    },
    {
      question: "O que significa a placa 'Dê a preferência'?",
      options: [
        "Dar prioridade aos veículos que se aproximam",
        "Avançar sem olhar",
        "Estacionar o veículo",
      ],
      answer: 0,
      difficulty: "Médio",
    },
    {
      question: "O que indica a sinalização de cor amarela contínua?",
      options: [
        "Divisão de fluxos opostos em vias com mais de uma faixa",
        "Área escolar",
        "Proibido estacionar",
      ],
      answer: 0,
      difficulty: "Difícil",
    },
    // Pergunta adicional 1
    {
      question: "Qual é a cor do semáforo que significa 'atenção'?",
      options: ["Amarelo", "Vermelho", "Verde"],
      answer: 0,
      difficulty: "Fácil",
    },
    // Pergunta adicional 2
    {
      question: "Qual é a velocidade máxima permitida em rodovias?",
      options: ["80 km/h", "100 km/h", "120 km/h"],
      answer: 2,
      difficulty: "Médio",
    },
    // Pergunta adicional 3
    {
      question:
        "O que significa a placa de trânsito com a letra 'E' dentro de um círculo vermelho?",
      options: [
        "Proibido estacionar",
        "Perigo - Curva acentuada à esquerda",
        "Dê a preferência",
      ],
      answer: 0,
      difficulty: "Fácil",
    },
    // Pergunta adicional 4
    {
      question: "O que indica a sinalização de cor azul?",
      options: [
        "Indicação de serviços auxiliares",
        "Área escolar",
        "Proibido estacionar",
      ],
      answer: 0,
      difficulty: "Médio",
    },
    // Pergunta adicional 5
    {
      question:
        "O que significa a placa com a imagem de uma pessoa atravessando a rua?",
      options: [
        "Passagem de pedestres",
        "Cruzamento de vias",
        "Estacionamento permitido",
      ],
      answer: 0,
      difficulty: "Fácil",
    },
    // Pergunta adicional 6
    {
      question:
        "O que significa a sinalização de cor vermelha intermitente?",
      options: [
        "Pare o veículo e siga somente se não houver obstáculos",
        "Área escolar",
        "Proibido estacionar",
      ],
      answer: 0,
      difficulty: "Médio",
    },
  ];

  const difficultyLevels = {
    Fácil: 20,
    Médio: 25,
    Difícil: 30,
  };

  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  let gameStarted = false;

  function startGame() {
    if (!gameStarted) {
      document.getElementById("start-button").innerText = "Reiniciar Jogo";
      gameStarted = true;
    } else {
      resetCarPosition();
    }

    document.getElementById("score").innerText = "";
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    startTimer();
  }

  function showQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const question = questions[currentQuestionIndex];
    const shuffledOptions = shuffleArray(question.options);

    questionElement.innerText = question.question;
    optionsElement.innerHTML = "";

    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement("div");
      option.className = "option";
      option.innerText = shuffledOptions[i];
      option.onclick = () => checkAnswer(option);
      optionsElement.appendChild(option);
    }
  }

  function checkAnswer(selectedOption) {
    if (
      selectedOption.innerText ===
      questions[currentQuestionIndex].options[
        questions[currentQuestionIndex].answer
      ]
    ) {
      score++;
      moveCar();
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      showQuestion();
      startTimer();
    } else {
      endGame();
    }
  }

  function moveCar() {
    const roadContainer = document.getElementById("road-container");
    const car = document.getElementById("car");
    const roadWidth = roadContainer.clientWidth - car.clientWidth + 30;
    const progress = score / questions.length; // Alterado: usar a variável score em vez de currentQuestionIndex
    const newPosition = roadWidth * progress;

    car.style.left = newPosition + "px";

    if (score === questions.length) {
      // Alterado: verificar a pontuação em vez do índice da pergunta atual
      car.style.left = roadWidth + "px";
    }
  }

  function resetCarPosition() {
    const car = document.getElementById("car");
    car.style.left = "0";
  }

  function endGame() {
    clearInterval(timer);
    document.getElementById("question").innerText = "Jogo finalizado!";
    document.getElementById("options").innerHTML = "";
    document.getElementById("timer").innerText = "";
    document.getElementById("score").innerText =
      "Sua pontuação final é: " + score + "/" + questions.length;
  }

  function startTimer() {
    clearInterval(timer);
    const question = questions[currentQuestionIndex];
    const difficulty = difficultyLevels[question.difficulty];
    let timeLeft = difficulty;

    document.getElementById("timer").innerText =
      "Tempo restante: " + timeLeft + "s";

    timer = setInterval(() => {
      timeLeft--;
      document.getElementById("timer").innerText =
        "Tempo restante: " + timeLeft + "s";

      if (timeLeft === 0) {
        clearInterval(timer);
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
          showQuestion();
          startTimer();
        } else {
          endGame();
        }
      }
    }, 1000);
  }

  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }