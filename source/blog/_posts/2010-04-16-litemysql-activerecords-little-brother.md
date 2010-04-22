---
layout: post
title: "LiteMySQL: ActiveRecord's Little Brother"
categories: [technology, database, php]
---

Ever needed a quick and lightweight MySQL library for PHP? Pulling out a full ORM is just overkill, but writing the PHP code needed to connect to the server, run a query, and process the results is a lot of hassle? I thought so. I've been there too.

So what if you could do something like this:

{% highlight php %}
<?php
$sql = new litemysql('host', 'username', 'password', 'testdb', 'books');
$books = $sql->find_all(array("author" => "John Twelve Hawks"));
?>
{% endhighlight %}

The above code would require about 8-10 lines of PHP code if you went barebones. I'm not gonna show a barebones example, cause frankly I'm even now too lazy to write such code.