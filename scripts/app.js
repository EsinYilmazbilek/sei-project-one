/* eslint-disable indent */

//* Grid Variables *//

const grid = document.querySelector('.grid')
const cells = []
const width = 12
const gridCellCount =  width * width

//* Starship Variables *//

let starShipIndex = 120

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

//* Building the Grid *//

function createGrid() {
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    // cell.textContent = i
    cells.push(cell)
    grid.appendChild(cell)
  }
}
createGrid()

//* Building the Starship *//

cells[starShipIndex].classList.add('starship')

//* Building the Borgs *//

function createBorg(){
  borgs.forEach((borg) => {
    cells[borg.index].classList.add('borgs')
  })
}
createBorg()

//* Audio Files and Functions*//

const audioPlayGameStart = document.querySelector('#handleGameStartAudio')
const audioStarshipLaser = document.querySelector('#handleStarshipLaserAudio')
const audioPlayBorgShoot = document.querySelector('#borgsLaserShootAudio')
const audioStarshipGetsHit = document.querySelector('#starshipGetsHitAudio')
const audioStarshipWins = document.querySelector('#starshipWinsAudio')
const audioBorgsWin = document.querySelector('#borgsWinAudio')

function handleGameStartAudio() {
  audioPlayGameStart.src = './assets/243020__plasterbrain__game-start(1).ogg'
  audioPlayGameStart.play()
}

function handleStarshipLaserAudio() {
  audioStarshipLaser.src = './assets/505235__daleonfire__laser2.wav'
  audioStarshipLaser.play()
}

function borgsLaserShootAudio() {
  audioPlayBorgShoot.src = './assets/415991__matrixxx__retro-drop-01.wav'
  audioPlayBorgShoot.play()
}

function starshipGetsHitAudio() {
  audioStarshipGetsHit.src = './assets/404754__owlstorm__retro-video-game-sfx-explode.wav'
  audioStarshipGetsHit.play()
}

function starshipWinsAudio() {
  audioStarshipWins.src = './assets/Live Long and Prosper.mp3'
  audioStarshipWins.play()
}

function borgsWinAudio() {
  audioBorgsWin.src = './assets/248271__cylon8472__borg-voice.mp3'
  audioBorgsWin.play()
}

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
  handleGameStartAudio()
  document.addEventListener('keyup', handleControlKeys)

  setTimeout(borgsLaserShoot, 1000)
    const borgsMoving = window.setInterval(() => {   
      const aliveBorgs = borgs.filter(borg => {
        return borg.isAlive === true
      })
      aliveBorgs.map(borg => {
      if (borg.index > 119) {
        cells[borg.index].classList.remove('borgs')
        clearInterval(borgsMoving)
        handleEndGameLose()
      }
    }) 
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
  }, 360)

}
startButton.addEventListener('click', handleGameStart)


//* Moving the StarShip *//

function removeStarship(){
    cells[starShipIndex].classList.remove('starship')
}

function addStarship(){
    cells[starShipIndex].classList.add('starship')
}

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


//* Scoreboard Update *//

let scoreDisplay = 0
function updateScore(){
  const scoreId = document.querySelector('#scoreId')
  scoreId.innerText = 0
  scoreDisplay = scoreDisplay + 1000
  scoreId.innerText = scoreDisplay
}

//* Startship Laser *//

function handleStarshipLaser() {
  handleStarshipLaserAudio() 
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
      } else if (scoreDisplay === 28000) {
        handleEndGameWin()
      }
  }, 150)
  }

// document.addEventListener('keydown', handleStarshipLaser)



//* Borgs Laser *//

function borgsLaserShoot() {
  borgsLaserShootAudio()
    const borgsLaserId = setInterval(() => {
    let borgsLaserIndex = borgs[Math.floor(Math.random() * borgs.length)].index
    const borgLaserInterval = window.setInterval(() => {
      cells[borgsLaserIndex].classList.remove('borgsLaser')
      borgsLaserIndex += width
      cells[borgsLaserIndex].classList.add('borgsLaser')
      if (cells[borgsLaserIndex].classList.contains('starship')) {
        console.log('hit')
      starshipGetsHitAudio()
      cells[borgsLaserIndex].classList.add('starshipExplosion')
      setTimeout(() => {
        cells[borgsLaserIndex].classList.remove('starshipExplosion')
      }, 1000)
      starshipLoseLife()
      clearInterval(borgLaserInterval)
      clearInterval(borgsLaserId)
      cells[borgsLaserIndex].classList.remove('borgsLaser')
      } else if (borgsLaserIndex > 131) {
        clearInterval(borgLaserInterval)
        cells[borgsLaserIndex].classList.remove('borgsLaser')
        console.log('bottom border')
      }
    }, 400)
  }, 1000)
}
// document.addEventListener('click', borgsLaserShoot)

//* Borg Explosion *//

// function addBorgsExplosion() {
//   cells[borgsLaserIndex].classList.add('borgExplosion')
// }

// function removeBorgsExplosion() {
//   cells[borgsLaserIndex].classList.remove('borgExplosion')
// }

// let borgExplosion = cells[borgs.index].classList.add('borgsExplosion')


//* Starship Explode *//
// const starshipExplosion = document.querySelector('starshipExplosion')

// function starshipExplode() {
//     window.setInterval(() => {
//       if (cells[starShipIndex].classList.contains)
//       cells[starShipIndex].classList.remove('starship')
//       cells[starshipExplosion].classList.add('starshipExplosion')
//       setTimeout(starshipExplode, 200)
//       cells[starshipExplosion].classList.remove('starshipExplosion')
//       cells[starShipIndex].classList.add('starship')
//       clearInterval()
//     }, 200)
//   }
// }

// setTimeout(() => {
//   location.reload()
//   }, 3000)


//* Player Lose Life *//
let lives = 3
const starshipLives = document.querySelector('#livesId')

function starshipLoseLife() {
  lives = lives - 1
  if (lives === 0) {
    starshipLives.textContent = lives
    handleEndGameWin()
  } else {
    starshipLives.textContent = lives
  }
}

//* Game Ends *//

function handleEndGameWin() {
  starshipWinsAudio()
  grid.textContent = 'Live Long And Prosper'
  resetGame()
}

function handleEndGameLose() {
borgsWinAudio()
grid.textContent = 'You will be assimilated'
grid.style.fontFamily = 'monospace'
resetGame()
}

//* Reset *//


function resetGame() {
  setTimeout(() => {
  location.reload()
  }, 3000)
}