import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()


function adminAuth(req, res, next) {
    const token = req.headers.token

    const decodedData = jwt.verify(token, process.env.JWT_ADMIN_SECRET)

    if(decodedData) {
        req.adminId = decodedData.id
        next()
    } else {
        res.status(401).json({message: "Unauthorized"})
    }
}

export default adminAuth