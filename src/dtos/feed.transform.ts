import { map, pick } from 'ramda';
import { IFeed } from '../entities/feed.interface';

export const transformFeed = (feed: IFeed) =>
  pick(
    [
      '_id',
      'title',
      'link',
      'datePublished',
      'image',
      'scrapped',
      'description',
    ],
    feed,
  );

export const transformFeedList = (feeds: IFeed[]) => map(transformFeed, feeds);
