export default (url, data, method = 'POST', token) => {
  return new Promise(async function(resolve, reject) {
    const authToken = (token && { authorization: `Bearer ${token}` }) || {}
    const bodyData = (method !== 'GET' && { body: JSON.stringify(data) }) || {}
    fetch(`/api/${url}`, {
      method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        ...authToken
      },
      ...bodyData
    })
      .then(response => {
        if (response.status === 201 || response.status === 200) {
          resolve(response.json())
        } else {
          reject(response)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}
