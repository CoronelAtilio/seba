const { body, validationResult } = require('express-validator');

const loginValidationMiddleware = [
    body('loginUser')
        .notEmpty()
        .withMessage('Campo Obligatorio'),
    body('loginPass')
        .notEmpty()
        .withMessage('Campo Obligatorio')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Contraseña inválida'),
    async (req, res, next) => {
        await Promise.all([
            body('loginUser').run(req),
            body('loginPass').run(req)
        ]);
        next();
    }
];

module.exports = loginValidationMiddleware;
