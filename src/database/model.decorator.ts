import { SetMetadata } from '@nestjs/common';

export const Model = (...args: string[]) => SetMetadata('model', args);
