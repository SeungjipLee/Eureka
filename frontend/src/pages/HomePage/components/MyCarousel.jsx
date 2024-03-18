import { useState, useEffect } from "react"
import { getPayCard } from "../../../apis/MyCard"
import { useSelector, useDispatch } from "react-redux"


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

  

  return 
}

export default MyCarousel