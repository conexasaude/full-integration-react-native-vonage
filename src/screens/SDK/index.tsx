import React, {
  FunctionComponent,
  useEffect,
  useReducer,
  useState,
} from 'react';
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Linking,
} from 'react-native';

import axios from 'axios';
import { apiVonageURL } from '@root/services/api';

import { Logo } from '@components/Logo';
import styles from './styles';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { Inputfield } from '@root/components/Inputfield';
import { Button } from '@root/components/Button';

import OverlayLoader from '@root/components/OverlayLoader';

import variables from '@root/variables';

const SDK: FunctionComponent<any> = ({ navigation, route }) => {
  const [callToken, setCallToken] = useState();
  const [urlRoom, setUrlRoom] = useState();

  const [loading, setLoading] = useState(false);
  const [vonageApiKey, setVonageApiKey] = useState();
  const body = {};
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR09MREVOIiwiZW52IjoiSE1MIn0.8nKQ-obLn-bsOhTjIKozaw7zORu0VtqfbVNxrNOFuYs';

  useEffect(() => {
    try {
      apiVonageURL
        .post('/criar/CONEXA/false', body, { headers: { token } })
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

  useEffect(() => {
    // getting the Vonage apiKey

    try {
      apiVonageURL
        .get('/apikey', { headers: { token } })
        .then((response) => {
          if (response.status === 200) {
            setVonageApiKey(response.data);
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

      apiVonageURL
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
        vonageApiKey,
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

      <ScrollView
        contentContainerStyle={styles.mainContainer}
        style={{ flex: 1 }}
      >
        <View
          style={[
            styles.container,
            {
              paddingTop:
                Platform.OS === 'ios' ? getStatusBarHeight() + 15 : 15,
            },
          ]}
        >
          <Logo width={170} height={35} style={styles.logoContainer} />
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
        <View style={[styles.inputContainer, styles.shadowStyle]}>
          <Text style={styles.inputContainerTitle}>SDK Video Chamada</Text>

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

        {urlRoom && (
          <>
            <Text style={{ marginTop: 20, fontWeight: 'bold' }}>
              URL DO PROFISSIONAL: {urlRoom}{' '}
            </Text>
            <Button
              onPress={() => Linking.openURL(urlRoom)}
              fullWidth
              title={loading ? 'Aguarde' : 'Ir para URL do Profissional'}
              disabled={loading}
            />
          </>
        )}

        <View
          style={[
            styles.btnHelp,
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
