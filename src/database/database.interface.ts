import {Model} from './model.interface';

export interface Database<D> {
    getModel<M>(modelName: string | { new (): M }): Model<M>;

    registerModel<M>(modelId: { new (): M } ): void;
}
