import styled from "styled-components";
export const Main = styled.div`
  position: absolute;
  left: 500px;
  top: 300px;
  width: 1200px;
  height: 500px;
`;

export const FormInput = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  background: #1f344f;
  height: 33px;
  width: 340px;
  color: #fff;
  font-size: 16px;
  border: 0;
  outline: none;
  border-radius: 5px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #fff;
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #fff;
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #fff;
  }
  &:focus {
    outline: none;
    border-bottom: 2px solid #6ef796;
  }
`;
