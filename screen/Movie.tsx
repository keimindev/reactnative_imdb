import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native';
import Swiper from 'react-native-web-swiper';
import { ActivityIndicator, Dimensions, ScrollView, FlatList, RefreshControl, View } from 'react-native';
import Slide from "../components/Slide"
import Poster from '../components/Poster';
import HMedia from '../components/HMedia';
import VMedia from '../components/VMedia';

const API= "feca8300f5c42ab3cd4377d97d9a37f2";

const { height : SCREEN_HEIGHT} = Dimensions.get("window");

const Movie = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [nowPlaying, setNowPlaying] = useState([])
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([])

  const getTrending = async() =>{
    const { results } = await (
      await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API}`
    )).json()
    setTrending(results)

  }
  const getUpcoming = async() =>{
    const { results } = await (
      await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API}&language=en-US&page=1`
    )).json()
    setUpcoming(results)

  }

  const getNowPlaying = async() => {
    const { results } = await (
      await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API}&language=en-US&page=1&region=KR`
    )).json()
    setNowPlaying(results)
  
  }

  const getData = async() =>{
    //wait fro all of them
    await Promise.all([    
      getNowPlaying(),
      getTrending(),
      getUpcoming()])

    setLoading(false)
  }

  useEffect(() =>{
    getData();
  },[])

  //refresh screen 
  const onRefresh = async() => {
    setRefreshing(true);
    await getData();
    setRefreshing(false)
  }

  return loading ? (
      <Loader>
        <ActivityIndicator size="large"/>
      </Loader>
      ) : (
      <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
      <>
      <Swiper 
        loop 
        timeout={3.5}
        controlsEnabled={false}
        containerStyle={{width: "100%", height:SCREEN_HEIGHT / 3, marginBottom: 20}}>
            {nowPlaying.map((movie) => <Slide key={movie.id} 
                backdrop_path={movie.backdrop_path}
                poster_path={movie.poster_path}
                original_title={movie.original_title}
                vote_average={movie.vote_average}
                overview={movie.overview}
            />)}
        </Swiper>
        <ListContainer>
        <ListTitle>Trending Movies</ListTitle>
        <TrendingScroll
           data={trending}
           //transfer to string
           keyExtractor={(item) => item.id + ""}
           horizontal
           showsHorizontalScrollIndicator={false}
           contentContainerStyle={{ paddingHorizontal: 30 }}
           ItemSeparatorComponent={() => <View  style={{width: 20}} />}
           renderItem={({item}) => (
           <VMedia 
           posterPath={item.poster_path}
           originalTitle={item.original_title}
           voteAverage={item.vote_average} 
         />
         )}
        />
        </ListContainer>
        <ComingsoonTitle>Coming soon</ComingsoonTitle>
        </>
        }

        data={upcoming}
        keyExtractor={(item) => item.id + ""}
        ItemSeparatorComponent={() => <View  style={{height : 30}} />}
        renderItem={({item}) => (
          <HMedia
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            voteAverage={item.vote_average}
            overview={item.overview}
            releaseDate = {item.release_data} 
        />
        )}
    />

  )
}

export default Movie


const Loader = styled.View`
flex: 1;
justify-content: center;
align-items: center;
`;

const ListContainer = styled.View``

const ListTitle = styled.Text`
color: #222;
font-size: 16px;
font-weight: 600;
margin-left: 20px;
`;



const TrendingScroll = styled.FlatList`
margin-top: 20px;
`;


const ComingsoonTitle = styled(ListTitle)`
margin-top: 20px;
margin-bottom: 20px;
`;
