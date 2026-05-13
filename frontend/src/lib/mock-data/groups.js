/**
 * World Cup 2026 — Group Stage
 * 12 groups (A–L), 4 teams each, 48 teams total.
 *
 * Each team has:
 *   id        – unique stable key
 *   code      – 3-letter FIFA code
 *   name      – name in Spanish
 *   isoCode   – 2-letter ISO 3166-1 alpha-2 (used for flag emoji)
 *   pot       – seeding pot (1–4, informational)
 */

/** Convert a 2-letter ISO country code to a flag emoji */
export function countryFlag(iso2) {
  return [...iso2.toUpperCase()].map((c) =>
    String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65)
  ).join('')
}

export const wc2026Groups = [
  {
    id: 'group-a',
    label: 'Grupo A',
    teams: [
      { id: 'usa',  code: 'USA', name: 'Estados Unidos', isoCode: 'US', pot: 1 },
      { id: 'mar',  code: 'MAR', name: 'Marruecos',      isoCode: 'MA', pot: 2 },
      { id: 'eng',  code: 'ENG', name: 'Inglaterra',     isoCode: 'GB', pot: 3 },
      { id: 'jpn',  code: 'JPN', name: 'Japón',          isoCode: 'JP', pot: 4 },
    ],
  },
  {
    id: 'group-b',
    label: 'Grupo B',
    teams: [
      { id: 'mex',  code: 'MEX', name: 'México',         isoCode: 'MX', pot: 1 },
      { id: 'sen',  code: 'SEN', name: 'Senegal',        isoCode: 'SN', pot: 2 },
      { id: 'fra',  code: 'FRA', name: 'Francia',        isoCode: 'FR', pot: 3 },
      { id: 'aus',  code: 'AUS', name: 'Australia',      isoCode: 'AU', pot: 4 },
    ],
  },
  {
    id: 'group-c',
    label: 'Grupo C',
    teams: [
      { id: 'can',  code: 'CAN', name: 'Canadá',         isoCode: 'CA', pot: 1 },
      { id: 'nga',  code: 'NGA', name: 'Nigeria',        isoCode: 'NG', pot: 2 },
      { id: 'esp',  code: 'ESP', name: 'España',         isoCode: 'ES', pot: 3 },
      { id: 'kor',  code: 'KOR', name: 'Corea del Sur',  isoCode: 'KR', pot: 4 },
    ],
  },
  {
    id: 'group-d',
    label: 'Grupo D',
    teams: [
      { id: 'pan',  code: 'PAN', name: 'Panamá',         isoCode: 'PA', pot: 1 },
      { id: 'cmr',  code: 'CMR', name: 'Camerún',        isoCode: 'CM', pot: 2 },
      { id: 'ger',  code: 'GER', name: 'Alemania',       isoCode: 'DE', pot: 3 },
      { id: 'ksa',  code: 'KSA', name: 'Arabia Saudita', isoCode: 'SA', pot: 4 },
    ],
  },
  {
    id: 'group-e',
    label: 'Grupo E',
    teams: [
      { id: 'crc',  code: 'CRC', name: 'Costa Rica',     isoCode: 'CR', pot: 1 },
      { id: 'civ',  code: 'CIV', name: 'Costa de Marfil',isoCode: 'CI', pot: 2 },
      { id: 'ned',  code: 'NED', name: 'Países Bajos',   isoCode: 'NL', pot: 3 },
      { id: 'irn',  code: 'IRN', name: 'Irán',           isoCode: 'IR', pot: 4 },
    ],
  },
  {
    id: 'group-f',
    label: 'Grupo F',
    teams: [
      { id: 'jam',  code: 'JAM', name: 'Jamaica',        isoCode: 'JM', pot: 1 },
      { id: 'egy',  code: 'EGY', name: 'Egipto',         isoCode: 'EG', pot: 2 },
      { id: 'por',  code: 'POR', name: 'Portugal',       isoCode: 'PT', pot: 3 },
      { id: 'qat',  code: 'QAT', name: 'Qatar',          isoCode: 'QA', pot: 4 },
    ],
  },
  {
    id: 'group-g',
    label: 'Grupo G',
    teams: [
      { id: 'arg',  code: 'ARG', name: 'Argentina',      isoCode: 'AR', pot: 1 },
      { id: 'alg',  code: 'ALG', name: 'Argelia',        isoCode: 'DZ', pot: 2 },
      { id: 'bel',  code: 'BEL', name: 'Bélgica',        isoCode: 'BE', pot: 3 },
      { id: 'irq',  code: 'IRQ', name: 'Irak',           isoCode: 'IQ', pot: 4 },
    ],
  },
  {
    id: 'group-h',
    label: 'Grupo H',
    teams: [
      { id: 'uru',  code: 'URU', name: 'Uruguay',        isoCode: 'UY', pot: 1 },
      { id: 'rsa',  code: 'RSA', name: 'Sudáfrica',      isoCode: 'ZA', pot: 2 },
      { id: 'cro',  code: 'CRO', name: 'Croacia',        isoCode: 'HR', pot: 3 },
      { id: 'jor',  code: 'JOR', name: 'Jordania',       isoCode: 'JO', pot: 4 },
    ],
  },
  {
    id: 'group-i',
    label: 'Grupo I',
    teams: [
      { id: 'bra',  code: 'BRA', name: 'Brasil',         isoCode: 'BR', pot: 1 },
      { id: 'mli',  code: 'MLI', name: 'Mali',           isoCode: 'ML', pot: 2 },
      { id: 'ita',  code: 'ITA', name: 'Italia',         isoCode: 'IT', pot: 3 },
      { id: 'nzl',  code: 'NZL', name: 'Nueva Zelanda',  isoCode: 'NZ', pot: 4 },
    ],
  },
  {
    id: 'group-j',
    label: 'Grupo J',
    teams: [
      { id: 'col',  code: 'COL', name: 'Colombia',       isoCode: 'CO', pot: 1 },
      { id: 'sui',  code: 'SUI', name: 'Suiza',          isoCode: 'CH', pot: 2 },
      { id: 'srb',  code: 'SRB', name: 'Serbia',         isoCode: 'RS', pot: 3 },
      { id: 'ven',  code: 'VEN', name: 'Venezuela',      isoCode: 'VE', pot: 4 },
    ],
  },
  {
    id: 'group-k',
    label: 'Grupo K',
    teams: [
      { id: 'ecu',  code: 'ECU', name: 'Ecuador',        isoCode: 'EC', pot: 1 },
      { id: 'hun',  code: 'HUN', name: 'Hungría',        isoCode: 'HU', pot: 2 },
      { id: 'ukr',  code: 'UKR', name: 'Ucrania',        isoCode: 'UA', pot: 3 },
      { id: 'par',  code: 'PAR', name: 'Paraguay',       isoCode: 'PY', pot: 4 },
    ],
  },
  {
    id: 'group-l',
    label: 'Grupo L',
    teams: [
      { id: 'chi',  code: 'CHI', name: 'Chile',          isoCode: 'CL', pot: 1 },
      { id: 'aut',  code: 'AUT', name: 'Austria',        isoCode: 'AT', pot: 2 },
      { id: 'den',  code: 'DEN', name: 'Dinamarca',      isoCode: 'DK', pot: 3 },
      { id: 'pol',  code: 'POL', name: 'Polonia',        isoCode: 'PL', pot: 4 },
    ],
  },
]

/**
 * Position label and status for a given 0-based index.
 * In WC 2026:
 *   0 → Primero (directly qualifies)
 *   1 → Segundo (directly qualifies)
 *   2 → Tercero (may qualify as best 3rd)
 *   3 → Cuarto  (eliminated)
 */
export function positionMeta(index) {
  switch (index) {
    case 0: return { label: '1°', status: 'qualifies', badge: 'CLASIFICA', icon: '★' }
    case 1: return { label: '2°', status: 'qualifies', badge: 'CLASIFICA', icon: '✓' }
    case 2: return { label: '3°', status: 'possible',  badge: 'POSIBLE 3RO', icon: '?' }
    case 3: return { label: '4°', status: 'out',       badge: 'ELIMINADO', icon: '✕' }
    default: return { label: `${index + 1}°`, status: 'unknown', badge: '', icon: '' }
  }
}
