/* eslint-disable prefer-destructuring */
import React, { useEffect, useState } from 'react';
import { Linking, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import crashlytics from '@react-native-firebase/crashlytics';
import api, { apiBaseURL } from './api';
import SimpleModal from '../components/SimpleModal';
import OverlayLoader from '../components/OverlayLoader';
import variables from '../variables';
import {
  signInSetTokenUserOfMultiprofile,
  signInToken,
  signOut,
} from '../store/modules/auth/actions';
import { setMagicLink } from '../store/modules/magicLinks/actions';

import { getUserDetails } from '../store/modules/userDetails/actions';

import { chosenClinicc } from '../store/modules/chosenClinic/actions';

export const MagicLinks = ({ linking }) => {
  const navigation = useNavigation();
  const isSigned = useSelector((state) => state.auth.signed);
  const isLoadingSelector = useSelector((state) => state.auth.loading);
  const isSignedMagic = useSelector((state) => state.auth.signedMagic);
  const userToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [urlTypeState, setUrlTypeState] = useState('');

  const [urlMagicLink, setUrlMagicLink] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function logout() {
    await dispatch(signOut());
    // await navigation.replace('Login');
  }

  async function login(token) {
    await dispatch(signInToken({ token }));
  }

  useEffect(() => {
    if (linking !== urlMagicLink) {
      setUrlMagicLink(linking);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linking]);

  const receiveLink = async () => {
    Linking.addEventListener('url', (link) => {
      try {
        setUrlMagicLink(link.url);
        dispatch(setMagicLink(link.url));
      } catch (err) {
        crashlytics().setAttribute(
          'Linking.addEventListener',
          String(link?.url)
        );
      }
    });
  };

  const error = (message) => {
    setErrorMessage(message);
  };

  async function handleToken(urlType) {
    setLoading(true);
    try {
      const config = {
        headers: { token: userToken },
      };

      const response = await api('/usuario/validar-token', config);
      // 2 etapa: verificando token do usuário

      await dispatch(signInSetTokenUserOfMultiprofile({ token: userToken }));

      if (response.data.status === 200) {
        const responseTerms = await api('/usuario/termo-aceito', config);
        // 3 etapa: verificando se termos já foram aceitos
        if (
          responseTerms.status === 200 &&
          responseTerms.data.object === true
        ) {
          await dispatch(chosenClinicc(response.data.object, userToken));
          await dispatch(
            getUserDetails(response.data.object?.paciente?.id, userToken)
          );
          setLoading(false);

          navigation.navigate('BottomTabs', {
            path: urlType,
            previous_screen: '',
          });
        } else {
          setLoading(false);
          // ir para os termos e depois ir para a home
          navigation.navigate('TermsOfUse', {
            backToLogin: true,
            path: urlType,
            clinic: response.data.object,
          });
        }
      } else {
        setLoading(false);
        error(response.data.msg);

        navigation.navigate('Login');
      }
    } catch (err) {
      crashlytics().recordError(err, 'MagicLink - HandleToken');
      setLoading(false);
      error(err.message);

      navigation.navigate('Login');
    }
  }

  useEffect(() => {
    if (urlMagicLink) {
      HandleLink(urlMagicLink);
      setUrlMagicLink();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlMagicLink]);

  const HandleLink = (urlLinking) => {
    let URLprops = urlLinking.split('/');
    URLprops.splice(0, 3);

    let URLToken = '';
    let URLpath = '';
    let URLType = '';
    let URLMainPath = URLprops[0];

    setLoading(true);

    try {
      switch (URLMainPath) {
        case 'redirecionar':
          /* URLs mapeadaas
          Reagendar
            redirecionar/9ca9d3c851c842d796fbc9d9ee35f405/atendimento-agendado_categoria_MEDICO_1024
            redirecionar/00a177b6da454efaa38e27bff86c7d48/atendimento-agendado_MEDICO_agendamento-sem-preferencia

          Cancelar
            redirecionar/9d36d5fa316546099fa11744f13179be/meus-atendimentos_34160_cancelar

          Alterar senha
            redirecionar/d526df44e5ac41aaa43b3196a98ed017

          Avaliação
            redirecionar/2cb78299d1a34403a665ebd2a2d556a6/avaliacao_36300
          */
          URLToken = URLprops[1];

          if (URLprops[2]) {
            URLpath = 'Redirecionar';
            URLType = URLprops[2];
          } else {
            URLpath = 'ChangePassword';
            URLType = 'ChangePassword';
          }

          break;

        case 'redefinicao-senha':
          /* URLs mapeadaas
          Alterar senha
            redefinicao-senha/01624997ea3749a0a1594f867d7fcdbc
          */
          URLpath = 'ChangePassword';
          URLToken = URLprops[1];
          URLType = 'ChangePassword';
          break;
        case 'alterar-senha':
          /* URLs mapeadaas
          Alterar senha
            alterar-senha/load/33864acbdd184bb0867e73c959d8c89b
          */
          if (URLprops[3]) {
            URLpath = 'ChangePassword';
            URLToken = URLprops[3];
            URLType = 'ChangePasswordNew';
            break;
          } else {
            URLpath = 'ChangePassword';
            URLToken = URLprops[2];
            URLType = 'ChangePasswordNew';
            break;
          }

        case 'confirmacao':
          console.log(URLprops[1]);

          apiBaseURL
            .post(
              `/integration/app-paciente/admissao/confirmar`,
              {},
              {
                headers: { token: URLprops[1] },
              }
            )
            .then((response) => {
              if (response.data.status === 200) {
                error(response.data.object.mensagem);
                navigation.navigate('Login');
              }
            })
            .catch((err) => {
              console.log('Docpass activation error: ', err);
              navigation.navigate('Login');
            });

          break;
        case 'direcionado-clinica':
          /* URLs mapeadaas
          Ativação da conta
            direcionado-clinica/309/QADor
            direcionado-clinica/1/
          */
          URLpath = 'UserActivation';
          break;
        case 'passo1':
          /* URLs mapeadaas
          Ativação da conta
            passo1/docpass
          */
          URLpath = 'UserActivation';
          break;
        default:
          /* URLs mapeadaas
          Acesso direto
            acessodireto?token=f2847d54ef3d4625a1f607e7fa4f312e
          */
          // eslint-disable-next-line no-case-declarations
          let mainAcessoDireto = URLMainPath.split('?');
          if (mainAcessoDireto[0] === 'acessodireto') {
            URLpath = 'AcessoDireto';
            URLToken = mainAcessoDireto[1].replace('token=', '');
          }
          // else if (mainAcessoDireto[0] === 'preWaitingRoom') {
          //   URLpath = 'AcessoDireto';
          //   let params = mainAcessoDireto[1]?.split('&');
          //   let tokenParam = params?.find((param) => param.includes('id='));
          //   URLToken = tokenParam ? tokenParam.replace('id=', '') : '';
          // }
          break;
      }
    } catch (err) {
      setLoading(false);
      crashlytics().recordError(err, 'MagicLink - Switch URLMainPath');
      error('Erro de autenticação. Token inválido ou expirado.');

      navigation.navigate('Login');
    }

    try {
      switch (URLpath) {
        case 'UserActivation':
          if (isSigned || isSignedMagic) {
            logout().then(() => {
              setTimeout(() => {
                setLoading(false);
                navigation.navigate('Login');
                navigation.navigate(URLpath);
              }, 500);
            });
          } else {
            setTimeout(() => {
              setLoading(false);
              navigation.navigate('Login');
              navigation.navigate(URLpath);
            }, 500);
          }
          break;

        case 'ChangePassword':
          if (isSigned || isSignedMagic) {
            logout().then(() => {
              apiBaseURL
                .get(`/usuario/auth/redirecionamento/${URLToken}`)
                .then((result) => {
                  if (result.data.status === 200) {
                    // URLToken = result.data.object.usuario.token;

                    setTimeout(() => {
                      // caso específico que ainda vai ser refatorado
                      // redirecionar para home com o intuito do paciente ser navegado para consulta
                      if (
                        result.data.object?.url &&
                        result.data.object?.url.split('/')[
                          result.data.object?.url.split('/')?.length - 1
                        ] === 'home'
                      ) {
                        login(URLToken)
                          .then(() => {
                            setUrlTypeState(URLType);
                          })
                          .catch((err) => {
                            setLoading(false);

                            crashlytics().recordError(
                              err,
                              'MagicLink - Switch URLPath - Redirecionar'
                            );

                            error(
                              'Erro de autenticação. Token inválido ou expirado.'
                            );

                            navigation.navigate('Login');
                          });
                      } else {
                        setLoading(false);
                        if (URLType === 'ChangePasswordNew') {
                          navigation.navigate(URLpath, {
                            email: result?.data?.object?.usuario?.login,
                            URLToken,
                            URLType,
                          });
                        } else {
                          navigation.navigate(URLpath, {
                            URLToken:
                              result?.data?.object?.usuario?.token || URLToken,
                            URLType,
                          });
                        }
                      }
                    }, 500);
                  } else {
                    setLoading(false);

                    error('Erro de autenticação. Token inválido ou expirado.');

                    navigation.navigate('Login');
                  }
                })
                .catch((err) => {
                  setLoading(false);
                  crashlytics().recordError(
                    err,
                    'MagicLink - Switch URLPath - ChangePassword'
                  );

                  error('Erro de autenticação. Token inválido ou expirado.');

                  navigation.navigate('Login');
                });
            });
          } else {
            apiBaseURL
              .get(`/usuario/auth/redirecionamento/${URLToken}`)
              .then((result) => {
                if (result.data.status === 200) {
                  setTimeout(() => {
                    // caso específico que ainda vai ser refatorado
                    // redirecionar para home com o intuito do paciente ser navegado para consulta
                    if (
                      result.data.object?.url &&
                      result.data.object?.url.split('/')[
                        result.data.object?.url.split('/')?.length - 1
                      ] === 'home'
                    ) {
                      login(URLToken)
                        .then(() => {
                          setUrlTypeState(URLType);
                        })
                        .catch((err) => {
                          setLoading(false);

                          crashlytics().recordError(
                            err,
                            'MagicLink - Switch URLPath - Redirecionar'
                          );

                          error(
                            'Erro de autenticação. Token inválido ou expirado.'
                          );

                          navigation.navigate('Login');
                        });
                    } else {
                      setLoading(false);
                      if (URLType === 'ChangePasswordNew') {
                        URLToken = result.data.object.token;
                        navigation.navigate(URLpath, {
                          email: result?.data?.object?.usuario?.login,
                          URLToken,
                          URLType,
                        });
                      } else {
                        URLToken = result.data.object.token;
                        navigation.navigate(URLpath, {
                          URLToken:
                            result?.data?.object?.usuario?.token || URLToken,
                          URLType,
                        });
                      }
                    }
                  }, 500);
                } else {
                  setLoading(false);

                  error('Erro de autenticação. Token inválido ou expirado.');

                  navigation.navigate('Login');
                }
              })
              .catch((err) => {
                setLoading(false);

                crashlytics().recordError(
                  err,
                  'MagicLink - Switch URLPath - ChangePassword'
                );

                error('Erro de autenticação. Token inválido ou expirado.');

                navigation.navigate('Login');
              });
          }

          break;
        case 'Redirecionar':
          if (isSigned || isSignedMagic) {
            logout().then(() => {
              login(URLToken)
                .then(() => {
                  setLoading(false);
                  setUrlTypeState(URLType);
                })
                .catch((err) => {
                  setLoading(false);

                  crashlytics().recordError(
                    err,
                    'MagicLink - Switch URLPath - Redirecionar'
                  );

                  error('Erro de autenticação. Token inválido ou expirado.');

                  navigation.navigate('Login');
                });
            });
          } else {
            login(URLToken)
              .then(() => {
                setLoading(false);
                setUrlTypeState(URLType);
              })
              .catch((err) => {
                setLoading(false);

                crashlytics().recordError(
                  err,
                  'MagicLink - Switch URLPath - Redirecionar'
                );
                error('Erro de autenticação. Token inválido ou expirado.');

                navigation.navigate('Login');
              });
            // setPath('BottomTabs');
            // });
          }
          break;
        case 'AcessoDireto':
          if (isSigned || isSignedMagic) {
            logout().then(() => {
              login(URLToken)
                .then(() => {
                  setLoading(false);
                  setUrlTypeState('qualquer valor');
                })
                .catch((err) => {
                  setLoading(false);

                  crashlytics().recordError(
                    err,
                    'MagicLink - Switch URLPath - AcessoDireto'
                  );
                  error('Erro de autenticação. Token inválido ou expirado.');

                  navigation.navigate('Login');
                });
            });
          } else {
            login(URLToken)
              .then(() => {
                setLoading(false);
                setUrlTypeState('qualquer valor');
              })
              .catch((err) => {
                setLoading(false);

                crashlytics().recordError(
                  err,
                  'MagicLink - Switch URLPath - AcessoDireto'
                );
                error('Erro de autenticação. Token inválido ou expirado.');

                navigation.navigate('Login');
              });
          }
          // Pensando nesse cenário ainda
          break;
        default:
          setLoading(false);
          break;
      }
    } catch (err) {
      setLoading(false);
      crashlytics().recordError(err, 'MagicLink - Switch URLPath');
      error('Erro de autenticação. Token inválido ou expirado.');

      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    receiveLink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (urlTypeState && isSignedMagic) {
      handleToken(urlTypeState);
      setUrlTypeState('');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedMagic, urlTypeState]);

  // if (loading || isLoadingSelector) {
  return (
    <>
      <OverlayLoader
        outline
        loading={loading || isLoadingSelector}
        style={styles.loader}
      />
      {errorMessage !== '' && (
        <SimpleModal
          modalVisible
          modalMessage={errorMessage}
          onPress={() => setErrorMessage('')}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loader: {
    height: 50,
    width: 50,
  },
});
