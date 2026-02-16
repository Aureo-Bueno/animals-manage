import styled, { css } from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const FormHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(2)};
  flex-wrap: wrap;
`;

export const FormTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const FormHint = styled.p`
  margin: ${({ theme }) => theme.spacing(0.5)} 0 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.9rem;
`;

export const Pill = styled.span`
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.75)};
`;

export const Label = styled.label`
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

export const sharedInputStyles = css`
  width: 100%;
  padding: 0.65rem 0.9rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  transition: border 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(47, 79, 79, 0.15);
  }
`;

export const Input = styled.input`
  ${sharedInputStyles}
`;

export const Select = styled.select`
  ${sharedInputStyles}
  flex: 1 1 200px;
`;

export const Inline = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  flex-wrap: wrap;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacing(0.5)};
`;

export const Button = styled.button<{ $variant?: "primary" | "accent" | "ghost" }>`
  padding: 0.6rem 1.1rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease;

  ${({ theme, $variant }) => {
    switch ($variant) {
      case "accent":
        return css`
          background: ${theme.colors.accent};
          color: ${theme.colors.surface};
        `;
      case "ghost":
        return css`
          background: transparent;
          color: ${theme.colors.primary};
          border-color: ${theme.colors.border};
        `;
      default:
        return css`
          background: ${theme.colors.primary};
          color: ${theme.colors.surface};
        `;
    }
  }}

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }
`;
