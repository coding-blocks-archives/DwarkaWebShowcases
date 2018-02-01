let url = "https://ifsc.razorpay.com/";
let inp = document.getElementById('inp');
let btn = document.getElementById('btn');
let table = document.getElementById('tab');
let data = "";
btn.onclick = function x() {
    let finalUrl = url + inp.value;
    let request = new XMLHttpRequest();
    let flag = true;
    request.onreadystatechange = function () {
        if((this.status === 404 || this.status === 403) && flag){
            if(flag){
                flag = false;
            }
            alert("Enter Valid IFSC Code");
        }
        if(this.readyState === 4 && this.status === 200){
            display(JSON.parse(this.responseText));
        }
    };
    request.open('GET', finalUrl, true);
    request.send();
};
function display(data) {
    let col = "";
    let items = ['BANK', 'BRANCH', 'ADDRESS', 'IFSC', 'CONTACT', 'CITY', 'STATE'];
    let temp;
    for(let i = 0; i < items.length; i++){
        temp = data[items[i]];
        if(temp === ""){
            temp = "Not Available";
        }
        col += `<tr><th>${items[i]}</th><td>${temp}</td></tr>`
    }
    table.innerHTML = col;
}
