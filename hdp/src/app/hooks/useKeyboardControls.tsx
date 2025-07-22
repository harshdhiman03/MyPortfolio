import React, { useRef } from "react";

export function useKeyboardControls() {
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const onKeyDown = (e: KeyboardEvent) => {
    switch (e.code) {
      case "KeyW":
        keys.current.forward = true;
        break;
      case "KeyS":
        keys.current.backward = true;
        break;
      case "KeyA":
        keys.current.left = true;
        break;
      case "KeyD":
        keys.current.right = true;
        break;
    }
  };

  const onKeyUp = (e: KeyboardEvent) => {
    switch (e.code) {
      case "KeyW":
        keys.current.forward = false;
        break;
      case "KeyS":
        keys.current.backward = false;
        break;
      case "KeyA":
        keys.current.left = false;
        break;
      case "KeyD":
        keys.current.right = false;
        break;
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return keys.current;
}
