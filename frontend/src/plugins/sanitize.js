// import sanitizeHTML from 'sanitize-html';

const sanitizeFont = (text) => {
  if (!text) return text;
  const start = {
    re: new RegExp('<font color="#789922">', 'g'),
    to: '<span class="quote">',
  };
  const end = { re: new RegExp('</font>', 'g'), to: '</span>' };
  return text.replace(start.re, start.to).replace(end.re, end.to);
};

const enableNextThreadLink = (text) => {
  if (!text) return text;
  const start = {
    re: new RegExp(
      '<a href="https?://(\\w+).2chan.net/(?:\\w+)/res/(\\d+).htm" target="_blank" rel="noreferrer">',
      'g'
    ),
    to: '<span class="next-thread-link" data-board-type="$1" data-id="$2">',
  };
  const end = { re: new RegExp('</a>', 'g'), to: '</span>' };
  if (!start.re.exec(text)) return text;
  return text.replace(start.re, start.to).replace(end.re, end.to);
};

const enableUrl = (text) => {
  if (!text) return text;
  const regJump = new RegExp('/bin/jump.php\\?', 'g');
  const regRel = new RegExp('target="_blank">', 'g'); // FIXME: 厳しい
  return text
    .replace(regJump, '')
    .replace(regRel, 'target="_blank" rel="noreferrer">');
};

const enableImageUrl = (text) => {
  if (!text) return text;
  const start = {
    re: new RegExp('(?:(?!fu)|(?!f))(\\d+.(?:jpe?g|png|webp)+)', 'g'),
    to: '<span data-tooltip="https://may.2chan.net/b/src/$1"><a href="https://may.2chan.net/b/src/$1" target="blank">$1</a></span>',
  };
  if (!start.re.exec(text)) return text;
  return text.replace(start.re, start.to);
};

const enableUpImageUrl = (text) => {
  if (!text) return text;
  const start = {
    re: new RegExp('(f\\d+.(?:jpe?g|png|webp|mp4)+)', 'g'),
    to: '<span data-tooltip="http://dec.2chan.net/up/src/$1"><a href="http://dec.2chan.net/up/src/$1" target="blank">$1</a></span>',
  };
  if (!start.re.exec(text)) return text;
  return text.replace(start.re, start.to);
};

const enableUp2ImageUrl = (text) => {
  if (!text) return text;
  const start = {
    re: new RegExp('(fu\\d+.(?:jpe?g|png|webp|mp4))', 'g'),
    to: '<span data-tooltip="http://dec.2chan.net/up2/src/$1"><a href="http://dec.2chan.net/up2/src/$1" target="blank">$1</a></span>',
  };
  if (!start.re.exec(text)) return text;
  return text.replace(start.re, start.to);
};

export default function sanitize(dirty) {
  return enableNextThreadLink(
    enableUp2ImageUrl(
      enableUpImageUrl(enableImageUrl(enableUrl(sanitizeFont(dirty))))
    )
  );
  // FIXME: sanitzeHTMLを通すとquoteクラスが飛ぶ
  // return sanitizeHTML(enableNextThreadLink(enableUrl(sanitizeFont(dirty))), {
  //   allowedTags: [...sanitizeHTML.defaults.allowedTags, 'span'],
  //   allowedAttributes: {
  //     span: ['href', 'data-*'],
  //     a: ['href', 'class', 'target'],
  //   },
  //   allowedClasses: {
  //     '*': ['allowed'],
  //   },
  // });
}
