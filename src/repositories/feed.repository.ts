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

  async getFeeds(page: number, limit: number): Promise<IFeed[]> {
    const skips = (page - 1) * limit;
    return this.feedEntity
      .getModel()
      .find()
      .skip(skips)
      .limit(limit)
      .lean()
      .exec();
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

  async findOneFeed(feed: Partial<IFeed>): Promise<IFeed | null> {
    const feedFound = await this.feedEntity.getModel().findOne(feed);
    if (feedFound === null) {
      console.log('Feed not found');
      return null;
    }
    return feedFound;
  }
}
