import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  padding: 0 16px;

  @media (min-width: ${(props) => props.theme.screen.xs}) {
    max-width: 540px;
  }

  @media (min-width: ${(props) => props.theme.screen.sm}) {
    max-width: 720px;
  }

  @media (min-width: ${(props) => props.theme.screen.md}) {
    max-width: 960px;
  }

  @media (min-width: ${(props) => props.theme.screen.lg}) {
    max-width: 1200px;
  }

  ${(props) =>
    props.fluid &&
    `
    max-width: 1200px !important;
  `};
`;

export const Section = styled.section`
  padding: 80px 0;
  overflow: hidden;
  background-color: ${(props) => {
    switch (props.accent) {
      case "secondary":
        return props.theme.color.white.dark;
      case "main":
        return props.theme.color.primary;
      default:
        return "white";
    }
  }};

  @media (max-width: ${(props) => props.theme.screen.md}) {
    padding: 80px 0;
  }

  ${(props) =>
    props.accent &&
    `background-color: ${
      props.accent === "secondary"
        ? props.theme.color.white.dark
        : props.theme.color.primary
    }`};
`;

export const LogoBrand = styled.img`
  height: 15px;
  margin: 20px;
`;

export const SiderTitle = styled.h3`
  font-size: 35px;
  line-height: 100%;
  color: black;
  margin: 20px;
  font-family: "Gelion Semibold";
`;

export const ContentTitle = styled.h1`
  font-size: 45px;
  line-height: 45px;
  color: black;
  font-family: Gelion Semibold;
  text-align: center;
`;

export const ContentSubTitle = styled.h4`
  font-size: 18px;
  line-height: 21.59px;
  color: #333333;
  font-family: Gelion Light;
  text-align: center;
`;

export const ButtonFooter = styled.button`
  box-shadow: none;
  filter: drop-shadow(1px 2px 8px rgba(0, 0, 0, 0.05));
  outline: none;
  border: 1px solid #00798c;
  box-sizing: border-box;
  background-color: #00798c;
  border-radius: 3px;
  padding: 8px 40px;
  font-size: 16px;
  color: #fff;
  font-family: "Gelion Bold";
  cursor: pointer;
`;

export const ButtonFooterOutlined = styled.button`
  box-shadow: none;
  filter: drop-shadow(1px 2px 8px rgba(0, 0, 0, 0.05));
  outline: none;
  border: 1px solid #00798c;
  box-sizing: border-box;
  background-color: white;
  border-radius: 3px;
  padding: 8px 40px;
  font-size: 16px;
  color: #00798c;
  font-family: "Gelion Bold";
  cursor: pointer;
`;

export const CustomLabelInput = styled.span`
  font-size: 18px;
  font-family: "Georgia";
  color: black;
  margin-right: 0;
`;
