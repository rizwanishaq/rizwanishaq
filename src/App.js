import {Container} from "react-bootstrap"
import Header from "./components/Header"
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
    <Header />
    </Router>
  );
}

export default App;
