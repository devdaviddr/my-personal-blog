import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { z } from 'zod'

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email().optional(),
})

type User = z.infer<typeof userSchema>

const fetchUser = async (userId: string): Promise<User> => {
  const response = await axios.get(`/api/users/${userId}`)
  return userSchema.parse(response.data)
}

export const useFetchUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  })
}