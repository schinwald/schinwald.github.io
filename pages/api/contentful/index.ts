import type { NextApiRequest, NextApiResponse } from 'next'
import { StatusCodes } from 'http-status-codes'

const contentful = require('contentful')

export type ContentfulData = {
    
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ContentfulData>) {
  try {
    if (process.env.CONTENTFUL_API_KEY === undefined ||
        process.env.CONTENTFUL_ENVIRONMENT === undefined ||
        process.env.CONTENTFUL_HOST === undefined) {
      throw 'Environment variables not set'
    }

    const client = contentful.createClient({
        space: '8q0xl0zz73ut',
        accessToken: process.env.CONTENTFUL_API_KEY,
        environment: process.env.CONTENTFUL_ENVIRONMENT,
        host: process.env.CONTENTFUL_HOST
    })
    
    const entries = await client.getEntries('3twyuOZhpDkhSv0RBBkE06')
    res.status(StatusCodes.OK).send(entries)
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end()
  }
}

export const config = {
  api: {
    bodyParser: false
  }
}