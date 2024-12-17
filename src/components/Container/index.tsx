import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

/**
 * Container is a functional component that renders a div element with an ID of
 * "container", which is the root element for the entire application. The
 * container is given a fixed width and height of the full screen, and the
 * overflow is clipped so that any content that exceeds the screen size is not
 * visible. The children of the container are rendered inside of the container.
 */
const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div id="container" className="relative overflow-clip w-screen h-screen">{children}</div>;
};

export default Container;