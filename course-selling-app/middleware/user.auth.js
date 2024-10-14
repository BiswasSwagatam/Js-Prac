import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()


function userAuth(req, res, next) {
    const token = req.headers.token

    const decodedData = jwt.verify(token, process.env.JWT_USER_SECRET)

    if(decodedData) {
        req.userId = decodedData.id
        next()
    } else {
        res.status(401).json({message: "Unauthorized"})
    }
}

export default userAuth