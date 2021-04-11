import { FC } from "react";
import Player from "./components/Player";
import "./app.less";
const App: FC = () => {
  return (
    <div className="app">
      <div>
        <Player controls src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" autoPlay={false}/>
      </div>
    </div>
  );
};

export default App;
