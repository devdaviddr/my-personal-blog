import { Hono } from 'hono'

const posts = new Hono()

posts.get('/', (c) => {
  return c.json({
    posts: [
      {
        id: '1',
        title: 'Welcome to the Developer Blog',
        content: 'This is your first blog post!',
        createdAt: new Date().toISOString(),
      },
    ],
  })
})

posts.post('/', async (c) => {
  const body = await c.req.json()
  return c.json({
    id: '2',
    ...body,
    createdAt: new Date().toISOString(),
  })
})

export { posts }