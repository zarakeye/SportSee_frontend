import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div id="container" className="relative overflow-clip w-screen h-screen">{children}</div>;
};

export default Container;