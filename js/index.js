const shortenForm = document.getElementById('shorten')
const shortenInput = document.getElementById('shorten-input')
const shortenBtn = document.getElementById('shorten-btn')
const shortenUrlList = document.getElementById('shorten-list')

shortenForm.addEventListener('submit', e => {
  e.preventDefault()

  if (shortenInput.value === '') {
    shortenInput.classList.add('error')
    setTimeout(() => {
      shortenInput.classList.remove('error')
    }, 5000)
    return
  }

  shortenUrl()
})

async function shortenUrl() {
  shortenBtn.disabled = true

  const api = `https://api.shrtco.de/v2/shorten?url=${shortenInput.value}`

  try {
    const res = await fetch(api)
    const data = await res.json()
    addListItem(data.result.original_link, data.result.full_short_link)
    shortenInput.value = ''
    shortenBtn.disabled = false
  } catch(err) {
    addErrorItem()
    setTimeout(() => {
      shortenUrlList.removeChild(shortenUrlList.childNodes[1])
    }, 3000)
    shortenBtn.disabled = false
  }
}

function addListItem(url, shortUrl) {
  const div = `
    <div class="shorten-list-item">
      <p>${url}</p>
      <a href="${shortUrl}" class="shorten-url" target="_blank">${shortUrl}</a>
      <button class="btn btn-copy">Copy</button>
    </div>
  `
  shortenUrlList.insertAdjacentHTML('afterbegin', div)
}

function addErrorItem() {
  const div = `
    <div class="shorten-list-item invalid">
      <p>Error, check your url and try again!</p>
    </div>
  `
  shortenUrlList.insertAdjacentHTML('afterbegin', div)
}

function scrollToShorten() {
  shortenForm.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'center'
  })
}