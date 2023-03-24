import styled from "styled-components";

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
`;

export const Content = styled(Column)`
  gap: 28px;
  width: 100%;
  padding: 52px 40px;
`;
