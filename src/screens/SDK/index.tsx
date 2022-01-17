import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import axios from 'axios';

import { Logo } from '@components/Logo';
import useStyles from './styles';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { Inputfield } from '@root/components/Inputfield';
import { Button } from '@root/components/Button';

import OverlayLoader from '@root/components/OverlayLoader';

import variables from '@root/variables';

const SDK: FunctionComponent<any> = ({ navigation, route }) => {
  const [callToken, setCallToken] = useState();
  const [urlRoom, setUrlRoom] = useState();

  const [loading, setLoading] = useState(false);

  const { RootStyles } = useStyles();

  const {
    mainContainer,
    container,
    inputContainer,
    logoContainer,
    shadowStyle,
    inputContainerTitle,
    btnHelp,
  } = RootStyles;

  const apiVonage = axios.create({
    baseURL: 'https://hml-meet.conexasaude.com.br/api/integration/vonage',
    validateStatus: () => true,
  });

  useEffect(() => {
    try {
      const config = {
        headers: {},
      };

      const body = {
        // data: scheduledNoPayment.dateTime,
        // token: props?.rescheduleAppointmentToken,
      };

      apiVonage
        .post('/criar/CONEXA/false')
        .then((response) => {
          if (response.status === 200) {
            setCallToken(response.data);
            console.log('Token de chamada: ', response.data);
          } else {
            console.log(response);
          }
        })
        .catch(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const goToCall = async () => {
    try {
      const body = {
        sessionId: callToken,
        userId: 1234,
        userName: 'Teste Paciente',
        isDocpass: false,
      };

      apiVonage
        .post('/obter/url/paciente/CONEXA', body)
        .then((response) => {
          if (response.status === 200) {
            setUrlRoom(response.data.urlRoom);
          }
        })
        .catch(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }

    if (urlRoom) {
      let tokenParticipante = urlRoom?.substring(
        urlRoom?.lastIndexOf('token=') + 6,
        urlRoom?.lastIndexOf('&doctor')
      );
      console.log('Token do participante: ', tokenParticipante);

      navigation.navigate('Vonage', {
        id_chamada: callToken,
        tokenParticipante,
        idAtendimento: 123,
        nomeProfissional: 'teste',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flexGrow: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <OverlayLoader
        loading={loading}
        outline
        style={{ height: 50, width: 50 }}
      />

      <ScrollView contentContainerStyle={mainContainer} style={{ flex: 1 }}>
        <View
          style={[
            container,
            {
              paddingTop:
                Platform.OS === 'ios' ? getStatusBarHeight() + 15 : 15,
            },
          ]}
        >
          <Logo width={170} height={35} style={logoContainer} />
          <Text
            style={{
              alignItems: 'center',
              marginTop: 20,
              fontSize: 25,
              color: variables.defaultBlack,
              fontFamily: variables.nunitoBold,
            }}
          >
            Conecte-se à sua saúde
          </Text>
        </View>
        <View style={[inputContainer, shadowStyle]}>
          <Text style={inputContainerTitle}>SDK Video Chamada</Text>

          <>
            <Inputfield
              style={{ marginBottom: 32 }}
              label="Seu Token de Chamada"
              initialValue=""
              value={callToken}
              onChangeText={(value) => setCallToken(value)}
            />
          </>

          <Button
            onPress={() => goToCall()}
            fullWidth
            title={loading ? 'Aguarde' : 'Entrar'}
            disabled={loading}
          />
        </View>
        <View
          style={[
            btnHelp,
            {
              marginBottom:
                Platform.OS === 'ios' ? getStatusBarHeight() + 105 : 105,
            },
          ]}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SDK;
