import iconsConfig from '../components/ProfessionalTypeList/iconsConfig';

function getSpecialistAssets(id: string) {
  let professionalArt = null;

  switch (id) {
    case 'MEDICO': {
      professionalArt = iconsConfig.medicoPro;
      break;
    }
    case 'ENFERMEIRO': {
      professionalArt = iconsConfig.enfermeiroPro;
      break;
    }
    case 'PSICOLOGO': {
      professionalArt = iconsConfig.psicologoPro;
      break;
    }
    case 'NUTRICIONISTA': {
      professionalArt = iconsConfig.nutricionistaPro;
      break;
    }
    case 'DENTISTA': {
      professionalArt = iconsConfig.dentistaPro;
      break;
    }
    case 'FISIOTERAPEUTA': {
      professionalArt = iconsConfig.fisioterapiaPro;
      break;
    }
    case 'FONOAUDIOLOGO': {
      professionalArt = iconsConfig.fonoaudiologoPro;
      break;
    }
    case 'ASSISTENTE_SOCIAL': {
      professionalArt = iconsConfig.assistenteSocialPro;
      break;
    }
    case 'ACADEMICO': {
      professionalArt = iconsConfig.orientadorAcademicoPro;
      break;
    }
    default:
  }

  return professionalArt;
}

function getSpecialistIcon(id: string) {
  let professionalIcon = null;

  switch (id) {
    case 'MEDICO': {
      professionalIcon = iconsConfig.medico;
      break;
    }
    case 'ENFERMEIRO': {
      professionalIcon = iconsConfig.enfermeiro;
      break;
    }
    case 'PSICOLOGO': {
      professionalIcon = iconsConfig.psicologo;
      break;
    }
    case 'NUTRICIONISTA': {
      professionalIcon = iconsConfig.nutricionista;
      break;
    }
    case 'DENTISTA': {
      professionalIcon = iconsConfig.dentista;
      break;
    }
    case 'FISIOTERAPEUTA': {
      professionalIcon = iconsConfig.fisioterapia;
      break;
    }
    case 'FONOAUDIOLOGO': {
      professionalIcon = iconsConfig.fonoaudiologo;
      break;
    }
    case 'ASSISTENTE_SOCIAL': {
      professionalIcon = iconsConfig.assistenteSocial;
      break;
    }
    case 'ACADEMICO': {
      professionalIcon = iconsConfig.orientadorAcademico;
      break;
    }
    default:
  }

  return professionalIcon;
}

function getSpecialistText(id: string) {
  let text = '';

  switch (id) {
    case 'MEDICO': {
      text = 'Para cuidar da sua saúde com clínicos gerais ​e especialistas.​';
      break;
    }
    case 'ENFERMEIRO': {
      text = 'Para orientar e acompanhar o seu tratamento.​';
      break;
    }
    case 'PSICOLOGO': {
      text = 'Consultas on-line com especialistas em psicologia​';
      break;
    }
    case 'NUTRICIONISTA': {
      text = 'Para orientar sobre hábitos ​e alimentação saudáveis.';
      break;
    }
    case 'DENTISTA': {
      text = 'Para garantir ​a saúde dos seus dentes e gengiva.';
      break;
    }
    case 'FISIOTERAPEUTA': {
      text = 'Para ajudar na sua reabilitação física.​';
      break;
    }
    case 'FONOAUDIOLOGO': {
      text = 'Para desenvolver a sua comunicação oral e escrita.​';
      break;
    }
    case 'ASSISTENTE_SOCIAL': {
      text = 'Para te acolher e encaminhar ao especialista adequado.​';
      break;
    }
    case 'ACADEMICO': {
      text = '';
      break;
    }
    default:
  }

  return text;
}

export { getSpecialistAssets, getSpecialistIcon, getSpecialistText };
