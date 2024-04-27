import { Types } from 'mongoose';

export const stringToMongoId = (id: string): Types.ObjectId => {
    return new Types.ObjectId(id);
};

export const mongoIdToString = (id: Types.ObjectId): string => {
    return id.toString();
};
