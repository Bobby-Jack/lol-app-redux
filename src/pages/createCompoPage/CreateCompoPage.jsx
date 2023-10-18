import './CreateCompoPage.css'
import { useEffect } from 'react';
import Navbar from '../../components/navbar/navbar';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { handleCompo } from '../../app/features/counterSlice';
import { useNavigate } from 'react-router-dom';
import LoadingRoll from '../../components/LoadingRoll/LoadingRoll';

function CreateCompoPage() {
    
    const [data, setData] = useState(null);
    const [runeData, setRuneData] = useState(null);
    const myData = useSelector((state)=>state.counter)
    const dispatch = useDispatch()
    const [compoName, setCompoName] = useState('')
    const [compoChamp, setCompoChamp] = useState('')
    const navigate = useNavigate()

    const [prim, setPrim] = useState(-5);
    const [sec, setSec] = useState(-5);

    function updatePrimary(id) {
        if (id == prim) {
            setPrim(-5)
        }else{
            setPrim(id)
            if (sec == id) {
                setSec(-5)
            }
        }
    }
    function updateSecondary(id) {
        if (id == sec) {
            setSec(-5)
        }else{
            setSec(id)
            if (id == prim) {
                setPrim(-5)
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetch('http://ddragon.leagueoflegends.com/cdn/13.17.1/data/fr_FR/champion.json')
            .then((response) => response.json())
            .then((jsonData) => {
            const championData = Object.values(jsonData.data); // Extract the array of champions
            setData(championData);
            })
            .catch((error) => console.error(error))

            await fetch('https://ddragon.leagueoflegends.com/cdn/13.17.1/data/fr_FR/runesReforged.json')
            .then((response) => response.json())
            .then((jsonData) => {
            const d = Object.values(jsonData); // Extract the array of champions
            setRuneData(d);
            
            })
            .catch((error) => console.error(error))
        }
        fetchData()
        
    },[])

    function updateCompoName() {
        let d = document.querySelector('.compoNameInput').value.toLowerCase()
        setCompoName(d)
    }
    function updateCompoChamp() {
        let d = document.querySelector('.compoChampInput').value.toLowerCase()
        setCompoChamp(d)
    }

    function isValid() {
        let result = false
        data.forEach(champ => {
            console.log(`${champ.id.toLowerCase()} ?= ${compoChamp}`);
            if (champ.id.toLowerCase() == compoChamp) {
                if (sec != prim && sec != -5 && prim != -5) {
                    result = true
                }
            }
        });
        return result
    }
    
    function capitalizeFirstLetter(str) {
        const firstLetter = str.charAt(0);
        const uppercaseFirstLetter = firstLetter.toUpperCase();
        const remainingLetters = str.slice(1);
        return uppercaseFirstLetter + remainingLetters;
    }

    function validate() {
        if (isValid()) {
            let send = {
                "runePrimary" : runeData[prim],
                "runeSecondary" : runeData[sec],
                "id" : -3,
                "name" : compoName,
                "champion" : capitalizeFirstLetter(compoChamp)
            }
            dispatch(handleCompo(send))
            navigate('/compositions')
        }else{
            alert('bad champ name')
        }
        
    }



    return (
        data ?
        <div className='mainPage'>
            <Navbar data={data} myData={myData}/>
            <div className='compoCreate'>
                <input  type='text' className='compoNameInput' onChange={()=>{
                    updateCompoName()
                }} placeholder='Entrez le nom de la composition'/>
                <input onChange={()=>{updateCompoChamp()}} className='compoChampInput' type='text' placeholder='Choisissez un champion'/>
                
                <h2>Rune primaire</h2>
                <div className='runeList'>
                    {
                        runeData ?
                        <>
                        {
                            runeData.map((perk, index)=>{
                                
                                    return (
                                        <div key={index} className={prim==index ? 'rune active' : sec==index ? 'rune other' : 'rune'}>
                                            <img onClick={()=>{updatePrimary(index)}}    src={`https://ddragon.canisback.com/img/${perk.icon}`}/>
                                        </div>
                                    )
                                
                                
                            })
                        }
                        </>
                        
                        :
                        <span>Chargement des runes</span>
                    }
                </div>
                <h2>Rune secondaire</h2>
                <div className='runeList'>
                    {
                        runeData ?
                        <>
                        {
                            runeData.map((perk, index)=>{
                                
                                    return (
                                        <div key={index} className={sec==index ? 'rune active' : prim==index ? 'rune other' : 'rune'}>
                                            <img onClick={()=>{updateSecondary(index)}}   src={`https://ddragon.canisback.com/img/${perk.icon}`}/>
                                        </div>
                                    )
                                
                                
                            })
                        }
                        </>
                        
                        :
                        <span>Chargement des runes</span>
                    }
                </div>
                <h1>{prim}+{sec}</h1>
                <button className='validateBtn' onClick={()=>{validate()}}>validate</button>
            </div>
        </div>
        :
        <LoadingRoll/>
        
    )

}

export default CreateCompoPage