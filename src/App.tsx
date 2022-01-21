import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaView, Platform } from 'react-native';

import {
  PERMISSIONS,
  check,
  request,
  openSettings,
} from 'react-native-permissions';

import Router from './routes';
import '@config/ReactotronConfig';
import { store } from './store';


function App() {
  const [showModal, setShowModal] = useState({
    show: false,
    msg: '',
    title: '',
    openSettings: false,
  });

  const handleAppPermission = async () => {
    const permissionCamera = await check(
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA
    );
    const permissionMicrofone = await check(
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.RECORD_AUDIO
        : PERMISSIONS.IOS.MICROPHONE
    );
    const permissionMediaLibrary = await check(
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
    );

    if (permissionCamera === 'denied') {
      await request(
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.CAMERA
          : PERMISSIONS.IOS.CAMERA
      )
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (permissionMicrofone === 'denied') {
      await request(
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.RECORD_AUDIO
          : PERMISSIONS.IOS.MICROPHONE
      )
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (permissionMediaLibrary === 'denied') {
      await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (permissionCamera === 'blocked' || permissionMicrofone === 'blocked') {
      await setShowModal({
        show: true,
        msg:
          'Por favor, permita que o aplicativo acesse a câmera, o microfone e os arquivos do dispositivo',
        title: 'Atenção',
        openSettings: false,
      });
    } else {
      await setShowModal({ show: false });
    }

    console.log('checando permissoes');
  };
  useEffect(() => {
    handleAppPermission();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <Router />

      </SafeAreaView>
    </Provider>
  );
}
export default App;
