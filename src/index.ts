import { Hono } from 'hono'
import { type } from 'arktype'
import { arktypeValidator } from '@hono/arktype-validator'

const schema = type({
  name: 'string',
  age: 'number'
})

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/author', arktypeValidator('json', schema), (c) => {
  const data = c.req.valid('json')
  return c.json({
    success: true,
    message: `${data.name} is ${data.age}`,
  })
})

export default app
