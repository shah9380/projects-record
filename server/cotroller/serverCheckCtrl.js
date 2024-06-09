const serverCheck = (req, res)=>{
    try {
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