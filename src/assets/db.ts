const apiUrl = 'https://saga.dh.gu.se/api/'


export const fetchItems = async (path: string) => {
  const response = await fetch(apiUrl + path, {
    method: "GET",
    credentials: "include"
  })
    return await response.json()
}
