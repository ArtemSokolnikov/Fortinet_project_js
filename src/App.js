import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import 'animate.css';

function App() {
  
  localStorage.setItem('index', '0');
  localStorage.setItem('indexToDo', '0');
  localStorage.setItem('indexOnGoing', '0');
  localStorage.setItem('indexDone', '0');
  
  return (
    <Home />
  );
}

export default App;
