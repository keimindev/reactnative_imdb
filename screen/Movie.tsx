import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native';
import Swiper from 'react-native-web-swiper';
import { ActivityIndicator, Dimensions, ScrollView, FlatList, RefreshControl, View } from 'react-native';
import Slide from "../components/Slide"
import HMedia from '../components/HMedia';
import VMedia from '../components/VMedia';
import { useQuery, useQueryClient } from 'react-query';
import { Moive, moviesAPI } from "../api"


const { height : SCREEN_HEIGHT} = Dimensions.get("window");

const Movie = () => {
  const queryClient = useQueryClient();
  //reactquery ""(query key) caching 때문에 필요. useEffect로 fetch를 하면 data를 새로 fetch해야하지만 reactQuery를 쓰면 그럴 필요가 없다
  //스크린별로 캐싱을 다르게 해줘야한다. 같은 쿼리를 사용한다면 쿼리가 다시 일어나지 않는다. 
  const {
    isLoading:nowPlayingloaing , 
    data: nowPlayingData, 
    // refetch: refetchNowPlaying,
    isRefetching: isRefetchingNowPlaying,
  }  = useQuery(["movies","nowPlaying"], moviesAPI.nowPlaying)
  const {
    isLoading:trendingloaing, 
    data: trendingData, 
    // refetch: refetchTrending,
    isRefetching: isRefetchingTrending,
  }  = useQuery(["movies", "getTrending"], moviesAPI.getTrending)
  const {
    isLoading:upcomingloaing, 
    data: upcomingData, 
    // refetch: refetchUpComing,
    isRefetching: isRefetchingUpcoming,
  }  = useQuery(["movies","getUpcoming"], moviesAPI.getUpcoming)

  //refresh screen 
  const onRefresh = () => {
    queryClient.refetchQueries(["movies"])
  }

  const renderVMedia = ({item}) =>(
    <VMedia 
    posterPath={item.poster_path}
    originalTitle={item.original_title}
    voteAverage={item.vote_average} 
  />
  )

  const renderHMedia = ({item}) => (
    <HMedia
    posterPath={item.poster_path}
    originalTitle={item.original_title}
    voteAverage={item.vote_average}
    overview={item.overview}
    releaseDate = {item.release_data} 
/>
  )

  const movieKeyExtractor = (item: Moive) => item.id + "";
  const loading = nowPlayingloaing || upcomingloaing || trendingloaing;
  const refreshing = isRefetchingNowPlaying || isRefetchingTrending || isRefetchingUpcoming;

  return loading  ? (
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
            {nowPlayingData.results.map((movie) => <Slide key={movie.id} 
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
           data={trendingData.results}
           //transfer to string
           keyExtractor={movieKeyExtractor}
           horizontal
           showsHorizontalScrollIndicator={false}
           contentContainerStyle={{ paddingHorizontal: 30 }}
           ItemSeparatorComponent={VSeperator}
           renderItem={renderVMedia}
        />
        </ListContainer>
        <ComingsoonTitle>Coming soon</ComingsoonTitle>
        </>
        }

        data={upcomingData.results}
        keyExtractor={movieKeyExtractor}
        ItemSeparatorComponent={HSeperator}
        renderItem={renderHMedia}
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


const VSeperator = styled.View`
width: 20px; `
const HSeperator = styled.View`
height: 30px;`