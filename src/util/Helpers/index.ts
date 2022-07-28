import { Platform, Alert } from 'react-native';
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';

import { GenderType } from '@root/types';
import api from '@services/api';
import { logCustomEvent, slugify } from '@services/firebase/firebase';
import { professionalTypesID } from '@util/enumerations';

import { ThemeAssets } from '@root/variables';

export function formatPrice(val: number) {
  let value = String(val);
  let newValue = '';
  if (value !== undefined) {
    if (value.includes('.')) {
      newValue = value.replace('.', ',');
      if (newValue.split(',')[1].length === 1) {
        newValue += 0;
      }
    } else {
      newValue = `${value},00`;
    }
    return newValue;
  }
  return value;
}

export function handleClickSchedule(
  manual: boolean,
  automatic: boolean,
  routeData,
  navigation
) {
  const { professionalTypeId, professionalId, token } = routeData;

  logCustomEvent('clique_atend_agendado_t');

  if (
    professionalTypeId === professionalTypesID.MED ||
    professionalTypeId === professionalTypesID.PSICO ||
    professionalTypeId === professionalTypesID.NUTRI
  ) {
    logCustomEvent(`clique_atend_agendado_${slugify(professionalTypeId)}_t`);
  }

  if (professionalId) {
    getDoctorData(professionalId, token).then((ret) => {
      navigation.navigate('DoctorDetailNavigator', {
        sobre: false,
        professionalId: ret.idProfissional,
        professionalName: ret.nome,
        professionalImg: ret.urlFoto,
        professionalSpecialty: ret.nomeEspecialidade,
        professionalTypeLabel: professionalTypeId,
      });
    });

    return true;
  }

  if (manual === false) {
    navigation.replace('ScheduleAttendance', routeData);
    return true;
  }

  if (automatic === false) {
    if (professionalTypeId === professionalTypesID.MED) {
      navigation.replace('SpecialtyTabNavigator', routeData);
    } else {
      navigation.replace('SelectDoctorAll', routeData);
    }
    return true;
  }

  if (manual && automatic) {
    navigation.replace('HasPreference', routeData);
    return true;
  }

  return true;
}

const getDoctorData = (professionalId, token) =>
  new Promise((resolve) => {
    api
      .get(`/profissional/detalhar/${professionalId}`, {
        headers: { token },
      })
      .then((res) => {
        resolve(res.data.object);
      });
  });

export function checkPermissions(navigation, goTo, data) {
  if (Platform.OS === 'android') {
    requestMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ]).then((statuses) => {
      if (
        statuses[PERMISSIONS.ANDROID.CAMERA] === 'granted' &&
        statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === 'granted'
      ) {
        navigation.navigate(goTo, data);
      } else {
        console.warn('Permissoes negadas.');
      }
    });
  } else if (Platform.OS === 'ios') {
    requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE]).then(
      (statuses) => {
        if (
          statuses[PERMISSIONS.IOS.CAMERA] === 'granted' &&
          statuses[PERMISSIONS.IOS.MICROPHONE] === 'granted'
        ) {
          navigation.navigate(goTo, {
            professionalTypeId: 'MEDICO',
            professionalTypeLabel: 'doutor teste',
          });
        } else {
          console.warn('Permissoes negadas.');
        }
      }
    );
  }
}

export function saveRating(data, token, navigation) {
  api
    .post('/avaliacao-atendimento/salvar/', data, { headers: { token } })
    .then((res) => {
      if (res.data.status !== 200) {
        Alert.alert('Ops!', res.data.msg);
        navigation.goBack();
      }
    })
    .catch(() => {
      Alert.alert(
        'Ops!',
        'Ocorreu um erro durante a sua avaliação. Por favor tente novamente.'
      );
      navigation.goBack();
    });
}

export function handleAnalyticsCheckoutLogs(
  schedule,
  preference,
  professionalTypeId,
  professionalTypeLabel
) {
  if (schedule === true) {
    if (preference === true) {
      logCustomEvent(
        `checkout_iniciad_com_pref_${slugify(professionalTypeLabel)}_t`
      );
    } else {
      logCustomEvent(
        `checkout_iniciad_sem_pref_${slugify(professionalTypeLabel)}_t`
      );
    }
  } else
    logCustomEvent(`checkout_iniciad_imed_${slugify(professionalTypeLabel)}_t`);
}

// Bloqueia o botão de voltar do dispositivo
export function preventGoBack(nav) {
  nav.addListener('beforeRemove', (e) => {
    if (e.data.action.type === 'GO_BACK') {
      e.preventDefault();
    }
  });
}

export function cpfValid(cpf: string) {
  cpf = cpf.match(/\d+/g).join('');
  let Soma;
  let Resto;
  Soma = 0;
  if (cpf === '00000000000') {
    return false;
  }

  for (let i = 1; i <= 9; i++) {
    // eslint-disable-next-line radix
    Soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) {
    Resto = 0;
  }
  // eslint-disable-next-line radix
  if (Resto !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  Soma = 0;
  for (let i = 1; i <= 10; i++) {
    // eslint-disable-next-line radix
    Soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) {
    Resto = 0;
  }
  // eslint-disable-next-line radix
  if (Resto !== parseInt(cpf.substring(10, 11))) {
    return false;
  }
  return true;
}

export function setImgCanceling(
  professionalImg: string | undefined,
  professionalGender: string
) {
  if (!professionalImg) return { uri: professionalImg };
  if (!professionalGender === 'F') {
    return ThemeAssets.cancelingImgWoman;
  }
  return ThemeAssets.cancelingImgMan;
}

export const appIdIos = 1476749720;
export const appIdAndroid = 'br.com.conexasaude';
export const appIdAndroidDocpass = 'br.com.docpass';
export const appIdIosDocpass = 1516492695;
