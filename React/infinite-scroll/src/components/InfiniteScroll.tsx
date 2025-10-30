import { useEffect, useRef, useState } from "react";

function InfiniteScroll() {
  const [data, setData] = useState([...Array(20)]);
  const ObserverRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [buttonVis, setButtonVis] = useState(false);

  useEffect(() => {
    const interObj = new IntersectionObserver(
      (entries) => {
        setLoading(true);
        if (entries[0].isIntersecting) {
          new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve();
            }, 1000);
          })
            .then(() => {
              setData((prev) => [...prev, ...Array(10)]);
            })
            .finally(() => {
              setLoading(false);
            });
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (ObserverRef.current) {
      interObj.observe(ObserverRef.current);
    }

    return () => {
      if (ObserverRef.current) {
        interObj.unobserve(ObserverRef.current);
      }
    };
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 400) {
        setButtonVis(true);
      } else {
        setButtonVis(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleClick() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div>
      <h1>Infinite Scroll</h1>
      <div className="container">
        <div>
          {data.map((_, i) => {
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // textAlign:"center",
                  height: 80,
                  width: 500,
                  border: "1px solid red",
                }}
              >
                <p>Infinite Scroll {i + 1}</p>
              </div>
            );
          })}
        </div>
      </div>

      {loading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <div
            style={{
              height: 40,
              width: 40,
              border: "10px solid white",
              borderRadius: 50,
              borderTop: "10px solid blue",
              animation: "spin 1s linear infinite",
            }}
          ></div>
          Loading...
        </div>
      )}

      {buttonVis && (
        <button
          style={{ position: "fixed", bottom: 10, right: 3, color: "white" }}
          onClick={handleClick}
        >
          Back to top
        </button>
      )}

      <div ref={ObserverRef}></div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default InfiniteScroll;
