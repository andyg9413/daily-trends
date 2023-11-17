import { IRepositoryInterface } from './repository.interface';
import { IFeed } from '../entities/feed.interface';
import { FeedEntity } from '../entities/feed.entity';
import { CreateFeedDto, UpdateFeedDto } from '../dtos/feed.dto';

export class FeedRepository implements IRepositoryInterface {
  private readonly feedEntity: FeedEntity;
  constructor({ feedEntity }: { feedEntity: FeedEntity }) {
    this.feedEntity = feedEntity;
  }

  async addFeed(feed: CreateFeedDto): Promise<IFeed> {
    return this.feedEntity.getModel().create(feed);
  }

  async deleteFeed(id: string): Promise<boolean> {
    const feed = await this.feedEntity
      .getModel()
      .findByIdAndUpdate(id, { isDeleted: true });
    if (feed === null) {
      throw new Error('Feed not deleted');
    }

    return true;
  }

  async getFeed(id: string): Promise<IFeed> {
    const feed = await this.feedEntity.getModel().findById(id);
    if (feed === null) {
      throw new Error('Feed not found');
    }
    return feed;
  }

  async getFeeds(): Promise<IFeed[]> {
    return this.feedEntity.getModel().find();
  }

  async updateFeed(id: string, feed: UpdateFeedDto): Promise<IFeed> {
    const feedUpdated = await this.feedEntity
      .getModel()
      .findByIdAndUpdate(id, { ...feed, updatedAt: Date.now() });
    if (feedUpdated === null) {
      throw new Error('Feed not updated');
    }
    return feedUpdated;
  }
}
