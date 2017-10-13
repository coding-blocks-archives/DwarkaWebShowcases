window.onload=function() {

    var output=document.getElementById("result");
    var plus=document.getElementById("+");
    var minus=document.getElementById("-");
    var multiply=document.getElementById("x");
    var divide=document.getElementById("/");
    var equals=document.getElementById("=");
    var del=document.getElementById("delete");
    var rem=document.getElementById("%");
    var twoPowers=document.getElementById("2^");
    var clr=document.getElementById("clear");
    var square=document.getElementById('x*x');
    var raise=document.getElementById('^');
    var e=document.getElementById('e');
    var pi=document.getElementById('pi');
    var fact=document.getElementById('x!');
    var sqRoot=document.getElementById('sqRoot');
    var tens=document.getElementById('10^');
    var sin=document.getElementById('sin');
    var cos=document.getElementById('cos');
    var tan=document.getElementById('tan');
    var inverse=document.getElementById('inverse');
    var log=document.getElementById('log');
    var mod=document.getElementById('mod');

    var op1;
    var op2;
    var op;

    plus.onclick=function(){
        op1=parseFloat(document.getElementById('result').value);
        //output.value="";
        //console.log(op1);
        output.value+="+";
        op="+";
    };

    minus.onclick=function(){
        op1=parseFloat(output.value);
        output.value+="-";
        op="-";
    };

    multiply.onclick=function(){
        op1=parseFloat(output.value);
        output.value+="*";
        op="*";
    };

    divide.onclick=function(){
        op1=parseFloat(output.value);
        output.value+="/";
        op="/";
    };

    rem.onclick=function () {
        op1=parseFloat(document.getElementById('result').value);
        output.value+="%";
        op="%";
    };

    twoPowers.onclick=function () {
        cleared();
        output.value+="2^";
        op="2^";
    };

    tens.onclick=function () {
        cleared();
        output.value+="10^";
        op="10^";
    };

    raise.onclick= function () {
        op1=parseFloat(document.getElementById('result').value);
        output.value+="^";
        op="^";
    };

    square.onclick= function(){
        op1=parseFloat(document.getElementById('result').value);
        output.value=(op1*op1)+"";
        op1=parseFloat(output.value);
    };

    fact.onclick=function () {
        op1=parseFloat(document.getElementById('result').value);
        var sol=op1;
        for(var i=1;i<op1;i++){
            sol=sol*i;
        }
        output.value=(sol)+"";
        op1=parseFloat(output.value);
    };

    sqRoot.onclick=function () {
        op1=parseFloat(document.getElementById('result').value);
        output.value=(Math.sqrt(op1))+"";
        op1=parseFloat(output.value);
    };

    sin.onclick=function () {
        output.value+="sin ";
        op="sin";
    };

    cos.onclick=function () {
        output.value+="cos ";
        op="cos";
    };

    tan.onclick=function () {
        output.value+="tan ";
        op="tan";
    };

    log.onclick=function () {
        output.value+="log ";
        op="log";
    };

    mod.onclick=function () {
        op1=parseFloat(document.getElementById('result').value);
        output.value=(Math.abs(op1))+"";
        op1=parseFloat(output.value);
    };

    inverse.onclick=function () {

    };

    equals.onclick=function(){

        if(op==="+")
        {
            op2=parseFloat(output.value.substring(output.value.indexOf("+")+1, output.value.length));
            //console.log(op2);
            output.value=op1+op2+"";
            //console.log(output.value);
            op1=parseFloat(output.value);
        }
        else if(op==="-")
        {
            op2=parseFloat(output.value.substring(output.value.indexOf("-")+1, output.value.length));
            output.value=(op1 - op2)+"";
            op1=parseFloat(output.value);
        }
        else if(op==="/")
        {
            op2=parseFloat(output.value.substring(output.value.indexOf("/")+1, output.value.length));
            output.value=(op1 / op2)+"";
            op1=parseFloat(output.value);
        }
        else if(op==='%'){
            op2=parseFloat(output.value.substring(output.value.indexOf("%")+1, output.value.length));
            output.value=(op1 % op2)+"";
            op1=parseFloat(output.value);
        }
        else if(op==='2^'){
            op2=parseFloat(output.value.substring(output.value.indexOf("^")+1, output.value.length));
            output.value= Math.pow(2,op2)+"";
        }
        else if(op==='10^'){
            op2=parseFloat(output.value.substring(output.value.indexOf("^")+1, output.value.length));
            output.value= Math.pow(10,op2)+"";
        }
        else if(op==='^'){
            op2=parseFloat(output.value.substring(output.value.indexOf("^")+1, output.value.length));
            output.value=Math.pow(op1,op2)+"";
            op1=parseFloat(output.value);
        }
        else if(op==='*'){
            op2=parseFloat(output.value.substring(output.value.indexOf("*")+1, output.value.length));
            output.value=(op1 * op2)+"";
            op1=parseFloat(output.value);
        }
        else if(op==='sin'){
            op2=parseFloat(output.value.substring(output.value.indexOf("n")+1, output.value.length));
            //console.log(op2);
            output.value=Math.sin(op2);
            op1=parseFloat(output.value);
        }
        else if(op==='cos'){
            op2=parseFloat(output.value.substring(output.value.indexOf("s")+1, output.value.length));
            //console.log(op2);
            output.value=Math.cos(op2);
            op1=parseFloat(output.value);
        }
        else if(op==='tan'){
            op2=parseFloat(output.value.substring(output.value.indexOf("n")+1, output.value.length));
            //console.log(op2);
            output.value=Math.tan(op2);
            op1=parseFloat(output.value);
        }
        else if(op==='log'){
            op2=parseFloat(output.value.substring(output.value.indexOf("g")+1, output.value.length));
            output.value=Math.log(op2);
            op1=parseFloat(output.value);
        }
        else {
            op2=parseFloat(output.value.substring(output.value.indexOf("/")+1, output.value.length));
            output.value=(1/op2);
            op1=parseFloat(output.value);
        }
    };

    clr.onclick=function(){
        output.value="";
    };

    del.onclick=function () {
        output.value=output.value.substring(0, output.value.length-1);
    };

    e.onclick=function () {
        output.value+="2.71828";
        op1=parseFloat(output.value);
    };

    pi.onclick=function () {
        output.value+="3.14159";
        op1=parseFloat(output.value);
    }

};

function cleared(){
    document.getElementById('result').value="";
}
