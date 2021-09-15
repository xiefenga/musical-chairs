import dayjs from 'dayjs'

export const mergeTime = (date, time) => {
  const date1 = dayjs(date)
  const date2 = dayjs(time).millisecond(0)
  return date1.hour(
    date2.hour()
  ).minute(
    date2.minute()
  ).second(
    date2.second()
  ).millisecond(
    date2.millisecond()
  )
}

export const triggerClick = (dom) => {
  const event = document.createEvent('MouseEvent')
  event.initMouseEvent('click', true, true)
  dom.dispatchEvent(event)
}

export const delay = (n) => new Promise(resolve => setTimeout(resolve, n, n))