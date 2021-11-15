/* eslint-disable indent */

//* Grid Variables *//

const grid = document.querySelector('.grid')
const cells = []
const width = 12
const gridCellCount =  width * width


//* Borg Variables *//

let borgs = [
  13,14,15,16,17,18,19,
  25,26,27,28,29,30,31,
  37,38,39,40,41,42,43,
  49,50,51,52,53,54,55
]

//* Starship Variables *//

let starShipIndex = 120


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





//* Moving the Borg - Starting the Game upon clicking the start button*//

const startButton = document.querySelector('.start')

function removeBorg(){
  borgs.forEach((index) => {
    cells[index].classList.remove('borgs')
  })
}

function addBorg(){
  borgs.forEach((index) => {
    cells[index].classList.add('borgs')
  })
}

function handleGameStart() {
  window.setInterval(() => {
    removeBorg()
    borgs = borgs.map((index) => {  
      return index += 1
    })
    addBorg()
      // borgs.forEach((index) => {  
  //   cells[index].classList.remove('borgs'),
  //   index ++
  //   cells[index].classList.add('borgs')
  //   return
  // })
  }, 500)
}

startButton.addEventListener('click', handleGameStart)



// startButton.onclick = function moveBorgs() {
// }



//* Move the StarShip *//

function removeStarship(){
    cells[starShipIndex].classList.remove('starship')
}

function addStarship(){
    cells[starShipIndex].classList.add('starship')
}

function moveStarShip(e) {
  // console.log(e.code)
  const x = starShipIndex % width

  removeStarship()
  switch (e.code) {
    case 'ArrowRight':
      if (x < width - 1) {
        starShipIndex++
      }
      break
    case 'ArrowLeft':
      if (x > 0) {
        starShipIndex--
      }
      break
    default:
      console.log('no movement')
  }
  addStarship()
}

document.addEventListener('keyup', moveStarShip)




//* Startship Laser *//

// const starshipLaserIndex = document.querySelector('.starshipLaser')


let starshipLaserIndex = starShipIndex

cells[starshipLaserIndex].classList.add('starshipLaser')

function removeStarshipLaser(){
  cells[starshipLaserIndex].classList.remove('starshipLaser')
}

function addStarshipLaser(){
  cells[starshipLaserIndex].classList.add('starshipLaser')
}


function handleStarshipLaser(e) {
console.log(e)
// const y = starshipLaserIndex / width

if (e.key === 'x') {
  console.log('hello')
  removeStarshipLaser()
  starshipLaserIndex -= 12
  addStarshipLaser()
  return
} 

}

document.addEventListener('keydown', handleStarshipLaser)

