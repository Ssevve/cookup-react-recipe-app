import { Link } from 'react-router-dom';
import './style.css';

export default function Landing() {
  return (
    <main className="hero">
      <div className="container flex justify-content-sb h-full align-items-center">
        <section className="hero__body">
          <h1 className="hero__title">
            Cookup. 
            <span className="highlighted-text d-block">Whatever</span>
            you want.
          </h1>
          <p className="hero__copy">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore asperiores adipisci minima quo nulla sequi quas eos deleniti consectetur dolor?</p>
          <Link to="/recipes" className="btn btn--cta">Browse Recipes</Link>
        </section>
        <section className="hero__image"></section>
      </div>
    </main>
  );
}
