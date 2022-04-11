// if there's any katex block
if(document.querySelectorAll('.katex-display').length){

  const tipHtml = "\<div class='smaller' style='margin-top: -1em;line-height: 1em; text-align: center; color: var(--muted);'>\<svg xmlns='http://www.w3.org/2000/svg' role='img' class='inline-icon' width='1em' height='1em' preserveAspectRatio='xMidYMid meet' viewBox='0 0 512 512'><path d='M401.4 224h-214l83-79.4c11.9-12.5 11.9-32.7 0-45.2s-31.2-12.5-43.2 0L89 233.4c-6 5.8-9 13.7-9 22.4v.4c0 8.7 3 16.6 9 22.4l138.1 134c12 12.5 31.3 12.5 43.2 0 11.9-12.5 11.9-32.7 0-45.2l-83-79.4h214c16.9 0 30.6-14.3 30.6-32 .1-18-13.6-32-30.5-32z' fill='currentColor'>\</path>\</svg> Pan / scroll above to see the remainder \<svg xmlns='http://www.w3.org/2000/svg' role='img' class='inline-icon' width='1em' height='1em' preserveAspectRatio='xMidYMid meet' viewBox='0 0 512 512'><path d='M284.9 412.6l138.1-134c6-5.8 9-13.7 9-22.4v-.4c0-8.7-3-16.6-9-22.4l-138.1-134c-12-12.5-31.3-12.5-43.2 0-11.9 12.5-11.9 32.7 0 45.2l83 79.4h-214c-17 0-30.7 14.3-30.7 32 0 18 13.7 32 30.6 32h214l-83 79.4c-11.9 12.5-11.9 32.7 0 45.2 12 12.5 31.3 12.5 43.3 0z' fill='currentColor'>\</path>\</svg>\</div>".trim();
  let tipTemplate = document.createElement('template');
  tipTemplate.innerHTML = tipHtml;

  const articleWidth = document.querySelectorAll('article')[0].getBoundingClientRect().width;

  // iterate over span.katex-html outside any <details>
  document.querySelectorAll(':not(details *).katex-display .katex-html')
    .forEach(el => {
      let childrenWidth = 0;

      el.querySelectorAll('.base').forEach(b => {
        childrenWidth += b.getBoundingClientRect().width;
      });

      // insert tipHtml if katex-display base child is wider than container
      if(childrenWidth > articleWidth) {
        el.closest('.katex-display').insertAdjacentHTML('afterend', tipHtml);
      }
    }
  );

  // iterate over span.katex-display inside any <details open>
  document.querySelectorAll('details[open] .katex-display .katex-html')
  .forEach(el => {
      const divContainerWidth = el.closest('details[open] > div').getBoundingClientRect().width;

      let childrenWidth = 0;

      el.querySelectorAll('.base').forEach(b => {
        childrenWidth += b.getBoundingClientRect().width;
      });
      
      if(childrenWidth > divContainerWidth) {
        el.closest('.katex-display').insertAdjacentHTML('afterend', tipHtml);
      }
    }
  );

  // observer for span.katex-display inside closed <details> 
  // they might change in size when opened

  // https://web.dev/resize-observer/
  const resizeDisplayObs = new ResizeObserver(entries => {
    for (let entry of entries) {
      if (!entry.target.closest('details[open] > div')){
        continue;
      }
      
      const divContainerWidth = entry.target.closest('details[open] > div').getBoundingClientRect().width;

      let childrenWidth = 0;

      entry.target.querySelectorAll('.base').forEach(b => {
        childrenWidth += b.getBoundingClientRect().width;
      });

      let present = entry.target.closest('.katex-display').nextElementSibling.isEqualNode(tipTemplate.content.firstChild);

      if(childrenWidth > divContainerWidth && !present) {
        entry.target.closest('.katex-display').insertAdjacentHTML('afterend', tipHtml);
      }
    }
  });
  
  document.querySelectorAll('details .katex-display .katex-html:not(details[open] *)').forEach(el => resizeDisplayObs.observe(el));


  // fix katex tags that may be overlapping katex equations
  // (this happens only on mobile, katex is not responsive)
  if (window.matchMedia('(max-width: 640px)').matches){

    const fixKatexTag = function(el){
      elBounds = el.getBoundingClientRect();

      el.parentNode.querySelectorAll('.base').forEach(b => {
        baseBounds = b.getBoundingClientRect();

        // https://stackoverflow.com/questions/12066870/how-to-check-if-an-element-is-overlapping-other-elements
        const overlap = !(
          elBounds.top > baseBounds.bottom ||
          elBounds.right < baseBounds.left ||
          elBounds.bottom < baseBounds.top ||
          elBounds.left > baseBounds.right
        );

        if (overlap && window.getComputedStyle(el).position === 'absolute'){
          el.style.position = 'relative';
          el.style['margin-left'] = '24px';
        }
      });
    }
    
    // iterate over .tag outside details OR .tag inside details[open]
    document.querySelectorAll(':not(details *).katex-display .tag, details[open] .katex-display .tag').forEach(el => fixKatexTag(el));

    // observer for .tag inside closed <details> 
    // they might change in size when opened
    const resizeTagObs = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (!entry.target.closest('details[open] > div')){
          continue;
        }

        fixKatexTag(entry.target);
      }
    });
    
    // add observer for each .tag inside details that starts out closed
    document.querySelectorAll('details .katex-display .tag:not(details[open] *)').forEach(el => resizeTagObs.observe(el));
  }
}