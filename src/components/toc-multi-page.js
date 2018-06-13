/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '@mapbox/react-icon';
import TocDropdown from './toc-dropdown';

class TocMultiPage extends React.PureComponent {
  static propTypes = {
    sidebarContent: PropTypes.shape({
      firstLevelToc: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired
        })
      ).isRequired,
      seccondLevelToc: PropTypes.arrayOf(
        PropTypes.shape({
          level: PropTypes.number.isRequired,
          slug: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired
        })
      )
    })
  };

  render() {
    const { props } = this;
    const secondLevelContent =
      props.sidebarContent.secondLevelToc &&
      props.sidebarContent.secondLevelToc.map(secondLevelTocItem => {
        return (
          <li key={secondLevelTocItem.slug} className="mt6">
            <a
              href={`#${secondLevelTocItem.slug}`}
              className="color-blue-on-hover text-decoration-none unprose"
            >
              {secondLevelTocItem.text}
            </a>
          </li>
        );
      });
    const firstLevelContent = props.sidebarContent.firstLevelToc.map(
      (page, index) => {
        const title = page.title;
        let icon = null;
        const isActive = this.props.currentPath === page.path;
        const breakLineClasses = classnames('py3 ', {
          'border-t border--gray-light': index !== 0
        });
        const textClasses = classnames('pl12 py12 txt-bold txt-m flex-child', {
          'color-black pb3': isActive
        });
        const activeSectionClasses = classnames(
          'pl24-mm px0 block-mm none pr12',
          {
            'bg-lighten75': isActive
          }
        );
        if (!isActive) {
          icon = (
            <Icon
              name="chevron-down"
              className="flex-child flex-child--no-shrink icon color-gray h24 w24"
            />
          );
        }
        return (
          <div key={index} className={activeSectionClasses}>
            <div className={breakLineClasses}>
              <a
                href={page.path}
                className="color-blue-on-hover color-gray text-decoration-none unprose flex-parent flex-parent--space-between-main flex-parent--center-cross"
              >
                <div className={textClasses}>{title}</div>
                {icon}
              </a>
              {isActive && secondLevelContent ? (
                <div className="ml24 pt0">
                  <ul className="txt-m pb12 inline-block-mm none color-blue-on-hover-anchor unprose">
                    {secondLevelContent}
                  </ul>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        );
      }
    );
    return (
      <div>
        <div className="block-mm none">{firstLevelContent}</div>
        <div className="none-mm block bg-gray-faint shadow-darken10">
          <TocDropdown
            tocType="multi"
            dropdownOptions={this.props.sidebarContent.firstLevelToc}
            currentPath={this.props.currentPath}
          />
        </div>
      </div>
    );
  }
}

export { TocMultiPage };
