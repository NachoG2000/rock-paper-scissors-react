import React, {useState, useEffect} from 'react'
import './App.css'
import PlayButton from './components/PlayButton'

import logo from './images/logo.svg'
import paper from './images/icon-paper.svg'
import rock from './images/icon-rock.svg'
import scissors from './images/icon-scissors.svg'

function App() {
  const buttonArray = [{id:1, image: rock, color: "bg-red-500"}, {id:2, image: paper, color: "bg-blue-500"}, {id:3, image: scissors, color: "bg-yellow-500"}]
  const [selectedButton, setSelectedButton] = useState(null)
  const [houseButton, setHouseButton] = useState(null)
  const [gameMessage, setgameMessage] = useState("")
  const [gameCounter, setGameCounter] = useState(0)

  const buttonElements = buttonArray.map(button => <PlayButton key={button.id} id={button.id} image={button.image} color={button.color} clickButton={clickButton} selectedButton={selectedButton}/>)

  function clickButton(id){
    setSelectedButton(buttonArray.find(button => button.id === id))  
    if(selectedButton === null){
      setTimeout(() => {
        const randomNum = Math.floor(Math.random() * 3)
        setHouseButton(buttonArray[randomNum])
      }, 1000);
    }
  }

  function determineWinner(){
    if(selectedButton.id === houseButton.id){
      // tie
      setgameMessage("TIE")
    }
    else if(selectedButton.id === 1 && houseButton.id === 3){
      // win (user: rock, pc:scissors)
      setgameMessage("YOU WIN")
      setGameCounter(prevState => prevState + 1)
    }
    else if(selectedButton.id === 3 && houseButton.id === 1){
      // lose (user:scissors , pc:rock)
      setgameMessage("YOU LOSE")
      if(gameCounter > 0){
        setGameCounter(prevState => prevState - 1)
      }
    }
    else if(selectedButton.id < houseButton.id){
      // lose (user:rock, pc:paper || user:paper, pc:scissors)
      setgameMessage("YOU LOSE")
      if(gameCounter > 0){
        setGameCounter(prevState => prevState - 1)
      }
    }
    else if(selectedButton.id > houseButton.id){
      // win (user:paper, pc:rock || user:scissors, pc:paper)
      setgameMessage("YOU WIN")
      setGameCounter(prevState => prevState + 1)
    }
  }

  function playAgain(){
    setSelectedButton(null)
    setgameMessage("")
    setHouseButton(null)
  }

  useEffect(() => {
    if (selectedButton && houseButton) {
      determineWinner();
    }
  }, [selectedButton, houseButton]);
  
  return (
    <div className='flex flex-col items-center gap-8 bg-gradient-to-br from-blue-950 via-blue-800 to-blue-950 h-screen'>
      <div className="flex justify-between border-gray-500 border-2 sm:w-[60%] h-fit rounded-xl mx-2 mt-2 sm:mt-16">
        <img src={logo} alt="logo" className="ml-4 object-contain self-center" />
        <div className="flex flex-col items-center bg-white w-[160px] h-30 m-3 py-4 rounded-lg">
          <h3 className="font-bold text-gray-800">S C O R E</h3>
          <h3 className="text-6xl font-bold text-gray-800">{gameCounter}</h3>
        </div>
      </div>
      <div className="flex gap-10">
        {
          selectedButton === null ?
          <div className='flex flex-wrap items-center justify-around sm:gap-4 md:gap-8 lg:gap-16'>
            {buttonElements}
          </div>
          :
          <div className='flex flex-col gap-10'>
            <div className='grid grid-cols-2 sm:grid-cols-3 grid-rows-1 sm:gap-0'>
              <div className='flex justify-center'>
                <div className='flex flex-col gap-6 items-center justify-between'>
                  <h3 className='text-white text-xl text-center'>YOU PICKED</h3>
                  <PlayButton key={selectedButton.id} id={selectedButton.id} image={selectedButton.image} color={selectedButton.color} selectedButton={selectedButton}/>
                </div>
              </div>
              <div className={`hidden sm:flex flex-col items-center justify-center gap-4 ${houseButton === null ? "opacity-0" : ""}`}>
                <h2 className='text-white text-6xl text-center font-bold'>{gameMessage}</h2>
                <button className='bg-white p-2 rounded-xl w-[80%] text-blue-950 font-bold' onClick={playAgain}>PLAY AGAIN</button>
              </div>
              <div className={`flex justify-center`}>
                <div className='flex flex-col gap-6 items-center justify-between'>
                  <h3 className='text-white text-xl text-center'>THE HOUSE PICKED</h3>
                  {(!houseButton && <div className='w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] bg-black opacity-30 rounded-full'></div>)}
                  {(houseButton && <PlayButton key={houseButton.id} id={houseButton.id} image={houseButton.image} color={houseButton.color} selectedButton={houseButton}/>)}
                </div>
              </div>
            </div>
            <div className={`sm:hidden flex flex-col items-center justify-center gap-4 ${houseButton === null ? "opacity-0" : ""}`}>
                <h2 className='text-white text-6xl text-center font-bold'>{gameMessage}</h2>
                <button className='bg-white p-2 rounded-xl px-16 text-blue-950 font-bold' onClick={playAgain}>PLAY AGAIN</button>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default App
