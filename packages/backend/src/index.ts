import { Hono } from 'hono'

const app = new Hono()

app.get('/health', (c) => {
  return c.json({ status: 'OK', timestamp: new Date().toISOString() })
})

export default app

// Start server for local development
import { createServer } from 'http'

const server = createServer(async (req, res) => {
  try {
    const url = `http://localhost${req.url}`

    let body: string | undefined;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      body = await new Promise((resolve, reject) => {
        let data = '';
        req.on('data', chunk => data += chunk.toString());
        req.on('end', () => resolve(data));
        req.on('error', reject);
      });
    }

    const request = new Request(url, {
      method: req.method,
      headers: req.headers as any,
      body: body,
    })

    const response = await app.fetch(request)

    res.statusCode = response.status
    response.headers.forEach((value, key) => res.setHeader(key, value))

    const responseBody = await response.text()
    res.end(responseBody)
  } catch (error) {
    console.error('Server error:', error)
    res.statusCode = 500
    res.end('Internal Server Error')
  }
})

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})