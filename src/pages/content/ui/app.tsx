import { useEffect } from "react";
import { styled } from "styled-components";

const TestDiv = styled.div`
  opacity: 0;
`;

export default function App() {
  useEffect(() => {
    console.log("content view loaded");
  }, []);

  return <TestDiv className="">Test</TestDiv>;
}
