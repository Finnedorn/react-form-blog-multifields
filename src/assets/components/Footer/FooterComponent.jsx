import { useState, useEffect } from "react";

const FooterComponent = () => {

  const [changingBg, setChangingBg] = useState("black");

  useEffect(() => {
    const changingEffect = setInterval(() => {
      setChangingBg(changingBg === "grey" ? "black" : "grey");
    }, 5000);

    return () => clearInterval(changingEffect);
  },[]);
  useEffect(() => {
    const changingEffect = setInterval(() => {
      setChangingBg(changingBg === "grey" ? "black" : "grey");
    }, 5000);

    return () => clearInterval(changingEffect);
  },[changingBg]);

  return (
    <footer style={{
      backgroundColor: changingBg,
      padding: "20px",
      transition: "background-color 2s ease-in-out",
      }}>
      <p style={{
        color: "white",
        textAlign: "center"
        }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum, nobis.
      </p>
    </footer>
  );
};

export default FooterComponent;