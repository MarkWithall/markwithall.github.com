---
layout: default
title: NaNoWriMo
permalink: /nano/
---
{% for post in site.categories.nano %}
    {% capture currentyear %}{{post.date | date: "%Y"}}{% endcapture %}
        {% if currentyear != year %}
## {{ currentyear }}
            {% capture year %}{{currentyear}}{% endcapture %}
        {% endif %}
* [{{post.title}}]({{post.url}})
{% endfor %}

