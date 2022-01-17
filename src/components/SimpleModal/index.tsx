import React from 'react';
import { View, Modal, Text, Image, TouchableOpacity } from 'react-native';

import { Button } from '@components/Button';
import { Link } from '@components/Link';

import useStyles from './styles';

export default function SimpleModal({ ...props }) {
  const { RootStyles } = useStyles();
  const {
    subtitle,

    modalView,
    modalHeader,
    modalBody,
    headerTitle,
    btnClose,
    imgClose,

    btnModal,
    textTouchable,
    centeredView,
  } = RootStyles;

  return (
    <Modal animationType="slide" transparent visible={props.modalVisible}>
      <View style={centeredView}>
        <View style={modalView}>
          <View style={modalHeader}>
            {props.btnClose && (
              <TouchableOpacity style={btnClose}>
                <Image style={imgClose} source={imgClose} />
              </TouchableOpacity>
            )}
            <Text style={headerTitle}>{props.modalMessage}</Text>
          </View>
          {props.subtitle ? (
            <Text style={subtitle}>
              {props.subtitle}
              {'\n'}
              {props.subtitle2}
            </Text>
          ) : null}
          {props.image ? <Image source={props.image} /> : false}
          {props.twoButtons ? (
            <View style={[modalBody, { justifyContent: 'space-between' }]}>
              <Link
                label={props.titleButton1}
                onPress={props.onPress1}
                style={textTouchable}
              />
              <Button
                outline={props.outline}
                style={btnModal}
                width={112}
                title={props.titleButton2}
                onPress={props.onPress2}
              />
            </View>
          ) : (
            <View style={modalBody}>
              <Button
                outline={props.outline}
                style={btnModal}
                width={112}
                title={props.titleButton1 || 'OK'}
                onPress={props.onPress}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
