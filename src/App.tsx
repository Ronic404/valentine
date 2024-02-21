import { useEffect, useState } from 'react'

import { Hearts } from './components/Hearts'

import { getCurrentTime } from './utils/getCurrentTime'
import { sendTelegramMessage } from './telegram'

import heartImg from './assets/heart.svg'
import sadImg from './assets/sad.png'
import happyImg from './assets/happy.png'
import interestImg from './assets/interes.png'

import './App.css'

const LS_FIRST_ATTEMPT = 'firstAttempt'

function App() {
  const [showPic, setShowPic] = useState<'sad' | 'happy' | 'interest'>('interest')
  const [isChosen, setIsChosen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isFirstAttempt, setIsfirstAttempt] = useState<boolean>(true) 


  useEffect(() => {
    sendTelegramMessage(`Аня зашла на сайт в ${getCurrentTime()}`)
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
    if (isFirstAttempt) {
      setShowPic('sad')
      setIsChosen(true)
      setIsfirstAttempt(false)
      localStorage.setItem(LS_FIRST_ATTEMPT, 'false')
      await sendTelegramMessage(`Аня по ошибке нажала "Нет" в ${getCurrentTime()}`)
    } else {
      await sendTelegramMessage(`Аня повторно нажала "Нет" в ${getCurrentTime()}`)
    }
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
    <div className='page'>
      <div>
        <h1>Valentine day</h1>
        <h2>Ann, will you be my valentine?</h2>
      </div>

      <div className='pictures'>
        {showPic === 'interest' && <img className='picture' src={interestImg} alt="interest" />}
        {showPic === 'happy' && <img className='picture' src={happyImg} alt="happy" />}
        {showPic === 'sad' && <img className='picture' src={sadImg} alt="sad" />}
      </div>

      <div className='buttons'>
        {isChosen && showPic === 'sad' &&
          <button onClick={handleClickAgainButton}>Try one more time</button>
        }
        {!isChosen &&
          <>
            <button className='yes' onClick={handleClickYesButton}>Yes</button>
            <button className={`no ${!isFirstAttempt && 'disabled'}`} onClick={handleClickNoButton}>No</button>
          </>
        }
      </div>

      <Hearts />
    </div>
  )
}

export default App
