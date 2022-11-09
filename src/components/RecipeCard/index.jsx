/* eslint-disable max-len */
// /* eslint-disable no-underscore-dangle */
// import React from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

// import './style.css';

// import CardOptions from '../CardOptions';

// export default function RecipeCard({
//   setRecipes, recipe, showOptions, showAuthor,
// }) {
//   return (
//     <li>
//       <section className="card flex-column">
//         <Link to={`/recipe/${recipe._id}`}>
//           <section className="card__section">
//             <img className="card__image" src={recipe.imageUrl || '../../images/placeholder-recipe-image.jpg'} alt={recipe.title} />
//           </section>
//           <section className="card__section flex align-items-center justify-content-sb">
//             <h2 className="card__title">{recipe.title}</h2>
//             {showOptions && <CardOptions setRecipes={setRecipes} recipeId={recipe._id} />}
//           </section>
//           <p className="card__description">{recipe.description}</p>
//         </Link>
//         {showAuthor && (
//           <div className="card__author">
//             <img
//               className="author-avatar"
//               src={recipe.createdBy.avatar}
//               alt={`${recipe.createdBy.firstName} ${recipe.createdBy.lastName}`}
//             />
//             {`${recipe.createdBy.firstName} ${recipe.createdBy.lastName}`}
//           </div>
//         )}
//       </section>
//     </li>
//   );
// }

// RecipeCard.propTypes = {
//   setRecipes: PropTypes.func,
//   recipe: PropTypes.shape({
//     _id: PropTypes.string,
//     title: PropTypes.string,
//     description: PropTypes.string,
//     imageUrl: PropTypes.string,
//     createdBy: PropTypes.shape({
//       _id: PropTypes.string,
//       avatar: PropTypes.string,
//       firstName: PropTypes.string,
//       lastName: PropTypes.string,
//     }),
//   }).isRequired,
//   showOptions: PropTypes.bool,
//   showAuthor: PropTypes.bool,
// };

// RecipeCard.defaultProps = {
//   setRecipes: null,
//   showOptions: false,
//   showAuthor: false,
// };
