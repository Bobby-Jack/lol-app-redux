import Navbar from "../../components/navbar/navbar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ItemCard from "../../components/itemCard/ItemCard";
import './ItemPage.css'

function ItemPage() {
    const [data, setData] = useState([]);
    const [itemsData, setItemData] = useState([]);
    const [items, setItems] = useState([]);
    const myData = useSelector((state)=>state.counter)
	const dispatch = useDispatch()

    useEffect(() =>{
        fetch('http://ddragon.leagueoflegends.com/cdn/13.17.1/data/fr_FR/champion.json')
        .then((response) => response.json())
        .then((jsonData) => {
        const championData = Object.values(jsonData.data); // Extract the array of champions
        setData(championData);
        })
        .catch((error) => console.error(error))

        fetch('https://ddragon.leagueoflegends.com/cdn/13.17.1/data/fr_FR/item.json')
        .then((response) => response.json())
        .then((jsonData) => {
        const items = Object.values(jsonData.data); // Extract the array of champions
        setItemData(items);
        })
        .catch((error) => console.error(error))
        for (const key in itemsData) {
            setItems(items.push({"id" : key, "content" : itemsData[key]}))
        }
        console.log(itemsData);
        console.log(itemsData);
    },[])



    return (
        <div className="mainPage">
            <Navbar data={data} myData={myData}/>
            <div className="allItems">
                {
                    itemsData.map((item, index) => {
                        if (item.gold.purchasable) {
                            return <ItemCard key={index} item={item}/>
                        }
                    })
                }
            </div>
        </div>
    )
}

export default ItemPage