// import express from "express";
// import jwt from "jsonwebtoken";
// import cors from "cors";

// const app = express();
// const users = [];

// const JWT_SECRET = "secret";

// function auth(req,res,next) {
//     const token = req.headers.token;
//     if(token) {
//         jwt.verify(token, JWT_SECRET, (err, decodedInfo) => {
//             if(err) {
//                 res.status(403).send("Invalid token");
//             } else {
//                 req.user = decodedInfo;
//                 next();
//             }
//         })
//     } else {
//         res.status(403).send("No token provided");
//     }
// }

// app.use(express.json());
// app.use(cors())

// app.post("/signup", (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;

//     if(users.find(user => user.username === username)) {
//         res.send("User already exists");
//         return;
//     }

//     users.push({ username, password });
//     res.json({message: "You have signed up"});

//     console.log(users)
// });


// app.post("/signin", (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;

//     const user = users.find(user => user.username === username && user.password === password);
//     if(user) {
//         const token = jwt.sign({
//             username: user.username
//         }, JWT_SECRET);
//         // user.token = token;
//         res.json({token: token});
//     } else {
//         res.status(403).send("Invalid username or password");
//     }

//     console.log(users)
// });

// app.get("/me", auth, (req, res) => {
    
//     const user = req.user
//     res.json({user: user.username});

// })

// app.listen(3000, () => {
//     console.log("listening on port 3000");
// });



import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors"

const JWT_SECRET = "secret123123";

const app = express();
app.use(express.json());
app.use(cors())

const users = [];

function logger(req, res, next) {
    console.log(req.method + " request came");
    next();
}

// localhost:3000
// app.get("/", function(req, res) {
//     res.sendFile(__dirname + "/public/index.html");
// })

app.post("/signup", logger, function(req, res) {
    const username = req.body.username
    const password = req.body.password
    users.push({
        username: username,
        password: password
    })

    // we should check if a user with this username already exists

    res.json({
        message: "You are signed in"
    })
})

app.post("/signin", logger, function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    let foundUser = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            foundUser = users[i]
        }
    }

    if (!foundUser) {
        res.json({
            message: "Credentials incorrect"
        })
        return 
    } else {
        const token = jwt.sign({
            username: users[i].username
        }, JWT_SECRET);
        res.header("jwt", token);

        res.header("random", "harkirat");

        res.json({
            token: token
        })
    }
})

function auth(req, res, next) {
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_SECRET);

    if (decodedData.username) {
        // req = {status, headers...., username, password, userFirstName, random; ":123123"}
        req.username = decodedData.username
        next()
    } else {
        res.json({
            message: "You are not logged in"
        })
    }
}

app.get("/me", logger, auth, function(req, res) {
    // req = {status, headers...., username, password, userFirstName, random; ":123123"}
    const currentUser = req.username;
    // const token = req.headers.token;
    // const decodedData = jwt.verify(token, JWT_SECRET);
    // const currentUser = decodedData.username

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === currentUser) {
            foundUser = users[i]
        }
    }

    res.json({
        username: foundUser.username,
        password: foundUser.password
    })
})

app.listen(3000 , () => {
    console.log("listening on port 3000");
}) 