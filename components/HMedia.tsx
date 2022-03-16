//horizontal media
import React from "react"
import styled from "styled-components/native"
import Poster from '../components/Poster';
import Votes from "./Votes";


interface HMediaProps {
    posterPath: string;
    originalTitle: string;
    overview: string;
    releaseDate?: string;
    voteAverage: number;
}

const HMedia: React.FC<HMediaProps> = ({
    posterPath,
    originalTitle,
    overview,
    releaseDate,
    voteAverage
}) => {
    return(
        <HMovie>
        <Poster path={posterPath}/>
         <HColumn>
           <Title>{originalTitle.length > 30 ? `${originalTitle.slice(0,30)}...`: originalTitle }</Title>
           <Release>{new Date(releaseDate).toLocaleDateString("ko")}</Release>
           {voteAverage ? <Votes votes={voteAverage} /> : null}
           <Overview>{overview !== "" && overview.length > 80 ? `${overview.slice(0, 140)}...` : overview}</Overview>
        
         </HColumn>
      </HMovie>
    )

}


export default HMedia;


const HMovie = styled.View`
padding: 0 30px;
flex-direction: row;
`;

const HColumn = styled.View`
margin-left: 15px;
width: 80%;

`
const Overview = styled.Text`
width: 80%;
`

const Release = styled.Text`
font-size: 12px;
margin-vertical: 10px;
`

const Title = styled.Text`
margin-top: 7px;
margin-bottom: 5px;
font-weight: 600;
`