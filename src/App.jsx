import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChampionCard from './components/championCard/championCard'
import axios from 'axios'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { incremment } from './app/features/counterSlice'
import Navbar from './components/navbar/navbar'
import { useNavigate } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";


function App() {
  const myData = useSelector((state)=>state.counter)
	const dispatch = useDispatch()
  const [data, setData] = useState([]);
  const [filter, setfilter] = useState("");
  const [activeSearch, setActiveSearch] = useState(false)
  const navigate = useNavigate()

  function isInFav(id) {
    myData.favChamp.forEach(champ => {
      if (champ == id) {
        return true
      }
    });
    return false
  }

  



  useEffect(() =>{
    fetch('http://ddragon.leagueoflegends.com/cdn/13.24.1/data/fr_FR/champion.json')
    .then((response) => response.json())
    .then((jsonData) => {
      const championData = Object.values(jsonData.data); // Extract the array of champions
      setData(championData);
    })
    .catch((error) => console.error(error))
  },[])

  console.log(data);
  return (
    <div className='mainPage'>
        <h1>{filter}</h1>
        <input type='text' onChange={(e)=>{setfilter(e.target.value.toLowerCase())}} className={activeSearch ? 'inputSearch active' : 'inputSearch'}/>
        <div className="searchBtn" onClick={()=>{setActiveSearch(!activeSearch)}}>
          <FaSearch />
        </div>
        <Navbar data={data} myData={myData}/>
        <div className='allChampion'>
            {
              data.map((champion, index) => {
                if(champion.id.toLowerCase().includes(filter))
                return <ChampionCard key={index} championData={champion} fav={isInFav(champion.id)}/>
              })
            }
        </div>
    </div>

    
  );
}

export default App;

