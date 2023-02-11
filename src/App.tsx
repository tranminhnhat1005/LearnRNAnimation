import { createBottomTabNavigator, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';

import data from './assets/data';
import messages from './assets/messages';
import { wHeight } from './assets/utils';
import Message from './Message';
import MomoHeader from './MomoHeader';
import VideoItem from './VideoItem';

const BottomTab = createBottomTabNavigator();

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

const Inbox = () => {
    return (
        <View style={styles.viewInboxContainer}>
            {messages.map((message, index) => (
                <Message key={index} data={message} />
            ))}
        </View>
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
                    name={'Home'}
                    component={Home}
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
                    name={'Discover'}
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
                    name={'Profile'}
                    component={Home}
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
    viewInboxContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewMessageContainer: {
        width: '85%',
        flexDirection: 'row',
        marginVertical: 20,
    },
    imgAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    viewMessage: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    txtMessage: {
        fontSize: 16,
        color: '#111111',
    },
    txtTime: {
        marginTop: 10,
        fontSize: 12,
        color: '#333333',
    },
});

export default App;
