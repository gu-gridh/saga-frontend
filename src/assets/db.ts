import { id } from "vuetify/locale"

const apiUrl = 'https://saga.dh.gu.se/api/'

const header: RequestInit = {
  method: "GET",
  credentials: "include" as RequestCredentials
}


export const fetchItems = async (path: string, id: string) => {
  const response = await fetch(apiUrl + path + '/' + id, {
    method: "GET",
    credentials: "include"
  })
    return await response.json()
}

export const fetchResource = async (id: string) => {
  const response = await fetch(apiUrl + 'resource-template/' + id, {
    method: "GET",
    credentials: "include"
  })
  return await response.json()
}