import React, { useRef, useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import ImagedCarouselCard from "react-native-imaged-carousel-card";


const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = 300;
const ITEM_HEIGHT = 150;

function MyCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const data = [
    { title: '삼성 tap tap O 카드', image: require('../../../../assets/card.png') },
    { title: '삼성 tap tap O 카드', image: require('../../../../assets/card.png') },
    { title: '삼성 tap tap O 카드', image: require('../../../../assets/card.png') },
    // 추가 카드 데이터...
  ];

  const renderItem = ({item, index}) => {
    const isActive = index === activeIndex;
    return (
      <View style={[styles.itemContainer, styles.case, {height: isActive ? ITEM_HEIGHT * 1.2 : ITEM_HEIGHT}]}>
        <ImagedCarouselCard
          width={ITEM_WIDTH}
          height={isActive ? ITEM_HEIGHT * 1.2 : ITEM_HEIGHT}
          shadowColor="#051934"
          source={item.image}
        />
        <Text style={styles.name}>{item.title}</Text>
      </View>
    );
  };

  return (
    <View>
      <Carousel
        ref={carouselRef}
        data={data}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setActiveIndex(index)}
        activeSlideAlignment={'center'}
        inactiveSlideScale={0.8}
        inactiveSlideOpacity={0.7}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column', // 요소들을 세로로 정렬
    paddingBottom: 20, // 하단 패딩 추가하여 텍스트를 위한 공간 확보
  },
  name: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10, // 이미지와 텍스트 사이의 마진 추가
  },
  case: {
    marginTop: 40,
    marginBottom: 20,
  }
});

export default MyCarousel;
