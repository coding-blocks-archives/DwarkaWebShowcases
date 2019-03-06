$(document).ready(() => {
 
    // $('#btn').on('click', () => {
    //     let steps = $('#steps > textarea').val();
    //     // console.log(steps);
    // });

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

    $('#delete-article').on('click', function(e){
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
          type:'DELETE',
          url: `/technicalUsers/technicalindex/${id}`,
          success: function(response){
            alert('Deleting Article');
            window.location.href='/technicalUsers/technicalindex';
          },
          error: function(err){
            console.log(err);
          }
        });
      });


    
});