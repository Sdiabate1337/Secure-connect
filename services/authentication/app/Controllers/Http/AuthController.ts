import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default class AuthController {
  // Inscription de l'utilisateur
  public async register({ request, response }: HttpContextContract) {
    const { email, password, role } = request.only(['email', 'password', 'role'])

    // Hashage du mot de passe avant l'enregistrement
    const hashedPassword = await bcrypt.hash(password, 10)

    // Création de l'utilisateur
    const user = await User.createUser(email, hashedPassword, role)

    return response.status(201).send({ message: 'User created successfully', user })
  }

  // Connexion de l'utilisateur
  public async login({ request, response }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    // Recherche de l'utilisateur
    const user = await User.findUserByEmail(email)

    if (!user) {
      return response.status(401).send({ message: 'Invalid email or password' })
    }

    // Vérification du mot de passe
    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return response.status(401).send({ message: 'Invalid email or password' })
    }

    // Génération du token JWT
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    })

    return response.send({ message: 'Login successful', token })
  }

  // Récupérer les informations de l'utilisateur connecté
  public async me({ request, response }: HttpContextContract) {
    const user = request.user // Cela vient du middleware d'authentification
    return response.send(user)
  }
}
