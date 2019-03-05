var slide_F_Index = 1;
show_F_Slides(slide_F_Index);

function plus_F_Slides(n) {
    show_F_Slides(slide_F_Index += n);
}

function show_F_Slides(n) {
    var i;
    var slides = document.getElementsByClassName("fresh-slides");
    if (n > slides.length) {
        slide_F_Index = 1
    }
    if (n < 1) {
        slide_F_Index = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slide_F_Index - 1].style.display = "block";
}
setInterval(function(){show_F_Slides(slide_F_Index += 1);}, 8000);