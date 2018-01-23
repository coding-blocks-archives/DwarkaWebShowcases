var textt="";
var screen;

window.onload =function () {
    screen = document.getElementById('screen');
};


function disp(button) {
    console.log(button.id);
    textt = textt + button.id;
    console.log(textt);
    screenDisp();
};


function screenDisp() {
    screen.innerHTML = textt;
};


function calc() {
    var ans=0;
    for(var i = 3 ; i < textt.length ;i ++){
        ans = parseInt(ans * 10) + parseInt(textt[i]);
    }
    if(textt[0]=='l' && textt[1]=='o'){
        ans = (Math.log(ans) * 1.0) / Math.log(10);
    }
    else if(textt[0]=='l' && textt[1]=='n'){
        ans=0;
        for(var i = 2 ; i < textt.length ;i++){
            ans = parseInt(ans * 10) + parseInt(textt[i]);
        }
        console.log(ans + "no");
        ans = Math.log(ans);

    }
    else if(textt[0]=='s'){
        ans=Math.sin(ans);
    }
    else if(textt[0]=='c'){
        ans=Math.cos(ans);
    }
    else if(textt[0]=='t'){
        ans=Math.tan(ans);
    }
    else if(textt[0]=='√'){
        for(var i = 1 ; i < textt.length ;i ++){
            ans = parseInt(ans * 10) + parseInt(textt[i]);
        }
        ans= Math.sqrt(ans);
    }
    else{
        var num1=0;
        var num2=0;
        var i=0;
        while(i < textt.length && textt[i]!='+' && textt[i]!='-' && textt[i]!='/' && textt[i]!='%' && textt[i]!='^' && textt[i]!='*'){
            num1 = parseInt(num1 * 10) + parseInt(textt[i]);
            i++;
        }
        var op= textt[i];
        i++;
        for(; i < textt.length ;i ++){
            num2 = parseInt(num2 * 10 ) +  parseInt(textt[i]);
        }
        if(op=='+') {
            ans = num1 + num2;
        }
        else if(op=='-') {
            ans = num1 - num2;
        }
        else if(op=='*') {
            ans = num1 * num2;
        }
        else if(op=='%') {
            ans = num1 % num2;
        }
        else if(op=='^') {
            ans = Math.pow(num1, num2);
        }
        else if(op=='/') {
            ans = num1 / num2;
        }
        else{
            ans=num1;
        }

    }
	textt=ans.toString();
    screenDisp();
};

function clearr() {
    //console.log('called');
    textt="";
    console.log(textt);
    screenDisp();
};