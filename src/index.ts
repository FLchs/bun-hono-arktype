import { Hono } from 'hono'
import { type } from 'arktype'
import { arktypeValidator } from '@hono/arktype-validator'

import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const schema = type({
  name: 'string',
  age: 'number'
})

const schemaZ = z.object({
  name: z.string(),
  age: z.number()
})

const app = new Hono()


app.post('/ark', arktypeValidator('json', schema), (c) => {
  const data = c.req.valid('json')
  return c.json({
    success: true,
    message: `${data.name} is ${data.age}`,
  })
})

app.post(
  '/zod',
  zValidator('json', schemaZ), (c) => {
    const data = c.req.valid('json')
    return c.json({
      success: true,
      message: `${data.name} is ${data.age}`,
    })
  })

export default app
