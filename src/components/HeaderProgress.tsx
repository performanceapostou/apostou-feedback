"use client";

import React from "react";
import styled from "styled-components";
import { useProgress } from "@/contexts/ProgressContext";

const HeaderProgress: React.FC = () => {
  const { progress } = useProgress(); // Obtém o progresso do contexto

  // Calcula o passo atual com base no progresso
  const currentStep = Math.min(3, Math.max(1, Math.ceil(progress / 33)));

  return (
    <HeaderContainer>
      <Logo src="/logo.png" alt="Logo Apostou" />
      <div className="flex flex-col w-[85%] max-w-[500px] items-center relative">
        <ProgressBarContainer>
          <ProgressBar progress={progress} />
        </ProgressBarContainer>
        <StepText className="self-end">{`Passo ${currentStep} de 3`}</StepText>
      </div>
    </HeaderContainer>
  );
};

export default HeaderProgress;

// Styled Components
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #111111;
  padding: 1rem 0 0rem 0;

  @media (min-width: 340px) {
    padding: 2rem 0 1rem 0;
  }

  @media (min-width: 391px) {
    padding: 2rem 0 4rem 0;
  }

  @media (min-width: 760px) {
    padding: 2rem 0 2rem 0;
  }
`;

const Logo = styled.img`
  width: 160px;
  margin-bottom: 2rem;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  max-width: 500px;
  height: 8px;
  background-color: #1f2937;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: ${(props) => props.progress}%;
  height: 100%;
  background-color: #ff6300;
  transition: width 0.3s ease;
`;

const StepText = styled.p`
  color: #f06310;
  font-size: 10px;
  font-weight: 200;
`;
