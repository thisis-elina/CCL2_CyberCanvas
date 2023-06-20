//// Modules
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

/**
 * This function tries to authenticate the user based on given data
 * @param uname The username of the user
 * @param userPassword The encrypted password of the user
 * @param users A list of all users
 * @param res The HTTP-Response
 */
async function authenticateUser({userName, userPassword}, users, res) {
    const user = users.find(u => {
        return u.userName === userName
    });
    console.log(user, userName, userPassword, users)
    //returns pending promise --> doesn't render true
    if (user && await checkPassword(userPassword, user.userPassword)) {
        // Generate an access token
        console.log(ACCESS_TOKEN_SECRET);
        const payload =
            {
                id: user.userID,
                name: user.userName,
                email: user.userEmail,
                role: user.userRole
            };
        console.log(payload);
        const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: '1000d'});
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 60*60*24*365*1000,
        });
        res.cookie('test', "test", {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 60*60*24*365*1000,
        });
        console.log("cookie saved")
        res.send(JSON.stringify({success: 'Login gut'}))
    } else {
        res.send('Username or password incorrect');
    }
};

/**
 * This function checks if the authentication is valid based on the JWT Token
 * @param req HTTP-Request
 * @param res HTTP-Response
 * @param next Possible-Middleware
 */
function authenticateJWT(req, res, next) {
    const token = req.cookies['accessToken'];
    console.log(req.cookies);
    console.log("Token")
    console.log(token)
    if (token) {
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, userToken) => {
            if (err) {
                req.errorStatus = 403;
                next();
            }
            //uses the same req, res for the function, which is called next so adding attribute here
            //allows use to access it later.
            req.user =
                {
                    id: userToken.id,
                    name: userToken.name,
                    role: userToken.role
                };
            next();
        });
    } else {
        req.errorStatus = 401;
        next();
    }
}

/**
 * This functions updates the JWT
 * @param res HTTP-Response
 * @param user The user
 */
function updateJWT(res, user) {
    const payload =
        {
            id: user.userID,
            name: user.userName,
            role: user.userRole
        };
    console.log(payload);
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: '1000d'});
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 60*60*24*365,
    });
}


/**
 * This functions, checks if the password is correct
 * @param userPassword The given password
 * @param hash The hashed password
 * @returns The result of the password check
 */
async function checkPassword(userPassword, hash) {
    let pw = await bcrypt.compare(userPassword, hash)
    console.log(userPassword);
    console.log(pw);
    return pw;
}

/**
 * This functions checks if a user has enough right to access functionality
 * @param role The role of the User in question
 * @param reqUserID The userID of the User in question
 * @param userID The userID of the original user
 * @returns {boolean} If the user has the right to access it
 */
function checkAccess(role, reqUserID, userID) {
    return role === "admin" || reqUserID === userID;
}

/**
 * This functions checks if the objects is owned by the user in question
 * @param reqUserID The userID of the User in question
 * @param userID The userID of the original user
 * @returns {boolean} If the user owns it
 */
function ownership(reqUserID, userID) {
    return reqUserID === userID;
}

module.exports = {
    authenticateUser,
    authenticateJWT,
    checkAccess,
    ownership,
    updateJWT
};