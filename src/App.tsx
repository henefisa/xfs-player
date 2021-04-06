import { FC } from "react";
import Player from "./components/Player";
import "./app.less";
const App: FC = () => {
  return (
    <div className="app">
      <div>
        <Player controls src="smp.mp4" />
      </div>
    </div>
  );
};

export default App;
