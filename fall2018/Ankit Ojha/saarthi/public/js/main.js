$(document).ready(() => {
 
    $('#btn').on('click', () => {
    let steps = $('#steps > textarea').val();
    console.log(steps);
    });

    $('.add').click(function() {
        $('.block:last').before(`<div class="block">
        <textarea class="form-control" name="step"  cols="30" rows="10"></textarea><span class="remove">Delete Step</span>
    </div>`);
    });
    $('.optionBox').on('click','.remove',function() {
         $(this).parent().remove();
    });
    
});