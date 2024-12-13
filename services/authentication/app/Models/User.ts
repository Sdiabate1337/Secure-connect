import { prisma } from 'App/Services/Prisma'
import { Prisma, User as PrismaUser } from '@prisma/client'

export default class User {
  public static async createUser(email: string, password: string, role: string): Promise<PrismaUser> {
    return prisma.user.create({
      data: {
        email,
        password,
        role,
      } as Prisma.UserCreateInput,
    })
  }

  public static async findUserByEmail(email: string): Promise<PrismaUser | null> {
    return prisma.user.findUnique({
      where: { email },
    })
  }

  public static async findUserById(id: string): Promise<PrismaUser | null> {
    return prisma.user.findUnique({
      where: { id },
    })
  }

  public static async updateUser(id: string, data: Partial<Prisma.UserUpdateInput>): Promise<PrismaUser> {
    return prisma.user.update({
      where: { id },
      data,
    })
  }

  public static async deleteUser(id: string): Promise<PrismaUser> {
    return prisma.user.delete({
      where: { id },
    })
  }
}
