import axios from 'axios'

export async function fetchPosts() {
  const response = await axios.get('/api/posts')
  return response.data.posts
}