import { useState, useEffect } from "react"
import { getPayCard } from "../../../apis/MyCard"
import { useSelector, useDispatch } from "react-redux"
import { FlatList } from "react-native-reanimated/lib/typescript/Animated"


function MyCarousel () {
  const [ payCardList, setPayCardList ] = useState([])

  useEffect(() => {
    const response = getPayCard(
      token,
      (res) => {
        setPayCardList(res.data.data.cards)
      },
      (err) => console.log(err)
    )
  }, [])

  

  return   // <FlatList />
}

export default MyCarousel