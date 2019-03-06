import axios from 'axios';
import { $ } from './bling';

function ajaxHeart(e) {
  e.preventDefault();
  console.log('HEART ITTT!!!!!!!!!!!!!!!!');
  console.log(this);
  axios
    .post(this.action)
    .then(res => {
      const isHearted = this.heart.classList.toggle('heart__button--hearted');
      $('.heart-count').textContent = res.data.hearts.length;
    })
    .catch(console.error);
}

export default ajaxHeart;
