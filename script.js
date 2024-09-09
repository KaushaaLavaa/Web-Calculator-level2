//setup and initialization
document.addEventListener("DOMContentLoaded",function(){
    const inputScreen = document.getElementById("input-screen");
    const displayField = document.getElementById("display");
    const buttons = document.querySelectorAll("button");
    let expression ="";
    let shouldClearInput = false;

    //clear input screen
    function clearInputScreen(){
        expression="";
        inputScreen.value="";
        displayField.value="";
        shouldClearInput = false;
    }

    //backspace
    function deleteLastCharacter(){
        expression = expression.slice(0,-1);
        inputScreen.value = expression;
    }

    //for result
    function evaluateExpression(){
        try{
          const result = eval(expression).toString();
          displayField.value = expression;
          inputScreen.value = result;
          shouldClearInput = true;
          expression="";
        }
        catch(error){
          inputScreen.value = "Error";
        }
    }

    //for operation
    function addOperator(operator){
       if(shouldClearInput){
        clearInputScreen();
       }
       expression = expression + operator;
       inputScreen.value = expression;
    }

    //function to append a number or dot to the expression
    function appendToExpression(text){
      if(shouldClearInput){
        clearInputScreen();
      }
      expression = expression + text;
      inputScreen.value = expression;
    }

    //function for handeling sqrt, +/-, 1/x
    function handleOperation(operation){
        //step1: if expression is empty or not
        if(expression === "") return;
        let result;
        //step2: convert expression to number
        const currentValue = parseFloat(expression);
        //step3: perform the operation
        switch(operation){
            case "toggleSign":
                result = currentValue * -1;
                console.log(result);
                break;
            case "sqrt":
                result = Math.sqrt(currentValue);
                expression = `\u221A(${currentValue})`;
                break;
            case "reciprocal":
                result = 1 / currentValue;
                expression = `1/${currentValue}`;
                break;
            case "percentage":
                result = currentValue/100;
                expression = `${currentValue}%`;
                break;
        }
        displayField.value = expression;
        expression = result.toString();
        inputScreen.value = expression;
        shouldClearInput = "true";
        }

    //add event listener to each button
    buttons.forEach(function(button){
        button.addEventListener("click",function(){
            if(button.classList.contains("clear-icon")){
                clearInputScreen();
                console.log("clicked");
            }
            else if(button.classList.contains("delete-icon")){
                deleteLastCharacter();
                console.log("clicked");
            }
            else if(button.classList.contains("equal-icon")){
                evaluateExpression();
                console.log("clicked");
            }
            else if(button.classList.contains("divide-icon")){
                addOperator("/");
                console.log("clicked");
            }
            else if(button.classList.contains("multiply-icon")){
                addOperator("*");
                console.log("clicked");
            }
            else if(button.classList.contains("add-icon")){
                addOperator("+");
                console.log("clicked");
            }
            else if(button.classList.contains("minus-icon")){
                addOperator("-");
                console.log("clicked");
            }
            else if(button.classList.contains("mod-icon")){
                addOperator("%");
                console.log("clicked");
            }
            else if(button.classList.contains("power-icon")){
                addOperator("**");
            }
            else if(button.classList.contains("toggle-sign-icon")){
                handleOperation("toggleSign");
            }
            else if(button.classList.contains("squareroot-icon")){
                handleOperation("sqrt");
            }
            else if(button.classList.contains("reciprocal-icon")){
                handleOperation("reciprocal");
            }
            else if(button.classList.contains("percentage-icon")){
                handleOperation("percentage");
            }
            else{
                appendToExpression(button.innerText);//23
                console.log("clicked");
            }
        })
    })
});