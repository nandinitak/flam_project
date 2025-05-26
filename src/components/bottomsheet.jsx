import React, { useRef, useEffect, useState } from "react";
import "./BottomSheet.css";

const BottomSheet = () => {
  const sheetRef = useRef(null);
  const [snapPoints, setSnapPoints] = useState({
    fullyOpen: 0,
    halfOpen: window.innerHeight * 0.5,
    closed: window.innerHeight - 80,
  });

  useEffect(() => {
    const handleResize = () => {
      setSnapPoints({
        fullyOpen: 0,
        halfOpen: window.innerHeight * 0.5,
        closed: window.innerHeight - 80,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const springTo = (to) => {
    let animationFrame;
    const start = sheetRef.current.getBoundingClientRect().top;
    const change = to - start;
    const duration = 150; // faster animation, half of previous 300ms
    let currentTime = 0;

    const animate = () => {
      currentTime += 16;
      const t = Math.min(currentTime / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const newPos = start + change * eased;
      sheetRef.current.style.transform = `translateY(${newPos}px)`;

      if (t < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        sheetRef.current.style.transform = `translateY(${to}px)`;
      }
    };

    animationFrame = requestAnimationFrame(animate);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    const startY = e.touches ? e.touches[0].clientY : e.clientY;
    const startTop = sheetRef.current.getBoundingClientRect().top;

    const onMove = (moveEvent) => {
      const moveY = moveEvent.touches
        ? moveEvent.touches[0].clientY
        : moveEvent.clientY;
      const delta = moveY - startY;
      let newTop = startTop + delta;
      newTop = Math.max(snapPoints.fullyOpen, Math.min(snapPoints.closed, newTop));
      sheetRef.current.style.transform = `translateY(${newTop}px)`;
    };

    const onEnd = () => {
      const currentTop = sheetRef.current.getBoundingClientRect().top;
      const closest = Object.values(snapPoints).reduce((a, b) =>
        Math.abs(b - currentTop) < Math.abs(a - currentTop) ? b : a
      );
      springTo(closest);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onEnd);
  };

  useEffect(() => {
    requestAnimationFrame(() => springTo(snapPoints.halfOpen));
  }, [snapPoints]);

  return (
    <>
      {/* Background bubbles */}
      <div className="bg-bubble b1"></div>
      <div className="bg-bubble b2"></div>
      <div className="bg-bubble b3"></div>
      <div className="bg-bubble b4"></div>
      <div className="bg-bubble b5"></div>
      <div className="bg-bubble b6"></div>
      <div className="bg-bubble b7"></div>

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className="bottom-sheet"
        style={{ transform: `translateY(${snapPoints.closed}px)` }}
      >
        <div
          className="drag-handle"
          onMouseDown={handleDrag}
          onTouchStart={handleDrag}
        ></div>

        {/* Multiple cute shapes */}
        <div className="cute-shape star" style={{ top: "10%", left: "10%" }}></div>
        <div className="cute-shape star" style={{ top: "20%", left: "70%" }}></div>
        <div className="cute-shape star" style={{ top: "50%", left: "40%" }}></div>

        <div className="cute-shape heart" style={{ top: "30%", left: "20%" }}></div>
        <div className="cute-shape heart" style={{ top: "70%", left: "60%" }}></div>
        <div className="cute-shape heart" style={{ top: "80%", left: "30%" }}></div>
        <div className="cute-shape heart" style={{ top: "40%", left: "75%" }}></div>

        <div className="cute-shape cloud" style={{ top: "5%", left: "80%" }}></div>
        <div className="cute-shape cloud" style={{ top: "60%", left: "10%" }}></div>
        <div className="cute-shape cloud" style={{ top: "65%", left: "45%" }}></div>

        <div className="sheet-content">
          <h2>🌟 Snap the Bottom Sheet 🌟</h2>
          <button className="sheet-btn" onClick={() => springTo(snapPoints.fullyOpen)}>
            Fully Open
          </button>
          <button className="sheet-btn" onClick={() => springTo(snapPoints.halfOpen)}>
            Half Open
          </button>
          <button className="sheet-btn" onClick={() => springTo(snapPoints.closed)}>
            Close Sheet
          </button>
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
