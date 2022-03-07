import type { NextApiRequest, NextApiResponse } from 'next'
import { StatusCodes } from 'http-status-codes'
import contentful from 'contentful'

const client = contentful.createClient({
    space: 'Porfolio',
    accessToken: process.env.CONTENTFUL_API_KEY || ''
})

client.getEntries()

export type ContentfulData = {
    
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ContentfulData>) {
    
}

export const config = {
  api: {
    bodyParser: false
  }
}