import { FeedRepository } from '../repositories/feed.repository';
import { IFeed } from '../entities/feed.interface';
import { CreateFeedDto, UpdateFeedDto } from '../dtos/feed.dto';

export class FeedService {
  private readonly feedRepository: FeedRepository;
  constructor({ feedRepository }: { feedRepository: FeedRepository }) {
    this.feedRepository = feedRepository;
  }

  async getFeeds(): Promise<IFeed[]> {
    return this.feedRepository.getFeeds();
  }
  async addFeed(feed: CreateFeedDto): Promise<IFeed> {
    return this.feedRepository.addFeed(feed);
  }
  async getFeed(id: string): Promise<IFeed> {
    const feed: IFeed = await this.feedRepository.getFeed(id);
    if (feed === null) {
      throw new Error('Feed not found');
    }
    return feed;
  }
  async updateFeed(id: string, feed: UpdateFeedDto): Promise<IFeed> {
    const feedToUpdate: IFeed = await this.getFeed(id);
    if (feedToUpdate === null) {
      throw new Error('Feed not found');
    }
    return this.feedRepository.updateFeed(id, feed);
  }
  async deleteFeed(id: string): Promise<boolean> {
    const feedToDelete: IFeed = await this.getFeed(id);
    if (feedToDelete === null) {
      throw new Error('Feed not found');
    }
    return this.feedRepository.deleteFeed(id);
  }

  async findOneFeed(feed: Partial<IFeed>): Promise<IFeed | null> {
    return this.feedRepository.findOneFeed(feed);
  }
}
