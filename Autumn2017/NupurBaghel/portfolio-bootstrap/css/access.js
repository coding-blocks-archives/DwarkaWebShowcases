//operators dot and square brackets
// window var is available already, we define others

var global ={};
(function(){
	'use-strict';

	function public1(){
		console.log("Publicly available 1");
	}
	function public2(){
		console.log("Publicly available 2");
	}
	function private1(){
		console.log("Privately available 1");
	}
	function private2(){
		console.log("Privately available 2");		
	}

	var exposed = {
		"public1" :public1,
		"public2" :public2
	}
	window.exposed = exposed;
	global.exposed = exposed;
})();

console.log(global.exposed);
console.log(global['exposed']['public1']());


//inside double quotes, single quotes are allowed and vice versa







var obj= { 
	"task":"creatingvar","done":true
}
//undefined
obj
//{task: "creatingvar", done: true}
// objects are accessed using a .(dot)
obj.task
//"creatingvar"

//another way of accessing objects
// particularly useful when we want to have keys as ints e.g. obj.1 will not work obj['1'] will.
obj['task']
//"creatingvar"
obj['task']="abcd"
//"abcd"