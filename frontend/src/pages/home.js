import Adyen from '../components/Adyen';
import '../css/App.css';

function Home() {
  return (
    <div className="App">
      <div className="title">
          <h1>Card Component</h1>
      </div>
      <div className="Adyen">
        <Adyen setResultCode="200" />
      </div>
    </div>
  );
}

export default Home;
