// Event types
export type EventType = 'training' | 'diet' | 'recovery' | 'competition';

export interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: EventType;
  description?: string;
  completed?: boolean;
  feedback?: string;
}

// Training types
export interface TrainingSession {
  id: string;
  title: string;
  sportType: SportType;
  date: Date;
  duration: number; // in minutes
  description: string;
  intensity: 'low' | 'medium' | 'high';
  completed: boolean;
  feedback?: string;
  metrics?: Record<string, number>; // e.g., distance, pace, etc.
}

export type SportType = 'triathlon' | 'swim' | 'bike' | 'run' | 'football' | 'trail' | 'strength' | 'flexibility';

// Diet types
export interface Meal {
  id: string;
  title: string;
  date: Date;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'pre-workout' | 'post-workout';
  description: string;
  foods: string[];
  completed: boolean;
  feedback?: string;
}

// Injury types
export interface Injury {
  id: string;
  title: string;
  bodyPart: string;
  severity: 'mild' | 'moderate' | 'severe';
  startDate: Date;
  endDate?: Date;
  description: string;
  status: 'active' | 'recovering' | 'resolved';
  notes: string[];
}

// Competition types
export interface Competition {
  id: string;
  title: string;
  sportType: SportType;
  date: Date;
  location: string;
  description: string;
  priority: 'A' | 'B' | 'C'; // Priority level for the competition
  goal?: string;
  result?: string;
}

// Coach message types
export interface CoachMessage {
  id: string;
  coachType: 'sport' | 'diet' | 'injury';
  message: string;
  date: Date;
  isUser: boolean;
}

// User settings
export interface UserSettings {
  name: string;
  birthYear: number;
  weight: number; // in kg
  height: number; // in cm
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  primarySport: SportType;
  secondarySports: SportType[];
  dietaryRestrictions: string[];
  notifications: boolean;
  units: 'metric' | 'imperial';
}