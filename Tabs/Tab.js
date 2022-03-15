import react from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../screen/Search';
import Tv from '../screen/Tv';
import Movie from '../screen/Movie';
import { YELLOW_COLOR, BLACK_COLOR } from '../color';
import { Ionicons } from 'react-native-vector-icons'
import { useColorScheme } from 'react-native';

const Tab = createBottomTabNavigator();

const Tabs = () =>{
    const isDark = useColorScheme() ==="dark"
    return (
        <Tab.Navigator 
        sceneContainerStyles={{
            backgroundColor: isDark ? BLACK_COLOR : "white"
        }}
    
        screenOptions={{
            tabBarStyle: {
                backgroundColor: isDark ? BLACK_COLOR : "white"
                } , 
                tabBarActiveTintColor: isDark ?  YELLOW_COLOR : BLACK_COLOR,
               headerStyle:{
                height: 50,
                 backgroundColor: isDark? BLACK_COLOR : "white",
               }, 
               headerTitleStyle : {
                 color: isDark ? "white" : BLACK_COLOR,
                 fontSize: 13,
                 textAlign: "center",
               },
               tabBarLabelStyle: {
                 marginTop: -5,
                 fontSize: 12,
                 fontWeight:"600",
               }
        }}>
            <Tab.Screen name="Movie" component={Movie} options={{ tabBarIcon : ({focused, color, size}) => {
                return <Ionicons name="film-outline" color={color} size={size} />},
            }}/>
            <Tab.Screen name="Tv" component={Tv} options={{ tabBarIcon : ({focused, color, size}) => {
                return <Ionicons name="tv-outline" color={color} size={size} />},
            }}/>
            <Tab.Screen name="Search" component={Search} options={{ tabBarIcon : ({focused, color, size}) => {
                return <Ionicons name="search-outline"  color={color} size={size} />},
            }}/>
        </Tab.Navigator>
    )
}

export default Tabs