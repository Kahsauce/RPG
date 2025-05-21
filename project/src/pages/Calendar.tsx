import { useState, useCallback, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAppContext } from '../contexts/AppContext';
import { Event, EventType } from '../types';
import { Plus } from 'lucide-react';

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const { state, dispatch } = useAppContext();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    start: new Date(),
    end: new Date(),
    type: 'training' as EventType,
    description: '',
  });

  // Fetch events on component mount
  useEffect(() => {
    // This would normally fetch from the API, but we're using the context state for now
    // In a real implementation, add API calls here
  }, []);

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      setNewEvent({
        title: '',
        start,
        end,
        type: 'training',
        description: '',
      });
      setShowEventModal(true);
    },
    []
  );

  const handleSelectEvent = useCallback((event: Event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  }, []);

  const handleSaveEvent = () => {
    if (newEvent.title && newEvent.start && newEvent.end && newEvent.type) {
      const event = {
        ...newEvent,
        id: Math.random().toString(36).substring(2, 9),
      } as Event;

      dispatch({
        type: 'ADD_EVENT',
        payload: event,
      });

      setShowEventModal(false);
      setNewEvent({
        title: '',
        start: new Date(),
        end: new Date(),
        type: 'training',
        description: '',
      });
    }
  };

  const handleUpdateEvent = () => {
    if (selectedEvent && selectedEvent.id) {
      dispatch({
        type: 'UPDATE_EVENT',
        payload: selectedEvent,
      });

      setShowEventModal(false);
      setSelectedEvent(null);
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEvent && selectedEvent.id) {
      dispatch({
        type: 'DELETE_EVENT',
        payload: selectedEvent.id,
      });

      setShowEventModal(false);
      setSelectedEvent(null);
    }
  };

  const eventStyleGetter = (event: Event) => {
    let style: any = {
      className: '',
    };

    switch (event.type) {
      case 'training':
        style.className = 'training';
        break;
      case 'diet':
        style.className = 'diet';
        break;
      case 'recovery':
        style.className = 'recovery';
        break;
      case 'competition':
        style.className = 'competition';
        break;
      default:
        break;
    }

    return {
      style,
      className: style.className,
    };
  };

  return (
    <div className="h-full flex flex-col animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Calendrier</h2>
        <button
          className="btn btn-primary flex items-center"
          onClick={() => {
            setSelectedEvent(null);
            setNewEvent({
              title: '',
              start: new Date(),
              end: new Date(),
              type: 'training',
              description: '',
            });
            setShowEventModal(true);
          }}
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouvel événement
        </button>
      </div>
      
      <div className="flex-1 card">
        <div className="h-full p-4">
          <BigCalendar
            localizer={localizer}
            events={state.events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            eventPropGetter={eventStyleGetter}
            views={['month', 'week', 'day']}
            popup
          />
        </div>
      </div>
      
      {/* Event Modal - In a real implementation this would be a separate component */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  {selectedEvent ? 'Modifier l\'événement' : 'Nouvel événement'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="label">Titre</label>
                    <input
                      type="text"
                      id="title"
                      className="input"
                      value={selectedEvent ? selectedEvent.title : newEvent.title}
                      onChange={(e) => {
                        if (selectedEvent) {
                          setSelectedEvent({
                            ...selectedEvent,
                            title: e.target.value,
                          });
                        } else {
                          setNewEvent({
                            ...newEvent,
                            title: e.target.value,
                          });
                        }
                      }}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="type" className="label">Type</label>
                    <select
                      id="type"
                      className="input"
                      value={selectedEvent ? selectedEvent.type : newEvent.type}
                      onChange={(e) => {
                        if (selectedEvent) {
                          setSelectedEvent({
                            ...selectedEvent,
                            type: e.target.value as EventType,
                          });
                        } else {
                          setNewEvent({
                            ...newEvent,
                            type: e.target.value as EventType,
                          });
                        }
                      }}
                    >
                      <option value="training">Entraînement</option>
                      <option value="diet">Repas</option>
                      <option value="recovery">Récupération</option>
                      <option value="competition">Compétition</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="start" className="label">Début</label>
                      <input
                        type="datetime-local"
                        id="start"
                        className="input"
                        value={moment(selectedEvent ? selectedEvent.start : newEvent.start).format('YYYY-MM-DDTHH:mm')}
                        onChange={(e) => {
                          const date = new Date(e.target.value);
                          if (selectedEvent) {
                            setSelectedEvent({
                              ...selectedEvent,
                              start: date,
                            });
                          } else {
                            setNewEvent({
                              ...newEvent,
                              start: date,
                            });
                          }
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor="end" className="label">Fin</label>
                      <input
                        type="datetime-local"
                        id="end"
                        className="input"
                        value={moment(selectedEvent ? selectedEvent.end : newEvent.end).format('YYYY-MM-DDTHH:mm')}
                        onChange={(e) => {
                          const date = new Date(e.target.value);
                          if (selectedEvent) {
                            setSelectedEvent({
                              ...selectedEvent,
                              end: date,
                            });
                          } else {
                            setNewEvent({
                              ...newEvent,
                              end: date,
                            });
                          }
                        }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="label">Description</label>
                    <textarea
                      id="description"
                      className="input"
                      rows={3}
                      value={selectedEvent ? selectedEvent.description || '' : newEvent.description || ''}
                      onChange={(e) => {
                        if (selectedEvent) {
                          setSelectedEvent({
                            ...selectedEvent,
                            description: e.target.value,
                          });
                        } else {
                          setNewEvent({
                            ...newEvent,
                            description: e.target.value,
                          });
                        }
                      }}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {selectedEvent ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-primary ml-3"
                      onClick={handleUpdateEvent}
                    >
                      Mettre à jour
                    </button>
                    <button
                      type="button"
                      className="btn btn-red"
                      onClick={handleDeleteEvent}
                    >
                      Supprimer
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSaveEvent}
                  >
                    Enregistrer
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-secondary mr-3"
                  onClick={() => {
                    setShowEventModal(false);
                    setSelectedEvent(null);
                  }}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;