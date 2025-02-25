---
title: Portfolio
layout: default.njk
---
Projects

<ul>
  {%- for post in collections.portfolio %}
    <li>
      <h2>
        <a href="{{ post.url }}">
        {{ post.data.title }}
        </a>
    </h2>

      <p>
        {{ post.data.description }}
        </p>

      <p>{{ post.content | timeToRead }}</p>
    </li>
  {%- endfor %}
</ul>