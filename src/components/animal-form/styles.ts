import styled, { css, keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2.5)};
`;

export const FormHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(2)};
  flex-wrap: wrap;
  padding-bottom: ${({ theme }) => theme.spacing(1.5)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const FormTitle = styled.h3`
  margin: 0;
  font-size: 1.15rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.text};
`;

export const FormHint = styled.p`
  margin: ${({ theme }) => theme.spacing(0.35)} 0 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.82rem;
  opacity: 0.75;
`;

export const Pill = styled.span`
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.5)};
`;

export const Label = styled.label`
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

export const sharedInputStyles = css`
  width: 100%;
  padding: 0.7rem 0.9rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.primary};
    opacity: 0.4;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(47, 79, 79, 0.12);
  }
`;

export const Input = styled.input`
  ${sharedInputStyles}

  &[type="number"] {
    -moz-appearance: textfield;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

export const TextArea = styled.textarea`
  ${sharedInputStyles}
  min-height: 90px;
  resize: vertical;
  line-height: 1.5;
`;

export const Select = styled.select`
  ${sharedInputStyles}
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%232f4f4f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.8rem center;
  padding-right: 2.2rem;
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.colors.primary};
  border-radius: 3px;
  transition: accent-color 0.2s ease;
`;

export const Inline = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  flex-wrap: wrap;
`;

export const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.75)};
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 0.35rem 0;
  user-select: none;

  &:hover {
    opacity: 0.8;
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing(2)};

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  flex-wrap: wrap;
  padding-top: ${({ theme }) => theme.spacing(1)};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const AISection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  flex-wrap: wrap;
  padding: ${({ theme }) => theme.spacing(1.5)};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px dashed ${({ theme }) => theme.colors.border};
`;

export const AILabel = styled.span`
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 700;
  margin-right: ${({ theme }) => theme.spacing(0.25)};
`;

export const Button = styled.button<{ $variant?: "primary" | "accent" | "ghost" | "ai" }>`
  padding: 0.6rem 1.2rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.5)};

  ${({ theme, $variant }) => {
    switch ($variant) {
      case "accent":
        return css`
          background: ${theme.colors.accent};
          color: white;
          &:hover {
            background: ${theme.colors.accent};
            filter: brightness(1.1);
          }
        `;
      case "ghost":
        return css`
          background: transparent;
          color: ${theme.colors.primary};
          border-color: ${theme.colors.border};
          &:hover {
            background: ${theme.colors.background};
            border-color: ${theme.colors.primary};
          }
        `;
      case "ai":
        return css`
          background: ${theme.colors.primary};
          color: white;
          font-size: 0.75rem;
          padding: 0.4rem 0.9rem;
          &:hover {
            filter: brightness(1.15);
          }
        `;
      default:
        return css`
          background: ${theme.colors.primary};
          color: white;
          &:hover {
            filter: brightness(1.15);
          }
        `;
    }
  }}

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(0.5)};
`;

export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.35)};
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  animation: ${fadeIn} 0.2s ease;
`;

export const TagRemove = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.accent};
  padding: 0;
  display: inline-flex;
  align-items: center;
  opacity: 0.7;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 1;
  }
`;

export const Spinner = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(28, 26, 23, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: ${({ theme }) => theme.spacing(2)};
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing(3)};
  width: min(500px, 100%);
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  animation: ${fadeIn} 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.text};
`;
