import './championCard.css'
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { handleFavChamp } from '../../app/features/counterSlice';
import { useNavigate } from 'react-router-dom';

function ChampionCard({championData, fav}) {
    const navigate = useNavigate()
    const myData = useSelector((state)=>state.counter)
    const dispatch = useDispatch()
    function handleFav() {
        dispatch(handleFavChamp(championData.id))
        console.log(myData.favChamp);
    }
    function isInFav() {
        let result = false
        myData.favChamp.forEach(champ => {
            if (champ == championData.id) {
                result = true
            }
        });
        return result
    }

    function goToChampionDetail(name) {
        navigate(`/champion/${name}`)
    }
    return (
        <div className='championCard'>
            {
                isInFav() ?
                <FaStar onClick={()=>{handleFav()}} className='starFav'/>:
                <FaRegStar onClick={()=>{handleFav()}} className='star'/>
            }
            <div className='championCardTitle' onClick={()=>{goToChampionDetail(championData.id)}}>
                <span className='name'>{championData.name}</span>
                <span>{championData.title}</span>
            </div>
            <img className='championCardImg' src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championData.id}_0.jpg`}/>
        </div>
    )
}

export default ChampionCard