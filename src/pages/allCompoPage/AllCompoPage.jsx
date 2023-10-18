import './AllCompoPage.css'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CompoCard from '../../components/compoCard/compoCard';
import Navbar from '../../components/navbar/navbar';
import {HiPlus} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom';


function AllCompoPage() {
    const [data, setData] = useState([]);
    const myData = useSelector((state)=>state.counter)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function createComposition() {
        navigate('/createComposition')
    }

    useEffect(() =>{
        fetch('http://ddragon.leagueoflegends.com/cdn/13.17.1/data/fr_FR/champion.json')
        .then((response) => response.json())
        .then((jsonData) => {
        const championData = Object.values(jsonData.data); // Extract the array of champions
        setData(championData);
        })
        .catch((error) => console.error(error))
    },[])

    return (
        <div className="mainPage">
            <Navbar data={data} myData={myData}/>
            
            <div className='allCompo'>
                <div className='newComp' onClick={()=>{createComposition()}}>
                    <h1><HiPlus/></h1>
                    <span>Nouvelle composition</span>
                </div>
                {
                    myData.compositions.map((compo, index)=>{
                        return <CompoCard data={compo} key={index}/>
                    })
                }
            </div>
            
        </div>
    )

}

export default AllCompoPage