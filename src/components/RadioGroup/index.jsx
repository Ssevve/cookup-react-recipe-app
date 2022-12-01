/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';

export default function RadioGroup({ children, groupName, register }) {
  return (
    <>
      {React.Children.map(children, (child) => (
        React.cloneElement(child, { register, name: groupName })
      ))}
    </>
  );
}
