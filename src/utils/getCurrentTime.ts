export const getCurrentTime = (): string => {
  return new Intl.DateTimeFormat(
    'ru-RU',
    { hour: '2-digit', minute: '2-digit', second: '2-digit' },
  ).format(Date.now())
}
