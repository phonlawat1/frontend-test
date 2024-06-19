import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Row, Col, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import "../styles/app.scss";

function test1() {
  const { t, i18n } = useTranslation(["home"]);
  const [lang, setLang] = useState("th");
  const navigate = useNavigate();
  const { Header, Footer, Content } = Layout;

  const headerStyle: React.CSSProperties = {
    background: "linear-gradient(0deg, #ffa200, #6eda78)",
    textAlign: "end",
    color: "#fff",
    height: 64,
    paddingInline: 48,
    lineHeight: "64px",
  };

  const contentStyle: React.CSSProperties = {
    background: "linear-gradient(180deg, #ffa200, #6eda78)",

    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
    color: "#fff",
  };

  const footerStyle: React.CSSProperties = {
    background: "linear-gradient(360deg, #ffa200, #6eda78)",
    textAlign: "center",
    color: "#fff",
  };

  const layoutStyle = {
    borderRadius: 8,
    overflow: "hidden",
    width: "calc(100%)",
    maxWidth: "calc(100%)",
  };

  const [squareRotation, setSquareRotation] = useState(0);
  const [circleRotation, setCircleRotation] = useState(0);
  const [triangleRotation, setTriangleRotation] = useState(0);
  const [isGrid, setIsGrid] = useState(true);

  const moveAll = () => {
    setSquareRotation(squareRotation - 90);
    setCircleRotation(circleRotation - 90);
    setTriangleRotation(triangleRotation - 90);
  };

  const randomAll = () => {
    setSquareRotation(Math.floor(Math.random() * 361));
    setCircleRotation(Math.floor(Math.random() * 361));
    setTriangleRotation(Math.floor(Math.random() * 361));
  };

  const rotateStyle = (rotation: Number) => ({
    transform: `rotate(${rotation}deg)`,
    transition: "transform 0.5s ease",
  });

  const onClickLanguageChange = (e: any) => {
    const language = e;
    setLang(e);
    i18n.changeLanguage(language);
  };

  const toggleLayout = () => {
    setIsGrid(!isGrid);
  };

  const nextTest = () => {
    navigate("/test2");
  };

  return (
    <>
      <div className="container">
        <Layout style={layoutStyle}>
          <Header style={headerStyle}>
            <div className="selectLang">
              {lang === "en" ? (
                <Button
                  className="btnLang"
                  onClick={() => onClickLanguageChange("th")}
                >
                  Thai
                </Button>
              ) : (
                <Button
                  className="btnLang"
                  onClick={() => onClickLanguageChange("en")}
                >
                  English
                </Button>
              )}
              <Button onClick={nextTest}>{t("NextTest")}</Button>
            </div>
          </Header>
          <Content style={contentStyle}>
            <div className={isGrid ? "containershap" : "list-style"}>
              <div
                className=" square"
                style={rotateStyle(squareRotation)}
                onClick={() => setSquareRotation(squareRotation - 90)}
              ></div>
              <div
                className=" circle"
                style={rotateStyle(circleRotation)}
                onClick={() => setCircleRotation(circleRotation - 90)}
              ></div>
              <div
                className="triangle"
                style={rotateStyle(triangleRotation)}
                onClick={() => setTriangleRotation(triangleRotation - 90)}
              ></div>
            </div>
          </Content>
          <Footer style={footerStyle}>
            <Row justify={"center"} className="buttonforplay">
              <Col>
                <Button className="mshape" onClick={moveAll}>
                  {t("MoveShape")}
                </Button>
              </Col>
              <Col>
                <Button onClick={toggleLayout} className="mposition">
                  {t("MovePosition")}
                </Button>
              </Col>
              <Col>
                <Button className="mrandom" onClick={randomAll}>
                  {t("RandomPosition")}
                </Button>
              </Col>
            </Row>
          </Footer>
        </Layout>
      </div>
    </>
  );
}

export default test1;
