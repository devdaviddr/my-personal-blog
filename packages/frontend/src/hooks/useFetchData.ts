import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { z } from 'zod'

const fetchData = async (url: string, schema?: z.ZodSchema) => {
  const response = await axios.get(url)
  if (schema) {
    return schema.parse(response.data)
  }
  return response.data
}

export const useFetchData = (url: string, schema?: z.ZodSchema, options?: Record<string, unknown>) => {
  return useQuery({
    queryKey: [url],
    queryFn: () => fetchData(url, schema),
    ...options
  })
}