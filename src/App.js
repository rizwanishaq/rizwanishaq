import {Container} from "react-bootstrap"
import Header from "./components/LayOut/Header"
import Footer from "./components/LayOut/Footer"
import {BrowserRouter as Router, Route} from 'react-router-dom'
import DeepLearning from "./components/DeepLearning/DeepLearning";
import NodeJs from "./components/NodeJs/NodeJs";
import HomePage from "./components/HomePage/HomePage";
import Model from "./components/DeepLearning/Model";
import Spanish from "./components/Spanish/Spanish";
import EventDetection from "./components/EventDetection/EventDetection";

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
        <Route path="/eventdetection" component={EventDetection} />
        <Route path="/" component={HomePage} exact />
        </Container>
      </main>
    <Footer />
    </Router>
  );
}

export default App;
