import React from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
import styled from "styled-components/native"
import { makeImgPath } from "../utils";
import { BlurView } from 'expo-blur'
import Poster from "./Poster";

interface SlideProps {
    backdrop_path: string;
    poster_path: string;
    original_title: string;
    vote_average: number;
    overview: string;
}

const Slide: React.FC<SlideProps> = ({
    backdrop_path,
    poster_path,
    original_title,
    vote_average,
    overview,
}) => {
  const isDark = useColorScheme() === "dark";
    return (
        <View style={{flex: 1}}>
        <BgImg
         style={StyleSheet.absoluteFill} 
         source={{uri:makeImgPath(backdrop_path)}}
         />
    
        <BlurView
          tint = { isDark ? "dark" : "light"} 
          intensity={100} style={StyleSheet.absoluteFill}>
            <Wrapper>
              <Poster path={poster_path} />
              <Column>
                <Title isDark={isDark}>{original_title}</Title>
                {vote_average > 0 ? <Votes isDark={isDark}>⭐{vote_average}/10</Votes>  : null}
                <Overview isDark={isDark}>{overview.slice(0,70)}...</Overview>
              </Column>
          </Wrapper>
        </BlurView>
      </View>
    )
}

 export default Slide;


    
const Wrapper = styled.View`
flex-direction: row;
height: 100%;
justify-content: center;
align-items: center;
`;
const Column = styled.View`
width: 40%;
margin-left: 15px;
`

const BgImg = styled.Image`
/* styleSheet replaced */
/* width: 100%;
height: 100%;
position: absolute; */

`

const Title = styled.Text<{isDark: boolean}>`
font-size: 16px;
font-weight: 600;
color: ${(props) => (props.isDark ? "white" : props.theme.textColor )};
`;

const Overview = styled.Text`
color: rgba(255,255,255, 0.6);
margin-top: 10px;

`;

const Votes = styled(Overview)`
margin-top: 5px;
font-size: 12px;
`

