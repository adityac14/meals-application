import "./App.css";
import { useGlobalContext } from "./Context";
import Favourites from "./components/Favourites";
import Meals from "./components/Meals";
import Modal from "./components/Modal";
import Search from "./components/Search";


function App() {
  const {showModal, favourites} = useGlobalContext()
  return (
    <main>
      <Search />
      {favourites.length > 0 && <Favourites />}
      <Meals />
      {showModal && <Modal />}
      {/* Showing Modal based on AND operator  */}
    </main>
  );
}

export default App;
