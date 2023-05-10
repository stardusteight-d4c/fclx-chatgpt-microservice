export default class ClientHttp {
  static API_URL: string = 'http://localhost:3000/api' as string

  static async get(path: string) {
    const response = await fetch(`${ClientHttp.API_URL}/${path}`, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..X4k7ij23W4-7e1W-.zI06M9sAsiSsPtOzTNbyzDnnY3nk2sCrvMJDKK8ElnObDo4HOm60wj1c0Ck_LNJDTq2BCXUPpcPqIkpokQnxRbsad8JoJ4_VXkbCRyUcxvkwbe6gwuE3EB4OHgQcAlFkF5eyrtHUb78wKRCeNGlSVNVD9iagcP75CBrWfKpu7nRh0X08F1rwdRMi2UM.fPY20bSMaMW9jxhNVRlfxw',
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
          'Bearer eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..X4k7ij23W4-7e1W-.zI06M9sAsiSsPtOzTNbyzDnnY3nk2sCrvMJDKK8ElnObDo4HOm60wj1c0Ck_LNJDTq2BCXUPpcPqIkpokQnxRbsad8JoJ4_VXkbCRyUcxvkwbe6gwuE3EB4OHgQcAlFkF5eyrtHUb78wKRCeNGlSVNVD9iagcP75CBrWfKpu7nRh0X08F1rwdRMi2UM.fPY20bSMaMW9jxhNVRlfxw',
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
        Authorization:
          'Bearer eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..X4k7ij23W4-7e1W-.zI06M9sAsiSsPtOzTNbyzDnnY3nk2sCrvMJDKK8ElnObDo4HOm60wj1c0Ck_LNJDTq2BCXUPpcPqIkpokQnxRbsad8JoJ4_VXkbCRyUcxvkwbe6gwuE3EB4OHgQcAlFkF5eyrtHUb78wKRCeNGlSVNVD9iagcP75CBrWfKpu7nRh0X08F1rwdRMi2UM.fPY20bSMaMW9jxhNVRlfxw',
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
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..X4k7ij23W4-7e1W-.zI06M9sAsiSsPtOzTNbyzDnnY3nk2sCrvMJDKK8ElnObDo4HOm60wj1c0Ck_LNJDTq2BCXUPpcPqIkpokQnxRbsad8JoJ4_VXkbCRyUcxvkwbe6gwuE3EB4OHgQcAlFkF5eyrtHUb78wKRCeNGlSVNVD9iagcP75CBrWfKpu7nRh0X08F1rwdRMi2UM.fPY20bSMaMW9jxhNVRlfxw',
      },
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    return data
  }
}

export const fetcher = (path: string) => ClientHttp.get(path)
