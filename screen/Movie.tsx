import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native';
import Swiper from 'react-native-web-swiper';
import { ActivityIndicator, Dimensions, ScrollView, RefreshControl } from 'react-native';
import Slide from "../components/Slide"
import Poster from '../components/Poster';
import HMedia from '../components/HMedia';
import VMedia from '../components/VMedia';

const API= "";

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
      <Container
      refreshControl ={<RefreshControl onRefresh={onRefresh} refreshing ={refreshing} />}>
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
        <ListTitle>Trending Movies</ListTitle>
        <TrendingScroll
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{paddingLeft: 30}}>
          {trending.map( movie => 
              <VMedia 
              key={movie.id} 
              posterPath={movie.poster_path}
              originalTitle={movie.original_title}
              voteAverage={movie.vote_average} 
            />
        )}
        </TrendingScroll>
        <ComingsoonTitle>Coming soon</ComingsoonTitle>
        {upcoming.map(movie => 
        <HMedia key={movie.id} 
                posterPath={movie.poster_path}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
                releaseDate = {movie.release_data} 
          />)}
        </Container>
  )
}

export default Movie

const Container = styled.ScrollView`

`
const Loader = styled.View`
flex: 1;
justify-content: center;
align-items: center;
`;

const ListTitle = styled.Text`
color: #222;
font-size: 16px;
font-weight: 600;
margin-left: 20px;
`;



const TrendingScroll = styled.ScrollView`
margin-top: 20px;
`;


const ComingsoonTitle = styled(ListTitle)`
margin-top: 20px;
margin-bottom: 20px;
`;
