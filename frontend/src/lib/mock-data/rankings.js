export const demoRankings = {
  sports: [
    {
      id: 'rank-1',
      position: 1,
      playerName: 'Panchito FC',
      points: 128,
      movement: 'subio',
      badge: 'Profeta de la fecha',
      accuracy: '7 aciertos',
    },
    {
      id: 'rank-2',
      position: 2,
      playerName: 'La Tribuna',
      points: 117,
      movement: 'igual',
      badge: 'Casi oraculo',
      accuracy: '6 aciertos',
    },
    {
      id: 'rank-3',
      position: 3,
      playerName: 'VARcelona',
      points: 109,
      movement: 'bajo',
      badge: 'Resistiendo',
      accuracy: '5 aciertos',
    },
    {
      id: 'rank-me',
      position: 8,
      playerName: 'Tu Hinchada',
      points: 84,
      movement: 'subio',
      badge: 'En remontada',
      accuracy: '4 aciertos',
      isCurrentUser: true,
    },
  ],
  viral: [
    {
      id: 'viral-1',
      position: 1,
      playerName: 'Tia Mundialista',
      score: 21,
      label: 'Invito a media familia',
      metric: 'invites',
    },
    {
      id: 'viral-2',
      position: 2,
      playerName: 'El del Audio Largo',
      score: 14,
      label: 'Recibos compartidos',
      metric: 'shares',
    },
    {
      id: 'viral-3',
      position: 3,
      playerName: 'Modo Camerino',
      score: 11,
      label: 'Revancha pedida',
      metric: 'comeback',
    },
  ],
  currentUserPosition: {
    position: 8,
    label: 'Vas #8 en La Banda del Mundial',
    shareCopy: 'Todavia estas a tiempo de subir al podio.',
  },
}

export const emptyRankingState = {
  title: 'Aun no hay ranking',
  description: 'Cuando la comunidad guarde sus primeras predicciones, aqui empieza la pelea por la gloria.',
  ctaLabel: 'Hacer primera prediccion',
}
