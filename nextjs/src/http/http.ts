export default class ClientHttp {
  static API_URL: string = 'http://localhost:3000/api' as string
  static async get(path: string, user_email: string | undefined) {
    try {
      const isPathNull = path === 'null'
      if (!isPathNull) {
        const response = await fetch(`${ClientHttp.API_URL}/${path}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: user_email ?? 'not logged in',
          },
        })
        const data = await response.json()
        if (data.error) {
          console.log(data.error)
          return
        }
        return data
      }
      return
    } catch (err) {
      console.error(err)
    }
  }

  static async post(
    path: string,
    body: { message: string; user_email: string | undefined }
  ) {
    const response = await fetch(`${ClientHttp.API_URL}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: body.user_email ?? 'not logged in',
      },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    if (data.error) {
      console.log(data.error)
      return
    }
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
    if (data.error) {
      console.log(data.error)
      return
    }
    return data
  }

  static async delete(path: string) {
    const response = await fetch(`${ClientHttp.API_URL}/${path}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    if (data.error) {
      console.log(data.error)
      return
    }
    return data
  }
}

export const fetcher = ({
  path,
  user_email,
}: {
  path: string
  user_email: string
}) => ClientHttp.get(path, user_email)
