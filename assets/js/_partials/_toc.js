if(document.getElementById('toc-menu')){
  function toggleToc(){
    const toggle = document.getElementById('toggle-toc');
    toggle.querySelectorAll('span').forEach((e) => {
      e.classList.toggle('hidden');
    });
  
    document.getElementById('toc-sticky').classList.toggle('hidden');
  }

  var spy = new Gumshoe('#toc-menu a', {
    offset: 2 * parseFloat(getComputedStyle(document.documentElement).fontSize),
  });
}