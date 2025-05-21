import { useState } from 'react';
import CoachChat from '../components/coaches/CoachChat';
import { Activity, Calendar } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { getInjuryCoachAdvice } from '../services/api';

const InjuryCoach = () => {
  const { state } = useAppContext();
  const [activeTab, setActiveTab] = useState('chat');
  
  const handleSendMessage = async (message: string): Promise<string> => {
    const { data } = await getInjuryCoachAdvice({ message });
    return data.message;
  };

  const activeInjuries = state.injuries.filter(injury => injury.status === 'active');
  const recoveringInjuries = state.injuries.filter(injury => injury.status === 'recovering');

  return (
    <div className="max-w-7xl mx-auto h-full animate-fade-in">
      <div className="flex flex-col h-full md:flex-row md:space-x-6">
        {/* Coach Chat Section */}
        <div className="md:w-2/3 h-full mb-6 md:mb-0">
          <div className="card h-full flex flex-col">
            <div className="card-header flex items-center bg-injury-600 text-white">
              <Activity className="h-6 w-6 mr-2" />
              <h2 className="text-xl font-semibold">Coach Blessure</h2>
            </div>
            <div className="flex-1 overflow-hidden">
              <CoachChat 
                coachType="injury"
                coachName="Coach Blessure"
                initialMessage="Bonjour, je suis votre Coach Blessure. Je suis là pour vous aider à gérer vos douleurs, prévenir les blessures et vous accompagner dans vos processus de récupération. Comment puis-je vous aider aujourd'hui?"
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
                      ? 'border-b-2 border-injury-600 text-injury-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('chat')}
                >
                  Blessures actives
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'history'
                      ? 'border-b-2 border-injury-600 text-injury-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('history')}
                >
                  Prévention
                </button>
              </div>
            </div>
            <div className="card-body overflow-y-auto">
              {activeTab === 'chat' && (
                <div className="space-y-4">
                  {activeInjuries.length > 0 || recoveringInjuries.length > 0 ? (
                    <>
                      {activeInjuries.length > 0 && (
                        <div>
                          <h3 className="font-medium text-injury-700 mb-2">Blessures actives</h3>
                          <div className="space-y-3">
                            {activeInjuries.map(injury => (
                              <div key={injury.id} className="border-l-4 border-injury-500 bg-injury-50 p-4 rounded-r-lg">
                                <div className="flex justify-between">
                                  <h4 className="font-medium">{injury.title}</h4>
                                  <span className="px-2 py-0.5 text-xs font-medium bg-injury-100 text-injury-800 rounded-full">
                                    {injury.severity}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">Zone: {injury.bodyPart}</p>
                                <p className="text-sm mt-2">{injury.description}</p>
                                <div className="mt-3 pt-3 border-t border-injury-100 flex justify-between">
                                  <span className="text-xs text-gray-500">
                                    Depuis le {new Date(injury.startDate).toLocaleDateString('fr-FR')}
                                  </span>
                                  <button className="text-xs text-injury-700 font-medium">
                                    Mettre à jour
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {recoveringInjuries.length > 0 && (
                        <div className="mt-6">
                          <h3 className="font-medium text-recovery-700 mb-2">En récupération</h3>
                          <div className="space-y-3">
                            {recoveringInjuries.map(injury => (
                              <div key={injury.id} className="border-l-4 border-recovery-500 bg-recovery-50 p-4 rounded-r-lg">
                                <div className="flex justify-between">
                                  <h4 className="font-medium">{injury.title}</h4>
                                  <span className="px-2 py-0.5 text-xs font-medium bg-recovery-100 text-recovery-800 rounded-full">
                                    En récupération
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">Zone: {injury.bodyPart}</p>
                                <div className="mt-3">
                                  <div className="mb-1 flex justify-between text-xs">
                                    <span>Progression de la récupération</span>
                                    <span>60%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-recovery-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <p>Aucune blessure active</p>
                      <button className="mt-2 btn bg-injury-600 text-white hover:bg-injury-700">
                        Déclarer une blessure
                      </button>
                    </div>
                  )}
                  
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                    <h3 className="font-medium text-blue-800 mb-2">Recommandations de récupération</h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li className="flex items-start">
                        <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mr-2 flex-shrink-0">1</span>
                        <span>Augmenter le temps d'échauffement spécifique avant les séances de course à pied</span>
                      </li>
                      <li className="flex items-start">
                        <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mr-2 flex-shrink-0">2</span>
                        <span>Privilégier les surfaces souples pour les prochaines séances de course</span>
                      </li>
                      <li className="flex items-start">
                        <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mr-2 flex-shrink-0">3</span>
                        <span>Session de 15min d'étirements spécifiques post-entraînement</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              
              {activeTab === 'history' && (
                <div className="space-y-4">
                  <h3 className="font-medium">Prévention des blessures</h3>
                  
                  <div className="rounded-lg border border-gray-200 p-4">
                    <h4 className="font-medium text-injury-700">Zones à risque identifiées</h4>
                    <div className="mt-3 space-y-2">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Genou droit</span>
                          <span className="font-medium text-amber-600">Vigilance moyenne</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Cheville gauche</span>
                          <span className="font-medium text-amber-600">Vigilance moyenne</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: '55%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Bas du dos</span>
                          <span className="font-medium text-green-600">Vigilance faible</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border border-gray-200 p-4">
                    <h4 className="font-medium text-injury-700">Exercices préventifs recommandés</h4>
                    <div className="mt-2 space-y-3">
                      <div className="p-3 bg-gray-50 rounded border border-gray-100">
                        <h5 className="font-medium text-sm">Renforcement isométrique des quadriceps</h5>
                        <p className="text-xs text-gray-600 mt-1">
                          3 séries de 30 secondes, 2-3 fois par semaine
                        </p>
                        <div className="mt-2 flex justify-between">
                          <span className="text-xs text-blue-600">Voir démonstration</span>
                          <span className="text-xs text-gray-500">Pour: Genou droit</span>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-gray-50 rounded border border-gray-100">
                        <h5 className="font-medium text-sm">Proprioception sur plateau instable</h5>
                        <p className="text-xs text-gray-600 mt-1">
                          2 séries de 1 minute par pied, 3 fois par semaine
                        </p>
                        <div className="mt-2 flex justify-between">
                          <span className="text-xs text-blue-600">Voir démonstration</span>
                          <span className="text-xs text-gray-500">Pour: Cheville gauche</span>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-gray-50 rounded border border-gray-100">
                        <h5 className="font-medium text-sm">Étirements du psoas et des lombaires</h5>
                        <p className="text-xs text-gray-600 mt-1">
                          2 séries de 30 secondes, quotidien
                        </p>
                        <div className="mt-2 flex justify-between">
                          <span className="text-xs text-blue-600">Voir démonstration</span>
                          <span className="text-xs text-gray-500">Pour: Bas du dos</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border border-gray-200 p-4">
                    <h4 className="font-medium text-injury-700">Suivi de charge</h4>
                    <p className="text-sm mt-1">
                      Surveillance de l'évolution de votre charge d'entraînement pour prévenir les blessures
                    </p>
                    <div className="mt-3 bg-gray-50 p-3 rounded">
                      <div className="h-40 w-full flex items-end justify-between">
                        <div className="h-60% w-8 bg-green-200 relative">
                          <span className="absolute -top-5 text-xs">Lun</span>
                        </div>
                        <div className="h-40% w-8 bg-green-200 relative">
                          <span className="absolute -top-5 text-xs">Mar</span>
                        </div>
                        <div className="h-70% w-8 bg-yellow-200 relative">
                          <span className="absolute -top-5 text-xs">Mer</span>
                        </div>
                        <div className="h-30% w-8 bg-green-200 relative">
                          <span className="absolute -top-5 text-xs">Jeu</span>
                        </div>
                        <div className="h-20% w-8 bg-green-200 relative">
                          <span className="absolute -top-5 text-xs">Ven</span>
                        </div>
                        <div className="h-80% w-8 bg-red-200 relative">
                          <span className="absolute -top-5 text-xs">Sam</span>
                        </div>
                        <div className="h-50% w-8 bg-green-200 relative">
                          <span className="absolute -top-5 text-xs">Dim</span>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between text-xs text-gray-500">
                        <span>Charge optimale</span>
                        <span>Risque élevé</span>
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

export default InjuryCoach;