import type { NextApiRequest, NextApiResponse } from 'next'
import { StatusCodes } from 'http-status-codes'
import sgMail from '@sendgrid/mail'
import formidable from 'formidable'

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {

    const form = formidable()

    form.parse(req, (error, fields, files) => {
      if (!error) {
        console.log(fields)
        sgMail
          .send({
            to: 'jamesschinwald@gmail.com',
            from: fields.email.toString(),
            subject: fields.first.toString() + ' ' + fields.last.toString() + ' - ' + fields.subject.toString(),
            text: fields.message.toString(),
          })
          .then((response: any) => {
            console.log('Email sent')
          })
          .catch((error: any) => {
            console.error(error)
          })
        res.status(StatusCodes.OK)
      } else {
        console.error(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      }
    })
  } else {
    res.status(StatusCodes.METHOD_NOT_ALLOWED)
  }
}

export const config = {
  api: {
    bodyParser: false
  }
}