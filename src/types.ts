// eslint-disable
import type { StyleCreator, UseStylesType } from '@conexasaude/styles';
import type { ReactNativeStyle } from '@emotion/native';
import { ImageSourcePropType } from 'react-native';
import { AttendanceStatus } from './util/enumerations';

declare module '@conexasaude/styles' {
  export function makeStyles<
    StyleProps extends Record<string, unknown> = Record<string, unknown>,
    StyleKey extends string | number = string,
    StyleType = ReactNativeStyle
  >(
    styles: Record<StyleKey, StyleType | StyleCreator<StyleProps, StyleType>>
  ): UseStylesType<StyleProps, StyleKey, StyleType>;
}

export interface MultiUserType extends Array<LoginType> {}
export interface LoginType {
  usuario: UserType;
  token: string;
}
export interface UserType {
  id: number;
  nome: string;
  login: string;
  perfil: string;
  profissional: string | null;
  clinica: UserClinicType;
  paciente: PacientType;
  flagAtivo: boolean;
  telefoneCelular: string;
  token: string;
  urlFoto: string;
  nomeCompleto: string;
  descricaoPerfil: string;
  idDaClininca: number;
  admin: boolean;
  perfilValidoParaConsultaSemPagamento: boolean;
}

export type AttendanceStatusType =
  | 'CHAMADA ATIVA'
  | 'AGUARDANDO_ATENDIMENTO'
  | 'ATENDIMENTO_INICIADO'
  | 'CHAMADA_INICIADA'
  | 'CHAMADA_ENCERRADA'
  | 'CHAMADA_REINICIADA'
  | 'ATENDIMENTO_CANCELADO_PELO_MEDICO'
  | 'ATENDIMENTO_CANCELADO_POR_ATRASO'
  | 'ATENDIMENTO_CONCLUIDO'
  | 'ATENDIMENTO_CANCELADO_PELO_PACIENTE';

export interface UserClinicType {
  id: number;
  nome: string;
  foto: string | null;
  produto: string;
  status: {
    status: string;
    descricao: string | null;
  };
  urlFoto: string | null;
}

export interface CardType {
  id: string;
  cardExpiration: string;
  cardCVV: string;
  cardNumber: string;
  cardName: string;
  urlBandeira: string;
}

export interface PacientType {
  id: number;
  nome: string;
  dataNascimento: string | null;
  cpf: string | null;
  nomeResponsavel: string | null;
  cpfResponsavel: string | null;
  sexo: string | null;
  email: string;
  telefoneCelular: string | null;
  carteiraConvenio: string | null;
  clinica: UserClinicType;
  token: string;
  titular: string | null;
  idade: number | null;
  idClinica: number;
  primeiroNome: string;
  urlFoto: string;
}

export interface UserDetailsType {
  nome: string;
  dataNascimento: string;
  email: string;
  sexo: 'M' | 'F' | 'NAO_INFORMADO';
  telefoneCelular: string;
}
export interface ProfessionalBasicInfoType {
  professionalTypeId: string;
  professionalTypeLabel: string;
}

export interface ProfessionalType extends ProfessionalBasicInfoType {
  professionalName?: string;
  imgProfile?: ImageSourcePropType;
  id: string;
  nome: string;
  urlFoto: string;
  especialidade: string;
  sexo: 'M' | 'F' | 'NAO_ESPECIFICADO';
}

export interface RouteDataType {
  professionalTypeId: string | undefined;
  professionalTypeLabel: string | undefined;
  professionalId?: number;
  userId: string | undefined;
  clinicId: string | undefined;
  responseId?: string;
  hasNoPreference?: boolean;
}

export interface PaymentDataType extends RouteDataType {
  dateTime?: Date;
  way: string;
}

export interface MedicineType {
  idMedicamento: number;
  nome: string;
  classeTerapeutica: string;
  periodLabel: string;
  periodType: string;
  periodQtd: number;
}

export interface SymptomType {
  id: string;
  imagem: string;
  descricao: string;
}
export interface ClinicType {
  codigoUnico: string;
  id: string;
  idPaciente: string;
  nome: string;
  nomePaciente: string;
  urlTermo: string;
  flagPermiteEmail: boolean;
  flagPermiteSms: boolean;
}
export interface CNUType {
  id: string;
  numeroCartao: string;
  paciente: {
    id: string;
    name: string;
  };
  plano: {
    id: string;
    name: string;
  };
  convenio: {
    id: string;
    name: string;
  };
}
export interface CNUTypes extends Array<CNUType> {}

export interface DependentType {
  celular: string;
  cpf: string;
  dataNascimento: string;
  email: string;
  flagAtivo: boolean;
  nome: string;
  token: string;
  idDependente: string;
  emailDependenteIgualTitular: boolean;
  cpfDependenteIgualTitular: boolean;
}
export interface DependentsType extends Array<DependentType> {}

export interface ClinicsType extends Array<ClinicType> {}

export interface UserDataType {
  celular: string;
  cpf: string;
  dataNascimento: string;
  email: string;
  token: string;
  nome: string;
}

export interface SpecialtyType {
  id: string;
  nome: string;
  descricao: string;
  preco?: number;
  linkImagem: string;
}

export type GenderType = 'M' | 'F' | 'NAO_INFORMADO';

export interface AttachmentType {
  idAnexo?: string;
  codigoAnexo?: string;
  conteudoBase64: string;
  legenda: string;
  nomeExtensao: string;
  extensaoArquivo?: string;
  size?: number;
  urlDownload: string;
  uri?: string;
}

export interface CallManagerType {
  urlFoto: string;
  sexoProfissional: GenderType;
  nomeProfissional: string;
}

export interface AttandanceQueueType {
  tempoEstimado: number;
  idProtocolo: string;
  idPreFila?: string;
  anexos: AttachmentType[];
  fotoProfissional: string;
  sexoProfissional: GenderType;
  nomeProfissional: string;
  status: string;
  tempoMinimoEspera: number;
  tempoMaximoEspera: number;
}

export interface CallInfoProps {
  idAtendimento: number;
  nomeProfissional: string;
  idChamada: string;
  urlFoto: string;
  tipoMeeting: string;
  tokenChamada: string;
  zoomMeetingId: string;
  zoomMeetingUrl: string;
  zoomMeetingPasswd: string;
}

export interface AditionalDataType {
  professionalTypeId: string;
  professionalTypeLabel: string;
  professionalGender: string;
  professionalImg?: string;
}

export interface QueueLocalType {
  idAtendimento: number;
  fotoProfissional: string;
  nomeProfissional: string;
  status: string;
  sexoProfissional: GenderType;
  tipoMeeting: string;
  tokenChamada: string;
  zoomMeetingId: string;
  zoomMeetingPasswd: string;
  zoomMeetingUrl?: string;
  idProfissional?: string;
}

export type RootStackParamList = {
  Splash: undefined;
  VerifyEmail: { email: string };
  SpashCall: undefined;
  UserActivation: undefined;
  SelectClinic: {
    clinics: ClinicsType;
    nextStep: number;
    totalSteps: number;
  };
  DataConfirmation: {
    clinic: ClinicType;
    userData: UserDataType;
    nextStep: number;
    totalSteps: number;
    dependent?: DependentType;
    password?: string;
    dependents?: DependentsType;
    ownAccount?: boolean;
    editEmail?: boolean;
  };
  DataConfirmationForm: {
    clinic: ClinicType;
    userData: UserDataType;
    nextStep: number;
    totalSteps: number;
    dependent?: DependentType;
    password?: string;
    dependents?: DependentsType;
    ownAccount?: boolean;
  };
  RegisterPassword: {
    clinic: ClinicType;
    userData: UserDataType;
    nextStep: number;
    totalSteps: number;
    dependent?: DependentType;
    password?: string;
    dependents?: DependentsType;
    ownAccount?: boolean;
  };
  CodeConfirmation: {
    clinic: ClinicType;
    userData: UserDataType;
    nextStep: number;
    totalSteps: number;
    dependent?: DependentType;
    password?: string;
    dependents?: DependentsType;
    ownAccount?: boolean;
  };
  BirthdayConfirmation: {
    clinic: ClinicType;
    userData: UserDataType;
    nextStep: number;
    totalSteps: number;
    onGoBack: () => void;
  };
  TermsConfirmation: {
    clinic: ClinicType;
    userData: UserDataType;
    nextStep: number;
    totalSteps: number;
    password: string;
    dependents?: DependentsType;
  };
  SelectDependents: {
    clinic: ClinicType;
    userData: UserDataType;
    nextStep: number;
    totalSteps: number;
    dependents: DependentsType;
    password: string;
  };
  SelectDependentAccount: {
    clinic: ClinicType;
    userData: UserDataType;
    nextStep: number;
    totalSteps: number;
    dependent: DependentType;
    dependents: DependentsType;
    password: string;
  };
  SelectDependentActivation: {
    clinic: ClinicType;
    userData: UserDataType;
    nextStep: number;
    totalSteps: number;
    dependent: DependentType;
    dependents: DependentsType;
    password: string;
  };
  ActivationSuccess: {
    userData: UserDataType;
    password?: string;
  };
  RegisterNewPassword: undefined;
  NotValidCPF: undefined;
  FaceValidation: undefined;
  DocumentValidation: undefined;
  HasUserLogged: undefined;
  Login?: { path?: string };
  Signup: undefined;
  BottomTabs?: { path?: string; toMyAppointments?: boolean };
  ForgotPassword: undefined;
  Profile: undefined;
  ChangePassword: undefined;
  ChangePhone: undefined;
  Multiprofile: {
    // eslint-disable-next-line camelcase
    previous_screen: string;
    way: string;
    showModal: true;
    fromLogin: true;
  };
  TermsOfUse: {
    backToLogin: boolean;
    clinic: {};
  };
  AttachedItems: undefined;
  DoctorList: undefined;
  AttendanceAttachment: { paymentData: PaymentDataType; userName: string };
  ChooseAttendance: {
    professionalTypeId: string;
    professionalTypeLabel: string;
    manual: boolean;
    automatic: boolean;
    userId?: string;
    clinicId?: string;
    atendimentoImediato: boolean;
    atendimentoAgendado: boolean;
  };
  SaveBasicInformations: {
    selectedItem: {};
    userDetails: UserDetailsType;
    clinicId: number;
    userId: number;
  };
  Symptoms: { paymentData: PaymentDataType };
  StrongSymptoms: { paymentData: PaymentDataType };
  Medicines: { paymentData: PaymentDataType };
  AddMedicines: { token: string };
  Access: { paymentData: PaymentDataType; way: string };
  AppointmentPayment: { paymentData: PaymentDataType };
  WaitingRoom: {
    professionalTypeLabel: string;
    professionalTypeId: string;
  };
  DependentsConfirmation: undefined;
  DependentsRegister: undefined;
  CompletedAppointments: undefined;
  CanceledAppointments: undefined;
  ScheduledAppointments: undefined;
  ActivateYourAccount: undefined;
  ScheduledAppointmentsDetails: undefined;
  HasPreference: { professionalTypeId: string; professionalTypeLabel: string };
  SpecialtyTabNavigator: {
    professionalTypeId: string;
    professionalTypeLabel: string;
  };
  DoctorDetailNavigator: {
    sobre: string;
    professionalId: number;
    professionalName: string;
    professionalImg: ImageSourcePropType;
    professionalSpecialty: string;
    professionalGender: GenderType;
    professionalTypeLabel: string;
    professionalTypeId: string;
    rescheduleAppointmentToken: string;
    index: number;
  };
  ScheduleAttendance: {
    rescheduleAppointmentToken: string;
    professionalTypeId: string;
    professionalTypeLabel: string;
    professionalSpecialty: string;
  };
  SelectDoctor: undefined;
  SelectDoctorAll: {
    professionalTypeId: string;
    professionalTypeLabel: string;
  };
  ScheduleFinished: {
    professionalTypeId?: string;
    professionalTypeLabel?: string;
    professionalName?: string;
    responseId?: string;
    hasNoPreference?: boolean;
  };
  Attachments: {
    responseId: string;
    hasNoPreference: string;
    professionalTypeId: string;
    professionalTypeLabel: string;
  };
  SelectCNU: {
    professionalTypeLabel: string;
    cnu: CNUTypes;
    handleCNU: (selectedCnu: string) => void;
  };

  FirstAttendance: {
    textoPrimeiroAtendimento: string;
    textoPrimeiroAtendimentoComplemento: string;
    isNotFirstAttendance: () => void;
  };

  ConfirmContactInfo: undefined;
  RateProfessional: {
    appointmentDetail: {
      idAtendimento: number;
      nomeProfissional?: string;
    };
  };
  RateOurPlatform: {
    nomeProfissional?: string;
    idAtendimento: number;
    userId?: number;
    clinicId?: number;
  };
  RecommendProfessional: {
    idAtendimento: number;
    nomeProfissional?: string;
  };
  RecommendOurPlatform: {
    idAtendimento: number;
    professionalNPS: number;
  };
  RateFinished: {
    professionalNPS: number;
    platformNPS: number;
    professionalRate: number;
    platformRate: number;
  };

  AddCard: {
    type: string;
  };
  MyCards: undefined;
  MyCardsDetails: undefined;
  ScheduledAppointmentsImagesAttached: undefined;
  AppointmentGuide: {
    paymentData: PaymentDataType;
    idAttendance: number;
    professionalTypeId: string;
    professionalTypeLabel: string;
    professionalSpecialty?: string;
    professionalName: string;
    imgProfile: ImageSourcePropType;
    way: string;
    scheduledNoPreference: boolean;
  };
  WaitingRoomScheduled: {
    idAttendance: number;
    professionalTypeId: string;
    professionalTypeLabel: string;
    professionalSpecialty: string;
    professionalName: string;
    imgProfile: string;
  };
  AppointmentWasCanceled: {
    status: string;
    aditionalData: AditionalDataType;
  };
  Vonage: {
    // eslint-disable-next-line camelcase
    id_chamada: string;
    idAtendimento: number;
    nomeProfissional: string;
  };
  Jitsi: {
    // eslint-disable-next-line camelcase
    id_chamada: string;
    idAtendimento: number;
    nomeProfissional: string;
    urlAtendimento: string;
  };
  Twilio: {
    // eslint-disable-next-line camelcase
    id_chamada: string;
    idAtendimento: number;
    roomName: string;
    nomeProfissional: string;
  };
  Zoom: {
    // eslint-disable-next-line camelcase
    id_chamada: string;
    zoomMeetingPasswd: string;
    zoomMeetingId: string;
    idAtendimento: number;
    nomeProfissional: string;
  };
  CallManager: { fcmDataMessage: CallManagerType };
  Zendesk: {
    // eslint-disable-next-line camelcase
    alta_prioridade?: string;
    produtos?: string;
  };
};

export type HomeTabStackParamList = {
  DoctorList: undefined;
  CompletedAppointments: undefined;
  ScheduledAppointmentsDetailsHome: undefined;
};
