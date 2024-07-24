import { FeedRepository } from '../repositories/feed.repository';
import { IFeed } from '../entities/feed.interface';
import { CreateFeedDto, UpdateFeedDto } from '../dtos/feed.dto';

export class FeedService {
  private readonly feedRepository: FeedRepository;
  constructor({ feedRepository }: { feedRepository: FeedRepository }) {
    this.feedRepository = feedRepository;
  }

  async getFeeds(
    page: number,
    limit: number,
  ): Promise<{ feeds: IFeed[]; total: number }> {
    const feeds = await this.feedRepository.getFeeds(page, limit);
    return { feeds, total: feeds.length };
  }
  async addFeed(feed: CreateFeedDto): Promise<IFeed> {
    return this.feedRepository.addFeed(feed);
  }
  async getFeed(id: string): Promise<IFeed> {
    return this.feedRepository.getFeed(id);
  }
  async updateFeed(id: string, feed: UpdateFeedDto): Promise<IFeed> {
    return this.feedRepository.updateFeed(id, feed);
  }
  async deleteFeed(id: string): Promise<boolean> {
    return this.feedRepository.deleteFeed(id);
  }
  async findOneFeed(feed: Partial<IFeed>): Promise<IFeed | null> {
    return this.feedRepository.findOneFeed(feed);
  }
}
