export interface IRepositoryInterface {}
import { IFeed } from '../entities/feed.interface';

export interface IRepositoryInterface {
  getFeeds(page: number, limit: number): Promise<IFeed[]>;
  addFeed(feed: IFeed): Promise<IFeed>;
  getFeed(id: string): Promise<IFeed>;
  updateFeed(id: string, feed: IFeed): Promise<IFeed>;
  deleteFeed(id: string): Promise<boolean>;
  findOneFeed(feed: Partial<IFeed>): Promise<IFeed | null>;
}
