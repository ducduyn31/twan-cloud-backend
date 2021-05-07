import {Model} from './model.interface';

export interface Database {
    getModel(): Model;
}
