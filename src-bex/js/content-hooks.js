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
    window.location.href = payload.url
  });

  window.onload = function () {
    bridge.on('isRunning', event => {
      const payload = event.data
      if (payload.isRunning) {
        // Auto scroll to bottom
        const endScrollText1 = 'Kết quả tìm kiếm chỉ bao gồm những nội dung hiển thị với bạn.';
        const endScrollText2 = 'Search results only include things visible to you.';
        const endScrollText3 = 'End of Results';
        const endScrollText4 = 'Đã hết kết quả';
        const endScrollText5 = "We didn't find any results";
        const endScrollText6 = 'Chúng tôi không tìm thấy kết quả nào';
        
        var scrollInfinitely = setInterval(function () {
          window.scrollTo(0, document.body.scrollHeight);
          var bodyTagText = document.body.innerText;
          if (bodyTagText.includes(endScrollText1) || 
              bodyTagText.includes(endScrollText2) ||
              bodyTagText.includes(endScrollText3) ||
              bodyTagText.includes(endScrollText4) ||
              bodyTagText.includes(endScrollText5) ||
              bodyTagText.includes(endScrollText6)) {
            console.log('Stop auto scroll');
            clearInterval(scrollInfinitely);
            bridge.send(event.eventResponseKey);
          }
        }, 1000);
      }
    })
  }
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