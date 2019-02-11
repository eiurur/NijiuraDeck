# セレクタ

https://ja.wikipedia.org/wiki/%E6%97%A5%E6%9C%AC%E7%99%BE%E5%90%8D%E5%B1%B1

# 100

```js
Array.from($('table.sortable.jquery-tablesorter > tbody > tr')).map(tr => {
  return {
    name: $(tr)
      .find('td:eq(1)')
      .text(),
    ruby: $(tr)
      .find('td:eq(2)')
      .text(),
    elevation: $(tr)
      .find('td:eq(3)')
      .text()
      .replace(/(,|m)/g, ''),
    preferences: $(tr)
      .find('td:eq(5)')
      .text(),
    geo: $(tr)
      .find('td:eq(3) > div:eq(1) a')
      .attr('href'),
    googlemap_url: $(tr)
      .find('td:eq(3) > div:eq(1) a')
      .attr('href'),
    wiki_url:
      location.origin +
      $(tr)
        .find('td:eq(1) a')
        .attr('href'),
  };
});
```

# new 100

https://ja.wikipedia.org/wiki/%E6%96%B0%E6%97%A5%E6%9C%AC%E7%99%BE%E5%90%8D%E5%B1%B1

```js
Array.from($('table.wikitable > tbody > tr')).map(tr => {
  return {
    name: $(tr)
      .find('td:eq(2) > div:eq(1)')
      .text(),
    ruby: $(tr)
      .find('td:eq(2) > div:eq(0)')
      .text(),
    elevation: $(tr)
      .find('td:eq(4)')
      .text()
      .replace(/(,|m)/g, ''),
    preferences: $(tr)
      .find('td:eq(3)')
      .text(),
    geo: $(tr)
      .find('td:eq(5) > a:eq(1)')
      .attr('href'),
    googlemap_url: $(tr)
      .find('td:eq(5) > a:eq(1)')
      .attr('href'),
    wiki_url:
      location.origin +
      $(tr)
        .find('td:eq(2) > div:eq(1) a')
        .attr('href'),
  };
});
```

# 200, 300

https://ja.wikipedia.org/wiki/%E6%97%A5%E6%9C%AC%E4%BA%8C%E7%99%BE%E5%90%8D%E5%B1%B1

https://ja.wikipedia.org/wiki/%E6%97%A5%E6%9C%AC%E4%B8%89%E7%99%BE%E5%90%8D%E5%B1%B1

```js
Array.from($('table.wikitable > tbody > tr')).map(tr => {
  return {
    name: $(tr)
      .find('td:eq(0) > div:eq(0)')
      .text(),
    ruby: $(tr)
      .find('td:eq(0) > div:eq(1)')
      .text(),
    elevation: $(tr)
      .find('td:eq(1)')
      .text()
      .replace(/(,|m)/g, ''),
    preferences: $(tr)
      .find('td:eq(2)')
      .text(),
    geo: $(tr)
      .find('td:eq(3) > div:eq(1) a')
      .attr('href'),
    googlemap_url: $(tr)
      .find('td:eq(3) > div:eq(1) a')
      .attr('href'),
    wiki_url:
      location.origin +
      $(tr)
        .find('td:eq(0) > div:eq(0) a')
        .attr('href'),
  };
});
```
