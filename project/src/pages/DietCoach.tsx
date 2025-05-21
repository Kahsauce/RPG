import { useState } from 'react';
import CoachChat from '../components/coaches/CoachChat';
import { Apple, Calendar } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import EventCard from '../components/common/EventCard';
import { getDietCoachAdvice } from '../services/api';

const DietCoach = () => {
  const { state } = useAppContext();
  const [activeTab, setActiveTab] = useState('chat');
  
  const handleSendMessage = async (message: string): Promise<string> => {
    const { data } = await getDietCoachAdvice({ message });
    return data.message;
  };

  // Filter to diet-related events
  const dietEvents = state.events.filter(event => event.type === 'diet');

  return (
    <div className="max-w-7xl mx-auto h-full animate-fade-in">
      <div className="flex flex-col h-full md:flex-row md:space-x-6">
        {/* Coach Chat Section */}
        <div className="md:w-2/3 h-full mb-6 md:mb-0">
          <div className="card h-full flex flex-col">
            <div className="card-header flex items-center bg-diet-600 text-white">
              <Apple className="h-6 w-6 mr-2" />
              <h2 className="text-xl font-semibold">Coach Diète</h2>
            </div>
            <div className="flex-1 overflow-hidden">
              <CoachChat 
                coachType="diet"
                coachName="Coach Diète"
                initialMessage="Bonjour, je suis votre Coach Diète. Je suis là pour vous aider à optimiser votre alimentation en fonction de vos entraînements, objectifs et préférences alimentaires. Comment puis-je vous aider aujourd'hui?"
                onSendMessage={handleSendMessage}
              />
            </div>
          </div>
        </div>
        
        {/* Info Panel */}
        <div className="md:w-1/3 h-full">
          <div className="card h-full">
            <div className="card-header">
              <div className="flex space-x-4 border-b">
                <button
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'chat'
                      ? 'border-b-2 border-diet-600 text-diet-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('chat')}
                >
                  Prochains repas
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'history'
                      ? 'border-b-2 border-diet-600 text-diet-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('history')}
                >
                  Recommandations
                </button>
              </div>
            </div>
            <div className="card-body overflow-y-auto">
              {activeTab === 'chat' && (
                <div className="space-y-4">
                  <div className="bg-diet-50 border border-diet-100 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-5 w-5 text-diet-600 mr-2" />
                      <h3 className="font-medium">Prochain repas</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">Pré-entrainement</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Heure:</span>
                        <span className="font-medium">17:00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Calories:</span>
                        <span className="font-medium">~400 kcal</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-diet-100">
                      <p className="text-sm">
                        <span className="font-medium">Suggestion:</span> Bol de flocons d'avoine avec banane et miel, accompagné d'une poignée d'amandes et un yaourt nature.
                      </p>
                    </div>
                  </div>
                  
                  {dietEvents.length > 0 ? (
                    <div className="space-y-3">
                      {dietEvents.map(event => (
                        <EventCard 
                          key={event.id} 
                          event={event} 
                          onToggleComplete={(id, completed) => {
                            // This would update the event completion status
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <p>Aucun repas planifié</p>
                      <button className="mt-2 btn btn-green">
                        Planifier un repas
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'history' && (
                <div className="space-y-4">
                  <h3 className="font-medium">Recommandations personnalisées</h3>
                  
                  <div className="rounded-lg border border-gray-200 p-4">
                    <h4 className="font-medium text-diet-700">Avant l'entraînement de natation</h4>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="h-5 w-5 rounded-full bg-diet-100 text-diet-600 flex items-center justify-center text-xs mr-2 flex-shrink-0">1</span>
                        <span>Repas riche en glucides complexes 2-3h avant (pâtes complètes, riz brun)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="h-5 w-5 rounded-full bg-diet-100 text-diet-600 flex items-center justify-center text-xs mr-2 flex-shrink-0">2</span>
                        <span>Collation légère 30-60min avant (banane, barre de céréales)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="h-5 w-5 rounded-full bg-diet-100 text-diet-600 flex items-center justify-center text-xs mr-2 flex-shrink-0">3</span>
                        <span>500ml d'eau dans l'heure précédant l'effort</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="rounded-lg border border-gray-200 p-4">
                    <h4 className="font-medium text-diet-700">Après l'entraînement de natation</h4>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="h-5 w-5 rounded-full bg-diet-100 text-diet-600 flex items-center justify-center text-xs mr-2 flex-shrink-0">1</span>
                        <span>Protéines dans les 30min (shake protéiné, yaourt grec)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="h-5 w-5 rounded-full bg-diet-100 text-diet-600 flex items-center justify-center text-xs mr-2 flex-shrink-0">2</span>
                        <span>Repas complet dans les 2h (protéines + glucides + légumes)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="h-5 w-5 rounded-full bg-diet-100 text-diet-600 flex items-center justify-center text-xs mr-2 flex-shrink-0">3</span>
                        <span>Réhydratation progressive (eau + électrolytes si nécessaire)</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="rounded-lg border border-gray-200 p-4">
                    <h4 className="font-medium text-diet-700">Adaptations jour de match football</h4>
                    <p className="mt-2 text-sm">
                      Les jours de match de football, votre alimentation diffère des jours d'entraînement de triathlon. Voici quelques ajustements recommandés:
                    </p>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="h-5 w-5 rounded-full bg-diet-100 text-diet-600 flex items-center justify-center text-xs mr-2 flex-shrink-0">1</span>
                        <span>Repas pré-match 3-4h avant (augmentation des glucides)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="h-5 w-5 rounded-full bg-diet-100 text-diet-600 flex items-center justify-center text-xs mr-2 flex-shrink-0">2</span>
                        <span>Hydratation accrue (objectif 1L dans les 2h précédant le match)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="h-5 w-5 rounded-full bg-diet-100 text-diet-600 flex items-center justify-center text-xs mr-2 flex-shrink-0">3</span>
                        <span>Récupération adaptée post-match (priorité à la réhydratation et aux protéines)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietCoach;