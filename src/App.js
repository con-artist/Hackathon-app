import './styles/Allstyles.scss';

import { BrowserRouter } from "react-router-dom";

import Header from "./components/header/Header";
import Paths from "./config/Paths";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Paths />
    </BrowserRouter>
  );
}

export default App;
