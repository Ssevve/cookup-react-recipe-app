import PropTypes from 'prop-types';

export default function InstructionList({ instructions }) {
  return (
    <ol className="instructions">
      {instructions.map((instruction) => {
        return (
          <li key={instruction._id}>
            <p>{instruction.text}</p>
          </li>
        );
      })}
    </ol>
  );
}

InstructionList.propTypes = {
  instructions: PropTypes.array.isRequired,
};
