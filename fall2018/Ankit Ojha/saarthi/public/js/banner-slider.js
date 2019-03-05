var slideIndex = 1;
show_M_Slides(slideIndex);

function plus_M_Slides(n) {
    show_M_Slides(slideIndex += n);
}

function currentMSlide(n) {
    show_M_Slides(slideIndex = n);
}

function show_M_Slides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active"; 
}
setInterval(function(){show_M_Slides(slideIndex += 1);}, 4000);