import footerStyle from "./Footer.module.css";

const FooterComponent = () => {
  return (
    <footer className={footerStyle.footerBg}>
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