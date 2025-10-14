module.exports = options => {
  const opts = options || { url: 'https://fvdm.com/robots.txt' };
  const url = opts.url || 'https://fvdm.com/robots.txt';

  return fetch (url)
    .then (res => {
      if (!res.ok) {
        throw new Error (`HTTP ${res.status}`);
      }

      return res.text ();
    })
    .then (text => text.split ('\n').length);
};
