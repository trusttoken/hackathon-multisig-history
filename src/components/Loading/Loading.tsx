import { Content } from "components/general";
import { LoadingCircleIcon } from "components/Icons/LoadingCircleIcon";
import styled from "styled-components";

export const Loading = () => {
  return (
    <StyledContent>
      <LoadingCircleIcon size={100} />
    </StyledContent>
  );
};

const StyledContent = styled(Content)`
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
