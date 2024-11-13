
import './App.css';
import City from './assets/city.jpg';
import ListRender from './components/ListRender';
import ManageData from './components/ManageData';
import ConditionalRender from './components/ConditionalRender';
import ShowUserName from './components/ShowUserName';
import CarDetails from './components/CarDetails';
import Fragment from './components/Fragment';
import { useState } from 'react';
import Container from './components/Container';
import ExecuteFunction from './components/ExecuteFunction';
import Message from './components/Message';
import ChangeMessageState from './components/ChangeMessageState';
import UserDetails from './components/UserDetails';


function App() {
  //const name = "Joaquim";
  const [userName] = useState ("Maria");
  const cars =[
    {id: 1, brand: "Ferrari", color: "Amarela", newCar: true, km: 0},
    {id: 2, brand: "KIA", color: "Branco", newCar: false, km: 34343},
    {id: 3, brand: "Renault", color: "Azul", newCar: false, km: 234},
  ];

  function showMessage (){
    console.log("Evento do componente pai!");
  }

  const [message, setMessage] = useState ("");

  const handleMessage = (msg) => {
    setMessage(msg);
  };

  const users = [
    {id: 1, name: "Matheus", job: "Programador", age: 31},
    {id: 2, name: "Maria", job: "Advogada", age: 40},
    {id: 3, name: "Josias", job: "Estagiário", age: 17},
    {id: 4, name: "Alexandre", job: "Estudante", age: 11},
  ]

  return(
    <div className="App">
      <h1>Acançando em React</h1>
      {/* Imagem em public */}
      <div>
        <img src="/img1.jpg" alt="Paisagem" />
      </div>
      {/* Imagem em assets*/}
      <div>
        <img src={City} alt="Cidade" />
      </div>
      <ManageData />
      <ListRender />
      <ConditionalRender />
      {/* props */}
      <ShowUserName name={userName} />
      {/* destructuring */}
      <CarDetails brand="VW" km={100000} color="Azul" newCar={false}/>
      {/* reaproveitando */}
      <CarDetails brand="Ford" km={0} color="Vermelha" newCar={true} />
      <CarDetails brand="Fiat" km={4500} color="Branco" newCar={false} />
      {/* loop em array de objetos */}
      {cars.map((car) => (
        <CarDetails
          key={car.id} 
          brand={car.brand}
          color={car.color}
          km={car.km}
          newCar={car.newCar}
        />
      ))}
      {/* fragment */}
      <Fragment propFragment="teste" />
      {/* children */}
      <Container myValue="testing">
        <p>E este é o conteúdo</p>
      </Container>
      <Container myValue="testing 2">
        <h5>Testando o container</h5>
      </Container>
      {/* executar função */}
      <ExecuteFunction myFunction={showMessage}/>
      {/* state lift */}
      <Message msg={message}/>
      <ChangeMessageState handleMessage={handleMessage} />
      {/* desafio */}
      {users.map((user) => (
        <UserDetails 
        key={user.id} 
        name={user.name} 
        job={user.job} 
        age={user.age}
        />
      ))}
    </div>
  );

}

export default App;
