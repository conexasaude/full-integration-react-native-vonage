import React from 'react';
import { View, Platform, Modal } from 'react-native';
import ModalAndroid from 'react-native-modal';
import { Loader } from '../Loader';

const OverlayLoader = ({
  loading,
  style,
  outline = true,
  transparent = true,
}) =>
  Platform.OS === 'android' ? (
    <ModalAndroid
      useNativeDriver
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropColor={transparent ? '#ddd' : '#fff'}
      backdropOpacity={transparent ? 0.5 : 1}
      isVisible={loading}
    >
      <View>
        <Loader loading={loading} outline={outline} style={style} />
      </View>
      {/* </View> */}
    </ModalAndroid>
  ) : (
    // <Modal transparent visible={loading}>
    loading && (
      <View
        style={{
          zIndex: 999999999,
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.5)',
        }}
      >
        <Loader loading={loading} outline={outline} style={style} />
      </View>
    )
    // </Modal>
  );

export default OverlayLoader;
