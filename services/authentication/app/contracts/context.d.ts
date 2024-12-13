import { User as PrismaUser } from '@prisma/client'

declare module '@ioc:Adonis/Core/HttpContext' {
  interface HttpContextContract {
    authUser?: {
      id: string
      email: string
      role: string
    }
  }
}
