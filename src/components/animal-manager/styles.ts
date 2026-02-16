import styled, { keyframes } from "styled-components";

export const rise = keyframes`
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Page = styled.main`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing(4)};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    padding: ${({ theme }) => theme.spacing(2)};
    align-items: stretch;
  }
`;

export const Card = styled.section`
  width: min(1100px, 100%);
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.md};
  animation: ${rise} 0.5s ease-out;

  @media (max-width: 900px) {
    padding: ${({ theme }) => theme.spacing(3)};
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing(3)};
  flex-wrap: wrap;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: clamp(1.8rem, 2.4vw, 2.6rem);
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.text};
`;

export const Subtitle = styled.p`
  margin: ${({ theme }) => theme.spacing(0.5)} 0 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.98rem;
  max-width: 44ch;
`;

export const Stat = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  min-width: 140px;
  text-align: center;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const StatLabel = styled.span`
  display: block;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

export const StatValue = styled.span`
  display: block;
  margin-top: ${({ theme }) => theme.spacing(0.5)};
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const Content = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)};
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: ${({ theme }) => theme.spacing(3)};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const Panel = styled.section`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing(3)};
`;
