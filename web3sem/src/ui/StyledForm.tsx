import styled from "styled-components";


export const Form = styled.form`
  max-width: 400px;
  margin: auto;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 15px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
  display: block;
`;

export const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  margin-top: 10px;

  &:disabled {
    background-color: #dddddd;
    cursor: not-allowed;
  }
`;

export const ErrorContainer = styled.div`
  color: red;
  margin-top: 10px;
`;