import {Container} from "react-bootstrap"
import Header from "./components/Header"
import Footer from "./components/Footer"
import {BrowserRouter as Router, Route} from 'react-router-dom'
import DeepLearning from "./components/DeepLearning";
import NodeJs from "./components/NodeJs";
import HomePage from "./components/HomePage";
import Model from "./components/Model";
import Spanish from "./components/Spanish";

function App() {
  return (
    <Router>
    <Header />
    <main className="py-3">
        <Container>
        <Route path="/deeplearning" component={DeepLearning} />
        <Route path="/nodejs" component={NodeJs} />
        <Route path="/model" component={Model} />
        <Route path="/spanish" component={Spanish} />
        <Route path="/" component={HomePage} exact />
        </Container>
      </main>
    <Footer />
    </Router>
  );
}

export default App;
