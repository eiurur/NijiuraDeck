import sanitizeHTML from 'sanitize-html';

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
      '<a href="https?://(?:\\w+).2chan.net/(?:\\w+)/res/(\\d+).htm" target="_blank">',
      'g',
    ),
    to: '<span class="next-thread-link" data-id="$1">',
  };
  const end = { re: new RegExp('</a>', 'g'), to: '</span>' };
  if (!start.re.exec(text)) return text;
  return text.replace(start.re, start.to).replace(end.re, end.to);
};

const enableUrl = (text) => {
  if (!text) return text;
  const reg = new RegExp('/bin/jump.php?', 'g');
  return text.replace(reg, '');
};

export default function sanitize(dirty) {
  return sanitizeHTML(enableNextThreadLink(enableUrl(sanitizeFont(dirty))), {
    allowedTags: [...sanitizeHTML.defaults.allowedTags, 'span'],
    allowedAttributes: {
      span: ['href', 'data-*'],
      a: ['href', 'class', 'target'],
    },
    allowedClasses: {
      '*': ['allowed'],
    },
  });
}
