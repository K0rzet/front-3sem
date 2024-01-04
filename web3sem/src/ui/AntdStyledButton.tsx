import { Button } from "antd";
import styled from "styled-components";

export const StyledButton = styled(Button)`
  &.ant-btn-default {
    background-color: rgba(255, 255, 255, 0);
    color: inherit;
    border: inherit 1px solid;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      color: inherit;
      border: inherit 1px solid;
    }
  }
  &:not(:disabled):not(.ant-btn-disabled):hover {
    color: inherit;
    background-color: var(--btn-bg-color);
    border-color: inherit;
  }
`;