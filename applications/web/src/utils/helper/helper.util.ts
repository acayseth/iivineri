const obj2String = (obj?: Readonly<{ [key: string]: any }>): string => {
  const searchParams = new URLSearchParams()

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, item))
      } else if (value !== undefined && value !== null) {
        searchParams.append(key, value)
      }
    }
  }

  const stringSearchParams = searchParams.toString()

  return stringSearchParams ? `?${stringSearchParams}` : ''
}

const removeSurroundingSlashes = (value: string): string => {
  if (value.startsWith('/')) {
    value = value.substring(1)
  }

  if (value.endsWith('/')) {
    value = value.substring(0, value.length - 1)
  }

  return value.trim()
}

type SuperGlueAbsoluteUrl = ({
  pathname,
  baseUrl,
  params,
}: {
  pathname: string
  baseUrl?: string
  params?: { [key: string]: any }
}) => string

const superGlueAbsoluteUrl: SuperGlueAbsoluteUrl = ({
  pathname,
  baseUrl,
  params,
}) => {
  if (
    typeof baseUrl === 'undefined' &&
    typeof process.env.NEXT_PUBLIC_DOMAIN === 'undefined'
  ) {
    throw Error(
      'fn:superGlueAbsoluteUrl has baseUrl===undefined||process.env.NEXT_PUBLIC_DOMAIN===undefined',
    )
  }

  let url: string =
    typeof baseUrl === 'undefined'
      ? (process.env.NEXT_PUBLIC_DOMAIN as string)
      : baseUrl

  return `${removeSurroundingSlashes(url)}/${removeSurroundingSlashes(pathname)}${obj2String(params)}`
}

export { superGlueAbsoluteUrl, obj2String, removeSurroundingSlashes }
