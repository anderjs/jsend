import styled from "styled-components"
import { Color } from "@nectiasw/theme";

export const FooterContainer = styled.div`
  &> span {
    background: #939799;
    height: 16px;
    display: block;
  }

  position: relative;
  z-index: 0;
  padding-top: 100px;
`

export const Icons = styled.div`
  background: #464646;
  min-height: 116px;
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;

  img, svg {
    cursor: pointer;
  }

  .mobile-btn {
    display: none;
  }
  .desktop-btn {
    display: flex;
  }

  @media (max-width: 768px) {
    display: block;
    .mobile-btn {
      display: flex;
    }
    .desktop-btn {
      display: none;
    }
  }

  button {
    color: white;
    background-color: transparent;
    border: solid 1px white;
    display: flex;
    padding: 14px 20px;
    align-items: center;
    border-radius: 32px;
    font-size: 16px;
    margin-left: auto;
    transition: 0.2s;

    &:hover {
      background-color: white;
      color: ${Color.primary};
    }

    svg {
      transition: 0.2s;
      margin-right: 10px;
    }
  }
`