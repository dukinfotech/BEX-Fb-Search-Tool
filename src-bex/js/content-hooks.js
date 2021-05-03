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
        var counter = 0;
        setInterval(function () {
          counter += 1000;
          console.log(counter);
        }, 1000);
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
              bodyTagText.includes(endScrollText6) ||
              counter == 60000) {
            console.log('Stop auto scroll');
            clearInterval(scrollInfinitely);
            var pages = collectPagesInfo();
            bridge.send(event.eventResponseKey, pages);
          }
        }, 1000);
      }
    })
  }

  bridge.on('accessPage', event => {
    const payload = event.data;
    window.location.href = payload.page.link
  });

  bridge.on('getPageInfo',async event => {
    const payload = event.data;
    try {
      var page = {
        name: '',
        firstPostTime: '',
        website: '',
        phone: '',
        email: '',
        address: ''
      };
      await wait(payload.delay);
      var firstPostCard = document.body.querySelector('div[aria-posinset="1"]');

      // Get first post time
      var bTags = firstPostCard.querySelectorAll('b');
      for (let i = 0; i < bTags.length; i++) {
        if (bTags[i].style.display != 'none') {
          page.firstPostTime = bTags[i].textContent;
        }
      }
      // Get address
      var mapDiv = document.body.querySelector('span[style*="-webkit-box-orient: vertical; -webkit-line-clamp: 5; display: -webkit-box;"]');
      if (mapDiv) {
        page.address = mapDiv.textContent;
      }
      // Get page name
      page.name = firstPostCard.querySelector('strong').textContent
      // Get website, phone, email
      const iconClass = '.cwsop09l';
      var icons = document.body.querySelectorAll(iconClass);
      var iconCount = icons.length;
      for (let i = 0; i < iconCount; i++) {
        var icon = icons[i];
        var text = getTextFromIcon(icon);
        // Get phone
        var text2 = text.replace(/\s/g, '');
        if (/^\+?\d+$/.test(text2)) {
          page.phone = text
        }
        // Get Email
        if (/@/.test(text)) {
          page.email = text
        }
        // Get Website
        if (/^http/.test(text)) {
          page.website = text
        }
      } 
    } catch (error) {
      console.error(error);
    }
    bridge.send(event.eventResponseKey, page);
  });
}

function getTextFromIcon(e) {
  return e.parentElement.parentElement.lastElementChild.innerText;
}

function collectPagesInfo() {
  var pages = [];
  var cards = document.body.querySelectorAll('div[role=article]');
  var cardCount = cards.length;
  for (let i = 0; i < cardCount; i++) {
    var linkTag = cards[i].querySelectorAll('a[aria-label]')[0];
    var name = linkTag.innerText;
    var link = linkTag.href;
    pages.push({name, link, loaded: false, firstPostTime: '', phone: '', website: '', email: '', address: ''});
  }
  return pages;
}

async function wait (timeToDelay) {
  return new Promise((resolve) => setTimeout(resolve, timeToDelay));
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