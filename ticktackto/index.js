class TickTackTo {
  constructor() {
    this.gameState = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    this.currentPlayer = 0;
    this.board = document.getElementById("game");
    this.handleEvent = this.handleEvent.bind(this);
    this.initBoard();
  }

  initBoard() {
    this.board.querySelectorAll("div").forEach((div, row) => {
      div.querySelectorAll("button").forEach((button, col) => {
        button.info = [row, col];
        button.addEventListener("click", this.handleEvent);
      });
    });
  }

  handleEvent(event) {
    event.target.innerText = this.currentPlayer === 0 ? "X" : "O";
    const info =  event.target.info
    
    this.gameState[info[0]][info[1]] = this.currentPlayer === 0 ? "X" : "O";
    this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;

    this.verfiyBoard()
    
 }

 verfiyBoard() {
    let isWonRow = false;
    let isWonCol = false;
    for(let i=0; i<this.gameState.length; i++) {
        let testRow = this.gameState[i][0]
        let testCol = this.gameState[0][i]
        for(let j=0; j<this.gameState[0].length; j++) {
            if(this.gameState[i][j] === testRow && testRow!="") {
                isWonRow =  true
            } else {
                isWonRow = false
            }

            if(this.gameState[j][i] === testCol && testCol!="") {
                isWonCol =  true
            } else {
                isWonCol = false
            }
            console.log(isWonCol, isWonRow)
        }
        if(isWonCol || isWonRow) { window.alert("this is won") }
    }
 }
}

document.addEventListener("DOMContentLoaded", () => {
  const game = new TickTackTo();
});
