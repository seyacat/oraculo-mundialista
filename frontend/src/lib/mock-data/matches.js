export const demoMatches = [
  {
    id: 'match-ecu-qatar',
    group: 'Grupo A',
    stadium: 'Estadio Al Bayt',
    kickoffLabel: 'Hoy, 18:00',
    closesInLabel: 'Cierra en 42 min',
    status: 'cierra-pronto',
    statusLabel: 'Cierra pronto',
    home: { code: 'ECU', name: 'Ecuador', seed: 'La Tri' },
    away: { code: 'QAT', name: 'Qatar', seed: 'Anfitrion' },
    prediction: { homeScore: '', awayScore: '', powerId: null, saved: false },
    featuredCopy: 'Tu hinchada espera este marcador antes de que cierre.',
  },
  {
    id: 'match-arg-mex',
    group: 'Grupo C',
    stadium: 'Lusail',
    kickoffLabel: 'Manana, 14:00',
    closesInLabel: 'Abierto',
    status: 'abierto',
    statusLabel: 'Abierto',
    home: { code: 'ARG', name: 'Argentina', seed: 'Candidato' },
    away: { code: 'MEX', name: 'Mexico', seed: 'Rival incomodo' },
    prediction: { homeScore: '2', awayScore: '1', powerId: 'doble-fe', saved: true },
    featuredCopy: 'Partido perfecto para defender reputacion.',
  },
  {
    id: 'match-bra-ser',
    group: 'Grupo G',
    stadium: '974',
    kickoffLabel: 'Viernes, 11:00',
    closesInLabel: 'Abierto',
    status: 'abierto',
    statusLabel: 'Abierto',
    home: { code: 'BRA', name: 'Brasil', seed: 'Favorito' },
    away: { code: 'SRB', name: 'Serbia', seed: 'Ordenado' },
    prediction: { homeScore: '', awayScore: '', powerId: null, saved: false },
    featuredCopy: 'Aqui nacen certificados de oraculo o recibos de realidad.',
  },
  {
    id: 'match-esp-ger',
    group: 'Grupo E',
    stadium: 'Al Bayt',
    kickoffLabel: 'Finalizado',
    closesInLabel: 'Cerrado',
    status: 'finalizado',
    statusLabel: 'Finalizado',
    home: { code: 'ESP', name: 'Espana', seed: 'Toque' },
    away: { code: 'GER', name: 'Alemania', seed: 'Maquina' },
    result: { homeScore: 1, awayScore: 1 },
    prediction: { homeScore: '2', awayScore: '1', powerId: null, saved: true },
    featuredCopy: 'El futbol fue cruel con varios profetas.',
  },
]

export const emptyPredictionsState = {
  title: 'No hay partidos abiertos ahora',
  description: 'La jornada esta en pausa. Vuelve pronto para no quedar como El Fantasma.',
  ctaLabel: 'Volver a la comunidad',
}

export function getOpenMatches(matches = demoMatches) {
  return matches.filter((match) => match.status === 'abierto' || match.status === 'cierra-pronto')
}
