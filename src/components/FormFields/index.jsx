/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// /* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import cx from 'classnames';
// import PropTypes from 'prop-types';

import styles from './formFields.module.css';

import FormInputErrorMessage from '../FormInputErrorMessage';

export function Input({
  name, label, register, validationRules, errors, ...rest
}) {
  return (
    <div>
      <label className={styles.label} htmlFor={name}>
        {label}
        <input
          {...register(name, validationRules)}
          className={cx(styles.input, errors?.[name] && styles.error)}
          id={name}
          type="text"
          name={name}
          {...rest}
        />
      </label>
      <FormInputErrorMessage message={errors?.[name]?.message} />
    </div>
  );
}

// export function Select({
//   register, options, name, label, title, ...rest
// }) {
//   return (
//     <div className={styles.group}>
//       {label ? (
//         <label className={styles.label} htmlFor={name}>
//           {label}
//           <select value {...register(name)} className={styles.select} {...rest}>
//             <option disabled value>
//               -- Select one --
//             </option>
//             {options.map((value) => (
//               <option key={value} value={value}>
//                 {value}
//               </option>
//             ))}
//           </select>
//         </label>
//       ) : (
//         <select value title={title} {...register(name)} className={styles.select} {...rest}>
//           <option disabled value>
//             -- Select one --
//           </option>
//           {options.map((value) => (
//             <option key={value} value={value}>
//               {value}
//             </option>
//           ))}
//         </select>
//       )}
//     </div>
//   );
// }

// export function Textarea({
//   register, validationRules, name, label, error, ...rest
// }) {
//   return (
//     <div className={styles.group}>
//       <label className={styles.label} htmlFor={name}>
//         {label}
//         <textarea
//           {...register(name, validationRules)}
//           aria-invalid={error ? 'true' : 'false'}
//           className={styles.textArea}
//           id={name}
//           name={name}
//           {...rest}
//         />
//       </label>
//       {error && (
//         <span role="alert" className={styles.errorMessage}>
//           {error.message}
//         </span>
//       )}
//     </div>
//   );
// }

// Input.propTypes = {
//   register: PropTypes.func.isRequired,
//   name: PropTypes.string.isRequired,
//   validationRules: PropTypes.shape({}).isRequired,
//   error: PropTypes.shape({
//     message: PropTypes.string,
//   }),
//   label: PropTypes.string,
//   title: PropTypes.string,
// };

// Input.defaultProps = {
//   error: {},
//   label: undefined,
//   title: undefined,
// };

// Select.propTypes = {
//   register: PropTypes.func.isRequired,
//   name: PropTypes.string.isRequired,
//   options: PropTypes.arrayOf(PropTypes.string).isRequired,
//   label: PropTypes.string,
//   title: PropTypes.string,
// };

// Select.defaultProps = {
//   label: undefined,
//   title: undefined,
// };

// Textarea.propTypes = {
//   register: PropTypes.func.isRequired,
//   name: PropTypes.string.isRequired,
//   validationRules: PropTypes.shape({}).isRequired,
//   error: PropTypes.shape({
//     message: PropTypes.string,
//   }),
//   label: PropTypes.string.isRequired,
// };

// Textarea.defaultProps = {
//   error: {},
// };
