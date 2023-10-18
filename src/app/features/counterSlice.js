import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 5,
        favChamp: ['Aatrox'],
        compositions:
        [
            {
                "name" : 'Build de la mort qui tue',
                "champion" : 'Aatrox',
                "runePrimary" :{
                    "id": 8100,
                    "key": "Domination",
                    "icon": "perk-images/Styles/7200_Domination.png",
                    "name": "Domination",
                    "slots": []
                },
                "runeSecondary" : {
                    "id": 8300,
                    "key": "Inspiration",
                    "icon": "perk-images/Styles/7203_Whimsy.png",
                    "name": "Inspiration",
                    "slots": []
                }
            }
        ],
        lastId: 0
        
    },
    reducers : {
        incremment : (state) => {state.value += 1},
		decrement : (state) => {state.value -= 1},
        handleFavChamp : (state, actions) =>{
            let newFav = true
            for (let index = 0; index < state.favChamp.length; index++) {
                if (state.favChamp[index] == actions.payload) {
                    state.favChamp.splice(index, 1)
                    newFav = false
                }
                
            }
            if (newFav) {
                state.favChamp.push(actions.payload)
            }
        },
        handleCompo : (state, actions) =>{
                if (actions.payload.id == -3) {
                    let newComposition = actions.payload
                    state.lastId = state.lastId + 1 
                    newComposition.id = state.lastId
                    state.compositions.push(newComposition)
                }else{
                    for (let index = 0; index < state.compositions.length; index++) {
                        if (state.compositions[index].id == actions.payload.id) {
                            newCompo = false
                            state.compositions[index] = actions.payload
                        }
                        
                    }
                }

               
                
        }

    }
})

export const {incremment, decrement, handleFavChamp, handleCompo} = counterSlice.actions
export default counterSlice.reducer