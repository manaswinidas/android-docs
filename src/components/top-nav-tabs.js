import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '@mapbox/react-icon';

class TopNavTabs extends React.PureComponent {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    options: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      expand: false
    };
    this.toggleExpandedMenu = this.toggleExpandedMenu.bind(this);
  }

  toggleExpandedMenu(e) {
    e.preventDefault();
    this.setState(prevState => ({
      expand: !prevState.expand
    }));
  }

  render() {
    const allTabs = this.props.options.map(option => {
      return {
        name: option.name,
        id: option.id,
        url: option.url
      };
    });

    // For narrow screens
    const activeDotStyle = {
      content: '',
      width: '6px',
      height: '6px',
      borderRadius: '3px',
      background: '#4264fb',
      position: 'absolute',
      margin: '10px 0 0 0'
    };

    let hiddenTabs = allTabs.slice(2, allTabs.length);
    let dropdownContent = hiddenTabs.map(tab => {
      const dotClasses = classnames({
        'inline-block': tab.id === this.props.activeTab,
        none: tab.id !== this.props.activeTab
      });
      const textClasses = classnames('px6 mx6 block align-l pb12 ', {
        'txt-bold': tab.id === this.props.activeTab,
        'txt-normal': tab.id !== this.props.activeTab
      });
      return (
        <div key={tab.id}>
          <div style={activeDotStyle} className={dotClasses} />
          <a href={tab.url} className={textClasses}>
            {tab.name}
          </a>
        </div>
      );
    });

    const tabs = allTabs.map((tab, index) => {
      let activeClasses = '';
      if (tab.id === this.props.activeTab) {
        activeClasses = 'border-b border-b--2 border--blue txt-bold';
      }
      const hiddenTabsClasses = classnames({
        'inline-block-mm none': index > 1,
        'inline-block': index < 2
      });
      return (
        <a
          key={tab.id}
          href={tab.url}
          className={`px6 mx12 fl-mm align-center-mm align-l pb12 ${activeClasses} ${hiddenTabsClasses}`}
        >
          {tab.name}
        </a>
      );
    });

    const dropdownClasses = classnames(
      'absolute right mt36 mr12 bg-white px12 py12 w180 shadow-darken10 ',
      {
        'block none-mm': this.state.expand === true,
        none: this.state.expand === false
      }
    );

    const moreTabClasses = classnames(
      'px6 mx12 fl-mm inline-block align-center-mm align-l pb12 cursor-pointer none-mm inline-block'
    );

    return (
      <div className="z2">
        <div className="inline fl txt-m bleed-r-mm unbleed">
          {tabs}
          <div className={moreTabClasses} onClick={this.toggleExpandedMenu}>
            More
            <Icon
              name="plus"
              inline={true}
              className="icon mb-neg6 ml6 h20 w20 inline"
            />
          </div>
        </div>
        <div className={dropdownClasses}>{dropdownContent}</div>
      </div>
    );
  }
}

export { TopNavTabs };
