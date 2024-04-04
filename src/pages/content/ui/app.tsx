import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    console.log("content view loaded");
  }, []);

  return (
    <div className="" style={{ opacity: 0, height: 0, width: 0 }}>
      Test
    </div>
  );
}
