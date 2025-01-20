const apiUrl = 'https://saga.dh.gu.se/api/'

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa(import.meta.env.VITE_API_USERNAME + ':' + import.meta.env.VITE_API_PASSWORD),
    'Access-Control-Allow-Origin': '*',
}

export const fetchItems = async (path: string) => {
  const response = await fetch(apiUrl + path, {
    headers: headers
  })
    return await response.json()
}

// const response = await fetch(apiUrl + path + '/?key_identity=' + import.meta.env.VITE_API_USERNAME + '&key_credential=' + import.meta.env.VITE_API_PASSWORD, {
//     method: 'GET',
//     headers: headers,
//   }
//   )