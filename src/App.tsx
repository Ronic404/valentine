import { useEffect, useState } from 'react'

import { getCurrentTime } from './utils/getCurrentTime'
import { sendTelegramMessage } from './telegram'

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

  const handleClickYesButton = async (): Promise<void> => {
    setShowPic('happy')
    setIsChosen(true)
    await sendTelegramMessage(`Аня нажала "Да" в ${getCurrentTime()}`)
  }
  
  const handleClickNoButton = async (): Promise<void> => {
    setShowPic('sad')
    setIsChosen(true)
    setIsfirstAttempt(false)
    localStorage.setItem(LS_FIRST_ATTEMPT, 'false')
    await sendTelegramMessage(`Аня по ошибке нажала "Нет" в ${getCurrentTime()}`)
  }
  
  const handleClickAgainButton = async (): Promise<void> => {
    setShowPic('interest')
    setIsChosen(false)
    await sendTelegramMessage(`Аня нажала "Ещё раз" в ${getCurrentTime()}`)
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

      <div className='pictures'>
        {showPic === 'interest' && <img className='picture' src={interestImg} alt="interest" />}
        {showPic === 'happy' && <img className='picture' src={happyImg} alt="happy" />}
        {showPic === 'sad' && <img className='picture' src={sadImg} alt="sad" />}
      </div>

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

      <div className='heart' />
      <div className='heart' />
      <div className='heart' />
      <div className='heart' />
      <div className='heart' />
      <div className='heart' />
      <div className='heart' />
      <div className='heart' />
      <div className='heart' />
      <div className='heart' />
      <div className='heart' />
      <div className='heart' />
      <div className='heart' />
      <div className='heart' />
      <div className='heart' />
      <div className='heart' />
    </div>
  )
}

export default App
