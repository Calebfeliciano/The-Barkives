import { useQuery, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
} from 'date-fns';
import { GET_APPOINTMENTS } from '../utils/queries';
import { ADD_APPOINTMENT, DELETE_APPOINTMENT } from '../utils/mutations';
import Auth from '../utils/auth';
import '../styles/Calendar.css';

export default function Calendar() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);

  // Get user ID from token
  useEffect(() => {
    if (!Auth.loggedIn()) {
      navigate('/login');
      return;
    }

    try {
      const profile: any = Auth.getProfile();
      const id = profile?._id || profile?.data?._id; // handle both possible formats
      if (id) {
        setUserId(id);
      } else {
        console.error('User ID not found in token.');
        navigate('/login');
      }
    } catch (err) {
      console.error('Error decoding token:', err);
      navigate('/login');
    }
  }, [navigate]);

  const { data, refetch } = useQuery(GET_APPOINTMENTS, {
    variables: { userId: userId || '' },
    skip: !userId, // Skip query until we have a user ID
  });

  const appointmentsByDate: { [date: string]: any[] } = {};
  if (data?.appointmentsByUser) {
    data.appointmentsByUser.forEach((appointment: any) => {
      if (!appointmentsByDate[appointment.date]) {
        appointmentsByDate[appointment.date] = [];
      }
      appointmentsByDate[appointment.date].push(appointment);
    });
  }

  const [addAppointment] = useMutation(ADD_APPOINTMENT, {
    onCompleted: () => {
      refetch();
      setTitle('');
      setDescription('');
      setTime('');
    },
  });

  const handleAdd = async () => {
    if (!title || !selectedDate || !time || !userId) return;

    const appointmentInput = {
      title,
      description,
      date: selectedDate,
      time,
    };

    try {
      await addAppointment({
        variables: {
          userId,
          input: appointmentInput,
        },
      });

      // After adding the appointment, clear form and reset selectedDate
      setTitle('');
      setDescription('');
      setTime('');
      setSelectedDate(''); // Reset selected date to allow adding appointments to other days
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  const [deleteAppointment] = useMutation(DELETE_APPOINTMENT, {
    onCompleted: () => {
      refetch(); // Refetch appointments after deletion
      setSelectedAppointment(null); // Reset selected appointment after deletion
    },
  });
  
  const handleDelete = async (appointmentId: string) => {
    try {
      await deleteAppointment({ variables: { appointmentId } });
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };  

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const calendarDays: Date[] = [];
  let day = startDate;
  while (day <= endDate) {
    calendarDays.push(day);
    day = addDays(day, 1);
  }

  if (!userId) {
    return <p>Loading user info...</p>;
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>←</button>
        <h3>
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </h3>
        <button onClick={handleNextMonth}>→</button>
      </div>

      <div className="calendar-days">
        {daysOfWeek.map((day) => (
          <div key={day} className="calendar-day-label">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {calendarDays.map((date, index) => {
          const isoDate = format(date, 'yyyy-MM-dd');
          const isCurrentMonth = isSameMonth(date, currentDate);
          const isSelected = selectedDate === isoDate;
          const appointments = appointmentsByDate[isoDate] || [];

          return (
            <div
              key={index}
              className={`calendar-cell ${isSelected ? 'selected' : ''} ${
                !isCurrentMonth ? 'outside-month' : ''
              }`}
              onClick={() => setSelectedDate(isoDate)}
            >
              <div className="calendar-date">{format(date, 'd')}</div>

              {appointments.map((appt) => (
                <div
                  key={appt._id}
                  className="calendar-appointment"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAppointment(appt);
                  }}
                >
                  <span>{appt.title}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Add Appointment Form */}
      <div className="calendar-form">
        <h4>Add Appointment</h4>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <input
          placeholder="Appointment title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {/* Modal/Popup for Deleting Appointment */}
      {selectedAppointment && (
        <div className="appointment-modal">
          <div className="app-modal-content">
            <h4>Are you sure you want to delete this appointment?</h4>
            <p>
              <strong>{selectedAppointment.title}</strong>
            </p>
            <p>{selectedAppointment.description}</p>
            <p>
              {selectedAppointment.date} at {selectedAppointment.time}
            </p>
            <button className="app-button" onClick={() => handleDelete(selectedAppointment._id)}>Delete</button>
            <button className="app-button" onClick={() => setSelectedAppointment(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
