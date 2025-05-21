import { useState } from 'react';
import CoachChat from '../components/coaches/CoachChat';
import { Dumbbell, Calendar, BarChart2 } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

const TrainingCoach = () => {
  const { state } = useAppContext();
  const [activeTab, setActiveTab] = useState('chat');
  
  // This would normally call the actual API
  const handleSendMessage = async (message: string): Promise<string> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // For demo purposes, return a hardcoded response
    return `Je comprends que vous souhaitez discuter de "${message}". En tant que Coach Sport, je peux vous suggérer un plan d'entraînement adapté à vos objectifs de triathlon et football, tout en tenant compte de votre historique et de vos prochaines compétitions. Souhaitez-vous des recommandations spécifiques pour votre prochaine séance?`;
  };

  return (
    <div className="max-w-7xl mx-auto h-full animate-fade-in">
      <div className="flex flex-col h-full md:flex-row md:space-x-6">
        {/* Coach Chat Section */}
        <div className="md:w-2/3 h-full mb-6 md:mb-0">
          <div className="card h-full flex flex-col">
            <div className="card-header flex items-center bg-sport-600 text-white">
              <Dumbbell className="h-6 w-6 mr-2" />
              <h2 className="text-xl font-semibold">Coach Sport</h2>
            </div>
            <div className="flex-1 overflow-hidden">
              <CoachChat 
                coachType="sport"
                coachName="Coach Sport"
                initialMessage="Bonjour, je suis votre Coach Sport. Je suis là pour vous aider à optimiser vos entraînements de triathlon, football, trail running et musculation. Comment puis-je vous aider aujourd'hui?"
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
                      ? 'border-b-2 border-sport-600 text-sport-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('chat')}
                >
                  Prochain entrainement
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'history'
                      ? 'border-b-2 border-sport-600 text-sport-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('history')}
                >
                  Historique
                </button>
              </div>
            </div>
            <div className="card-body">
              {activeTab === 'chat' && (
                <div className="space-y-4">
                  <div className="bg-sport-50 border border-sport-100 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-5 w-5 text-sport-600 mr-2" />
                      <h3 className="font-medium">Prochain entrainement</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Sport:</span>
                        <span className="font-medium">Natation</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Objectif:</span>
                        <span className="font-medium">Technique & Endurance</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Durée:</span>
                        <span className="font-medium">45 minutes</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Intensité:</span>
                        <span className="font-medium">Moyenne</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-sport-100">
                      <p className="text-sm">
                        <span className="font-medium">Description:</span> Échauffement de 5 min, 10x100m avec focus sur la technique, récupération 20 sec entre chaque, 5 min récupération active.
                      </p>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center mb-2">
                      <BarChart2 className="h-5 w-5 text-sport-600 mr-2" />
                      <h3 className="font-medium">Charge d'entraînement</h3>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs text-gray-500">Charge hebdomadaire actuelle</span>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                          <div className="bg-sport-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span>Faible</span>
                          <span>Optimale</span>
                          <span>Excessive</span>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <span className="text-xs text-gray-500">Répartition par sport</span>
                        <div className="grid grid-cols-3 gap-2 mt-1">
                          <div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                            </div>
                            <span className="text-xs">Natation</span>
                          </div>
                          <div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                            </div>
                            <span className="text-xs">Vélo</span>
                          </div>
                          <div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                            </div>
                            <span className="text-xs">Course</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border border-gray-200 p-4">
                    <h3 className="font-medium mb-2">Suggestions d'entraînement</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="h-5 w-5 rounded-full bg-sport-100 text-sport-600 flex items-center justify-center text-xs mr-2 flex-shrink-0">1</span>
                        <span>Augmenter progressivement la distance de natation (+10% par semaine)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="h-5 w-5 rounded-full bg-sport-100 text-sport-600 flex items-center justify-center text-xs mr-2 flex-shrink-0">2</span>
                        <span>Ajouter une séance de renforcement musculaire le jeudi</span>
                      </li>
                      <li className="flex items-start">
                        <span className="h-5 w-5 rounded-full bg-sport-100 text-sport-600 flex items-center justify-center text-xs mr-2 flex-shrink-0">3</span>
                        <span>Prévoir une séance de récupération active après le match de football du dimanche</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              
              {activeTab === 'history' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Historique d'entraînement</h3>
                    <select className="text-sm border border-gray-300 rounded px-2 py-1">
                      <option>Cette semaine</option>
                      <option>Semaine dernière</option>
                      <option>Ce mois</option>
                      <option>3 derniers mois</option>
                    </select>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Dumbbell className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">Natation - Technique</h4>
                          <span className="text-xs text-gray-500">Aujourd'hui</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">45 min · Moyenne</span>
                          <span className="text-green-600 font-medium">Complété</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <Dumbbell className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">Vélo - Endurance</h4>
                          <span className="text-xs text-gray-500">Hier</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">1h15 · Facile</span>
                          <span className="text-green-600 font-medium">Complété</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                        <Dumbbell className="h-5 w-5 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">Football - Match</h4>
                          <span className="text-xs text-gray-500">3 jours</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">1h30 · Intense</span>
                          <span className="text-green-600 font-medium">Complété</span>
                        </div>
                      </div>
                    </div>
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

export default TrainingCoach;