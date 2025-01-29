const apiUrl = 'https://saga.dh.gu.se/api/'


export const fetchItems = async (path: string, id: string) => {
  const response = await fetch(apiUrl + path + '/' + id, {
    method: "GET",
    credentials: "include"
  })
    return await response.json()
}
