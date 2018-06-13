import hljs from 'highlight.js';

function highlightCodeSnippet(rawCode) {
  return hljs.highlightAuto(rawCode).value;
}

export { highlightCodeSnippet };
