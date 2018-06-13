import React from 'react';
import PropTypes from 'prop-types';
import CodeSnippet from '@mapbox/react-code-snippet';
import { AppContext } from '../context.js';

export default class ToggleableCodeBlock extends React.Component {
  static propTypes = {
    codeSnippet: PropTypes.shape({
      java: PropTypes.shape({
        raw: PropTypes.string.isRequired,
        highlighted: PropTypes.string.isRequired
      }).isRequired,
      kotlin: PropTypes.shape({
        raw: PropTypes.string.isRequired,
        highlighted: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.unconnectedCodeBlock = this.unconnectedCodeBlock.bind(this);
    let prefLanguage = 'java';
    if (prefLanguage !== 'java' && prefLanguage !== 'kotlin') {
      prefLanguage = 'java';
    }
    this.state = {
      toggleValue: prefLanguage
    };
  }

  unconnectedCodeBlock = context => {
    let code = null;
    if (context.preferredLanguage === 'java') {
      code = this.props.codeSnippet.java;
    } else if (context.preferredLanguage === 'kotlin') {
      code = this.props.codeSnippet.kotlin;
    }
    return (
      <div className="unprose mb12">
        <CodeSnippet
          style={{ background: '#273d56' }}
          code={code.raw}
          highlightedCode={code.highlighted}
          maxHeight={480}
          onCopy={
            (/*value*/) => {
              /* console.log(value)*/
            }
          }
        />
      </div>
    );
  };

  render() {
    return (
      <AppContext.Consumer>{this.unconnectedCodeBlock}</AppContext.Consumer>
    );
  }
}
