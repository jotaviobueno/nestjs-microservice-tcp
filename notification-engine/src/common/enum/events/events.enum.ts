export const EVENTS_ENUM = {
  user: {
    created: 'user.created',
    updated: 'user.updated',
    deleted: 'user.deleted',
  },
} as const;

export interface EventPayloads {
  user: {
    created: any;
    updated: any;
    deleted: any;
  };
}
