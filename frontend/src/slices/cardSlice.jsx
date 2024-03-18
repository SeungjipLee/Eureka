import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ownCardList: [],
  payCardList: [],
}

export const cardSlice = createSlice({
  name: 'cardList',
  initialState,
  reducers: {
    addOwnCardList: (state, action) => {
      state.ownCardList = [...state.ownCardList, action.payload]
    },
    deleteOwnCardList: (state, action) => {
      state.ownCardList = state.ownCardList.filter(card => card.id !== action.payload)
    },
    addPayCardList: (state, action) => {
      state.payCardList = [...state.payCardList, action.payload]
    },
    deletePayCardList: (state, action) => {
      state.payCardList = state.payCardList.filter(card => card.id !== action.payload)
    },
  },
})


export const { addOwnCardList, deleteOwnCardList, addPayCardList, deletePayCardList } = cardSlice.actions

export default cardSlice.reducer