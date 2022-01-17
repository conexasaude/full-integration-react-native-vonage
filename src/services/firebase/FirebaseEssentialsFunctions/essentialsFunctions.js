import { localNotificationService } from '../LocalNotificationService';

export function onRegister(token) {
  console.log('[App] onRegister: ', token);
}

export function onNotification(notify) {
  console.log('[App] onNotification: ', notify);
  if (notify === undefined) {
    return;
  }
  const options = {
    soundName: 'default',
    playSound: true, // ,
    largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
    smallIcon: 'ic_launcher', // add icon small for Android (Link: app/src/main/mipmap)
  };
  localNotificationService.showNotification(
    0,
    notify?.title,
    notify?.body,
    notify,
    options
  );
}

export function onOpenNotification(notify) {
  console.log('[App] onOpenNotification: ', notify);
  // Alert.alert(`Open Notification: ${notify.body}`);
}
