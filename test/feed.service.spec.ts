import { FeedService } from '../src/services/feed.service';
import { FeedRepository } from '../src/repositories/feed.repository';
import { IFeed } from '../src/entities/feed.interface';
import { CreateFeedDto, UpdateFeedDto } from '../src/dtos/feed.dto';
import { FeedEntity } from '../src/entities/feed.entity';
import { faker } from '@faker-js/faker';

jest.mock('../src/repositories/feed.repository');
jest.mock('../src/entities/feed.entity');

const mockFeedRepository = new FeedRepository({
  feedEntity: new FeedEntity(),
}) as jest.Mocked<FeedRepository>;

const feedService = new FeedService({ feedRepository: mockFeedRepository });

const mockFeed: IFeed = {
  title: faker.lorem.words(),
  link: faker.internet.url(),
  datePublished: faker.date.recent(),
  image: faker.image.url(),
  author: faker.person.fullName(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
};

describe('FeedService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get feeds', async () => {
    mockFeedRepository.getFeeds.mockResolvedValue([mockFeed]);

    const result = await feedService.getFeeds();

    expect(result).toEqual([mockFeed]);
    expect(mockFeedRepository.getFeeds).toHaveBeenCalledTimes(1);
  });

  it('should add a feed', async () => {
    mockFeedRepository.addFeed.mockResolvedValue(mockFeed);

    const result = await feedService.addFeed({} as CreateFeedDto);

    expect(result).toEqual(mockFeed);
    expect(mockFeedRepository.addFeed).toHaveBeenCalledTimes(1);
  });

  it('should get a feed', async () => {
    mockFeedRepository.getFeed.mockResolvedValue(mockFeed);

    const result = await feedService.getFeed('someId');
    console.log(result);

    expect(result).toEqual(mockFeed);
    expect(mockFeedRepository.getFeed).toHaveBeenCalledWith('someId');
  });

  it('should update a feed', async () => {
    mockFeedRepository.updateFeed.mockResolvedValue(mockFeed);

    const result = await feedService.updateFeed('someId', {} as UpdateFeedDto);

    expect(result).toEqual(mockFeed);
    expect(mockFeedRepository.updateFeed).toHaveBeenCalledWith(
      'someId',
      {} as UpdateFeedDto,
    );
  });
  it('should delete a feed', async () => {
    mockFeedRepository.deleteFeed.mockResolvedValue(true);

    const result = await feedService.deleteFeed('someId');

    expect(result).toBeTruthy();
    expect(mockFeedRepository.deleteFeed).toHaveBeenCalledWith('someId');
  });
});