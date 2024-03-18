import './navbar.css'
import {CgClose} from 'react-icons/cg'
import {FaTrash} from 'react-icons/fa'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleFavChamp } from '../../app/features/counterSlice';
import { useNavigate } from 'react-router-dom';

function Navbar({myData}) {
    const [active, setActive] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function allChampion() {
        navigate('/')
    }
    function allItems() {
        navigate('/items')
    }
    function compo() {
        navigate('/compositions')
    }

    function handleFav(championId) {
        dispatch(handleFavChamp(championId))
    }
    return (
        <>
        <div className={`favModal ${active ? 'active' : ''}`}>
            <div className='favModalHead'>
                <CgClose onClick={()=>{setActive(false)}} className='closeFavModal'/>
            </div>
            <div className='favChampionList'>
                {
                    myData.favChamp.map((championId, index)=>{
                        return <div key={index} className='favChampion'>
                            <img src={`http://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${championId}.png`} />
                            {championId}
                            <FaTrash className='removeFav' onClick={()=>{handleFav(championId)}}/>
                        </div>
                    })
                }
            </div>
        </div>
        <div className='navbar'>
            <img onClick={()=>{allChampion()}} className='title' src='https://logosmarcas.net/wp-content/uploads/2020/11/League-of-Legends-Logo.png'/>
            <a onClick={()=>{allChampion()}}>Champions</a>
            <a onClick={()=>{setActive(true)}}>Champions favoris</a>
            <a onClick={()=>{allItems()}} >Objets</a>
            <a onClick={()=>{compo()}}>Compositions</a>
        </div>
        </>
    )
}

export default Navbar