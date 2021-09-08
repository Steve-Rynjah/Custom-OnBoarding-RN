import React, {useState} from 'react';

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnBoardingScreen from './views/OnBoardingScreen';
import HomeScreen from './views/HomeScreen';

const App = () =>{
    const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);

    useEffect(async()=>{
        const appData = await AsyncStorage.getItem('isAppFirstLaunched')
        if(appData === null){
            setIsAppFirstLaunched(true)
            AsyncStorage.setItem('isAppFirstLaunched', 'false')
        } else {
            setIsAppFirstLaunched(false)
        }
    },[])

    const Stack = createStackNavigator();

    return(
        isAppFirstLaunched !== null && (
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator>
                        {isAppFirstLaunched && <Stack.Screen name="OnBoarding" component={OnBoardingScreen} options={{headerShown:false}}/>}
                        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        )
    )
}

export default App;