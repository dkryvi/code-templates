interface Config {
  method: string
  body?: string
  headers: {
    [key: string]: any
  }
}

export function client(
  endpoint: string,
  initialConfig: Partial<Config>
): Promise<any | Error> {
  const {body, ...customConfig} = initialConfig ?? {}

  const config: Config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      'Content-Type': 'application/json',
      ...customConfig.headers
    }
  }
  if (body) {
    config.body = JSON.stringify(body)
  }

  return fetch(endpoint, config).then(async (response) => {
    if (response.ok) {
      return await response.json()
    } else {
      const errorMessage = await response.text()

      try {
        const json = JSON.parse(errorMessage)

        return Promise.reject(new Error(json?.error ?? errorMessage))
      } catch (_) {
        return Promise.reject(new Error(errorMessage))
      }
    }
  })
}
