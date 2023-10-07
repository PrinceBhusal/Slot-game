const prompt = require("prompt-sync")();

const  ROWS = 3
const COLS = 3

const symbolCount = {
    "A":2,
    "B":4,
    "C":6,
    "D":8,
}

const symbolValue = {
    "A":5,
    "B":4,
    "C":3,
    "D":2,
}

function deposit() {
    while (true){
    const depositeAmount =prompt("Enter amount to deposit: ")
    const floatDepositAmount=parseFloat(depositeAmount)
    if (isNaN(floatDepositAmount) || floatDepositAmount <= 0){
        console.log("Type a valid number")
    } else {
        return floatDepositAmount
    }
         
}
}

function numberOfLinesToBet() {
    while (true){
    const numberOFLines =prompt("Enter number of lines to bet on (1-3): ")
    const floatnumberOfLines=parseFloat(numberOFLines)
    if (isNaN(floatnumberOfLines) || floatnumberOfLines <= 0 ||floatnumberOfLines>3){
        console.log("Type a valid number of lines")
    } else {
        return floatnumberOfLines
    }
         
}

}

function amountToBet(balance, numberOfLines){
    while (true){
        const Bet =prompt("Enter the bet per line: ")
        const floatBet=parseFloat(Bet)
        if (isNaN(floatBet) || floatBet <= 0 ||floatBet>(balance/numberOfLines)){
            console.log("Type a valid amount to bet on (not more than you deposited)")
        } else {
            return floatBet
        }
             

}
}

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(symbolCount)) {
      for (let i = 0; i < count; i++) {
        symbols.push(symbol);
      }
    }
  
    const reels = [];
    for (let i = 0; i < COLS; i++) {
      reels.push([]);
      const reelSymbols = [...symbols];
      for (let j = 0; j < ROWS; j++) {
        const randomIndex = Math.floor(Math.random() * reelSymbols.length);
        const selectedSymbol = reelSymbols[randomIndex];
        reels[i].push(selectedSymbol);
        reelSymbols.splice(randomIndex, 1);
      }
    }
  
    return reels;
  

}

const transpose = (reels) => {
    const rows = [];
  
    for (let i = 0; i < ROWS; i++) {
      rows.push([]);
      for (let j = 0; j < COLS; j++) {
        rows[i].push(reels[j][i]);
      }
    }
  
    return rows;
};
  
const printRows = (rows) => {
    for (const row of rows) {
      let rowString = "";
      for (const [i, symbol] of row.entries()) {
        rowString += symbol;
        if (i != row.length - 1) {
          rowString += " | ";
        }
      }
      console.log(rowString);
    }
};

function getWinnings(rows,bet,lines){
     let winnings= 0
     for (let row =0;row<lines;row++){
        const symbols = rows[row]
        let allsame=true

        for (const symbol of symbols){
            if (symbol !=symbols[0]){
                allsame=false
                break
            }
        }

        if (allsame){
            winnings  +=bet *symbolValue[symbols[0]]
        }
     }
    
     return winnings
}


function game(){
    let balance = deposit();

    while (true){
        console.log("You have रू "+balance)
        const numberOfLines = numberOfLinesToBet()
     const bet = amountToBet(balance,numberOfLines)
      const reels = spin()
       const rows = transpose(reels)
      printRows(rows)
      const winnings = getWinnings(rows,bet, numberOfLines)
      balance += winnings
      console.log("You won , रू " + winnings.toString())
      

      if (balance <=0){
        console.log("You are a brokie")
        break
      }

    const playAgain = prompt("Wanna play again? (Y/N)")
    if (playAgain != "Y"){
        break
    }
    
    }

}


game()