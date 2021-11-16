/* eslint-disable indent */

//* Grid Variables *//

const grid = document.querySelector('.grid')
const cells = []
const width = 12
const gridCellCount =  width * width



//* Borg Variables *//

let borgs = [
  { index: 13, isAlive: true },
  { index: 14, isAlive: true }, 
  { index: 15, isAlive: true }, 
  { index: 16, isAlive: true }, 
  { index: 17, isAlive: true }, 
  { index: 18, isAlive: true }, 
  { index: 19, isAlive: true }, 
  { index: 25, isAlive: true }, 
  { index: 26, isAlive: true }, 
  { index: 27, isAlive: true }, 
  { index: 28, isAlive: true }, 
  { index: 29, isAlive: true },
  { index: 30, isAlive: true }, 
  { index: 31, isAlive: true }, 
  { index: 37, isAlive: true }, 
  { index: 38, isAlive: true }, 
  { index: 39, isAlive: true }, 
  { index: 40, isAlive: true }, 
  { index: 41, isAlive: true }, 
  { index: 42, isAlive: true }, 
  { index: 43, isAlive: true }, 
  { index: 49, isAlive: true }, 
  { index: 50, isAlive: true }, 
  { index: 51, isAlive: true }, 
  { index: 52, isAlive: true }, 
  { index: 53, isAlive: true }, 
  { index: 54, isAlive: true }, 
  { index: 55, isAlive: true } 
]

//* Starship Variables *//

let starShipIndex = 120
// let starshipLaserIndex = starShipIndex - width

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

const border = [0,12,24,36,48,60,72,84,96,108,120,132,
11,23,35,47,59,71,83,95,107,119,131,143]

function createBorder(){
  border.forEach((index) => {
    cells[index].classList.add('border')
    return
  })
}
createBorder()

//* Building the Borg *//

function createBorg(){
  borgs.forEach((borg) => {
    cells[borg.index].classList.add('borgs')
  })
}
createBorg()


//* Building the StarShip *//

cells[starShipIndex].classList.add('starship')


//* Moving the Borg - game starts upon clicking the start button *//

const startButton = document.querySelector('.start')

function removeBorg(){
  borgs.forEach((borg) => {
    cells[borg.index].classList.remove('borgs')
  })
}

function addBorg(){
  borgs.forEach((borg) => {
    if (borg.isAlive) {
      cells[borg.index].classList.add('borgs')
    }
  })
}

let direction = 1

function handleGameStart() {
  window.setInterval(() => {    
    const rightBorder = borgs[borgs.length - 1].index % width === width - 1
    const leftBorder = borgs[0].index % width === 0

    removeBorg() 

    if (rightBorder && direction === 1) {
      borgs = borgs.map(borg => {
        borg.index += width 
        return borg
      })
      direction = -1
    } else if (leftBorder && direction === -1) {
      borgs = borgs.map(borg => {
        borg.index += width
        return borg
      })
      direction = 1
    } else {
      borgs = borgs.map(borg => {
        borg.index += direction
        return borg
      })
    }

    addBorg()
  }, 860)

}
startButton.addEventListener('click', handleGameStart)



//* Moving the StarShip *//

function removeStarship(){
    cells[starShipIndex].classList.remove('starship')
}

function addStarship(){
    cells[starShipIndex].classList.add('starship')
}

// function removeStarshipLaser(){
//   cells[starshipLaserIndex].classList.remove('starshipLaser')
// }

// function addStarshipLaser(){
//   cells[starshipLaserIndex].classList.add('starshipLaser')
// }

//* Handle Control Keys *//

function handleControlKeys(e) {
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
    case 'KeyX':
    handleStarshipLaser() 
      break
    default:
      console.log('no movement')
  }
  addStarship()
}

document.addEventListener('keyup', handleControlKeys)


//* Scoreboard Update *//

let scoreDisplay = 0
function updateScore(){
  const scoreId = document.querySelector('#scoreId')
  scoreId.innerText = 0
  scoreDisplay = scoreDisplay + 1000
  scoreId.innerText = scoreDisplay
}

//* Startship Laser *//

//? Laser gets shot
//? Laser moves up
//? Laser hits alien (the same cell contains both 'starshipLaser' and 'borgs' classes)
//? Both 'starshipLaser' and 'borgs' classes get removed from the cell
//? 1000 points are added to the scoreboard

function handleStarshipLaser() {
  let starshipLaserIndex = starShipIndex
  const laserInterval = window.setInterval(() => {
    cells[starshipLaserIndex].classList.remove('starshipLaser')
    starshipLaserIndex -= width
    cells[starshipLaserIndex].classList.add('starshipLaser')
  if (cells[starshipLaserIndex].classList.contains('borgs')) {
    cells[starshipLaserIndex].classList.remove('starshipLaser')
      clearInterval(laserInterval)
      const borgIndex = borgs.find(borg => {
        return borg.index === starshipLaserIndex
      })
      borgIndex.isAlive = false
      cells[starshipLaserIndex].classList.remove('borgs')
      updateScore()
      }
  }, 200)
  }


  // document.addEventListener('keyup', handleStarshipLaser)



//* Borgs Laser *//

// const laserAudioBorg = document.createElement('audioBorg')
// laserAudioBorg.src = './/development/projects/project-1/assets'
// laserAudioBorg.play()
// laserAudioBorg.pause()




//* Game Ends *//

// function borgsWin() {

//   if (cells[borg.index].classList.contains('borgs' || 'starShipIndex')) {
//   document.querySelector('.game-ends-borgs-win').innerHTML = 'You will be assimilated'
//   }
// }
// borgsWin()


// function starshipWins() {
//   if (cells[borg.index].classList.contains('starshipIndex')) {
//   document.querySelector('.game-ends').innerHTML = 'You have defeated the Borg. Take us out of orbit' 
//   }
// }
// starshipWins()


// function endGame() {
//   clearInterval(timer)
//   removePikachu(pikaPosition)
//   alert(score)
// }
