function validateUser()
{ 
    fetch("../JavaScript/login_data.json").then(function(response){return response.json();}).then(function(object)
    { 
        if(document.getElementById("username").value===object.username && document.getElementById("password").value===object.password)
        {
            alert("Login Successfull");
            window.location.replace("quizRules.html");
        }
        else 
        {
            document.getElementById("submit").style.backgroundColor = "rgb(170, 39, 39)";
            alert("Login Failed");
        }
    })
}

