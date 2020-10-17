import { Instagram } from './instagram';

import { instagramConfig } from './instagramConfig';

export const instagramFactory = {
  provide: 'INSTAGRAM',
  useFactory: () => {
    return new Instagram(instagramConfig);
  },
};
