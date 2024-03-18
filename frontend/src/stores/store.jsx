import { configureStore } from '@reduxjs/toolkit'
import cardSlice from '../slices/cardSlice'

export const store = configureStore({
  reducer: {
    cardList: cardSlice,
  },
})