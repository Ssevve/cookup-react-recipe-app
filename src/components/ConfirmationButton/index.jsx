import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './confirmationButton.module.css';

export default function ConfirmationButton({
  text,
  confirmText,
  callback,
  className,
  bypassConfirmation,
}) {
  const [isConfirming, setIsConfirming] = useState(false);

  // eslint-disable-next-line consistent-return
  const handleClick = () => {
    if (bypassConfirmation) return callback();
    if (isConfirming) callback();
    else {
      setIsConfirming(true);
      setTimeout(() => {
        setIsConfirming(false);
      }, 2000);
    }
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={cx(styles.btn, className)}
    >
      {isConfirming ? confirmText : text}
    </button>
  );
}

ConfirmationButton.propTypes = {
  text: PropTypes.string.isRequired,
  confirmText: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  className: PropTypes.string,
  bypassConfirmation: PropTypes.bool,
};

ConfirmationButton.defaultProps = {
  className: '',
  bypassConfirmation: false,
};
