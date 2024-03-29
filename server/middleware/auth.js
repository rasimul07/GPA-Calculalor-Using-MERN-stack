const jwt = require('jsonwebtoken');
const secret = "secretGPA";

const authenticateJwt = (req, res, next) => {
    console.log('----headers-----')
    console.log(req.headers);
    console.log('----headers-----')
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        console.log('We are here inside the auth middleware.\nToken: ' + token);
        jwt.verify(token, secret, (err, user) => {
            console.log(user);
            if (err) {
                return res.status(300).json({ message: "Authentication Failed!!!!!!!!" });;
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = { secret, authenticateJwt }
