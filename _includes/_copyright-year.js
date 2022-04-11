let yearEl = document.querySelector('#copyright-year');

if(yearEl){
  yearEl.innerText = new Date().getFullYear();
}