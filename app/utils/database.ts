import { createServerClient, parse, serialize } from '@supabase/ssr'

const supabaseClient = createServerClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
  cookies: {}
})

export type SupabaseClient = typeof supabaseClient

type Config = {
  request: Request
}

export class DatabaseManagementSystem {
  private request: Request

  constructor(config: Config) {
    this.request = config.request
  }

  public initialize() {
    const cookies = parse(this.request.headers.get('Cookie') ?? '')
    const headers = new Headers()

    headers.append('Content-Type', 'application/json')

    const supabaseClient = createServerClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
      cookies: {
        get(key) {
          return cookies[key]
        },
        set(key, value, options) {
          headers.append('Set-Cookie', serialize(key, value, options))
        },
        remove(key, options) {
          headers.append('Set-Cookie', serialize(key, '', options))
        },
      },
    })

    return {
      cookies,
      headers,
      supabaseClient
    }
  }

  public async getSession() {
    const errors = []

    let {
      data: { session }
    } = await supabaseClient.auth.getSession()

    if (['development'].includes(import.meta.env.APP_ENVIRONMENT)) {
      session = {
        user: {
          id: '1234567890',
          email: 'john.smith@email.com',
          app_metadata: {
            provider: 'development'
          },
          user_metadata: {

          },
          aud: '',
          created_at: new Date().toISOString()
        },
        access_token: '',
        refresh_token: '',
        token_type: '',
        expires_in: 1234,
      }
    }

    if (!session) {
      errors.push({})
      return {
        meta: {
          status: 403
        },
        errors
      } as const
    }

    if (!session.user) {
      errors.push({})
      return {
        meta: {
          status: 403
        },
        errors
      } as const
    }

    return {
      meta: {
        status: 200,
      },
      data: {
        session
      }
    } as const
  }
}