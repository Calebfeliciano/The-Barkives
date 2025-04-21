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
import {
  ADD_APPOINTMENT,
  DELETE_APPOINTMENT,
  UPDATE_APPOINTMENT,
} from '../utils/mutations';
import Auth from '../utils/auth';
import '../styles/Calendar.css';

export default function Calendar() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);

  // Modal state for adding appointment
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newTime, setNewTime] = useState('');

  useEffect(() => {
    if (!Auth.loggedIn()) {
      navigate('/login');
      return;
    }

    try {
      const profile: any = Auth.getProfile();
      const id = profile?._id || profile?.data?._id;
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
    skip: !userId,
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
      setShowAddModal(false);
      setNewTitle('');
      setNewDescription('');
      setNewTime('');
    },
  });

  const handleAdd = async () => {
    if (!newTitle || !selectedDate || !newTime || !userId) return;

    const appointmentInput = {
      title: newTitle,
      description: newDescription,
      date: selectedDate,
      time: newTime,
    };

    try {
      await addAppointment({
        variables: {
          userId,
          input: appointmentInput,
        },
      });
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  const [deleteAppointment] = useMutation(DELETE_APPOINTMENT, {
    onCompleted: () => {
      refetch();
      setSelectedAppointment(null);
    },
  });

  const handleDelete = async (appointmentId: string) => {
    try {
      await deleteAppointment({ variables: { appointmentId } });
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const [updateAppointment] = useMutation(UPDATE_APPOINTMENT, {
    onCompleted: () => {
      refetch();
      setSelectedAppointment(null);
    },
  });

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
              onDoubleClick={() => {
                setSelectedDate(isoDate);
                setShowAddModal(true);
              }}
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
                  <span className="appointment-title">{appt.title}</span>
                  <div className="appointment-time">
                    {format(new Date(`1970-01-01T${appt.time}`), 'h:mm a')}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Add Appointment Modal */}
      {showAddModal && (
        <div className="appointment-modal">
          <div className="app-modal-content">
            <h4>Add Appointment</h4>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            /> {/* Allow the user to change the date, defaulting to the selected date */}
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
            />
            <input
              placeholder="Appointment title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <button onClick={handleAdd}>Add</button>
            <button onClick={() => setShowAddModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Edit/Delete Appointment Modal */}
      {selectedAppointment && (
        <div className="appointment-modal">
          <div className="app-modal-content">
            <h4>Edit Appointment</h4>
            <input
              type="date"
              value={selectedAppointment.date}
              onChange={(e) =>
                setSelectedAppointment({ ...selectedAppointment, date: e.target.value })
              }
            />
            <input
              type="time"
              value={selectedAppointment.time}
              onChange={(e) =>
                setSelectedAppointment({ ...selectedAppointment, time: e.target.value })
              }
            />
            <input
              placeholder="Title"
              value={selectedAppointment.title}
              onChange={(e) =>
                setSelectedAppointment({ ...selectedAppointment, title: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              value={selectedAppointment.description}
              onChange={(e) =>
                setSelectedAppointment({
                  ...selectedAppointment,
                  description: e.target.value,
                })
              }
            />
            <button
              onClick={async () => {
                try {
                  await updateAppointment({
                    variables: {
                      appointmentId: selectedAppointment._id,
                      input: {
                        title: selectedAppointment.title,
                        description: selectedAppointment.description,
                        date: selectedAppointment.date,
                        time: selectedAppointment.time,
                      },
                    },
                  });
                } catch (error) {
                  console.error('Error updating appointment:', error);
                }
              }}
            >
              Save
            </button>
            <button onClick={() => handleDelete(selectedAppointment._id)}>
              Delete Appointment
            </button>
            <button onClick={() => setSelectedAppointment(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
