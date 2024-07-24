export interface IRepositoryInterface {}
import { IFeed } from '../entities/feed.interface';

export interface IRepositoryInterface {
  getFeeds(): Promise<IFeed[]>;
  addFeed(feed: IFeed): Promise<IFeed>;
  getFeed(id: string): Promise<IFeed>;
  updateFeed(id: string, feed: IFeed): Promise<IFeed>;
  deleteFeed(id: string): Promise<boolean>;
}
