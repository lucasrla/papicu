---
layout: page
title: About
permalink: /about
description: Who am I?
---

I am John Doe. 

My email address is {{ site.email }}:

<p class="padded small">
  <a href="mailto:{{ site.email }}?subject=Contact via Blog" class="button dont-shrink">
    {%- include svg.html icon="write" params="aria-hidden='true'" -%}&nbsp;Write to me
  </a>
</p>

{% comment %}
<p class="flex-wrapper padded small">
  <a href="mailto:{{ site.email }}?subject=Contact via Blog" class="button dont-shrink">{%- include svg.html icon="write" -%} Write to {{ site.email }}</a>&nbsp;
  <button id="copy-button" class="dont-shrink" onclick="copyToClipboard('{{ site.email }}');"><span id="text-to-copy">{%- include svg.html icon="copy" -%} Copy {{ site.email }} address</span><span id="text-copied" class="hidden">{%- include svg.html icon="checkmark" -%} Email address copied</span></button>
</p>

<script>
  function copyToClipboard(text){
    navigator.clipboard.writeText(text);
    document.getElementById('copy-button').disabled = true;
    document.getElementById('text-to-copy').classList.add("hidden");
    document.getElementById('text-copied').classList.remove("hidden");
  }
</script>
{% endcomment %}

Find me on Twitter:

<p class="padded small">
  <a href="https://twitter.com/{{ site.twitter.username }}" target="_blank" rel="noopener" class="button">
    {%- include svg.html icon="twitter" params="aria-hidden='true'" -%}&nbsp;@{{ site.twitter.username }}
  </a>
</p>

Read my new posts via Atom / RSS:

<p class="padded small">
  <a href="/feed.xml" class="button">
    {%- include svg.html icon="rss" params="aria-hidden='true'" -%}&nbsp;Subscribe to our feed
  </a>
</p>