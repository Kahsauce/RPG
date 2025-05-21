import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Event, TrainingSession, Meal, Injury, Competition, UserSettings } from '../types';

interface AppState {
  events: Event[];
  trainingSessions: TrainingSession[];
  meals: Meal[];
  injuries: Injury[];
  competitions: Competition[];
  userSettings: UserSettings;
  loading: boolean;
  error: string | null;
}

type AppAction =
  | { type: 'SET_EVENTS'; payload: Event[] }
  | { type: 'ADD_EVENT'; payload: Event }
  | { type: 'UPDATE_EVENT'; payload: Event }
  | { type: 'DELETE_EVENT'; payload: string }
  | { type: 'SET_TRAINING_SESSIONS'; payload: TrainingSession[] }
  | { type: 'ADD_TRAINING_SESSION'; payload: TrainingSession }
  | { type: 'UPDATE_TRAINING_SESSION'; payload: TrainingSession }
  | { type: 'DELETE_TRAINING_SESSION'; payload: string }
  | { type: 'SET_MEALS'; payload: Meal[] }
  | { type: 'ADD_MEAL'; payload: Meal }
  | { type: 'UPDATE_MEAL'; payload: Meal }
  | { type: 'DELETE_MEAL'; payload: string }
  | { type: 'SET_INJURIES'; payload: Injury[] }
  | { type: 'ADD_INJURY'; payload: Injury }
  | { type: 'UPDATE_INJURY'; payload: Injury }
  | { type: 'DELETE_INJURY'; payload: string }
  | { type: 'SET_COMPETITIONS'; payload: Competition[] }
  | { type: 'ADD_COMPETITION'; payload: Competition }
  | { type: 'UPDATE_COMPETITION'; payload: Competition }
  | { type: 'DELETE_COMPETITION'; payload: string }
  | { type: 'SET_USER_SETTINGS'; payload: UserSettings }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialUserSettings: UserSettings = {
  name: 'User',
  birthYear: 1990,
  weight: 70,
  height: 175,
  fitnessLevel: 'intermediate',
  primarySport: 'run',
  secondarySports: ['swim', 'bike', 'football'],
  dietaryRestrictions: [],
  notifications: true,
  units: 'metric',
};

const initialState: AppState = {
  events: [],
  trainingSessions: [],
  meals: [],
  injuries: [],
  competitions: [],
  userSettings: initialUserSettings,
  loading: false,
  error: null,
};

const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_EVENTS':
      return { ...state, events: action.payload };
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] };
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        ),
      };
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload),
      };
    case 'SET_TRAINING_SESSIONS':
      return { ...state, trainingSessions: action.payload };
    case 'ADD_TRAINING_SESSION':
      return {
        ...state,
        trainingSessions: [...state.trainingSessions, action.payload],
      };
    case 'UPDATE_TRAINING_SESSION':
      return {
        ...state,
        trainingSessions: state.trainingSessions.map((session) =>
          session.id === action.payload.id ? action.payload : session
        ),
      };
    case 'DELETE_TRAINING_SESSION':
      return {
        ...state,
        trainingSessions: state.trainingSessions.filter(
          (session) => session.id !== action.payload
        ),
      };
    case 'SET_MEALS':
      return { ...state, meals: action.payload };
    case 'ADD_MEAL':
      return { ...state, meals: [...state.meals, action.payload] };
    case 'UPDATE_MEAL':
      return {
        ...state,
        meals: state.meals.map((meal) =>
          meal.id === action.payload.id ? action.payload : meal
        ),
      };
    case 'DELETE_MEAL':
      return {
        ...state,
        meals: state.meals.filter((meal) => meal.id !== action.payload),
      };
    case 'SET_INJURIES':
      return { ...state, injuries: action.payload };
    case 'ADD_INJURY':
      return { ...state, injuries: [...state.injuries, action.payload] };
    case 'UPDATE_INJURY':
      return {
        ...state,
        injuries: state.injuries.map((injury) =>
          injury.id === action.payload.id ? action.payload : injury
        ),
      };
    case 'DELETE_INJURY':
      return {
        ...state,
        injuries: state.injuries.filter(
          (injury) => injury.id !== action.payload
        ),
      };
    case 'SET_COMPETITIONS':
      return { ...state, competitions: action.payload };
    case 'ADD_COMPETITION':
      return {
        ...state,
        competitions: [...state.competitions, action.payload],
      };
    case 'UPDATE_COMPETITION':
      return {
        ...state,
        competitions: state.competitions.map((competition) =>
          competition.id === action.payload.id ? action.payload : competition
        ),
      };
    case 'DELETE_COMPETITION':
      return {
        ...state,
        competitions: state.competitions.filter(
          (competition) => competition.id !== action.payload
        ),
      };
    case 'SET_USER_SETTINGS':
      return { ...state, userSettings: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

interface AppContextProps {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};