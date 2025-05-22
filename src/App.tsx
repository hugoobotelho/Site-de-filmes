import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom"
import SideBar from "./components/SideBar"
import HomeScreen from "./screens/HomeScreen"
import ListMoviesScreen from "./screens/ListMoviesScreen"
import GenresScreen from "./screens/GenresScreen"
import YearsScreen from "./screens/YearsScreen"
import Header from "./components/Header"

import { GenreProvider } from "./contexts/ContextGenres"
import { MovieProvider } from "./contexts/ContextMovies"

function App() {

  const Rotas = () => (
    <div style={{ display: 'flex', minHeight: '100vh', padding: '0px' }}>
      <SideBar />
      <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
        <Header />
        <div style={{ flex: 1, paddingLeft: '0px' }}>
          <Routes>
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/topRated" element={<ListMoviesScreen />} />
            <Route path="/trending" element={<ListMoviesScreen />} />
            <Route path="/ListMovies/Genres/:id" element={<ListMoviesScreen />} />
            <Route path="/ListMovies/Year/:year" element={<ListMoviesScreen />} />
            <Route path="/genres" element={<GenresScreen />} />
            <Route path="/years" element={<YearsScreen />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </div>
      </div>
    </div>
  );


  return (
    <Router  basename={import.meta.env.VITE_BASE_PATH || "/Site-de-filmes"}>
      <MovieProvider>
        <GenreProvider>
          <Routes>
            <Route path="/*" element={<Rotas />} />
          </Routes>
        </GenreProvider>
      </MovieProvider>
    </Router>
  )
}

export default App