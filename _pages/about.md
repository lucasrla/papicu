---
layout: page
title: About
permalink: /about
description: "Who am I? Find it out here"
lightbox: true
---

I am John Doe. This is the About page of my website.

Contact me with via email:

{::nomarkdown}
<p>
  <div class="flex-wrapper padded">
    <a href="mailto:{{ site.email }}" class="link-button dont-shrink wrapped-item">{%- include svg.html icon="write" -%} Write to {{ site.email }}</a>&nbsp;
    <button id="copy-button" class="dont-shrink wrapped-item" onclick="copyToClipboard('{{ site.email }}');"><span id="text-to-copy">{%- include svg.html icon="copy" -%} Copy {{ site.email }} address</span><span id="text-copied" class="hidden">{%- include svg.html icon="checkmark" -%} Email address copied</span></button>
  </div>
</p>

<script>
  function copyToClipboard(text){
    navigator.clipboard.writeText(text);
    document.getElementById('copy-button').disabled = true;
    document.getElementById('text-to-copy').classList.add("hidden");
    document.getElementById('text-copied').classList.remove("hidden");
  }
</script>
{:/}

Or find me on Twitter:

{::nomarkdown}
<p class="padded">
  <a href="https://twitter.com/{{ site.twitter.username }}" target="_blank" rel="noopener" class="link-button">
    {% include svg.html icon="twitter" %} @{{ site.twitter.username }}
  </a>
</p>
{:/}

{% include divider.html %}

Since you are here, let me show you two screenshots of the home page:

<a class="lightbox" href="/assets/img/safari-shot-homepage-light.png" data-group="homepage">
  <img alt="Home Page (light mode)" src="/assets/img/safari-shot-homepage-light.png" class="center-block responsive" />
</a>

<a class="lightbox" href="/assets/img/safari-shot-homepage-dark.png" data-group="homepage">
  <img alt="Home Page (dark mode)" src="/assets/img/safari-shot-homepage-dark.png" class="center-block responsive" />
</a>