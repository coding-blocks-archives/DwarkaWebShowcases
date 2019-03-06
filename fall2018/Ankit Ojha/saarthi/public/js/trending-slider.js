var slide_T_Index = 1;
show_T_Slides(slide_T_Index);

function plus_T_Slides(n) {
    show_T_Slides(slide_T_Index += n);
}

function show_T_Slides(n) {
    var i;
    var slides = document.getElementsByClassName("trending-slides");
    if (n > slides.length) {
        slide_T_Index = 1
    }
    if (n < 1) {
        slide_T_Index = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slide_T_Index - 1].style.display = "block";
}
setInterval(function(){show_T_Slides(slide_T_Index += 1);}, 6000);

