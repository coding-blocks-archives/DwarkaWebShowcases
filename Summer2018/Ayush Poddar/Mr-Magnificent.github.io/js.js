function getRandomInt() {
    return (Math.floor(Math.random() * 256));
}


function e() {

    function getLocation() {
        return (Math.floor(Math.random() * 10));
    }

    // rgb(30, 87, 167);
    // rgb(167, 30, 30);
    // rgb(47, 181, 99);

    function colorChange() {
        let nomargin = document.getElementsByClassName("no-margin");
        let col1 = getRandomInt();
        let col2 = getRandomInt();
        nomargin[0].style.background = `linear-gradient(25deg, rgb(0, 150, ${col1}), rgb(0, 150, ${col2})`;
    }
    return colorChange;
}

let x = e();
// let nomargin = document.getElementsByClassName("no-margin");

setInterval(x, 2000);

window.onload = function() {
    function colorCh () {
    let lang = document.getElementsByClassName('lang');
    for(let i = 0; i < lang.length; i++) {
        let tempColor = getRandomInt();
        lang[i].style.color = `hsl(${tempColor}, 100%, 25%)`;
        // console.log(lang[i]);
    }
}

colorCh();
}

function scrolling(obj) {
    let ide = obj.id;

    if (ide == 1) {    
        document.querySelector('#lang').scrollIntoView({ 
            behavior: 'smooth',
            block: "start", 
            // inline: "nearest"
        });
        setTimeout(scrollTen, 700);
    }
    else if (ide == 2) {
        document.querySelector('#projects').scrollIntoView({ 
            behavior: 'smooth',
            block: "start", 
            // inline: "nearest"
        });
        setTimeout(scrollTen, 700);   
    }
    else if (ide == 3) {
        document.querySelector('#education').scrollIntoView({ 
            behavior: 'smooth',
            block: "start", 
            // inline: "nearest"
        });
        setTimeout(scrollTen, 800);
    }
    else if (ide == 4) {
        document.querySelector('#contact').scrollIntoView({ 
            behavior: 'smooth',
            block: "start", 
            // inline: "nearest"
        });
    }

} 

function scrollTen () {
    window.scrollBy({
        top: -50,
        behavior: "smooth"
    })
}