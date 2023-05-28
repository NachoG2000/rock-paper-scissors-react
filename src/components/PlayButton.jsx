import React from 'react'

function PlayButton(props) {
  function selectButton(){
    if(props.selectedButton === null){
      props.selectButton(props.id)
    }
  }

  return (
    <div className={`flex rounded-full items-center justify-center w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] ${props.color} shadow-2xl shadow-black cursor-pointer`}
         onClick={selectButton}
    >
        <div className='flex rounded-full items-center justify-center p-4 sm:p-10 w-[110px] h-[110px] sm:w-[150px] sm:h-[150px] bg-white shadow-inner shadow-black'>
            <img src={props.image} alt="image" className=''/>
        </div>
    </div>
  )
}

export default PlayButton