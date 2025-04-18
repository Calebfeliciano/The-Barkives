import { Schema, model, type Document } from 'mongoose';

interface IAppointment extends Document {
  title: string;
  description: string;
  date: string;
  time: string;
  userId: string;
}

const appointmentSchema = new Schema<IAppointment>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Appointment = model<IAppointment>('Appointment', appointmentSchema);
export { type IAppointment };
export default Appointment;
