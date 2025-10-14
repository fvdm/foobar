module.exports = ({ url = 'https://fvdm.com/robots.txt' } = {}) =>
  fetch(url)
    .then(res => (res.ok ? res.text() : Promise.reject(new Error(`HTTP ${res.status}`))))
    .then(text => text.split('\n').length);