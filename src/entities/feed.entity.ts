import { Schema, model, Model } from 'mongoose';
import { IFeed } from './feed.interface';

export class FeedEntity {
  private static feedSchema: Schema<IFeed> = new Schema<IFeed>({
    title: { type: String, required: true, unique: true },
    link: { type: String, required: true, unique: true },
    datePublished: { type: Date, required: true },
    image: { type: String, required: false },
    author: { type: String, required: false },
    createdAt: { type: Date, required: false, default: Date.now },
    updatedAt: { type: Date, required: false, default: Date.now },
    scrapped: { type: Boolean, required: false, default: false },
    isDeleted: { type: Boolean, required: false, default: false },
    description: { type: String, required: false },
  });

  private static feedModel: Model<IFeed> = model<IFeed>(
    'Feeds',
    FeedEntity.feedSchema,
  );

  getModel(): Model<IFeed> {
    return FeedEntity.feedModel;
  }
}
