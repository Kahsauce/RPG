import { useEffect, useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Calendar, Clock, Dumbbell, Apple, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Event } from '../types';

interface TodayEvent extends Event {
  timeFormatted: string;
}

const Dashboard = () => {
  const { state } = useAppContext();
  const [todayEvents, setTodayEvents] = useState<TodayEvent[]>([]);
  const [upcomingCompetition, setUpcomingCompetition] = useState<any | null>(null);
  const [activeInjuries, setActiveInjuries] = useState<any[]>([]);
  
  useEffect(() => {
    // Filter events for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const eventsToday = state.events
      .filter((event) => {
        const eventDate = new Date(event.start);
        return eventDate >= today && eventDate < tomorrow;
      })
      .map((event) => {
        const eventDate = new Date(event.start);
        const hours = eventDate.getHours();
        const minutes = eventDate.getMinutes();
        const timeFormatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        return { ...event, timeFormatted };
      })
      .sort((a, b) => {
        return new Date(a.start).getTime() - new Date(b.start).getTime();
      });
    
    setTodayEvents(eventsToday);
    
    // Find next upcoming competition
    const now = new Date();
    const competitions = state.competitions
      .filter((comp) => new Date(comp.date) > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    if (competitions.length > 0) {
      setUpcomingCompetition(competitions[0]);
    }
    
    // Filter active injuries
    const injuries = state.injuries.filter((injury) => injury.status === 'active');
    setActiveInjuries(injuries);
    
  }, [state.events, state.competitions, state.injuries]);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'training':
        return <Dumbbell className="h-5 w-5 text-sport-600" />;
      case 'diet':
        return <Apple className="h-5 w-5 text-diet-600" />;
      case 'recovery':
        return <Activity className="h-5 w-5 text-recovery-600" />;
      case 'competition':
        return <Calendar className="h-5 w-5 text-competition-600" />;
      default:
        return <Calendar className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Bonjour, {state.userSettings.name} 👋
          </h2>
          <p className="mt-1 text-md text-gray-500">
            Voici ton programme du jour
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Today's Schedule */}
        <div className="lg:col-span-2">
          <div className="card h-full">
            <div className="card-header flex items-center justify-between">
              <h3 className="text-lg font-semibold">Programme du jour</h3>
              <Link to="/calendar" className="text-blue-600 text-sm font-medium hover:text-blue-800">
                Voir le calendrier complet
              </Link>
            </div>
            <div className="card-body p-0">
              {todayEvents.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {todayEvents.map((event) => (
                    <li key={event.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {getEventIcon(event.type)}
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">{event.title}</p>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-gray-400 mr-1" />
                              <p className="text-sm text-gray-500">{event.timeFormatted}</p>
                            </div>
                          </div>
                          {event.description && (
                            <p className="text-sm text-gray-500 mt-0.5">{event.description}</p>
                          )}
                        </div>
                        {event.completed ? (
                          <span className="ml-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Complété
                          </span>
                        ) : (
                          <button className="ml-3 btn btn-sm btn-primary text-xs px-2 py-1">
                            Compléter
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  <p>Aucune activité programmée aujourd'hui</p>
                  <button className="mt-3 btn btn-primary">
                    Ajouter une activité
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Upcoming Competition */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Prochaine compétition</h3>
            </div>
            <div className="card-body">
              {upcomingCompetition ? (
                <div>
                  <h4 className="font-medium text-lg">{upcomingCompetition.title}</h4>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    <span>
                      {new Date(upcomingCompetition.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  {upcomingCompetition.description && (
                    <p className="mt-2 text-sm text-gray-600">{upcomingCompetition.description}</p>
                  )}
                  <div className="mt-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      upcomingCompetition.priority === 'A'
                        ? 'bg-red-100 text-red-800'
                        : upcomingCompetition.priority === 'B'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      Priorité {upcomingCompetition.priority}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <p>Aucune compétition à venir</p>
                  <Link to="/competitions" className="mt-3 btn btn-primary inline-block">
                    Ajouter une compétition
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Active Injuries */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Blessures actives</h3>
            </div>
            <div className="card-body">
              {activeInjuries.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {activeInjuries.map((injury) => (
                    <li key={injury.id} className="py-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{injury.title}</h4>
                          <p className="text-sm text-gray-500">{injury.bodyPart}</p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          injury.severity === 'severe'
                            ? 'bg-red-100 text-red-800'
                            : injury.severity === 'moderate'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {injury.severity}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500">
                  Aucune blessure active en ce moment
                </p>
              )}
              <div className="mt-4">
                <Link to="/injury-coach" className="text-blue-600 text-sm font-medium hover:text-blue-800">
                  Voir le coach de blessures
                </Link>
              </div>
            </div>
          </div>
          
          {/* Coach Recommendations */}
          <div className="card bg-blue-50 border border-blue-100">
            <div className="card-header bg-transparent border-blue-100">
              <h3 className="text-lg font-semibold text-blue-800">Recommandation du coach</h3>
            </div>
            <div className="card-body">
              <p className="text-blue-800">
                Prévois une séance de récupération active après ton entrainement de natation demain pour optimiser les bénéfices.
              </p>
              <div className="mt-4 flex justify-end">
                <button className="text-blue-700 text-sm font-medium hover:text-blue-900">
                  Plus de conseils
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;