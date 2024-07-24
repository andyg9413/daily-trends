import { ElPaisService } from '../src/scrapping/elpais.service';
import { IArticle } from '../src/scrapping/article.interface';
import { FeedRepository } from '../src/repositories/feed.repository';
import { FeedEntity } from '../src/entities/feed.entity';
import { FeedService } from '../src/services/feed.service';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('../src/repositories/feed.repository');
jest.mock('../src/entities/feed.entity');

const elPaisHtmlPath = path.join(__dirname, 'utils/elpais.html');
const elPaisHtml = fs.readFileSync(elPaisHtmlPath, 'utf-8');

const mockFeedRepository = new FeedRepository({
  feedEntity: new FeedEntity(),
}) as jest.Mocked<FeedRepository>;

const mockFeedService = new FeedService({
  feedRepository: mockFeedRepository,
}) as jest.Mocked<FeedService>;

const elPaisService = new ElPaisService({
  feedService: mockFeedService,
}) as jest.Mocked<ElPaisService>;

describe('ElpaisService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should extract articles from El Pais HTML', () => {
    const articles: IArticle[] = elPaisService.extractArticles(elPaisHtml);

    expect(articles.length).toBeGreaterThan(0);
    expect(articles[0].title).toBeDefined();
    expect(articles[0].body).toBeDefined();
    expect(articles[0].image).toBeDefined();
    expect(articles[0].link).toBeDefined();
  });

  it('should read feeds from El Pais', async () => {
    const fetchHtmlSpy = jest.spyOn(elPaisService as any, 'fetchHtml');
    fetchHtmlSpy.mockResolvedValue(elPaisHtml);

    const result = await elPaisService.readFeeds();

    expect(result).toBeDefined();
    expect(fetchHtmlSpy).toHaveBeenCalledTimes(1);

    fetchHtmlSpy.mockRestore();
  });

  it('should throw an error when fetchHtml fails', async () => {
    const fetchHtmlSpy = jest.spyOn(elPaisService as any, 'fetchHtml');
    fetchHtmlSpy.mockRejectedValue(new Error('Error fetching HTML'));

    await expect(elPaisService.readFeeds()).rejects.toThrowError(
      'Error fetching HTML',
    );

    expect(fetchHtmlSpy).toHaveBeenCalledTimes(1);

    fetchHtmlSpy.mockRestore();
  });

  it('should read feeds from El Pais with a limit', async () => {
    const fetchHtmlSpy = jest.spyOn(elPaisService as any, 'fetchHtml');
    fetchHtmlSpy.mockResolvedValue(elPaisHtml);

    const result = await elPaisService.readFeeds(1);

    expect(result).toBeDefined();
    expect(fetchHtmlSpy).toHaveBeenCalledTimes(1);

    fetchHtmlSpy.mockRestore();
  });
});
