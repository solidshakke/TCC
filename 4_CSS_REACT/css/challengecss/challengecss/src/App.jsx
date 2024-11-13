import './App.css'
import Car from './components/Car';


function App() {
  const myCars = [
    {name: "Fusca", km: 10000, color: "Branca"},
    {name: "Polo", km: 197550, color: "Vermelha"},
    {name: "Onix", km: 0, color: "Preto"},
  ];
  return (

      <div className="App">
        <h1>Showroom de Carros</h1>
        <div className="car-container">
          {myCars.map((car) => (
            <Car car={car} />
          ))}
        </div>


      </div>
  )
}

export default App
