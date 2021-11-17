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


//* Moving the Borg - they start upon clicking the start button *//

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

//? 1000 points are added to the scoreboard everytime the starship hits a borg

let scoreDisplay = 0
function updateScore(){
  const scoreId = document.querySelector('#scoreId')
  scoreId.innerText = 0
  scoreDisplay = scoreDisplay + 1000
  scoreId.innerText = scoreDisplay
}


//* Borders *//

//? creaating top and bottom borders 
//? if starship laser arrives on the top row it disappears
//? if borg laser arrives on the last row it dissappears

// const bottomBorder = cells[0,1,2,3,4,5,6,7,8,9,10,11]
// const topBorder = cells[132,133,134,135,136,137,138,139,140,141,142,143]



//* Startship Laser *//

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
    } else if (starshipLaserIndex < width) {
        clearInterval(laserInterval)
        cells[starshipLaserIndex].classList.remove('starshipLaser')
      }
  }, 200)
  }

  // document.addEventListener('keyup', handleStarshipLaser)



//* Borgs Laser *//

//? all borgs have the ability to shoot
//? borgs can only shoot when the cell in front of them doesn't contain a borg
//? the shooting is randomised and it happens in every 1 second

// function addBorgsLaser() {
//   cells[borgsLaserIndex].classList.add('borgLaser')
// }

// function removeBorgsLaser() {
//   cells[borgsLaserIndex].classList.remove('borgLaser')
// }

// let isBorgFree = false

// function handleBorgAvailability(indexToCheck) {
//   if (!cells[indexToCheck + width].classList.contains('borgs')) {
//     console.log('borg is free', indexToCheck, indexToCheck)
//     isBorgFree = true
//   } else {
    
//     isBorgFree = false
//   }
// }

// function handleBorgsLaser() {
  
  // let currentIndexToCheck = borgs[Math.floor(Math.random() * borgs.length)].index

// }


// function handleBorgLaser() {

//   let borgIndex.isAlive = false

//   const currentIndexToCheck = borgs[Math.floor(Math.random() * borgs.length)].index
//   const borgToShoot = borgs.find(borg => {
//     return borg.index === currentIndexToCheck
//   })
//   let borgLaserIndex = borgToShoot.index + width

//   const borgLaserInterval = window.setInterval(() => {
//     cells[borgLaserIndex].classList.remove('borgLaser')
//     borgLaserIndex += width
//     cells[borgLaserIndex].classList.add('borgLaser')

//   if (cells[borgLaserIndex].classList.contains('starShip')) {
//     cells[borgLaserIndex].classList.remove('starShip')
//       clearInterval(borgLaserInterval)
//       // const borgIndex = borgs.find(borg => {
//       //   return borg.index === starshipLaserIndex
//       // })
//       // borgIndex.isAlive = false
//       cells[borgLaserIndex].classList.remove('borgs')
//       updateScore()
//       } else if (borgLaserIndex > 131) {
//         clearInterval(borgLaserInterval)
//         cells[borgLaserIndex].classList.remove('borgLaser')
//       }
//   }, 800)
//   }


// window.setInterval(handleBorgsLaser, 3000)

// handleBorgAvailability(currentIndexToCheck) 

  // while(!isBorgFree) {
  //   console.log('not free')
  //   currentIndexToCheck = borgs[Math.floor(Math.random() * borgs.length)].index
  //   handleBorgAvailability(currentIndexToCheck)
  // }

  // if (isBorgFree) {
  //   console.log('free', currentIndexToCheck)
  //     const borgShootInterval = window.setInterval(() => {
  //     cells[borgsLaserIndex].classList.remove('borgLaser')
  //     borgsLaserIndex += width
  //     cells[borgsLaserIndex].classList.add('borgLaser')
  //     if (cells[borgsLaserIndex].classList.contains('starshipLaser')) {
  //     cells[borgsLaserIndex].classList.remove('starshipLaser')
  //     clearInterval(borgShootInterval)
  //     }
  //   }, 2000)
  //   }




//* Borg Explosion *//

// function addBorgsExplosion() {
//   cells[borgsLaserIndex].classList.add('borgExplosion')
// }

// function removeBorgsExplosion() {
//   cells[borgsLaserIndex].classList.remove('borgExplosion')
// }


// const rightBorder = borgs[borgs.length - 1].index % width === width - 1
// cells[borg.index].classList.add('borgs')



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
