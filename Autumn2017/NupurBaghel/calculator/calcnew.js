$(document).ready(function(){

	var val1 = "";
	var opr = "";
	var flag = false;
	var input = $(' #entry ');
	var clr = false;

	$("button").click(function(){
		if(clr == true ){
			input.val("");
			clr = false;
		}

		// find out classnames and id
		var classname = $(this).attr('class');
		var id = this.id;
		var val2 = input.val();

		//check for clear button
		if(id == "clear"){
			flag = false;
			clr = false;
			val1 = "";
			input.val("");
		}
		else if(id == "equals"){
			if(flag == true && val2!=""){
				val1 = evaluate(val1,val2,opr);
				flag = false;
				input.val(val1);
			};
		}
		else if(classname == "numbers"){
			if(val2 == "" && id == "decimal"){
				input.val("0.");
			}
			else if( id == "decimal"){
				input.val(input.val()+".");
			}
			else{
				input.val(input.val()+id);
				console.log(id);
			}
		}
		else if( classname == "arithmetic" ){
			if(flag == true){
				val1 = evaluate(val1,val2,opr);
				input.val(val1);
			}
			else{
				val1 = val2;
			}
			opr = id;
			clr = true;
			flag = true;
		}
		else if( id!="e" && id!="pi" ){
			if(flag == true){
				val1 = evaluate(val1,val2,opr);
				input.val(val1);
				flag = false;
			}
			else{
				val1 = val2;
			}

			val1 = evaluate2(val1,id);
			input.val(val1);
		}
		else{
			if (id == e)
				input.val(Math.E);
			else
				input.val(Math.PI);
		}
	});

	// for arithmetic operations like add, subtract, multiply and divide
	function evaluate(val1, val2, opr){
		x1 = parseFloat(val1);
		x2 = parseFloat(val2);
		var x3;
		if(opr == "add")
			x3 = x1 + x2;
		else if(opr == "minus")
			x3 = x1 - x2;
		else if(opr == "multiply")
			x3 = x1 * x2;
		else
			x3 = x1 / x2;
		return x3;
	}

	// for trignometric , logarithmic and square , sqrt functions
	function evaluate2(val1, opr){
		val1 = parseFloat(val1);
		if(opr == "sin")
			return Math.sin(val1);
		else if(opr == "cos")
			return Math.cos(val1);
		else if(opr == "tan")
			return Math.tan(val1);
		else if(opr == "sinh")
			return Math.sinh(val1);
		else if(opr == "cosh")
			return Math.cosh(val1);
		else if(opr == "tanh")
			return Math.tanh(val1);
		else if(opr == "log10")
			return Math.log10(val1);
		else if(opr == "log")
			return Math.log(val1);
		else if(opr == "sqrt")
			return Math.sqrt(val1);
		else
			return val1*val1;
	}

});