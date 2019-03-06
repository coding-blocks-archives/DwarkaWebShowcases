$(document).ready(() => {
 

    $('.add').click(function() {
        $('.block:last').before(`<div class="block">
        <label for="steptitle">Step Title</label>
        <input type="text" name="steptitle" class="input-item" id="steptitle">

        <label for="step">Step Description</label>
        <textarea name="step" id="" cols="30" rows="10" class="input-item" id="step"></textarea><span class="secondary-btn remove">Remove Step</span>
    </div>`);
    });
    $('.optionBox').on('click','.remove',function() {
         $(this).parent().remove();
    });    
});