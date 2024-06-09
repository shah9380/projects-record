import React from "react";

const NotFound = ()=>{
    return(
                <body style={{display: "flex", alignItems: 'center', justifyContent: 'center',height: '100vh'}}>
                <div id="notfound">
                <div class="notfound">
                <div class="notfound-404">
                <h1>404</h1>
                </div>
                <h2>we are sorry, but the page you requested was not found</h2>
                <p class="home-btn">Go Home</p>
                <p class="contact-btn">Contact us</p>
                <div class="notfound-social">
                <p><i class="fa fa-facebook"></i></p>
                <p><i class="fa fa-twitter"></i></p>
                <p><i class="fa fa-pinterest"></i></p>
                <p><i class="fa fa-google-plus"></i></p>
                </div>
                </div>
                </div>


                </body>
    )
}

export default NotFound