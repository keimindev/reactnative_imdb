//vertical media
import React from "react"
import styled from "styled-components/native";
import Poster from "./Poster"
import Votes from "./Votes"


interface VMediaProps {
    posterPath: string;
    originalTitle: string;
    voteAverage: number;
}

const VMedia: React.FC<VMediaProps> = ({
    posterPath,
    originalTitle,
    voteAverage,
}) =>{
    return(
        <Movies>
        <Poster path={posterPath}/>
        <Title>
          {originalTitle.slice(0,13)}
          {originalTitle.length > 13 ? "..." : null}
       </Title>
       <Votes votes={voteAverage}/>
       </Movies>
    )
}

export default VMedia;

const Movies = styled.View`
margin-right: 20px;
align-items: center;
`;

const Title = styled.Text`
margin-top: 7px;
margin-bottom: 5px;
font-weight: 600;
`