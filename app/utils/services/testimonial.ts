import { v4 as uuid } from 'uuid'
import sharp from "sharp";
import { SupabaseClient } from '~/utils/database';

type Config = {
  request: Request
  supabaseClient: SupabaseClient
}

type CreateOptions = {
  id: string
  email?: string
  fullName: string
  avatar?: Blob
  rating: number
  review: string
  occupation?: string
  company?: string
}

export class TestimonialService {
  private request: Request
  private supabaseClient: SupabaseClient

  constructor(config: Config) {
    this.request = config.request
    this.supabaseClient = config.supabaseClient
  }

  public async create(options: CreateOptions) {
    const errors: Record<string, any>[] = []

    let avatarPath, avatarPublicURL

    if (options.avatar) {
      const buffer = await options.avatar.arrayBuffer()

      const filename = `${uuid()}`
      const file = await sharp(buffer)
        .resize({ width: 256, height: 256, })
        .webp()
        .toBuffer()

      avatarPath = `public/${filename}.webp`

      const { error } = await this.supabaseClient
        .storage
        .from('avatars')
        .upload(avatarPath, file, {
          contentType: 'image/webp',
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error(error)
        errors.push({})

        return {
          meta: {
            status: 500
          },
          errors
        } as const
      }
    }

    if (avatarPath) {
      const { data } = this.supabaseClient
        .storage
        .from('avatars')
        .getPublicUrl(avatarPath)

      avatarPublicURL = data.publicUrl
    }

    {
      const testimonial = {
        id: options.id,
        email: options.email,
        full_name: options.fullName,
        avatar: avatarPublicURL,
        rating: options.rating,
        review: options.review,
        occupation: options.occupation,
        company: options.company,
      }

      const { error } = await this.supabaseClient
        .from('testimonials')
        .insert(testimonial)
      
      if (error) {
        console.error(error)
        errors.push({})

        return {
          meta: {
            status: 500
          },
          errors
        } as const
      }
    }

    return {
      meta: {
        status: 201
      },
      data: null
    } as const
  }

  public async read() {
    const errors: Record<string, any>[] = []

    const { data: testimonials, error } = await this.supabaseClient
      .from('testimonials')
      .select('avatar, full_name, company, occupation, review, rating')
      .eq('approved', true)

    if (error) {
      console.error(error)
      errors.push({})

      return {
        meta: {
          status: 500
        },
        errors
      } as const
    }

    return {
      meta: {
        status: 200
      },
      data: {
        testimonials
      }
    } as const
  }
}