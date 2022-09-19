import * as Notifications from 'expo-notifications';

export async function getPushNotificationToken() {
    const { granted } = await Notifications.getPermissionsAsync();

    if (!granted) {
        await Notifications.requestPermissionsAsync();
    }

    if (granted) {
        const pushToken = await Notifications.getExpoPushTokenAsync();
        console.log(`Notification Token => ${pushToken}`)

        return pushToken.data;
    }

    console.log("No notification token available.")
}