import { default as moduleAxios } from 'axios'
import { logger } from '@/utils/logger/logger.util'

const axios = moduleAxios.create({
  timeout: 5000,
  withCredentials: false,
})

axios.interceptors.response.use(
  response => {
    logger.debug(
      `axios => [${response.status}] {${response.config.method}} ${response.config.url}`,
      {
        params: response.config.params,
        body: response.config.data,
      },
    )

    return response.data
  },
  error => {
    logger.error(
      `axios => [${error.status}] {${error.config.method}} ${error.config.url}`,
      {
        params: error.config.params,
        body: error.config.data,
      },
    )

    return Promise.reject(error)
  },
)

export { axios }
