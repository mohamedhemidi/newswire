/** STYLES **/
import styled from "styled-components";
import { ISidebar } from "./Sidebar";
import { Link } from "react-router-dom";

export const SSidebar = styled.div<ISidebar>`
  height: 100vh;
  width: ${(props) => (props.collapsed ? "60px" : "250px")};
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: ${(props) => (props.collapsed ? "0px" : "250px")};
    visibility: ${(props) => (props.collapsed ? "hidden" : "visible")};
  }
`;

export const SContent = styled.div<ISidebar>`
  height: ${(props) => (props.collapsed ? "100%" : "97%")};
  width: ${(props) => (props.collapsed ? "100%" : "95%")};
  background: ${(props) => (props.collapsed ? "#333" : props.theme.bgSidebar)};
  border-radius: ${(props) => (props.collapsed ? "0" : "1rem")};
  color: ${(props) => props.theme.text};
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SBottom = styled.div`
  margin-top: auto;
`;
export const SLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const SListItems = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const SItem = styled(Link)<ISidebar>`
  cursor: pointer;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  color: ${(props) => props.theme.text};
  padding: 0.7rem;

  &:hover {
    background-color: #605dff10;
  }
`;
export const SIcon = styled.div<ISidebar>`
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 20px;
    height: 20px;
    fill: ${(props) => (props.collapsed ? "white" : "black")};
  }
`;
