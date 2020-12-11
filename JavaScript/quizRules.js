function validateCheck()
{
    if(document.getElementById("i-agree").checked==false)
    document.getElementById("alert").style.backgroundColor = "rgb(248, 202, 202)";
    else
    {
        window.location.replace("../HTML Pages/quizQuestions.html");
    }
}
