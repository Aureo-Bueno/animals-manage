import styled, { css, keyframes } from "styled-components";

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
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
  padding-bottom: ${({ theme }) => theme.spacing(1.5)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ListTitle = styled.h3`
  margin: 0;
  font-size: 1.15rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.text};
`;

export const ListHint = styled.p`
  margin: ${({ theme }) => theme.spacing(0.35)} 0 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.82rem;
  opacity: 0.75;
`;

export const Count = styled.span`
  min-width: 48px;
  text-align: center;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: 0.85rem;
`;

export const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 0.6rem 0.85rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.85rem;
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
    box-shadow: 0 0 0 3px rgba(47, 79, 79, 0.1);
  }
`;

export const ToggleButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 0.75rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-weight: 600;
  font-size: 0.7rem;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.35)};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  min-width: 44px;
  justify-content: center;

  ${({ theme, $active }) =>
    $active
      ? css`
          background: ${theme.colors.accent};
          color: white;
          border-color: ${theme.colors.accent};
          &:hover {
            filter: brightness(1.1);
          }
        `
      : css`
          background: transparent;
          color: ${theme.colors.primary};
          &:hover {
            background: ${theme.colors.background};
            border-color: ${theme.colors.primary};
          }
        `}
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.75)};
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
  cursor: default;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.35)};
  min-width: 0;
`;

export const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.75)};
  flex-wrap: wrap;
`;

export const Name = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const Species = styled.span`
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.75rem;
  font-weight: 600;
`;

export const Meta = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.7;
`;

export const Desc = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  opacity: 0.85;
`;

export const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(0.3)};
  margin-top: ${({ theme }) => theme.spacing(0.25)};
`;

export const Tag = styled.span`
  padding: 0.12rem 0.45rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.5)};
  flex-wrap: wrap;
  flex-shrink: 0;
`;

export const ActionButton = styled.button<{ $variant?: "ghost" | "accent" }>`
  padding: 0.4rem 0.85rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-weight: 600;
  font-size: 0.78rem;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s ease;

  ${({ theme, $variant }) =>
    $variant === "accent"
      ? css`
          background: ${theme.colors.accent};
          color: white;
          &:hover {
            filter: brightness(1.1);
          }
        `
      : css`
          background: transparent;
          color: ${theme.colors.primary};
          border-color: ${theme.colors.border};
          &:hover {
            background: ${theme.colors.background};
            border-color: ${theme.colors.primary};
          }
        `}

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.surface};
  text-align: center;
  font-size: 0.85rem;
  opacity: 0.7;
`;

export const Spinner = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;
