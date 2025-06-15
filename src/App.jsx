import "./App.css";
import {
  action,
  orginals,
  ComedyMovies,
  HorrorMovies,
  RomanceMovies,
  Documentaries,
} from "./urls";
import Navbar from "./components/Navbar/Navbar";
import Banner from "./components/Banner/Banner";
import RowPost from "./components/RowPost/RowPost";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Banner />
      <RowPost url={orginals} title="Netflix Original" />
      <RowPost url={action} title="Action" isSmall />
      <RowPost url={ComedyMovies} title="ComedyMovies" isSmall />
      <RowPost url={HorrorMovies} title="HorrorMovies" isSmall />
      <RowPost url={RomanceMovies} title="RomanceMovies" isSmall />
      <RowPost url={Documentaries} title="Documentaries" isSmall />
    </div>
  );
}
export default App;
