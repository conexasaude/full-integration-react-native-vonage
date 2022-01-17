import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Platform, AppState } from 'react-native';
import RNCallKeep from 'react-native-callkeep';
import uuid from 'uuid-random';
import { ThemeAssets } from '../../variables';

class LocalNotificationService {
  configure = (onOpenNotification) => {
    PushNotification.configure({
      onRegister(token) {
        console.log('[LocalNotificationService] onRegister:', token);
      },
      async onNotification(notification) {
        console.log('[LocalNotificationService] onNotification:', notification);

        if (Platform.OS === 'ios' && notification?.data?.chamadaEncerrada) {
          RNCallKeep.endAllCalls();
        }

        if (
          Platform.OS === 'ios' &&
          notification?.title === 'Chamada não atendida'
        ) {
          console.log('Chamada encerrada fcms');
          RNCallKeep.endAllCalls();
        }

        /** ** */
        if (
          Platform.OS === 'ios' &&
          notification?.foreground === false &&
          notification?.data?.action === 'INICIAR_ATENDIMENTO'
        ) {
          const isBusy = await RNCallKeep.checkIfBusy();
          if (isBusy === 1) {
            return;
          }

          const id = await uuid();

          await RNCallKeep.setup({
            ios: {
              appName: ThemeAssets.appName,
            },
          });
          await RNCallKeep.displayIncomingCall(
            id,
            ThemeAssets.appName,
            ThemeAssets.appName,
            '',
            true
          );
          RNCallKeep.addEventListener(
            'didDisplayIncomingCall',
            ({
              error,
              callUUID,
              handle,
              localizedCallerName,
              hasVideo,
              fromPushKit,
              payload,
            }) => {
              // you might want to do following things when receiving this event:
              // - Start playing ringback if it is an outgoing call
              RNCallKeep.updateDisplay(
                callUUID,
                `${ThemeAssets.appName}. ${notification?.data?.nomeProfissional} está lhe chamando.`,
                'number'
              );

              console.log(payload);
            }
          );
          RNCallKeep.addEventListener('answerCall', ({ callUUID }) => {
            PushNotification.localNotification({
              message: 'Toque aqui para compartilhar seu vídeo.',
              channelId: 'conexa_push_channel',
            });
            // Do your normal `Answering` actions here.
            const interval = setInterval(() => {
              RNCallKeep.endAllCalls();
              clearInterval(interval);
            }, 10000);
          });
        }

        /** * */

        if (Platform.OS === 'ios' && notification?.data?.chamadaEncerrada) {
          RNCallKeep.endAllCalls();
        }

        if (!notification?.data) {
          return;
        }
        notification.userInteraction = true;

        // if (Platform.OS === 'ios' && AppState.currentState === 'active') {
        //   PushNotification.localNotification({
        //     title: notification.title || variables.appName,
        //     message: notification.message,
        //     channelId: 'conexa_push_channel',

        //   });
        // }

        onOpenNotification(
          Platform.OS === 'ios' ? notification.data.item : notification.data
        );

        if (Platform.OS === 'ios') {
          // (required) Called when a remote is received or opened, or local notification is opened
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  };

  unregister = () => {
    PushNotification.unregister();
  };

  showNotification = (id, title, message, data = {}, options = {}) => {
    PushNotification.localNotification({
      /* Android Only Properties */
      ...this.buildAndroidNotification(id, title, message, data, options),
      /* iOS and Android properties */
      ...this.buildIOSNotification(id, title, message, data, options),
      /* iOS and Android properties */
      title: title || ThemeAssets.appName,
      message: message || '',
      playSound: options.playSound || false,
      soundName: options.soundName || 'default',
      channelId: 'conexa_push_channel',
      userInteraction: false, // BOOLEAN: If the notification was opened by the user from the notification area or not
    });
  };

  buildAndroidNotification = (id, title, message, data = {}, options = {}) => ({
    id,
    autoCancel: true,
    largeIcon: options.largeIcon || 'ic_launcher',
    smallIcon: options.smallIcon || 'ic_launcher',
    bigText: message || '',
    subText: title || '',
    vibrate: options.vibrate || true,
    vibration: options.vibration || 400,
    priority: 'high',
    importance: 'high', // (optional) set notification importance, default: high,
    data,
  });

  buildIOSNotification = (id, title, message, data = {}, options = {}) => ({
    alertAction: options.alertAction || 'view',
    category: options.category || '',
    title,
    userInfo: {
      id,
      item: data,
    },
  });

  cancelAllLocalNotifications = () => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.removeAllDeliveredNotifications();
    } else {
      PushNotification.cancelAllLocalNotifications();
    }
  };

  removeDeliveredNotificationByID = (notificationId) => {
    console.log(
      '[LocalNotificationService] removeDeliveredNotificationByID: ',
      notificationId
    );
    PushNotification.cancelLocalNotifications({ id: `${notificationId}` });
  };
}

export const localNotificationService = new LocalNotificationService();
