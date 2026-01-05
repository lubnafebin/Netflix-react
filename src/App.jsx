import "./App.css";
import {
  action,
  originals,
  ComedyMovies,
  HorrorMovies,
  RomanceMovies,
  Documentaries,
} from "./urls";
import Navbar from "./components/Navbar/Navbar";
import Banner from "./components/Banner/Banner";
import RowPost from "./components/RowPost/RowPost";
import { Route, Routes } from "react-router-dom";
import { MovieDetails } from "./MovieDetails";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <RowPost url={originals} title="Netflix Original" />
              <RowPost url={action} title="Action" isSmall />
              <RowPost url={ComedyMovies} title="ComedyMovies" isSmall />
              <RowPost url={HorrorMovies} title="HorrorMovies" isSmall />
              <RowPost url={RomanceMovies} title="RomanceMovies" isSmall />
              <RowPost url={Documentaries} title="Documentaries" isSmall />
            </>
          }
        />

        <Route path="/details/:id" element={<MovieDetails />} />
      </Routes>
    </>
  );
}
export default App;
