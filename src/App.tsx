import { createBottomTabNavigator, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet } from 'react-native';

import BottomSheet from './BottomSheet';
import DynamicIsland from './DynamicIsland';
import Inbox from './Inbox';
import MomoHeader from './MomoHeader';
import VideoItem from './VideoItem';
import data from './assets/data';
import { wHeight } from './assets/utils';

export type RootStackParamList = {
    DynamicIsland: undefined;
    MomoHeader: undefined;
    NewVideo: undefined;
    Inbox: undefined;
    BottomSheet: undefined;
};

const BottomTab = createBottomTabNavigator<RootStackParamList>();

const Home = (): JSX.Element => {
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const bottomTabHeight = useBottomTabBarHeight();
    return (
        <FlatList
            data={data}
            pagingEnabled
            renderItem={({ item, index }) => <VideoItem data={item} isActive={activeVideoIndex === index} />}
            onScroll={(e) => {
                const index = Math.ceil(e.nativeEvent.contentOffset.y / (wHeight - bottomTabHeight));
                setActiveVideoIndex(index);
            }}
        />
    );
};

const App = (): JSX.Element => {
    return (
        <NavigationContainer>
            <BottomTab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: 'black',
                    },
                    tabBarActiveTintColor: 'white',
                }}
            >
                <BottomTab.Screen
                    name={'DynamicIsland'}
                    component={DynamicIsland}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={require('./assets/images/home.png')}
                                style={[styles.bottomTabIcon, focused && styles.bottomTabIconFocused]}
                            />
                        ),
                    }}
                />
                <BottomTab.Screen
                    name={'MomoHeader'}
                    component={MomoHeader}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={require('./assets/images/search.png')}
                                style={[styles.bottomTabIcon, focused && styles.bottomTabIconFocused]}
                            />
                        ),
                    }}
                />
                <BottomTab.Screen
                    name={'NewVideo'}
                    component={Home}
                    options={{
                        tabBarLabel: () => null,
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={require('./assets/images/new-video.png')}
                                style={[styles.newVideoButton, focused && styles.bottomTabIconFocused]}
                            />
                        ),
                    }}
                />
                <BottomTab.Screen
                    name={'Inbox'}
                    component={Inbox}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={require('./assets/images/message.png')}
                                style={[styles.bottomTabIcon, focused && styles.bottomTabIconFocused]}
                            />
                        ),
                    }}
                />
                <BottomTab.Screen
                    name={'BottomSheet'}
                    component={BottomSheet}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={require('./assets/images/user.png')}
                                style={[styles.bottomTabIcon, focused && styles.bottomTabIconFocused]}
                            />
                        ),
                    }}
                />
            </BottomTab.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    bottomTabIcon: {
        width: 20,
        height: 20,
        tintColor: 'grey',
    },
    bottomTabIconFocused: {
        tintColor: 'white',
    },
    newVideoButton: {
        width: 48,
        height: 24,
    },
});

export default App;
