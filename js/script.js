// Cominciamo creando la tabella

let generatedNumber = 0;
const generatedNumbersArray = [];
let hasBeenClicked;
let totalNum = 0;

const creationTable = () => {
  const divTable = document.getElementById("table");
  for (let i = 0; i < 76; i++) {
    const numField = document.createElement("div");
    numField.classList.add("tableNumber");

    const num = document.createElement("h3");
    num.innerText = i + 1;

    numField.appendChild(num);
    divTable.appendChild(numField);
  }
};

creationTable();

const cardForUser = () => {
  const cardNum = document.getElementById("numTables").value;

  const card = document.getElementById("userCards");
  for (let k = 0; k < cardNum; k++) {
    const descr = document.createElement("p");
    const descriptionContent = `${k + 1}a tabellina`;
    descr.innerText = descriptionContent;

    card.appendChild(descr);

    const oneCard = document.createElement("div");
    // oneCard.classList.add("thisIsACard");
    const calledNums = [];
    for (let i = 0; i < 24; i++) {
      const numField = document.createElement("div");
      numField.classList.add("tableNumber");

      const num = document.createElement("h3");

      let randomNum = Math.ceil(Math.random() * 76);
      let times = 0;
      while (calledNums.includes(randomNum) && times < 24) {
        randomNum = Math.ceil(Math.random() * 76);
        times++;
      }
      calledNums.push(randomNum);
      num.innerText = randomNum;

      numField.appendChild(num);
      oneCard.appendChild(numField);
    }
    oneCard.classList.add("userCard");
    card.appendChild(oneCard);
  }
  hasBeenClicked = true;
};

const checkWinner = () => {
  const cards = document.getElementsByClassName("userCard");
  let isWinner;
  for (let i = 0; i < cards.length; i++) {
    const numbers = cards[i].querySelectorAll(".userCard div");
    let areWeWinning = true;
    for (let k = 0; k < numbers.length; k++) {
      if (!numbers[k].classList.contains("chosenNumber")) {
        areWeWinning = false;
      }
    }
    if (areWeWinning) {
      alert(`Abbiamo una cartella vincente! É la ${i + 1}a tabellina!`);
    }
  }
};

const generateAndTicRandomNumber = () => {
  if (hasBeenClicked) {
    generatedNumber = Math.ceil(Math.random() * 76);
    let i = 0;
    while (generatedNumbersArray.includes(generatedNumber) && i < 76) {
      if (i === 75) {
        console.log("Tutti i numeri sono stati chiamati!");
      }
      generatedNumber = Math.ceil(Math.random() * 76);
      i++;
    }
    generatedNumbersArray.push(generatedNumber);

    const paragraphs = document.querySelectorAll("#generateNumber p");
    for (let p = 0; p < paragraphs.length; p++) {
      paragraphs[p].style.display = "block";
    }

    const showNumber = document.querySelector("#generateNumber p+p");
    showNumber.innerText = generatedNumber;

    const numInTable = document.querySelectorAll("#table div h3");
    const numUser = document.querySelectorAll("#userCards div h3");

    numInTable.forEach((num) => {
      if (parseInt(num.innerText) === generatedNumber) {
        num.parentElement.classList.add("chosenNumber");
        num.style.color = "beige";
      }
    });

    numUser.forEach((num) => {
      if (parseInt(num.innerText) === generatedNumber) {
        num.parentElement.classList.add("chosenNumber");
        num.style.color = "beige";
      }
    });
    totalNum += 1;
    if (totalNum >= 24) {
      checkWinner();
    }
  } else {
    alert("Prima di giocare, scegli quante tabelle vuoi!");
  }
};
