"use client";

import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  width: 100%;
  background-color: #1a1a1a;
  padding: 1rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #9ca3af;
  font-weight: 200;
  font-size: 12px;
  border-top: 1px solid #ff562218;
  position: fixed;
  bottom: 0; 
  left: 0; 
  z-index: 10; 

  @media (max-width: 320px) {
    padding: 0.5rem 0.5rem;
  }
`;

const FooterText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 8px;

  @media (max-width: 320px) {
    font-size: 6.5px;
    }
`;

const FooterIcon = styled.img`
  width: 16px;
  height: 16px;

  @media (max-width: 320px) {
    width: 12px;
  height: 12px;
    }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterText>
        <FooterIcon src="/icons/secutiry.png" alt="Ícone de segurança" />
        Apostas seguras e regulamentadas
      </FooterText>
      <FooterText>© 2025 Apostou. Todos os direitos reservados.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
