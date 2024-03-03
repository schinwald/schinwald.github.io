import sendgrid from '@sendgrid/mail'

type EmailerConfig = {
  apiKey: string
}

type EmailerMessage = {
  from: string
  to: string
  subject: string
  text: string
}

class Emailer {
  private apiKey

  constructor(config: EmailerConfig) {
    this.apiKey = config.apiKey
    sendgrid.setApiKey(this.apiKey)
  }

  public async send(email: EmailerMessage) {
    await sendgrid.send(email)
  }
}

export default new Emailer({
  apiKey: import.meta.env.SENDGRID_API_KEY
})
