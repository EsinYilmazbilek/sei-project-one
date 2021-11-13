/* eslint-disable indent */
//* Grid Variables *//

const grid = document.querySelector('.grid')
const cells = []
const width = 12
const gridCellCount =  width * width


//* Borg Variables *//

const borgs = [
  13,14,15,16,17,18,19,
  25,26,27,28,29,30,31,
  37,38,39,40,41,42,43,
  49,50,51,52,53,54,55
]

//* Starship Variables *//

const starShipIndex = 120


//* Building the Grids *//

function createGrid() {
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.textContent = i
    cells.push(cell)
    grid.appendChild(cell)
  }
}
createGrid()


//* Building the Borg *//

function createBorg(){
  borgs.forEach((index) => {
    cells[index].classList.add('borgs')
    return
  })
}

createBorg()


//* Building the StarShip *//


cells[starShipIndex].classList.add('starship')