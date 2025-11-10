import { Hono } from 'hono'
import { posts } from './routes/posts'

const app = new Hono()

app.get('/', (c) => {
  return c.json({ message: 'Hello from Developer Blog API!' })
})

app.get('/health', (c) => {
  return c.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// API routes
app.route('/api/posts', posts)

export default app