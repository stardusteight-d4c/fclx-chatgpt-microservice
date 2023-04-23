export default class ClientHttp {
  static API_URL: string = 'http://localhost:3000/api' as string

  static async get(path: string) {
    const response = await fetch(`${ClientHttp.API_URL}/${path}`, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..XnskWOEMEV-7teRh.Kfx1uSJGTBQzhMdy_gaDlCNz_Lz9UvSeKBCMBPHdKOZmN-WoZZRkOrFwmdbBDfKjRg7Y48VnP_9-K5xkUP4H6nGeCvc9ovRvuKlGFKm2ja_E3CjYjGLHRFLjrcYIu3qb9YPNYIZ41leztsY20HPbtQ7lyxUjKYwjDKvU3e59hvg8QNjc3dQyglaCvzs.TIHDzzl-FrxwwH3hKFr1Wg',
      },
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    return data
  }

  static async post(path: string, body: any) {
    const response = await fetch(`${ClientHttp.API_URL}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..XnskWOEMEV-7teRh.Kfx1uSJGTBQzhMdy_gaDlCNz_Lz9UvSeKBCMBPHdKOZmN-WoZZRkOrFwmdbBDfKjRg7Y48VnP_9-K5xkUP4H6nGeCvc9ovRvuKlGFKm2ja_E3CjYjGLHRFLjrcYIu3qb9YPNYIZ41leztsY20HPbtQ7lyxUjKYwjDKvU3e59hvg8QNjc3dQyglaCvzs.TIHDzzl-FrxwwH3hKFr1Wg',
      },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    return data
  }

  static async put(path: string, body: any) {
    const response = await fetch(`${ClientHttp.API_URL}/${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    return data
  }

  static async delete(path: string) {
    const response = await fetch(`${ClientHttp.API_URL}/${path}`, {
      method: 'DELETE',
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    return data
  }
}

export const fetcher = (path: string) => ClientHttp.get(path)
