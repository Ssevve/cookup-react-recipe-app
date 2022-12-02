/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
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
          key={option}
          onClick={() => { setActiveTab(option); console.log(activeTab); }}
          className={cx(styles.tab, activeTab === option && styles.activeTab)}
          type="button"
        >
          {/* eslint-disable-next-line no-underscore-dangle */}
          {loggedInUser?.id?.toString() === profileUser._id.toString() ? <span>Your recipes</span> : <span>{`${profileUser.firstName}'s recipes`}</span>}
        </button>
      ))}
    </div>
  );
}
