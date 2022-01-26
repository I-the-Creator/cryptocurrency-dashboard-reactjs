import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter";
import NewsFeed from "./components/NewsFeed/NewsFeed";

const App = () =>  {
  return (
    <div className="app">
      <CurrencyConverter />
      <NewsFeed />
    </div>
  );
}

export default App;
