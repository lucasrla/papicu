var charts = [];

/* Set up log ticks */
function logTicksFn(tick) {
  const log10Tick = Chart.helpers.math.log10(tick);
  const r = tick / Math.pow(10, Math.floor(log10Tick));
  const roundedR = Math.round(r);
  /* console.log("log10Tick", log10Tick, "tick", tick, "r", r, "roundedR", roundedR); */
  if(roundedR === 1 || roundedR === 2 || roundedR === 5) {
    return Number.parseFloat(tick).toPrecision(1).toString();
  }
  return '';
}

/* Set up tooltips */
function tooltipLabelFn(tooltipItem, data) {
  let label = data.datasets[tooltipItem.datasetIndex].label || '';

  /* Remove substring between ( ) */
  label = label.replace(/\(.*\)/, '').trim();

  if (label) {
    /* label += ' — '; */
    /* label += ' · '; */
    label += ':  ';
  }

  label += tooltipItem.value; /* + " at " + tooltipItem.label + " y.o."; */
  return label;
}

function tooltipLabelPercentFn(tooltipItem, data) {
  let label = data.datasets[tooltipItem.datasetIndex].label || '';

  /* Remove fitted functions from tooltips */
  if(label.indexOf("Fit") > 0) return;

  label = label.replace(/\(.*\)/, '').trim();
  if (label) label += ':  ';
  label += parseFloat(tooltipItem.value * 100).toPrecision(2) + "%";
  return label;
}

/* https://github.com/chartjs/Chart.js/issues/7839#issuecomment-702734116 */
function tooltipTitleFn(tooltipItem, data) {
  /* console.log(tooltipItem) */
  /* Label is a string with y value, but this does not work */
  /* return tooltipItem.label; */

  let dataSet = tooltipItem[0].datasetIndex;
  let index = tooltipItem[0].index;
  let title = "At age " + data.datasets[dataSet].data[index].x + " y.o.";
  return title;
}

/* Set up the look and feel of datasets */
function createDatasets(data, pointSizing) {
  let parsedDatasets = data.slice(0).reduce((acc, obj) => {
    let dataset = {};
    /* https://www.chartjs.org/docs/latest/charts/line.html#dataset-properties
    The scatter supports the same properties as the line chart */

    /* console.log("obj", obj) */

    dataset["label"] = obj["label"];
    dataset["data"] = obj["data"];

    /* Colors and transparency */
    let color = obj["color"];

    if (obj["alpha"]){
      /* Helper to add transparency (alpha channel) to existing colors */
      color = Chart.helpers.color(color).alpha(obj["alpha"]).rgbString();
    }

    dataset["borderColor"] = color;
    dataset["pointBackgroundColor"] = color;
    dataset["pointBorderColor"] = color;
    dataset["backgroundColor"] = color;

    /* Extra radius added to point radius for hit detection */
    dataset["pointHitRadius"] = 0;

    dataset["pointBorderWidth"] = 0;
    dataset["pointHoverBorderWidth"] = 0;

    /* Line sizing */
    /* https://www.chartjs.org/docs/latest/configuration/elements.html */
    if (obj["type"] == "line") {
      dataset["fill"] = false;
      dataset["showLine"] = true;
      dataset["borderWidth"] = 2;
      dataset["pointRadius"] = 0;
      dataset["pointHoverRadius"] = 0;
    
    /* Point sizing */
    /* https://www.chartjs.org/docs/latest/configuration/elements.html */
    } else if (pointSizing == "smallPoints"){
      dataset["borderWidth"] = 0;
      dataset["pointRadius"] = 1;
      dataset["pointHoverRadius"] = 1;

    } else if (pointSizing == "mediumPoints"){
      dataset["borderWidth"] = 0;
      dataset["pointRadius"] = 2;
      dataset["pointHoverRadius"] = 2;

    } else {
      dataset["borderWidth"] = 0;
      dataset["pointRadius"] = 4;
      dataset["pointHoverRadius"] = 4;
    }
    
    acc.push(dataset);
    return acc;
  }, []);

  return {"datasets": parsedDatasets};
}

function insertWarningIfNeeded(selector, insertTargetSelector, html, width, position){
  if(typeof position === "undefined") {
    /* https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML */
    position = "afterend";
  }

  html = html.trim(); /* never return a text node of whitespace */

  document.querySelectorAll(selector).forEach((e) => { 
    /* https://stackoverflow.com/questions/294250/how-do-i-retrieve-an-html-elements-actual-width-and-height */

    /* insert if element is wider than desired */
    if(e.getBoundingClientRect().width > width) {

      /* https://stackoverflow.com/questions/21422337/append-element-as-sibling-after-element */
      /* https://stackoverflow.com/questions/14234560/javascript-how-to-get-parent-element-by-selector */
      e.closest(insertTargetSelector).insertAdjacentHTML(position, html);
    }
  });
};

function createChart(canvasId, data, chartType, axes, title, ttLabelFn) {

  let context = document.getElementById(canvasId).getContext('2d');

  /* Workarounds to enhance responsiveness on mobile phones
  Inspired by:
  - https://stackoverflow.com/questions/44540746/how-i-can-prevent-of-labels-overlapping-on-mobile-screen-chart-js
  - https://stackoverflow.com/questions/47791250/chartjs-hide-labels-on-small-screen-sizes/ */

  /* TODO: maybe register this as a global plugin? 
  - https://www.chartjs.org/docs/latest/developers/plugins.html#global-plugins */
  let isSmallScreen;

  function screenSizeAdjs(c) {
    /* TODO: review:
    - https://www.chartjs.org/docs/2.9.4/general/responsive.html 
    via https://github.com/chartjs/Chart.js/pull/5756
    */

    /* https://stackoverflow.com/questions/1248081/how-to-get-the-browser-viewport-dimensions */
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

    /* insert warning in narrow viewports (<= 450 px wide) */
    if(vw <= 450) {
      let html = "\<p class='small' style='margin-bottom:-2em;color:var(--muted);'>\<svg xmlns='http://www.w3.org/2000/svg' role='img' class='inline-icon' width='1em' height='1em' preserveAspectRatio='xMidYMid meet' viewBox='0 0 512 512'>\<path fill='currentColor' d='M449.07 399.08L278.64 82.58c-12.08-22.44-44.26-22.44-56.35 0L51.87 399.08A32 32 0 0 0 80 446.25h340.89a32 32 0 0 0 28.18-47.17Zm-198.6-1.83a20 20 0 1 1 20-20a20 20 0 0 1-20 20Zm21.72-201.15l-5.74 122a16 16 0 0 1-32 0l-5.74-121.95a21.73 21.73 0 0 1 21.5-22.69h.21a21.74 21.74 0 0 1 21.73 22.7Z'>\</path>\</svg> This chart works better on a wider screen. Try rotating your device\</p>";

      const cSelector = '#' + c.canvas.id;

      const prevChartsSibling = document.querySelectorAll(cSelector)[0].closest('.charts').previousElementSibling;

      /* https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro */
      let htmlTemplate = document.createElement('template');
      htmlTemplate.innerHTML = html;
      
      /* checking if we haven't already appended the warning */
      if(!prevChartsSibling.isEqualNode(htmlTemplate.content.firstChild)) {
        /* this function is definded inside the `_inits.js` file */
        insertWarningIfNeeded(cSelector, '.charts', html, 0, 'beforebegin');
      }
  
    }

    /* using the chart element's height to scale things */
    const chartHeight = c.chart.height;

    const smallAdj = Math.max(chartHeight * 2.7 / 100, 10);
    const largeAdj = Math.max(chartHeight * 3.6 / 100, 12);

    c.scales["y-axis-1"].options.ticks.fontSize = smallAdj;
    c.scales["y-axis-1"].options.scaleLabel.fontSize = smallAdj;

    c.scales["x-axis-1"].options.ticks.fontSize = smallAdj;
    c.scales["x-axis-1"].options.scaleLabel.fontSize = smallAdj;
    c.scales["x-axis-1"].options.scaleLabel.padding.top = 0;
    /* Math.max (chartHeight * 1 / 100, 2); */

    /* console.log(c) */
    isSmallScreen = (chartHeight < 300) ? true : false;
    c.legend.options.display = !isSmallScreen;

    c.legend.options.labels.fontSize = smallAdj;
    c.legend.options.labels.boxWidth = Math.max(chartHeight * 5 / 100, 16);
    c.legend.options.labels.padding = Math.max(chartHeight * 2 / 100, 4);

    c.titleBlock.options.fontSize = largeAdj;
    c.titleBlock.options.padding = Math.max(chartHeight * 2.5 / 100, 10);
  };

  /* dirty hack! */
  let borderColorRGB;

  /* overwrite Chart defaults with my own CSS */
  /* https://github.com/chartjs/Chart.js/issues/5353 */
  /* https://www.chartjs.org/docs/latest/general/fonts.html */
  function overwriteChartjsGlobalDefaults() {
    const bodyStyle = window.getComputedStyle(document.body);
    
    /* default font */
    if(Chart.defaults.global.defaultFontFamily != bodyStyle.fontFamily){
      Chart.defaults.global.defaultFontFamily = bodyStyle.fontFamily;
    }

    /* default colors */
    const txtColorHex = bodyStyle.getPropertyValue("--txt").trim();
    const txtColorRGB = Chart.helpers.color(txtColorHex).rgbString();
    Chart.defaults.global.defaultFontColor = txtColorRGB;

    const mutedTxtColorHex = bodyStyle.getPropertyValue("--muted").trim();
    const mutedTxtColorRGB = Chart.helpers.color(mutedTxtColorHex).rgbString();
    Chart.defaults.global.defaultColor = mutedTxtColorRGB;
    
    const borderColorHex = bodyStyle.getPropertyValue("--ui-border").trim();
    /* dirty hack! */
    borderColorRGB = Chart.helpers.color(borderColorHex).rgbString();
  }

  overwriteChartjsGlobalDefaults();

  let config = {
    type: chartType,
    data: data,
    plugins: [{
      beforeUpdate: screenSizeAdjs,
    }],
    options: {
      plugins: {
        /* https://nagix.github.io/chartjs-plugin-colorschemes/colorchart.html */
        colorschemes: {
          scheme: 'tableau.ColorBlind10',
          fillAlpha: 1.0,
        },
        /* https://github.com/abelheinsbroek/chartjs-plugin-crosshair */
        crosshair: {
          line: {
            color: borderColorRGB,
          },
          sync: {
            enabled: false,
          }
        },
      },
      /* https://www.chartjs.org/docs/latest/general/performance.html#disable-animations */
      animation: {
        duration: 0 /* general animation time */
      },
      hover: {
        animationDuration: 0 /* duration of animations when hovering an item */
      },
      responsiveAnimationDuration: 0,
      tooltips: {
        /* https://www.chartjs.org/samples/latest/tooltips/interactions.html */
        /* mode: 'nearest', */
        mode: 'x',
        intersect: false,
        callbacks: {},
        xPadding: 10,
        yPadding: 10,
      },
      aspectRatio: 1.33,
      title: {
        display: true,
        text: title,
        fontStyle: 'normal',
      },
      legend: {
        position: 'bottom',
        /* display: !isSmallScreen, */
      },
      scales: {
        yAxes: [{
          type: axes.y.scale,
          position: 'left',
          gridLines: {
            color: borderColorRGB,
            zeroLineColor: borderColorRGB,
            zeroLineWidth: 2,
            drawBorder: false,
          },
          ticks: {
            /* max: 0.1, */
          },
          scaleLabel: {
            labelString: axes.y.label,
            display: true,
          }
        }],
        xAxes: [{
          type: axes.x.scale,
          position: 'bottom',
          gridLines: {
            color: borderColorRGB,
            zeroLineColor: borderColorRGB,
            zeroLineWidth: 2,
            drawBorder: false,
          },
          ticks: {
            min: 0,
            /* max: 120, */
          },
          scaleLabel: {
            labelString: axes.x.label,
            display: true
          }
        }]
      }
    }
  };

  /* Callbacks */

  /* https://github.com/chartjs/Chart.js/blob/171a7e3a7a23b1d4a9d37ed2b2495698969b79d5/src/core/core.tooltip.js#L626
  Sort tooltip labels in descending order (by value) */
  config.options.tooltips.itemSort = function(a, b){ 
    return (b.value - a.value);
  };

  if (ttLabelFn) {
    config.options.tooltips.callbacks.label = ttLabelFn;
  }

  if (config.options.tooltips.mode == 'x') {
    config.options.tooltips.callbacks.title = tooltipTitleFn;
  }

  if (axes.x.ticksCallback) {
    config.options.scales.xAxes[0].ticks.callback = axes.x.ticksCallback;
  }
  if (axes.y.ticksCallback) {
    config.options.scales.yAxes[0].ticks.callback = axes.y.ticksCallback;
  }

  /* https://stackoverflow.com/questions/63565630/update-all-chart-js-instances-in-order-to-apply-changed-defaults */
  /* https://www.chartjs.org/docs/latest/developers/api.html?h=update */
  /* https://www.chartjs.org/docs/latest/developers/updates.html */
  /* charts.forEach(chart => {
    chart.update();
  }); */

  const chart = new Chart(context, config);
  charts.push(chart);
}


/* --- Workaround for Firefox only ---
Render charts correctly inside <details> elements that start out closed */
/* https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent/Firefox */
if(navigator.userAgent.match(/firefox|fxios|focus/i) && document.querySelectorAll("details canvas").length > 0){
  document.querySelectorAll("details").forEach(function (detailsEl) { 
    /* iterating over any <canvas>es inside this <details> */
    const canvases = detailsEl.querySelectorAll("canvas");
    if (canvases.length > 0) {
      detailsEl.addEventListener("toggle", (event) => {
        if (detailsEl.open) { /* <details> is now open */
          canvases.forEach(function (canvasEl) {
            charts.find(chart => chart.canvas.id == canvasEl.id).resize();
          });
        }
      });
    }
  });
}