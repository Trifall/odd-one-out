const GAME_STATES = ['STARTED', 'PAUSED', 'ENDED', 'INACTIVE'] as const;

export type GameState = (typeof GAME_STATES)[number];
