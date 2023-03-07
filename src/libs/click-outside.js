import * as React from "react";

const useClickOutside = (closeFunc, ScrollingElement) => {
  const ScrollingElementNode = React.useMemo(
    () => ScrollingElement || document.body,
    [ScrollingElement]
  );
  const node = React.useRef();

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (node.current.contains(e.target)) {
        return;
      }
      closeFunc(e);
    };

    const handleLossOfFocus = (e) => {
      closeFunc(e);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleLossOfFocus);
    window.addEventListener("resize", handleLossOfFocus);
    if (ScrollingElementNode) {
      ScrollingElementNode.addEventListener("scroll", handleLossOfFocus);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleLossOfFocus);
      window.removeEventListener("resize", handleLossOfFocus);
      if (ScrollingElementNode) {
        ScrollingElementNode.removeEventListener("scroll", handleLossOfFocus);
      }
    };
  }, [ScrollingElementNode, closeFunc]);

  return node;
};

export default useClickOutside;
