// pull from different file
const apiKey = 'at_pr6AIVTdnCTYd3jcLW6rGOt3zxpjS'
const bypassCors = 'https://cors-anywhere.herokuapp.com/'
const apiUri = 'https://geo.ipify.org/api/'
const currentVersion = 'v1'

// elements to update 
const currentIp = document.getElementById('currentIp')
const currentTown = document.getElementById('currentTown')
const currentZone = document.getElementById('currentZone')
const currentIsp = document.getElementById('currentIsp')

// form elements 
const enteredIp = document.getElementById('ipAddress') 
const searchBtn = document.getElementById('searchBtn')

const headersOption = {
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}

const map = L.map('display-map', {
  'center': [-0.11, 51.50],
  'zoom': 0,
  'layers': [
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    })
  ]
})

const updateMarker = (updateMarker = [-42, 42]) => {
  map.setView(updateMarker, 13)
  L.marker(updateMarker).addTo(map)
}

const getIPDetails = (defaultIp) => {
  const ipUrl = defaultIp  === undefined ? 
    `${bypassCors}${apiUri}${currentVersion}?apiKey=${apiKey}` 
    : `${bypassCors}${apiUri}${currentVersion}?apiKey=${apiKey}&ipAddress=${defaultIp}`
  
  return fetch(ipUrl, headersOption)
    .then(res => res.json()
    ).then(data => {
      currentIp.innerHTML = data.ip
      currentTown.innerHTML = `${data.location.city} ${data.location.country} ${data.location.postalCode}`
      currentZone.innerHTML = data.location.timezone
      currentIsp.innerHTML = data.isp

      // update map marker 
      updateMarker([data.location.lat, data.location.lng])
    })
    .catch(error => {
      alert('Unable to get IP details')
      console.log(error)
    })
}

document.addEventListener('load', updateMarker())

searchBtn.addEventListener('click', e => {
  e.preventDefault()
  if (enteredIp.value !== '' && enteredIp.value !== null) {
    getIPDetails(enteredIp.value)
    return
  }
  alert('Please enter a valid IP address')
})