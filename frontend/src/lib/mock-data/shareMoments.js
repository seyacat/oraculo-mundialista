export const demoShareMoments = [
  {
    id: 'invitacion-comunidad',
    type: 'invite',
    title: 'Invitacion mundialista',
    eyebrow: 'Reta a tu gente',
    description: 'La forma mas rapida de llenar la comunidad y desbloquear beneficios.',
    message: [
      'Estoy jugando El Oraculo Mundial.',
      'Metete a mi comunidad y compite conmigo.',
      'A ver si sabes tanto de futbol como dices:',
      'https://www.oraculomundialista.com/p/la-banda-del-mundial/unirse',
    ].join('\n'),
    ctaLabel: 'Invitar por WhatsApp',
  },
  {
    id: 'ranking-posicion',
    type: 'ranking',
    title: 'Posicion compartible',
    eyebrow: 'Gloria en progreso',
    description: 'Un momento para presumir antes de que la tabla cambie.',
    message: [
      'Voy #8 en La Banda del Mundial.',
      'Todavia estas a tiempo de alcanzarme:',
      'https://www.oraculomundialista.com/p/la-banda-del-mundial/ranking',
    ].join('\n'),
    ctaLabel: 'Compartir posicion',
  },
  {
    id: 'verguenza-compartida',
    type: 'shame',
    title: 'Verguenza compartida',
    eyebrow: 'Recibo publico',
    description: 'Para cuando el futbol fue cruel y el grupo necesita pruebas.',
    message: [
      'El Profe de Sofa cayo en la Tabla de la Verguenza.',
      'Se aceptan explicaciones:',
      'https://www.oraculomundialista.com/p/la-banda-del-mundial/verguenza',
    ].join('\n'),
    ctaLabel: 'Compartir verguenza',
  },
  {
    id: 'certificado-oraculo',
    type: 'certificate',
    title: 'Certificado de Oraculo',
    eyebrow: 'El futbol hablo',
    description: 'Una pieza de reputacion para quien acerto el marcador exacto.',
    message: [
      'Tengo Certificado de Oraculo.',
      'Predije ECU 2 - 1 QAT y acerte.',
      'El futbol hablo:',
      'https://www.oraculomundialista.com/p/la-banda-del-mundial/momento/certificado-oraculo',
    ].join('\n'),
    ctaLabel: 'Compartir certificado',
  },
  {
    id: 'recibo-realidad',
    type: 'receipt',
    title: 'Recibo de Realidad',
    eyebrow: 'Sin excusas',
    description: 'El comprobante amistoso para el profeta que hablo demasiado pronto.',
    message: [
      'Llego un Recibo de Realidad para La Banda del Mundial.',
      'Se aceptan excusas y audios de 3 minutos:',
      'https://www.oraculomundialista.com/p/la-banda-del-mundial/momento/recibo-realidad',
    ].join('\n'),
    ctaLabel: 'Enviar recibo',
  },
  {
    id: 'revancha',
    type: 'comeback',
    title: 'Pedido de Revancha',
    eyebrow: 'Orgullo en juego',
    description: 'Para volver a la cancha despues de una jornada dura.',
    message: [
      'Pido revancha en El Oraculo Mundial.',
      'La proxima fecha se arregla la reputacion:',
      'https://www.oraculomundialista.com/p/la-banda-del-mundial/momento/revancha',
    ].join('\n'),
    ctaLabel: 'Pedir revancha',
  },
]

export function getShareMomentById(momentId, moments = demoShareMoments) {
  return moments.find((moment) => moment.id === momentId) || moments[0]
}
