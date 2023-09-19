import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, Button, Linking, NativeModules, StatusBar, StyleSheet, View } from 'react-native';
import { RootStackParamList } from './App';

type Props = BottomTabScreenProps<RootStackParamList>;
type ScreenNavigationProp = Props['navigation'];

const { DynamicIslandModule } = NativeModules;

const DynamicIsland = (props: Props) => {
    const navigation = useNavigation<ScreenNavigationProp>();

    const handleDeepLink = (url: any) => {
        const route = url.replace('dynamic-island://', '');
        if (route === 'MomoHeader') {
            DynamicIslandModule.endNotificationActivity();
        }
        navigation.navigate(route);
    };
    React.useEffect(() => {
        Linking.getInitialURL().then((url) => {
            if (url) {
                handleDeepLink(url);
            }
        });

        Linking.addEventListener('url', ({ url }) => {
            if (url) {
                handleDeepLink(url);
            }
        });
    }, []);
    const onPress = () => {
        DynamicIslandModule.testFunc('Nak', 'dep trai').then((resolve: string) => {
            console.log('Resolve:::', resolve);
        });
    };
    return (
        <View style={styles.viewContainer}>
            <StatusBar barStyle={'dark-content'} />
            <Button title={'Start Activity'} onPress={() => DynamicIslandModule.startNotificationActivity()} />
            <Button title={'Update Activity'} onPress={() => DynamicIslandModule.updateNotificationActivity()} />
            <Button title={'End Activity'} onPress={() => DynamicIslandModule.endNotificationActivity()} />
        </View>
    );
};

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DynamicIsland;
