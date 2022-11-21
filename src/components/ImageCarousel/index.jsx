/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import cx from 'classnames';

import styles from './imageCarousel.module.css';

export default function ImageCarousel({ images, recipeName }) {
  const maxScrollWidth = useRef(0);
  const carousel = useRef(null);
  const [currentScrollIndex, setCurrentScrollIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const movePrev = () => {
    if (currentScrollIndex > 0) setCurrentScrollIndex((prevState) => prevState - 1);
  };

  const moveNext = () => {
    if (carousel.current !== null) {
      setCurrentScrollIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === 'prev') return currentScrollIndex <= 0;

    if (direction === 'next' && carousel.current !== null) {
      return carousel.current.offsetWidth * currentScrollIndex >= maxScrollWidth.current;
    }

    return false;
  };

  function calcNewMaxScrollWidth() {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }

  useEffect(() => {
    if (carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentScrollIndex;
    }
  }, [currentScrollIndex, maxScrollWidth]);

  useEffect(() => {
    calcNewMaxScrollWidth();
    const carouselObserver = new ResizeObserver(calcNewMaxScrollWidth);
    carouselObserver.observe(carousel.current);

    return () => {
      carouselObserver.disconnect();
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.activeImageContainer}>
        <img className={styles.activeImage} src={images[activeImageIndex].url} alt={recipeName} />
      </div>
      <div className={styles.carouselContainer}>
        <ul ref={carousel} className={styles.carousel}>
          {images.map((image, index) => (
            <li className={styles.listItem} key={image.id}>
              <button
                className={styles.imageBtn}
                type="button"
                onClick={() => setActiveImageIndex(index)}
              >
                <img
                  className={cx(
                    styles.imageSmall,
                    activeImageIndex === index && styles.activeSmallImage,
                  )}
                  src={image.url}
                  alt={recipeName}
                />
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.controls}>
          <button
            className={cx(styles.arrow, styles.arrowPrev)}
            onClick={movePrev}
            disabled={isDisabled('prev')}
            type="button"
          >
            <BiChevronLeft />
          </button>
          <button
            className={cx(styles.arrow, styles.arrowNext)}
            onClick={moveNext}
            disabled={isDisabled('next')}
            type="button"
          >
            <BiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
