import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, Easing, Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import Video from 'react-native-video';

import { VideoModel } from './assets/data';
import { getDiscAnim, getMusicNoteAnim, wHeight, wWidth } from './assets/utils';

export type Props = {
    data: VideoModel;
    isActive: boolean;
};

const VideoItem: React.FC<Props> = ({ data, isActive }) => {
    const { channelName, uri, caption, musicName, likes, comments, avatarUri } = data;

    const discAnimationLoopRef = useRef<any>();
    const musicAnimationLoopRef = useRef<any>();

    const discAnimatedValue = useRef(new Animated.Value(0)).current;
    const musicNote1AnimatedValue = useRef(new Animated.Value(0)).current;
    const musicNote2AnimatedValue = useRef(new Animated.Value(0)).current;

    const discAnimation = getDiscAnim(discAnimatedValue);
    const musicNote1Animation = getMusicNoteAnim(musicNote1AnimatedValue);
    const musicNote2Animation = getMusicNoteAnim(musicNote2AnimatedValue, true);

    const triggerAnimation = useCallback(() => {
        discAnimationLoopRef.current = Animated.loop(
            Animated.timing(discAnimatedValue, {
                toValue: 1,
                duration: 2500,
                easing: Easing.linear,
                useNativeDriver: false,
            })
        );
        discAnimationLoopRef.current.start();
        musicAnimationLoopRef.current = Animated.loop(
            Animated.sequence([
                Animated.timing(musicNote1AnimatedValue, {
                    toValue: 1,
                    duration: 1200,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
                Animated.timing(musicNote2AnimatedValue, {
                    toValue: 1,
                    duration: 1200,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
            ])
        );
        musicAnimationLoopRef.current.start();
    }, [discAnimatedValue, musicNote1AnimatedValue, musicNote2AnimatedValue]);

    useEffect(() => {
        if (isActive) {
            triggerAnimation();
        } else {
            discAnimationLoopRef.current?.stop();
            musicAnimationLoopRef.current?.stop();
            discAnimatedValue.setValue(0);
            musicNote1AnimatedValue.setValue(0);
            musicNote2AnimatedValue.setValue(0);
        }
    }, [isActive, triggerAnimation, discAnimatedValue, musicNote1AnimatedValue, musicNote2AnimatedValue]);

    const bottomTabHeight = useBottomTabBarHeight();

    return (
        <View style={[styles.viewContainer, { height: wHeight - bottomTabHeight }]}>
            <StatusBar barStyle={'light-content'} />
            <Video source={{ uri }} style={styles.video} resizeMode={'cover'} paused={!isActive} repeat />
            <View style={styles.viewBottomSection}>
                <View style={styles.viewBottomLeftSection}>
                    <Text style={styles.txtChannelName}>{channelName}</Text>
                    <Text style={styles.txtCaption}>{caption}</Text>
                    <View style={styles.viewMusicContainer}>
                        <Image source={require('./assets/images/music-note.png')} style={styles.imgMusicIcon} />
                        <Text style={styles.txtMusicName}>{musicName}</Text>
                    </View>
                </View>
                <View style={styles.viewBottomRightSection}>
                    <Animated.Image
                        source={require('./assets/images/floating-music-note.png')}
                        style={[styles.imgMusicFloatingNote, musicNote1Animation]}
                    />
                    <Animated.Image
                        source={require('./assets/images/floating-music-note.png')}
                        style={[styles.imgMusicFloatingNote, musicNote2Animation]}
                    />
                    <Animated.Image
                        source={require('./assets/images/disc.png')}
                        style={[styles.imgMusicDisc, discAnimation]}
                    />
                </View>
            </View>
            <View style={styles.viewVerticalBar}>
                <View style={[styles.viewVerticalBarItem, styles.viewAvatarContainer]}>
                    <Image style={styles.imgAvatar} source={{ uri: avatarUri }} />
                    <View style={styles.viewFollowButton}>
                        <Image source={require('./assets/images/plus-button.png')} style={styles.imgFollowButton} />
                    </View>
                </View>
                <View style={styles.viewVerticalBarItem}>
                    <Image style={styles.imgVerticalIcon} source={require('./assets/images/heart.png')} />
                    <Text style={styles.txtVerticalBarTitle}>{likes}</Text>
                </View>
                <View style={styles.viewVerticalBarItem}>
                    <Image style={styles.imgVerticalIcon} source={require('./assets/images/message-circle.png')} />
                    <Text style={styles.txtVerticalBarTitle}>{comments}</Text>
                </View>
                <View style={styles.viewVerticalBarItem}>
                    <Image style={styles.imgVerticalIcon} source={require('./assets/images/reply.png')} />
                    <Text style={styles.txtVerticalBarTitle}>Share</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    viewContainer: {
        width: wWidth,
    },
    video: {
        backgroundColor: '#111111',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    viewBottomSection: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 8,
        paddingVertical: 16,
    },
    viewBottomLeftSection: {
        flex: 4,
    },
    viewBottomRightSection: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    txtChannelName: {
        color: 'white',
        fontWeight: 'bold',
    },
    txtCaption: {
        marginVertical: 8,
        color: 'white',
    },
    viewMusicContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgMusicIcon: {
        width: 12,
        height: 12,
        marginRight: 8,
    },
    txtMusicName: {
        marginVertical: 8,
        color: 'white',
    },
    imgMusicDisc: {
        width: 40,
        height: 40,
    },
    viewVerticalBar: {
        position: 'absolute',
        bottom: 72,
        right: 8,
    },
    viewVerticalBarItem: {
        marginBottom: 24,
        alignItems: 'center',
    },
    viewAvatarContainer: {
        marginBottom: 48,
    },
    viewFollowButton: {
        position: 'absolute',
        bottom: -8,
    },
    imgFollowButton: {
        width: 21,
        height: 21,
    },
    imgAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    imgVerticalIcon: {
        width: 32,
        height: 32,
    },
    txtVerticalBarTitle: {
        color: 'white',
        marginTop: 4,
    },
    imgMusicFloatingNote: {
        position: 'absolute',
        width: 16,
        height: 16,
        bottom: 16,
        right: 40,
        tintColor: 'white',
    },
});

export default VideoItem;
