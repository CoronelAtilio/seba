
async function userLoggedMiddleware(req,res,next){
    res.locals.isLogged = false;
    try {

        if (req.session && req.session.userLogged) {
            res.locals.isLogged = true;
            res.locals.userLogged = req.session.userLogged;
            res.locals.userEmail = req.session.userLogged.email;
        }
    } catch (error) {
        console.error("Error al verificar el usuario:", error);
    }
    next();
};
module.exports = userLoggedMiddleware;