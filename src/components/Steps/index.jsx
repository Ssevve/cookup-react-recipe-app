import PropTypes from 'prop-types';

export default function Steps({ steps }) {
  return (
    <ol className="steps">
      {steps.map((step) => {
        return (
          <li>
            <p>{step.text}</p>
          </li>
        );
      })}
    </ol>
  );
}

Steps.propTypes = {
  steps: PropTypes.array.isRequired,
};
