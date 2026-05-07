export const demoCommunities = [
  {
    id: 'community-la-banda-del-mundial',
    slug: 'la-banda-del-mundial',
    name: 'La Banda del Mundial',
    captain: {
      id: 'player-pancho',
      name: 'Pancho',
      title: 'Capitan de la hinchada',
      city: 'Guayaquil',
      favoriteTeam: 'Ecuador',
    },
    city: 'Guayaquil',
    country: 'Ecuador',
    mode: 'Liga de Amigos',
    plan: 'Free',
    playerGoal: 25,
    activePlayers: 18,
    invitedPlayers: 32,
    progressPercent: 72,
    nextBenefit: {
      title: 'Primer beneficio mundialista',
      description: 'Al llegar a 25 jugadores desbloquean sorteo promocional de camisetas para la comunidad.',
      remainingPlayers: 7,
    },
    inviteUrl: 'https://www.oraculomundialista.com/p/la-banda-del-mundial/unirse',
    homeUrl: 'https://www.oraculomundialista.com/p/la-banda-del-mundial',
    status: 'creciendo',
    heroCopy: 'Tu comunidad ya esta jugando. Faltan 7 para desbloquear el primer beneficio.',
    primaryCta: 'Invitar por WhatsApp',
    secondaryCta: 'Hacer mi prediccion',
    stats: [
      { label: 'Jugadores activos', value: '18/25' },
      { label: 'Predicciones guardadas', value: '42' },
      { label: 'Momentos compartidos', value: '16' },
    ],
  },
]

export const emptyCommunityState = {
  title: 'Tu comunidad esta calentando',
  description: 'Todavia faltan jugadores para que la hinchada cobre vida y desbloquee el primer beneficio.',
  ctaLabel: 'Invitar por WhatsApp',
}

export function getDemoCommunityBySlug(slug = 'la-banda-del-mundial') {
  return demoCommunities.find((community) => community.slug === slug) || demoCommunities[0]
}
