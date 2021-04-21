const iFrame = document.createElement('iframe')
iFrame.id = 'bex-app-iframe'

const setIFrameSize = (height, width) => {
  iFrame.height = height
  iFrame.width = width
}

export default function attachContentHooks (bridge) {
  bridge.on('wb.drawer.toggle', event => {
    const payload = event.data
    if (payload.open) {
      setIFrameSize('100%', '600px')
    } else {
      resetIframeSize()
    }
    bridge.send(event.eventResponseKey)
  })

  bridge.on('fb.redirect', event => {
    const payload = event.data
    console.log(payload.url);
    window.location.href = payload.url
  })
} 

setIFrameSize('100%', '600px');

// Assign some styling so it looks seamless
Object.assign(iFrame.style, {
  position: 'fixed',
  top: '0',
  right: '0',
  border: '0',
  zIndex: '9999999', // Make sure it's on top
  overflow: 'visible',
  background: '#fff'
})

;(function () {
  // When the page loads, insert our browser extension app.
  iFrame.src = chrome.runtime.getURL(`www/index.html`)
  document.body.prepend(iFrame)
})()