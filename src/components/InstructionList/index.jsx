import PropTypes from 'prop-types';

import './style.css';

export default function InstructionList({ instructions }) {  
  return (
    <ol className="instructions">
      {instructions.map((instruction) => {
        return (
          <li className="instruction" key={instruction._id}>    
              <label className="instruction__label flex align-items-center" htmlFor={instruction._id}>
                <input className="instruction__checkbox" id={instruction._id} type="checkbox" />
                {instruction.title}
              </label>
            <p className="instruction__text">{instruction.text}</p>
          </li>
        );
      })}
    </ol>
  );
}

InstructionList.propTypes = {
  instructions: PropTypes.array.isRequired,
};
