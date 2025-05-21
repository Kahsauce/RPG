import React from 'react';
import { Calendar, Clock, Edit, CheckCircle, XCircle } from 'lucide-react';
import { Event } from '../../types';

interface EventCardProps {
  event: Event;
  onToggleComplete?: (id: string, completed: boolean) => void;
  onEdit?: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  onToggleComplete,
  onEdit,
}) => {
  const getEventTypeColor = () => {
    switch (event.type) {
      case 'training':
        return 'border-sport-500 bg-sport-50';
      case 'diet':
        return 'border-diet-500 bg-diet-50';
      case 'recovery':
        return 'border-recovery-500 bg-recovery-50';
      case 'competition':
        return 'border-competition-500 bg-competition-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const getEventTypeText = () => {
    switch (event.type) {
      case 'training':
        return 'Entraînement';
      case 'diet':
        return 'Repas';
      case 'recovery':
        return 'Récupération';
      case 'competition':
        return 'Compétition';
      default:
        return 'Événement';
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  return (
    <div className={`rounded-lg border-l-4 ${getEventTypeColor()} shadow-sm p-4 hover:shadow-md transition-shadow`}>
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-lg">{event.title}</h3>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-white border">
          {getEventTypeText()}
        </span>
      </div>
      
      <div className="mt-2 space-y-1">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{formatDate(event.start)}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-1" />
          <span>{formatTime(event.start)} - {formatTime(event.end)}</span>
        </div>
      </div>
      
      {event.description && (
        <p className="mt-2 text-sm text-gray-600">{event.description}</p>
      )}
      
      <div className="mt-4 flex justify-between">
        {onToggleComplete && (
          <button
            className={`text-sm flex items-center ${event.completed ? 'text-gray-600' : 'text-green-600'}`}
            onClick={() => onToggleComplete(event.id, !event.completed)}
          >
            {event.completed ? (
              <>
                <XCircle className="h-4 w-4 mr-1" />
                <span>Annuler</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-1" />
                <span>Compléter</span>
              </>
            )}
          </button>
        )}
        
        {onEdit && (
          <button
            className="text-sm text-blue-600 flex items-center"
            onClick={() => onEdit(event)}
          >
            <Edit className="h-4 w-4 mr-1" />
            <span>Modifier</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;