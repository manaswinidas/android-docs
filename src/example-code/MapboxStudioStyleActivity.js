import { highlightCodeSnippet } from '../util/highlight-code-snippet';

function MakeCodeSnippetJava() {
  const rawJavaCode = require('raw-loader!./java/mapbox-studio-style-activity--full-java.java');
  return {
    raw: rawJavaCode,
    highlighted: highlightCodeSnippet(rawJavaCode)
  };
}

function MakeCodeSnippetKotlin() {
  const rawKotlinCode = '// Not available';
  return {
    raw: rawKotlinCode,
    highlighted: highlightCodeSnippet(rawKotlinCode)
  };
}

const MapboxStudioStyleActivity = {
  java: MakeCodeSnippetJava(),
  kotlin: MakeCodeSnippetKotlin()
};

export { MapboxStudioStyleActivity };
