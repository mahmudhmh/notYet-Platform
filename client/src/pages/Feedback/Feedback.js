import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import Header from "../../UI/Header";
import "./Feedback.css";
import Footer from "../../UI/Footer";
import Data from "./Data";
function Feedback() {
  const [people] = useState(Data);
  const [index, setIndex] = useState(2);
  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => clearInterval(slider);
  }, [index]);

  return (
    <>
      <Header />
      <section className="section">
        <div className="title">
          <h2>
            <span>Users Feedback</span>
          </h2>
        </div>
        <div className="section-center">
          {people.map((person, personIndex) => {
            const { id, image, name, title, quote } = person;
            let position = "nextSlide";
            if (personIndex === index) {
              position = "activeSlide";
            }
            if (
              personIndex === index - 1 ||
              (index === 0 && personIndex === people.length - 1)
            ) {
              position = "lastSlide";
            }
            return (
              <article className={position} key={id}>
                <img src={image} alt={name} className="person-img" />
                <h4>{name}</h4>
                <p className="title">{title}</p>
                <p className="text">{quote}</p>
                <FaQuoteRight className="icon" />
              </article>
            );
          })}
          <button className="prev">
            <FiChevronLeft onClick={() => setIndex(index - 1)} />
          </button>
          <button className="next">
            <FiChevronRight onClick={() => setIndex(index + 1)} />
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
}
export default Feedback;
