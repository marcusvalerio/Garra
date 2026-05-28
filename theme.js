// ─── CrewRun Design System ──────────────────────────────
// Paleta premium dark com toque azul noturno

export const colors = {
  // Backgrounds
  bg:          '#08090B',   // fundo principal — quase preto
  surface:     '#101318',   // cards, modais
  surfaceHigh: '#181C22',   // elementos elevados

  // Bordas
  border:      'rgba(255,255,255,0.06)',
  borderLight: 'rgba(255,255,255,0.10)',

  // Accent
  accent:      '#C7F135',              // lime premium — menos néon que antes
  accentSoft:  'rgba(199,241,53,0.12)',
  accentGlow:  'rgba(199,241,53,0.25)',

  // Azul escuro com toque
  blue:        '#0E2235',   // usado em gradientes e crew cards
  blueMid:     '#1A3A55',   // hover states, selecionados

  // Texto
  textPrimary:   '#F4F4F5',
  textSecondary: '#71717A',
  textMuted:     '#3F3F46',

  // Feedback
  success: '#C7F135',
  danger:  '#FF5C5C',
  warn:    '#FFAA33',
};

export const fonts = {
  heading: 'Geist_700Bold',
  headingBlack: 'Geist_900Black',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemiBold: 'Inter_600SemiBold',
};

export const radius = {
  sm:   10,
  md:   16,
  lg:   22,
  xl:   28,
  full: 999,
};

export const spacing = {
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
};

export const shadow = {
  accent: {
    shadowColor: '#C7F135',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
};
