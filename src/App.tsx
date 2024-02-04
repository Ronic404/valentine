import { useEffect, useState } from 'react'

import { getCurrentTime } from './utils/getCurrentTime'

import heartImg from './assets/heart.svg'
import sadImg from './assets/sad.jpg'
import happyImg from './assets/happy.jpg'
import interestImg from './assets/interes.jpg'

import './App.css'

const LS_FIRST_ATTEMPT = 'firstAttempt'

function App() {
  const [showPic, setShowPic] = useState<'sad' | 'happy' | 'interest'>('interest')
  const [isChosen, setIsChosen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isFirstAttempt, setIsfirstAttempt] = useState<boolean>(true) 


  useEffect(() => {
    if (window.location.search === '?reset') {
      localStorage.clear()
      window.location.replace(window.location.origin)
    }
    const firstAttempt = localStorage.getItem(LS_FIRST_ATTEMPT)
    if (firstAttempt === 'false') {
      setIsfirstAttempt(false)
    }
    setTimeout(() => {
      setIsLoading(false)
    }, 2000);
  }, [])

  const handleClickYesButton = (): void => {
    console.log('Аня нажала "Да" в', getCurrentTime())
    setShowPic('happy')
    setIsChosen(true)
  }
  
  const handleClickNoButton = (): void => {
    console.log('Аня по ошибке нажала "Нет" в', getCurrentTime())
    setShowPic('sad')
    setIsChosen(true)
    setIsfirstAttempt(false)
    localStorage.setItem(LS_FIRST_ATTEMPT, 'false')
  }
  
  const handleClickAgainButton = (): void => {
    console.log('Again', getCurrentTime())
    setShowPic('interest')
    setIsChosen(false)
  }

  if (isLoading) {
    return (
      <div className='loading'>
        <img src={heartImg} className="" alt="sad" />
      </div>
    )
  }

  return (
    <div>
      <h1>Valentine day</h1>
      <h2>Ann, will you be my valentine?</h2>
      {showPic === 'interest' &&
        <img src={interestImg} className="logo react" alt="interest" />
      }
      {showPic === 'happy' &&
        <img src={happyImg} className="logo react" alt="happy" />
      }
      {showPic === 'sad' &&
        <img src={sadImg} className="" alt="sad" />
      }
      <div className='buttons'>
        {isChosen &&
          <button onClick={handleClickAgainButton}>Попробовать ещё раз</button>
        }
        {!isChosen &&
          <>
            <button onClick={handleClickYesButton}>Yes</button>
            <button onClick={handleClickNoButton} disabled={!isFirstAttempt}>No</button>
          </>
        }
      </div>
    </div>
  )
}

export default App
