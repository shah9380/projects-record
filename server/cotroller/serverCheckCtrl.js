const path = require('path');

const serverCheck = (req, res)=>{
    try {
        res.sendFile("http://localhost:3000/"); // Ensure the path is correct
        console.log(path.join(__dirname, 'index.html'))
        res.status(200).send({
            message: "Awesome! Server is Cool",
            status: true,
        })
    } catch (error) {
        res.status(502).send({
            message: "unable to connect server at the moment",
            status: false,
        })
    }
}

module.exports = {serverCheck}