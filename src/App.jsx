import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormEditor from "./Main/Main";
import WelcomeScreenField from "./Main/Welcome";
import EndScreen from "./Main/EndScreen";
import EmailField from "./Main/Email";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormEditor />} />
        <Route path="/WelcomeScreen" element={<WelcomeScreenField />} />
        <Route path="/EndScreen" element={<EndScreen />} />
        <Route path="/Email" element={<EmailField/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
