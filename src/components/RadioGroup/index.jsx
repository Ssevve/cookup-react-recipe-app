/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

export default function RadioGroup({ children, groupName, register }) {
  return (
    <>
      {React.Children.map(children, (child) => (
        React.cloneElement(child, { register, name: groupName })
      ))}
    </>
  );
}

RadioGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  groupName: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
};
