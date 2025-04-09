import { id } from "vuetify/locale"

const apiUrl = 'https://saga.dh.gu.se/api/'

const header: RequestInit = {
  method: "GET",
  credentials: "include" as RequestCredentials
}


export const fetchItems = async (path: string, id: string) => {
  const response = await fetch(apiUrl + path + '/' + id, 
    header
  )
    return await response.json()
}

export const fetchResource = async (id: string) => {
  const response = await fetch(apiUrl + 'resource-template/' + id, header)
  return await response.json()
}

// fetch case components from omeka
export const fetchCaseSite  = async (id: number) => {
  const response = await fetch(apiUrl + 'site_pages/' + id, header
    
  )
      return await response.json()
}