import mongoose, { Schema } from 'mongoose';

/**
 * Interface to model the Game Schema for TypeScript.
 * @param name:string
 * @param progress:string
 */

export interface IGame extends mongoose.Types.EmbeddedDocument {
  name: string;
  progress: string;
}

export const GameSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  progress: {
    type: String,
    required: true,
  },
});

// Export the model and return your IGame interface
export default mongoose.model<IGame>('Game', GameSchema);
