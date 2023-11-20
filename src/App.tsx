import AppCss from "./App.module.css";
import RepositoriesList from "./components/repositoriesList/RepositoriesList";

function App() {
  return (
    <>
      <p className={AppCss.paragraph}>MVST - Work in Progress!</p>
      <RepositoriesList>
        <li>Hola</li>
        <li>Adios</li>
      </RepositoriesList>
    </>
  );
}

export default App;
