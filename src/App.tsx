import { useEffect, useState } from "react";
import Board from "./components/Board";
import type { Block } from "./interfaces/Block";
import type { Direction } from "./types/direction";

function App() {
  const [direction, setDirection] = useState<Direction>("right");
  const [apple, setApple] = useState<Block>({ x: 10, y: 10 });
  const [snake, setSnake] = useState<Array<Block>>([
    { x: 13, y: 1 },
    { x: 12, y: 1 },
    { x: 11, y: 1 },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSnake((snake) => {
        const newSnake = [...snake];
        newSnake.pop();
        const head = newSnake[0];
        switch (direction) {
          case "up":
            return [{ x: head.x, y: (head.y - 1 + 30) % 30 }, ...newSnake];
          case "down":
            return [{ x: head.x, y: (head.y + 1) % 30 }, ...newSnake];
          case "left":
            return [{ x: (head.x - 1 + 30) % 30, y: head.y }, ...newSnake];
          case "right":
            return [{ x: (head.x + 1) % 30, y: head.y }, ...newSnake];
        }
      });
    }, 300);
    return () => clearInterval(timer);
  }, [direction]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          if (direction !== "down") {
            setDirection("up");
          }
          break;
        case "ArrowDown":
          if (direction !== "up") {
            setDirection("down");
          }
          break;
        case "ArrowLeft":
          if (direction !== "right") {
            setDirection("left");
          }
          break;
        case "ArrowRight":
          if (direction !== "left") {
            setDirection("right");
          }
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  return (
    <>
      <div className="flex items-center justify-center h-screen w-screen">
        <Board apple={apple} snake={snake} />
      </div>
    </>
  );
}

export default App;
