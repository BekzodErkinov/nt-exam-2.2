// Selecting DOM elements
const elIndexInput = document.querySelector('#index-input')
const elSetBtn = document.querySelector('#set-btn')
const elBoilWrap = document.querySelector('.boil-wrapper')

// Variables
const maxBoilCount = 6
let boilsCount = 0
let alertCount = 0
const removingTimeOfElMaxBoilAlert = 10000 // 10 seconds

function createBoil() {
  let inputValue = elIndexInput.value.trim()
  const boilTime = inputValue * 1000
  // Create Boil
  if (boilsCount < maxBoilCount) {
    if (inputValue !== '') {
      boilsCount += 1
      elIndexInput.value = ''
      const elBoil = document.createElement('span')
      elBoil.classList.add('boil')
      elBoil.textContent = inputValue
      elBoilWrap.append(elBoil)
      // Boil Counter
      const elBoilTxt = setInterval(() => elBoil.textContent = --inputValue, 1000)
      // Remove Boil
      setTimeout(() => {
        clearInterval(elBoilTxt)
        boilsCount -= 1
        elBoil.parentNode.removeChild(elBoil)
      }, boilTime)
    }
  } else {
    const elMaxBoilAlert = `<p class="max-boils-alert" id="maxBoilAlert">Maximum number of boiling ${maxBoilCount}</p>`
    if (!alertCount >= 1) {
      elBoilWrap.insertAdjacentHTML('beforebegin', elMaxBoilAlert)
      alertCount += 1
      setTimeout(() => {
        document.querySelector('.max-boils-alert').parentNode.removeChild(maxBoilAlert)
      }, removingTimeOfElMaxBoilAlert)
    }
  }
}

// Events
elSetBtn.addEventListener('click', createBoil)