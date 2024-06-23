import React, { useState, useEffect } from "react";
import Home from "./Home";
import "../App.css";

interface Props {
  delay1: number;
  delay2: number;
  delay3: number;
}

const Counter: React.FC<Props> = ({ delay1, delay2, delay3 }) => {
  const [count1, setCount1] = useState(0); // For the range 00-100
  const [count2, setCount2] = useState(0); // For the range 00-59
  const [count3, setCount3] = useState(0); // For the range 00-59
  const [running1, setRunning1] = useState(true);
  const [running2, setRunning2] = useState(true);
  const [running3, setRunning3] = useState(true);
  const scrollHandler = () => {
    const viewportHeight = window.innerHeight;
    const arrow: HTMLElement | null = document.getElementById("arrow");
    if (arrow) {
      arrow.style.opacity = "0";
    }
    window.scrollBy({
      top: viewportHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    let interval1: ReturnType<typeof setInterval> | undefined;
    let interval2: ReturnType<typeof setInterval> | undefined;
    let interval3: ReturnType<typeof setInterval> | undefined;

    if (running1) {
      interval1 = setInterval(() => {
        setCount1((prev) => {
          if (prev < 99) {
            return prev + 1;
          } else {
            setRunning1(false);
            return 100;
          }
        });
      }, delay1);
    }

    if (running2) {
      interval2 = setInterval(() => {
        setCount2((prev) => {
          if (prev < 59) {
            return prev + 1;
          } else {
            setRunning2(false);
            return 0;
          }
        });
      }, delay2);
    }

    if (running3) {
      interval3 = setInterval(() => {
        setCount3((prev) => {
          if (prev < 59) {
            return prev + 1;
          } else {
            setRunning3(false);
            return 0;
          }
        });
      }, delay3);
    }

    return () => {
      if (interval1) clearInterval(interval1);
      if (interval2) clearInterval(interval2);
      if (interval3) clearInterval(interval3);
    };
  }, [delay1, delay2, delay3, running1, running2, running3]);

  return (
    <>
      <main id="counter">
        <div className="z-0 flex h-screen items-center justify-center text-9xl text-white">
          <div> {count1.toString().padStart(2, "0")}</div>
          <span> : </span>
          <div> {count2.toString().padStart(2, "0")}</div>
          <span> : </span>
          <div> {count3.toString().padStart(2, "0")}</div>
        </div>
      </main>
      <div>
        {count1 === 100 && (
          <div className="flex justify-center align-center">
            <div
              id="arrow"
              onClick={scrollHandler}
              className="z-10 arrow fixed bottom-5"
            ></div>
            <div>
              <Home />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Counter;
