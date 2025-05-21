import { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Settings as SettingsIcon } from 'lucide-react';
import { UserSettings } from '../types';

const Settings = () => {
  const { state, dispatch } = useAppContext();
  const [settings, setSettings] = useState<UserSettings>(state.userSettings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // This would normally call the API to update settings
      dispatch({
        type: 'SET_USER_SETTINGS',
        payload: settings,
      });
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="flex items-center mb-6">
        <SettingsIcon className="h-8 w-8 text-gray-600 mr-3" />
        <h2 className="text-2xl font-bold">Paramètres</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium">Informations personnelles</h3>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="label">Nom</label>
                <input
                  type="text"
                  id="name"
                  className="input"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="birthYear" className="label">Année de naissance</label>
                <input
                  type="number"
                  id="birthYear"
                  className="input"
                  value={settings.birthYear}
                  onChange={(e) => setSettings({ ...settings, birthYear: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <label htmlFor="weight" className="label">Poids (kg)</label>
                <input
                  type="number"
                  id="weight"
                  className="input"
                  value={settings.weight}
                  onChange={(e) => setSettings({ ...settings, weight: parseFloat(e.target.value) })}
                  step="0.1"
                />
              </div>
              <div>
                <label htmlFor="height" className="label">Taille (cm)</label>
                <input
                  type="number"
                  id="height"
                  className="input"
                  value={settings.height}
                  onChange={(e) => setSettings({ ...settings, height: parseInt(e.target.value) })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sports Settings */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium">Sports</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              <div>
                <label htmlFor="fitnessLevel" className="label">Niveau</label>
                <select
                  id="fitnessLevel"
                  className="input"
                  value={settings.fitnessLevel}
                  onChange={(e) => setSettings({ ...settings, fitnessLevel: e.target.value as 'beginner' | 'intermediate' | 'advanced' })}
                >
                  <option value="beginner">Débutant</option>
                  <option value="intermediate">Intermédiaire</option>
                  <option value="advanced">Avancé</option>
                </select>
              </div>
              <div>
                <label htmlFor="primarySport" className="label">Sport principal</label>
                <select
                  id="primarySport"
                  className="input"
                  value={settings.primarySport}
                  onChange={(e) => setSettings({ ...settings, primarySport: e.target.value as any })}
                >
                  <option value="triathlon">Triathlon</option>
                  <option value="football">Football</option>
                  <option value="trail">Trail</option>
                </select>
              </div>
              <div>
                <label className="label">Disciplines d'entraînement</label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'swim', label: 'Natation' },
                    { id: 'bike', label: 'Vélo' },
                    { id: 'run', label: 'Course à pied' },
                    { id: 'football', label: 'Football' },
                    { id: 'trail', label: 'Trail' },
                    { id: 'strength', label: 'Musculation' },
                    { id: 'flexibility', label: 'Assouplissement' }
                  ].map(({ id, label }) => (
                    <label key={id} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        checked={settings.secondarySports.includes(id as any)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSettings({
                              ...settings,
                              secondarySports: [...settings.secondarySports, id as any],
                            });
                          } else {
                            setSettings({
                              ...settings,
                              secondarySports: settings.secondarySports.filter((s) => s !== id),
                            });
                          }
                        }}
                        // Automatically check and disable triathlon disciplines if triathlon is primary sport
                        disabled={settings.primarySport === 'triathlon' && ['swim', 'bike', 'run'].includes(id)}
                        checked={
                          (settings.primarySport === 'triathlon' && ['swim', 'bike', 'run'].includes(id)) ||
                          settings.secondarySports.includes(id as any)
                        }
                      />
                      <span className="ml-2 text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Diet Settings */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium">Alimentation</h3>
          </div>
          <div className="card-body">
            <div>
              <label className="label">Restrictions alimentaires</label>
              <div className="grid grid-cols-2 gap-4">
                {['vegetarian', 'vegan', 'gluten-free', 'lactose-free', 'nut-free', 'halal', 'kosher'].map((restriction) => (
                  <label key={restriction} className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      checked={settings.dietaryRestrictions.includes(restriction)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSettings({
                            ...settings,
                            dietaryRestrictions: [...settings.dietaryRestrictions, restriction],
                          });
                        } else {
                          setSettings({
                            ...settings,
                            dietaryRestrictions: settings.dietaryRestrictions.filter((r) => r !== restriction),
                          });
                        }
                      }}
                    />
                    <span className="ml-2 text-sm">{restriction.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium">Préférences</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              <div>
                <label htmlFor="units" className="label">Unités de mesure</label>
                <select
                  id="units"
                  className="input"
                  value={settings.units}
                  onChange={(e) => setSettings({ ...settings, units: e.target.value as 'metric' | 'imperial' })}
                >
                  <option value="metric">Métrique (km, kg)</option>
                  <option value="imperial">Impérial (mi, lb)</option>
                </select>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    checked={settings.notifications}
                    onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                  />
                  <span className="ml-2">Activer les notifications</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setSettings(state.userSettings)}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSaving}
          >
            {isSaving ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;