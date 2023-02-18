import React from 'react';
import { Button, StatusBar, StyleSheet, View, NativeMethods, NativeModules } from 'react-native';

type Props = {};

const { DynamicIslandModule } = NativeModules;

const DynamicIsland = (props: Props) => {
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
