const bottomElHtml = "\<div style='border-top:1px solid var(--ui-border);position:sticky;bottom:0;height:1.5em;background-color:var(--bg);z-index:1;'\>\<span style='float:right;margin-top:-0.9em;border:1px solid var(--ui-border);padding:2px 3px;line-height:1;width:14.4px;height:16.2px;' class='link-color button small' onclick='closeDetailsFromBtn(this.parentNode);'\>\<svg xmlns='http://www.w3.org/2000/svg' role='img' style='padding:0;width:1em;height:1em;' width='1em' height='1em' preserveAspectRatio='xMidYMid meet' viewBox='0 0 512 512'\>\<path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='m112 328l144-144l144 144'\>\<\/path\>\<\/svg\>\<\/span\>\<\/div\>".trim();
let bottomTemplate = document.createElement('template');
bottomTemplate.innerHTML = bottomElHtml;

const topElHtml = "\<div style='border-bottom:1px solid var(--ui-border);position:sticky;top:0;height:0.5em;margin-bottom:1.5em;background-color:var(--bg);z-index:2;'\>\<span style='float:right;border:1px solid var(--ui-border);padding:2px 3px;line-height:1;width:14.4px;height:16.2px;' class='link-color button small' onclick='closeDetailsFromBtn(this.parentNode);'\>\<svg xmlns='http://www.w3.org/2000/svg' role='img' style='padding:0;width:1em;height:1em;' preserveAspectRatio='xMidYMid meet' viewBox='0 0 512 512'\>\<path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='m112 184l144 144l144-144'\>\<\/path\>\<\/svg\>\<\/span\>\<\/div\>".trim();
let topTemplate = document.createElement('template');
topTemplate.innerHTML = topElHtml;

const expandElHtml = "\<div style='border-bottom:1px solid var(--ui-border);margin-top:-0.5em;margin-bottom:2em;'\>\<span style='float:right;border:1px solid var(--ui-border);padding:2px 3px;line-height:1;margin-top:-9px;width:14.4px;height:16.2px;' class='link-color button small' onclick='expandDetailsFromBtn(this.parentNode);'\>\<svg xmlns='http://www.w3.org/2000/svg' role='img' style='padding:0;width:14.4px;height:14.4px;' preserveAspectRatio='xMidYMid meet' viewBox='0 0 512 512'\>\<path d='M417.4 224H288V94.6c0-16.9-14.3-30.6-32-30.6s-32 13.7-32 30.6V224H94.6C77.7 224 64 238.3 64 256s13.7 32 30.6 32H224v129.4c0 16.9 14.3 30.6 32 30.6s32-13.7 32-30.6V288h129.4c16.9 0 30.6-14.3 30.6-32s-13.7-32-30.6-32z' fill='currentColor'\>\<\/path\>\<\/svg\>\<\/span\>\<\/div\>".trim();
let expandTemplate = document.createElement('template');
expandTemplate.innerHTML = expandElHtml;

function closeDetailsFromBtn(stickyDivEl) {
  const detailsEl = stickyDivEl.parentNode.parentNode;
  const summaryTop = detailsEl.firstElementChild.getBoundingClientRect().top;
  let scrollPosition = 0;

  if(summaryTop < 0){
    // TODO: improve this scroll position to look better on Firefox Focus iOS,
    // the hardcoded `32px` is just a quick (and very poor) workaround
    scrollPosition = summaryTop + window.pageYOffset - 32;
  }
  
  detailsEl.open = false;

  if (scrollPosition != 0){
    // el.firstElementChild.scrollIntoView({behavior: "auto"});
    window.scrollTo({
      top: scrollPosition,
      behavior: "instant"
    });
  }
}

function expandDetailsFromBtn(expandDivEl) {
  expandDivEl.previousElementSibling.open = true;
}

function stylizedPluses() {
  const signedSummaries = document.querySelectorAll("summary.signed-text, summary.signed-heading");
  
  signedSummaries.forEach(function(summaryEl){
    const detailsEl = summaryEl.parentElement;

    // details is closed, hide ::after pseudo element AND insert expand button
    if (!detailsEl.open) {
      // thanks to https://stackoverflow.com/questions/41215490/hide-pseudo-element-on-click
      document.documentElement.style.setProperty('--display-pseudo-el', 'none');
      detailsEl.insertAdjacentHTML("afterend", expandElHtml);
    }

    // add/remove expand button on toggle
    detailsEl.addEventListener("toggle", (event) => {
      let expandPresent = detailsEl.nextElementSibling.isEqualNode(expandTemplate.content.firstChild);

      // details is closing AND expand button is missing, insert it
      if (!detailsEl.open && !expandPresent) {
        detailsEl.insertAdjacentHTML("afterend", expandElHtml);
      }

      // details is closing AND expand button is present, remove it
      if (detailsEl.open && expandPresent) {
        detailsEl.nextElementSibling.remove();
      }
    });
  });
}

function stickyCrevrons() {
  const contentDetails = document.querySelectorAll("details.content-details, details.section-details");

  contentDetails.forEach(function(detailsEl){
    const divContainer = detailsEl.querySelector("div");

    // details is open, insert sticky chevrons right away
    if (detailsEl.open) {
      divContainer.insertAdjacentHTML("afterbegin", topElHtml);
      divContainer.insertAdjacentHTML("beforeend", bottomElHtml);
    }
    
    // add/remove sticky chevrons on toggle
    detailsEl.addEventListener("toggle", (event) => {
      let chevronsPresent = divContainer.lastChild.isEqualNode(bottomTemplate.content.firstChild) && divContainer.firstChild.isEqualNode(topTemplate.content.firstChild);

      // details is closing AND sticky chevrons are present, remove them
      if (!detailsEl.open && chevronsPresent) {
          divContainer.firstChild.remove();
          divContainer.lastChild.remove();
      }

      // details is opening AND sticky chevrons are missing, insert them
      if (detailsEl.open && !chevronsPresent) {
          divContainer.insertAdjacentHTML("afterbegin", topElHtml);
          divContainer.insertAdjacentHTML("beforeend", bottomElHtml);
      }        
    });
  });
}

if (window.matchMedia('(max-width: 640px)').matches){
  stylizedPluses();
  stickyCrevrons();
}