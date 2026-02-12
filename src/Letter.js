import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import confetti from "canvas-confetti";
import { Link } from "react-router-dom";

const Letter = () => {
  const [showImage, setShowImage] = useState(false);
  const [accepted, setAccepted] = useState(false);


  const handleYesClick = () => {
    setAccepted(true);
  
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
    });
  };
  

  return (
    <>
      <Header />
      <div className="valentine-container">

        {
            !accepted && (
                <h1 className="valentine-text">
                Radhika, will you be my valentine? ❤️
              </h1>
            )
        }

        {!accepted && (
            <div className="button-group">
                <button className="yes-btn" onClick={handleYesClick}>
                Yes
                </button>

                <div
                className="no-wrapper"
                onMouseEnter={() => setShowImage(true)}
                onMouseLeave={() => setShowImage(false)}
                >
                <button className="no-btn">No</button>

                <img
                    src="https://res.cloudinary.com/kartik09/image/upload/v1770835705/cry-cat2_ppbv8w.png"
                    alt="Crying"
                    className={`crying-image ${showImage ? "show" : ""}`}
                />
                </div>
            </div>
        )}


        {accepted && (
            <>
                <h2 className="accepted-text">
                    Yaaayyyy! ❤️
                </h2>
                <div className="letter-text">
                    <p className="accepted-text-para">
                        Hello Radha! Kartik this side 👋.
                    </p>
                    <p className="accepted-text-para">
                        It's been about 4 years since I have known you well, and it has been an absolutely fantastic journey with you so far. I have seen so many ups and downs with you and I'm glad to have you by my side through all of it! I believe I don't get enough time or instances to appreciate how amazing it is to have you there for me and how much joy you bring to my heart by just existing, so I would like to take this moment and thank you for all the love and happiness that you bring to my life.
                        I love yapping about everything with you that's going on in my life and listen to you meow meow everything that's going on in your life. It feels good!
                    </p>
                    <p className="accepted-text-para">
                        Ab zyada nhi bataunga warna sir pe chadh jayegi 😏. Now chill and watch your cute pictures <Link to="/">here.</Link>
                        
                    </p>
                    <p className="accepted-text-para">
                        P.S. I promise that I will always support you through thick and thin no matter how tough things get.
                    </p>
                </div>
            </>
        )}

      </div>
      <Footer />
    </>
  );
};

export default Letter;
