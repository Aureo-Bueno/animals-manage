import styled, { css, keyframes } from "styled-components";

export const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const ListHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(2)};
  flex-wrap: wrap;
`;

export const ListTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const ListHint = styled.p`
  margin: ${({ theme }) => theme.spacing(0.5)} 0 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.9rem;
`;

export const Count = styled.span`
  min-width: 48px;
  text-align: center;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(1.5)};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  animation: ${fadeUp} 0.3s ease;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  flex-wrap: wrap;
`;

export const Name = styled.span`
  font-weight: 600;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const Species = styled.span`
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.82rem;
  font-weight: 600;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  flex-wrap: wrap;
`;

export const ActionButton = styled.button<{ $variant?: "ghost" | "accent" }>`
  padding: 0.45rem 0.9rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease;

  ${({ theme, $variant }) =>
    $variant === "accent"
      ? css`
          background: ${theme.colors.accent};
          color: ${theme.colors.surface};
        `
      : css`
          background: transparent;
          color: ${theme.colors.primary};
          border-color: ${theme.colors.border};
        `}

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }
`;

export const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.surface};
  text-align: center;
`;
