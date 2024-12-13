import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken'

export default class Auth {
  public async handle ({ request, response }: HttpContextContract, next: () => Promise<void>) {
    try {
      // Vérifier la présence du token dans l'en-tête
      const authHeader = request.header('Authorization')
      if (!authHeader) {
        return response.status(401).send({ message: 'No token provided' })
      }

      const token = authHeader.replace('Bearer ', '')

      // Vérifier et décoder le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string)

      // Attacher les informations de l'utilisateur à la requête
      request.user = decoded

      // Passer à l'étape suivante
      await next()
    } catch (error) {
      return response.status(401).send({ message: 'Invalid or expired token' })
    }
  }
}
