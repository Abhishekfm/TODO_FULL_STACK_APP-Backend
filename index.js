const app = require("./app")

app.get("/",(req, res)=>{
    res.cookie("kokok","my home is in delhi")
    console.log('Cookies: ', req.cookies)
    res.send("HEllo to you")
})

app.listen(process.env.PORT || 4000,()=>{
    console.log(`Listening at port http://localhost:${process.env.PORT}`);
})

//for type module we use import 