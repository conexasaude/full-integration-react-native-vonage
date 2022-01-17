import { useSelector, useDispatch } from 'react-redux';
import Firebase from './firebase';
import {
  setFirebaseScheduleAppointments,
  setScheduledAppointmentsListener,
} from '../../store/modules/firebaseScheduleAppointments/actions';

export default function GetFirebaseDataScheduleAppointment() {
  const dispatch = useDispatch();
  const multiUser = useSelector((state) => state.chosenClinic.chosenClinic);

  // dispatching firebase snapshot
  async function setSnapshotValue(val) {
    await dispatch(setFirebaseScheduleAppointments(val));
  }

  if (multiUser !== undefined && multiUser !== null) {
    let database123 = Firebase.database()
      .ref()
      .child('filaAtendimento')
      .child(`${multiUser?.clinica?.id}`)
      .child('agendado')
      .child(`${multiUser?.paciente?.id}`);

    database123.on('value', async (snapshot) => {
      if (snapshot.val()) {
        setSnapshotValue(Object.entries(snapshot.val()));
      } else {
        setSnapshotValue(null);
      }
    });
    // dispatching firebase callback for a necessary turn off later
    dispatch(setScheduledAppointmentsListener(database123));
  }
}
