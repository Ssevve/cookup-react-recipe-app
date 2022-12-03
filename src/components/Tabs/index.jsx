import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './tabs.module.css';

export default function Tabs({
  activeTab, setActiveTab, options, loggedInUser, profileUser,
}) {
  return (
    <div className={styles.tabButtons}>
      {/* eslint-disable-next-line array-callback-return */}
      {options.map((option) => (
        <button
          key={option.option}
          onClick={() => setActiveTab(option.option)}
          className={cx(styles.tab, activeTab === option.option && styles.activeTab)}
          type="button"
        >
          {/* eslint-disable-next-line no-underscore-dangle */}
          {loggedInUser?.id?.toString() === profileUser._id.toString()
            ? <span>{option.sameUserText}</span> : <span>{option.differentUserText}</span>}
        </button>
      ))}
    </div>
  );
}

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    option: PropTypes.string.isRequired,
    sameUserText: PropTypes.string.isRequired,
    differentUserText: PropTypes.string.isRequired,
  })).isRequired,
  loggedInUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  profileUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
  }).isRequired,
};

Tabs.defaultProps = {
  loggedInUser: null,
};
