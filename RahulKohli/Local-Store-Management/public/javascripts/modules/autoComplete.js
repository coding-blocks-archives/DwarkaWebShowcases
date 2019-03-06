// function autoComplete(input, latInput, lonInput){
//     if(!input) return;
//     const dropDown = new google.maps.places.Autocomplete(input);

//     dropDown.addListener('place_changed', () => {
//     	const place = dropDown.getPlace();
//     	latInput.value = place.geometry.location.lat();
//     	lonInput.value = place.geometry.location.lng();
//     })
//     input.on('keydown', e => {
//     	if(e.keycode===3) e.preventDefault();
//     })
// }

// export default autoComplete;