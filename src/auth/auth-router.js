const express = require('express')
const AuthService = require('./auth-service')

const authRouter = express.Router()
const jsonBodyParser = express.json()

authRouter
// implements the request body validation logic to check that the user_name and password are supplied.
    .post('/login', jsonBodyParser, (req, res, next) => {
            const { user_name, password } = req.body
            const loginUser = { user_name, password }
            
            for (const [key, value] of Object.entries(loginUser))
            if (value == null)
                return res.status(400).json({
                error: `Missing '${key}' in request body`
                })
                    // when the user_name is supplied, but the value isn't a user in the database.
            AuthService.getUserWithUserName(
                  req.app.get('db'),
                  loginUser.user_name
                )
                  .then(dbUser => {
                    if (!dbUser)
                      return res.status(400).json({
                        error: 'Incorrect user_name or password',
            })
                
        return AuthService.comparePasswords(loginUser.password, dbUser.password)
            .then(compareMatch => {
                if (!compareMatch)
                return res.status(400).json({
                    error: 'Incorrect user_name or password',
                })

                const sub = dbUser.user_name
                const payload = { user_id: dbUser.id }
                res.send({
                  authToken: AuthService.createJwt(sub, payload),
                })
      })
    })

                   .catch(next)
  })

module.exports = authRouter