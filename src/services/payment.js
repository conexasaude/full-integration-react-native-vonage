import { Alert } from 'react-native';
import api from './api';
import { logCustomEvent, slugify } from './firebase/firebase';
import { professionalTypesID } from '../util/enumerations';

// Reserva pagamento para atendimento imediato
async function reservePaymentImmediate(creditCardId, userToken, data) {
  try {
    logCustomEvent('clique_confirma_atend_imediato_t');

    if (
      data?.tipoProfissional === professionalTypesID.MED ||
      data?.tipoProfissional === professionalTypesID.NUTRI ||
      data?.tipoProfissional === professionalTypesID.PSICO
    ) {
      logCustomEvent(
        `conf_atend_imediato_${slugify(data?.tipoProfissional)}_t`
      );
      console.log('conf_atend_imediato');
    }

    const res = await api.post(
      'financeiro/reservar/pagamento/imediato',
      {
        tipoProfissional: data?.tipoProfissional,
        pagamento: { idCartao: creditCardId },
      },
      { headers: { token: userToken } }
    );
    const transationId = res.data.object;
    if (getInQueue(creditCardId, transationId, userToken, data)) return true;
    return false;
  } catch (error) {
    Alert.alert(
      'Ops!',
      'Ocorreu um erro durante o pagamento1. Por favor tente novamente.'
    );
    return false;
  }
}

// Entrar na fila do atendimento imediato
async function getInQueue(creditCardId, transationId, userToken, cnu) {
  try {
    const response = await api.post(
      '/atendimento/novo/imediato',
      {
        idCartao: creditCardId,
        idTransacao: transationId,
        cartaoConvenio: {
          id: cnu,
        },
      },
      { headers: { token: userToken } }
    );
    if (response.data.status === 200) {
      console.log('pagamento ', response.data);
      return true;
    }
    return false;
  } catch (error) {
    Alert.alert(
      'Ops!',
      'Ocorreu um erro durante o pagamento2. Por favor tente novamente. Teste'
    );
    return false;
  }
}

// Entrar na fila do atendimento imediato sem efetuar o pagamento
function getInQueueWithoutPayment(
  userToken,
  tipoProfissional,
  checkedSimptoms,
  simptomsStrong,
  includedMedicines,
  attachments,
  cnu
) {
  let sintomas = [];
  let sintomasEvidentes = [];
  let medicamentos = [];

  checkedSimptoms?.map((item) => sintomas.push(item.descricao));
  simptomsStrong?.map((item) => sintomasEvidentes.push(item.descricao));
  includedMedicines?.map((item) => medicamentos.push(item.idMedicamento));

  try {
    return api.post(
      '/atendimento/novo/imediato',
      {
        tipoProfissional,
        sintomas,
        sintomasEvidentes,
        medicamentos,
        anexos: attachments,
        cartaoConvenio: {
          id: cnu,
        },
      },
      {
        headers: {
          token: userToken,
        },
      }
    );
  } catch (error) {
    Alert.alert(
      'Ops!',
      'Ocorreu um erro durante o pagamento. Por favor tente novamente. Teste'
    );
    return false;
  }
}

// Reserva pagamento para atendimento imediato
async function paymentNoPreference(
  dateTime,
  professionalTypeId,
  creditCardId,
  userToken,
  cnu,
  hasPayment = true
) {
  try {
    const payload = hasPayment
      ? {
          dataHora: dateTime,
          pagamento: { idCartao: creditCardId }, // ver fragilidade com eberson
          tipoProfissional: professionalTypeId,
          cartaoConvenio: {
            id: cnu,
          },
        }
      : {
          dataHora: dateTime,
          tipoProfissional: professionalTypeId,
          cartaoConvenio: {
            id: cnu,
          },
        };
    logCustomEvent('clique_confirma_atend_agendado_t');
    const response = await api.post(
      '/atendimento/novo/agendado/sem-profissional',
      payload,
      { headers: { token: userToken } }
    );

    if (response.data.status == 200) {
      return { status: true, responseId: response.data.object };
    }
    return { status: false, msg: response.data.msg, responseId: null };
  } catch (error) {
    Alert.alert(
      'Ops!',
      'Ocorreu um erro durante o pagamento. Por favor tente novamente.'
    );
    return false;
  }
}

async function paymentWithPreference(
  dateTime,
  professionalId,
  creditCardId,
  userToken,
  cnu,
  hasPayment = true
) {
  try {
    logCustomEvent('clique_confirma_atend_agendado_t');

    const payload = hasPayment
      ? {
          dataHoraAgendamento: dateTime,
          idProfissional: professionalId,
          pagamento: {
            idCartao: creditCardId,
          },
          cartaoConvenio: {
            id: cnu,
          },
        }
      : {
          dataHoraAgendamento: dateTime,
          idProfissional: professionalId,
          cartaoConvenio: {
            id: cnu,
          },
        };

    const response = await api.post('/atendimento/novo/agendado', payload, {
      headers: { token: userToken },
    });
    if (response.data.status === 200) {
      return { status: true, responseId: response.data.object };
    }
    return { status: false, msg: response.data.msg, responseId: null };
  } catch (error) {
    Alert.alert(
      'Ops!',
      'Ocorreu um erro durante o pagamento. Por favor tente novamente.'
    );
    return false;
  }
}

export {
  reservePaymentImmediate,
  paymentNoPreference,
  paymentWithPreference,
  getInQueueWithoutPayment,
};
