import './compoCard.css'

function CompoCard({data, editMode}) {
    return (
        <div className='compoCard'>
            <h3>{data.name}</h3>
            <div className='compoCardHeader'>
                <div className='compoCardChamp'>
                    <img src={`http://ddragon.leagueoflegends.com/cdn/13.17.1/img/champion/${data.champion}.png`} />
                </div>
                <div className='compoCardRune'>
                    {
                        data.runePrimary ?
                        <div className='compoCardRunePrimary'>
                            <img src={`https://ddragon.canisback.com/img/${data.runePrimary.icon}`} />
                        </div>
                        :
                        null
                    }
                    {
                        data.runeSecondary ?
                        <div className='compoCardRuneSecondary'>
                            <img src={`https://ddragon.canisback.com/img/${data.runeSecondary.icon}`} />
                        </div>
                        :
                        null
                    }
                    
                    
                </div>
            </div>
            <div className='compoCardFooter'>
                
            </div>
        </div>
    )
}

export default CompoCard