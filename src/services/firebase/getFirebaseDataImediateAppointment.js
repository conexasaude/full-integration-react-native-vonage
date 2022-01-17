import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Firebase from './firebase';
import {
  setFirebaseImediateAppointments,
  setImediateAppointmentsListener,
} from '../../store/modules/firebaseImediateAppointments/actions';

export default function GetFirebaseDataImediateAppointment() {
  const dispatch = useDispatch();
  const multiUser = useSelector((state) => state.chosenClinic.chosenClinic);
  // let previousUser = useRef(null);

  // dispatching firebase snapshot
  async function setSnapshotValue(val) {
    await dispatch(setFirebaseImediateAppointments(val));
  }

  if (multiUser !== undefined && multiUser !== null) {
    let databaseImediato = Firebase.database()
      .ref()
      .child('filaAtendimento')
      .child(`${multiUser?.clinica?.id}`)
      .child('imediato')
      .child(`${multiUser?.paciente?.id}`);

    // if (
    //   previousUser?.current &&
    //   previousUser?.current?.paciente?.id !== multiUser?.paciente?.id
    // ) {
    //   console.log('off');
    //   let dbOff = Firebase.database()
    //     .ref()
    //     .child('filaAtendimento')
    //     .child(`${previousUser?.current?.clinica?.id}`)
    //     .child('imediato')
    //     .child(`${previousUser?.current?.paciente?.id}`);
    //   dbOff.off();
    //   previousUser.current = multiUser;
    // }

    databaseImediato.on('value', async (snapshot) => {
      if (snapshot.val()) {
        setSnapshotValue(Object.entries(snapshot.val()));
      } else {
        setSnapshotValue(null);
      }
    });
    // dispatching firebase callback for a necessary turn off later
    dispatch(setImediateAppointmentsListener(databaseImediato));
  }
}
