/* eslint-disable prefer-promise-reject-errors */
import api, { apiBaseURL } from './api';
import { waysEnum } from '../util/enumerations';
import { chosenClinicc } from '../store/modules/chosenClinic/actions';
import { getClinicConfig } from '../store/modules/clinicConfig/actions';
import { signInSetTokenUserOfMultiprofile } from '../store/modules/auth/actions';
import { navigationRef } from '@root/RootNavigation';
import { CommonActions } from '@react-navigation/native';

const saveData = (token: string, body: any) =>
  new Promise<void>((resolve, reject) => {
    body.celular = body.celular.replace(/\s/g, '');
    apiBaseURL
      .post(`/integration/ativacao/paciente/${token}/validar-dados`, body)
      .then((res) => {
        if (res.status === 200) {
          resolve();
        } else {
          reject(res.data.msg);
        }
      });
  });

const savePassword = (token: string, body: any) =>
  new Promise((resolve, reject) => {
    apiBaseURL
      .post(`/integration/ativacao/paciente/${token}/cadastrar-senha`, body)
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data.object);
        } else {
          reject(res.data.msg);
        }
      });
  });

const uploadPhoto = (token: string, body: any) =>
  new Promise<void>((resolve, reject) => {
    const headers = {
      'Content-Type': 'multipart/form-data',
    };

    apiBaseURL
      .post(
        `/integration/ativacao/paciente/${token}/anexar-foto-verificacao-ativacao`,
        body,
        headers
      )
      .then((res) => {
        if (res.status === 200) {
          resolve();
        } else {
          reject(res.data.msg);
        }
      });
  });

const acceptTerms = (token: string, body: any) =>
  new Promise<void>((resolve, reject) => {
    apiBaseURL
      .post(`/integration/ativacao/paciente/${token}/aceitar-termo`, body)
      .then((res) => {
        if (res.data.status === 200) {
          resolve();
        } else {
          reject(res.data.msg);
        }
      });
  });

const SignIn = (multiUser: any, navigation: any, dispatch: any) =>
  new Promise<void>((resolve) => {
    if (multiUser.length === 1) {
      const config = {
        headers: { token: multiUser[0].token },
      };

      api('/usuario/validar-token', config).then((response) => {
        if (response.status === 200) {
          dispatch(chosenClinicc(response.data.object, multiUser[0].token));
          dispatch(getClinicConfig(multiUser[0].token));
          dispatch(
            signInSetTokenUserOfMultiprofile({ token: multiUser[0].token })
          );

          navigation.navigate('BottomTabs');
          resolve();
        }
      });
    } else {
      navigation.replace('Multiprofile', {
        previous_screen: 'Login',
        way: waysEnum.MULTIPROFILE,
        showModal: true,
        fromLogin: true,
      });
      resolve();
    }
  });

const cancelFlow = () => {
  navigationRef.current.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{ name: 'Login' }],
    })
  );
};

const activateDependent = (token: string) =>
  new Promise<void>((resolve, reject) => {
    apiBaseURL
      .post(`/integration/ativacao/paciente/${token}/ativar-dependente`)
      .then((response) => {
        if (response.status === 200) {
          resolve();
        } else {
          reject();
        }
      })
      .catch(() => {
        reject();
      });
  });

const setEmailDependent = (token: string, ownAccount?: boolean) =>
  new Promise<void>((resolve, reject) => {
    apiBaseURL
      .put(
        `/integration/ativacao/paciente/${token}/atualizar-email-dependente`,
        { dependenteContaPropria: ownAccount || false }
      )
      .then((response) => {
        if (response.status === 200) {
          resolve();
        } else {
          reject(response.data.msg);
        }
      })
      .catch(() => {
        reject('Um erro ocorreu');
      });
  });

export {
  saveData,
  savePassword,
  uploadPhoto,
  acceptTerms,
  SignIn,
  cancelFlow,
  activateDependent,
  setEmailDependent,
};
