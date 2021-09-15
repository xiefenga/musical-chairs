export const template = (msg, start, lasting) => {
  return `(function () {

    const msg = "${msg}"
  
    const start = ${start}
  
    const end = ${start} +  ${lasting} * 1000

    console.clear()

    if (start < Date.now()) {
      console.warn('任务已过期', new Date(start).toLocaleString())
      return
    }
  
    let i = 0
  
    function checkTime(target, onTime) {
      const timer = setInterval(() => {
        const leftTime = target - Date.now()
        if (leftTime <= 300) {
          console.log('提前', leftTime / 1000, 's, 执行任务')
          onTime()
          clearInterval(timer)
        } else {
          console.clear()
          console.log('距离开始:', leftTime / 1000, 's')
          console.log('任务信息:', msg)
        }
      }, 100)
    }
  
    const task = () => {
  
      function triggerClick(dom) {
        const event = document.createEvent('MouseEvent')
        event.initMouseEvent('click')
        dom.dispatchEvent(event)
      }
  
      function triggerInput(dom, text) {
        const event = document.createEvent('UIEvent')
        event.initEvent('input')
        dom.dispatchEvent(event)
        dom.innerText = text
      }
  
      function triggerKeydown(dom) {
        const event = document.createEvent("KeyboardEvent")
        event.initKeyboardEvent("keydown", true, true, document.defaultView, false,
          false, true, false, 65, 65)
        dom.dispatchEvent(event)
      }
  
      function triggerKeyup(dom) {
        const event = document.createEvent("KeyboardEvent")
        event.initKeyboardEvent("keyup", true, true, document.defaultView, false,
          false, true, false, 65, 65)
        dom.dispatchEvent(event)
      }
  
      const timer = setInterval(() => {
        if (Date.now() > end) {
          console.log('点击', i, '次')
          clearInterval(timer)
          return
        }
        const wrapper = document.querySelector('#js_cmt_input_pc')
  
        triggerClick(wrapper)
  
        const fakeInput = document.querySelector('.comment_primary_input')
  
        triggerKeydown(fakeInput)
        triggerInput(fakeInput, msg)
        triggerKeyup(fakeInput)
  
        const submitButton = document.querySelector('.js_submit')
  
        triggerClick(submitButton)
        ++i
      }, 100)
    }
  
    checkTime(start, task)
  
  }())`
}

