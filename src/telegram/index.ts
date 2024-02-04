import { TELEGRAM_ID, TOKEN } from './constants'

export const sendTelegramMessage = async (message: string): Promise<void> => {
  const encodedText = encodeURIComponent(message)

  const telegramApiUrl = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${TELEGRAM_ID}&text=${encodedText}`

  await fetch(telegramApiUrl, {
    method: 'GET',
  })
}
