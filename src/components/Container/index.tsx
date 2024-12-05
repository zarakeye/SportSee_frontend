import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div id="container" className="overflow-clip w-screen">{children}</div>;
};

export default Container;