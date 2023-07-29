const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");


const app = express();
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("home");
})

app.get("/success", function(req, res){
    res.render("success")
})

app.get("/about", function(req, res){
    res.render("about");
})

app.get("/contact", function(req, res){
    res.render("contact");
})

app.post("/contact", function(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const number = req.body.number;

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'enviconsmpt@gmail.com',
            clientId: '64728600704-qih716r56lmkvamflssd8qjifllh2b8d.apps.googleusercontent.com',
            clientSecret: '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',
            refreshToken: '1//04PnBBCyIZKsECgYIARAAGAQSNwF-L9IruKZuC-oGaD1_N_q7QkA-ge78dxjKCC5y5ApNPAeoPmUk9nz9anJv7fv1wCx7r0CUc5w',
            accessToken: 'ya29.a0AbVbY6MFuC9A9NVvkiNtYShI4KIdCFFdB9T4G_p8sshZMxbWlZBtMSYlHlU-wWSmmEKNtWQe0-wL4qFvBW7rU_SCScoF-aUSVvtxBm1bq9szc8hnydgYHAopXC789nu6z5zIGwATcmFT3wj0TwAzxIseYNupaCgYKAXgSARMSFQFWKvPlCX8Nc3TX3uOwXiGdO71eSQ0163'
        }
    });

    var mailOptions = {
        from : "enviconsmpt@gmail.com",
        to:"envicondxb@gmail.com",
        subject:"contact form enquiry",
        text: "Name : " + name + "\nEmail : " + email + "\nPhone Number : " + number + "\nMessage : " + message 
    }

    transporter.sendMail(mailOptions);
    
    res.redirect("/success");

    
})

app.listen(process.env.PORT || 3000, function(){
    console.log("server started on port 3000");
})