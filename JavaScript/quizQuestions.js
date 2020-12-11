var i=0;
var score=0;
var user_answers=new Array(0);

function initializeUserAnswerMap()
{
    //getting answers from user
    if (document.getElementById("option1").checked==true)
    {
        user_answers.push(0);
    }
    else if (document.getElementById('option2').checked==true)
    {
        user_answers.push(1);
    }
    else if (document.getElementById('option3').checked==true) 
    {
    user_answers.push(2);
    }
    else if (document.getElementById('option4').checked==true)
    {
        user_answers.push(3);
    } 
    else if(document.getElementById('option1').checked==false && document.getElementById('option1').checked==false && document.getElementById('option1').checked==false && document.getElementById('option1').checked==false)
    {
        i--;
        alert("Please select an option");
    }
}

function loadFirstQuestion()
{
    //fetching qna details.json file asynchronusly
    fetch("../JavaScript/qna details.json").then(function(response){return response.json();}).then(function(object)
    {
        //fetching and showing the first question and ooptions after loading the quizQuestion.html 
        document.getElementById("question").innerHTML=object[i].que;
        document.getElementById("first").innerHTML=object[i].options[0];
        document.getElementById("second").innerHTML=object[i].options[1];
        document.getElementById("third").innerHTML=object[i].options[2];
        document.getElementById("fourth").innerHTML=object[i].options[3];
    })
}

function nextQuestion()
{
    i++;

    //adding slelected options to user_array
    initializeUserAnswerMap();

    //fetching qna details.json file asynchronusly
    fetch("../JavaScript/qna details.json").then(function(response){return response.json();}).then(function(object)
    {
        //showing question and options
        document.getElementById("question").innerHTML=object[i].que;
        document.getElementById("first").innerHTML=object[i].options[0];
        document.getElementById("second").innerHTML=object[i].options[1];
        document.getElementById("third").innerHTML=object[i].options[2];
        document.getElementById("fourth").innerHTML=object[i].options[3];
    })

    //disabling the correct answer showing option before next question comes up
    document.getElementById("answer").style.display="none";
    document.getElementsByClassName("container")[0].style.height="250px";

    //withdrwaing next button and puting finish quiz button at final question
    if(i==19)
    {
        document.getElementById("button_next").style.display="none";
        document.getElementById("button_finish").style.display="inline-block";
    }  

    //re enables radio buttons after selecting one answer
    document.getElementById("option1").disabled = false;
    document.getElementById("option2").disabled = false;
    document.getElementById("option3").disabled = false;
    document.getElementById("option4").disabled = false;
}


//clearing selected radio buttons for next question
function clearAllRadioBtns()
{
    var x = document.getElementsByName("options");
    for(var i=0;i<x.length;i++)
      x[i].checked = false;
}

function showAnswer()
{
    //disables radio buttons after selecting one answer
    document.getElementById("option1").disabled = true;
    document.getElementById("option2").disabled = true;
    document.getElementById("option3").disabled = true;
    document.getElementById("option4").disabled = true;

    //fetching qna details.json file asynchronusly
    fetch("../JavaScript/qna details.json").then(function(response){return response.json();}).then(function(object)
    {
        //correct answer div shows up
        document.getElementById("answer").style.display="inline-block";

        //showing correct answer below options
        document.getElementById("answer").innerHTML="The correct answer is: "+(object[i].ans)+"";
        document.getElementsByClassName("container")[0].style.height="300px";
    })
}
function showUserResult()
{
    //adding the ans of last question to the user_answer array
    initializeUserAnswerMap();

    document.getElementsByClassName("container")[0].style.display="none";
    document.getElementsByClassName("container2")[0].style.display="block";

    //fetching qna details.json file asynchronusly
    fetch("../JavaScript/qna details.json").then(function(response){return response.json();}).then(function(object)
    {
        for (var z=0;z<object.length;z++)
        {
            //creating row
            var row = document.createElement("tr");

            //createing cell1 question no. 
            var cell1 = document.createElement("td");
            var cellText1 = document.createTextNode(object[z].queno);
            cell1.appendChild(cellText1);
            row.appendChild(cell1);
            document.getElementById("result").appendChild(row);

            //creating cell2 user selected answer 
            var cell2 = document.createElement("td");
            var cellText2 = document.createTextNode(object[z].ans);
            cell2.appendChild(cellText2);
            row.appendChild(cell2);
            document.getElementById("result").appendChild(row);

            //creating cell3 correct answer
            var cell3 = document.createElement("td");
            var cellText3 = document.createTextNode(object[z].options[user_answers[z]]);
            cell3.appendChild(cellText3);
            row.appendChild(cell3);
            document.getElementById("result").appendChild(row);

            //creating cell4 recived mark
            var cell4 = document.createElement("td");
            if(object[z].options[user_answers[z]]==object[z].ans)
            {
                score++;
                var cellText4 = document.createTextNode("1 Mark");
                document.getElementsByTagName("tr")[z+1].style.backgroundColor="rgb(143, 255, 158)";
            }
            else 
            {
                var cellText4 = document.createTextNode("0 Mark");
                document.getElementsByTagName("tr")[z+1].style.backgroundColor="pink";
            }
            cell4.appendChild(cellText4);
            row.appendChild(cell4);
            document.getElementById("result").appendChild(row);
        }


    var text_result = document.createTextNode("Your Result is: "+(score*100/(i+1))+"%");
    var text_question = document.createTextNode("Total number of Questions: "+(i+1)+"");
    var text_wrong = document.createTextNode("Total number of Wrong Answers: "+((i+1)-score)+"");
    var text_correct = document.createTextNode("Total number of Correct Answers: "+(score)+"");

    document.getElementById("your-result").appendChild(text_result);
    document.getElementById("your-result").appendChild(document.createElement("br"));
    document.getElementById("your-result").appendChild(text_question);
    document.getElementById("your-result").appendChild(document.createElement("br"));
    document.getElementById("your-result").appendChild(text_wrong);
    document.getElementById("your-result").appendChild(document.createElement("br"));
    document.getElementById("your-result").appendChild(text_correct);
    })

    document.getElementById("logout").style.display="block";
}

//logout button
function logout()
{
    window.location.replace("../HTML Pages/index.html");
}