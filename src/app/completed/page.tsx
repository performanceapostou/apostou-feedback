"use client";

import React, { useEffect } from "react";
import styled from "styled-components";
import { useProgress } from "@/contexts/ProgressContext";
import { useUser } from "@/contexts/UserContext";

const Confirmation: React.FC = () => {
  const { setProgress } = useProgress();
  const { user } = useUser();

  useEffect(() => {
    setProgress(100);
  }, [setProgress]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#111111]">
      <StyledContainer>
        <Icon src="/check.png" alt="Ícone de confirmação" />
        <StyledTitle>Obrigado, {user?.name || "Usuário"}!</StyledTitle>
        <StyledParagraph>
          Seu feedback é muito valioso para nós. Agradecemos por dedicar seu
          tempo para nos ajudar a melhorar.
        </StyledParagraph>
        <StyledButton onClick={() => (window.location.href = "/")}>
          Retomar
        </StyledButton>
      </StyledContainer>
    </div>
  );
};

export default Confirmation;

const StyledContainer = styled.div`
  width: 85%;
  max-width: 500px;
  padding: 1.5rem;
  background-color: #1a1a1a;
  border-radius: 0.5rem;
  border: 1px solid #ff562222;
  box-shadow: 0 0 6px #ff562226;
  text-align: center;
  z-index: 5;

  @media (min-width: 760px) {
    width: 80%;
  }
`;

const Icon = styled.img`
  width: 100px;
  height: 100px;
  margin: 0 auto 1rem auto;

  @media (min-width: 760px) {
    width: 70px;
    height: 70px;
  }
`;

const StyledTitle = styled.h1`
  color: #f06310;
  font-size: 22px;
  font-weight: 400;
  margin-bottom: 1rem;

  @media (min-width: 376px) {
    font-size: 28px;
  }

  @media (min-width: 760px) {
    font-size: 32px;
  }
`;

const StyledParagraph = styled.p`
  color: #bdbdbd;
  font-size: 12px;
  font-weight: 200;
  margin-bottom: 2rem;

  @media (min-width: 376px) {
    font-size: 14px;
  }

  @media (min-width: 760px) {
    font-size: 18px;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  background-color: #ff6300;
  color: white;
  font-weight: 400;
  border-radius: 0.3rem;
  padding: 0.5rem 0rem;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  z-index: 10; /* Garante que o botão esteja acima de outros elementos */

  &:hover {
    background-color: #e55a00;
  }

  @media (min-width: 376px) {
    font-size: 14px;
  }

  @media (min-width: 760px) {
    font-size: 18px;
  }
`;
