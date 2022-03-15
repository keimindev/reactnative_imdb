import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native';
import Swiper from 'react-native-web-swiper';
import { ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import Slide from "../components/Slide"
import Poster from '../components/Poster';

const API= "";

const { height : SCREEN_HEIGHT} = Dimensions.get("window");

const Movie = () => {
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
      await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API}&language=en-US&page=1&region=KR`
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

  return loading ? (
      <Loader>
        <ActivityIndicator size="large"/>
      </Loader>
      ) : (
      <Container>
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
          <Movies key={movie.id}>
           <Poster path={movie.poster_path}/>
           <Title>
             {movie.original_title.slice(0,13)}
             {movie.original_title.length > 13 ? "..." : null}
          </Title>
           <Votes>⭐{movie.vote_average}/10</Votes>
          </Movies>
        )}
        </TrendingScroll>
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

const Movies = styled.View`
margin-right: 20px;
align-items: center;
`;

const TrendingScroll = styled.ScrollView`
margin-top: 20px;
`;

const Title = styled.Text`
margin-top: 7px;
margin-bottom: 5px;
font-weight: 600;
`
const Votes = styled.Text``