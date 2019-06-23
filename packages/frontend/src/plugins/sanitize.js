import sanitizeHTML from 'sanitize-html';

const sanitizeFont = (text) => {
  if (!text) return text;
  const start = { re: new RegExp('<font color="#789922">', 'g'), to: '<span class="quote">' };
  const end = { re: new RegExp('</font>', 'g'), to: '</span>' };
  return text.replace(start.re, start.to).replace(end.re, end.to);
};

const enableUrl = (text) => {
  if (!text) return text;
  return text.replace('/bin/jump.php?', '');
};

export default function sanitize(dirty) {
  return sanitizeHTML(enableUrl(sanitizeFont(dirty)), {
    allowedTags: [...sanitizeHTML.defaults.allowedTags, 'span'],
    allowedClasses: {
      '*': ['allowed']
    }
  });
}
