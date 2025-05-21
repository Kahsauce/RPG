import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Event endpoints
export const fetchEvents = () => api.get('/events');
export const createEvent = (event: any) => api.post('/events', event);
export const updateEvent = (id: string, event: any) => api.put(`/events/${id}`, event);
export const deleteEvent = (id: string) => api.delete(`/events/${id}`);

// Training endpoints
export const fetchTrainingSessions = () => api.get('/training');
export const createTrainingSession = (session: any) => api.post('/training', session);
export const updateTrainingSession = (id: string, session: any) => api.put(`/training/${id}`, session);
export const deleteTrainingSession = (id: string) => api.delete(`/training/${id}`);

// Meal endpoints
export const fetchMeals = () => api.get('/meals');
export const createMeal = (meal: any) => api.post('/meals', meal);
export const updateMeal = (id: string, meal: any) => api.put(`/meals/${id}`, meal);
export const deleteMeal = (id: string) => api.delete(`/meals/${id}`);

// Injury endpoints
export const fetchInjuries = () => api.get('/injuries');
export const createInjury = (injury: any) => api.post('/injuries', injury);
export const updateInjury = (id: string, injury: any) => api.put(`/injuries/${id}`, injury);
export const deleteInjury = (id: string) => api.delete(`/injuries/${id}`);

// Competition endpoints
export const fetchCompetitions = () => api.get('/competitions');
export const createCompetition = (competition: any) => api.post('/competitions', competition);
export const updateCompetition = (id: string, competition: any) => api.put(`/competitions/${id}`, competition);
export const deleteCompetition = (id: string) => api.delete(`/competitions/${id}`);

// AI Coach endpoints
export const getSportCoachAdvice = (data: any) => api.post('/coach/sport', data);
export const getDietCoachAdvice = (data: any) => api.post('/coach/diet', data);
export const getInjuryCoachAdvice = (data: any) => api.post('/coach/injury', data);

// Settings
export const getUserSettings = () => api.get('/settings');
export const updateUserSettings = (settings: any) => api.put('/settings', settings);

export default api;