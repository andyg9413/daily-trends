import { ElMundoService } from '../src/scrapping/elmundo.service';
import { IArticle } from '../src/scrapping/article.interface';
import { FeedRepository } from '../src/repositories/feed.repository';
import { FeedEntity } from '../src/entities/feed.entity';
import { FeedService } from '../src/services/feed.service';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('../src/repositories/feed.repository');
jest.mock('../src/entities/feed.entity');

const elMundoHtmlPath = path.join(__dirname, 'utils/elmundo.html');
const elMundoHtml = fs.readFileSync(elMundoHtmlPath, 'utf-8');

const mockFeedRepository = new FeedRepository({
  feedEntity: new FeedEntity(),
}) as jest.Mocked<FeedRepository>;

const mockFeedService = new FeedService({
  feedRepository: mockFeedRepository,
}) as jest.Mocked<FeedService>;

const elMundoService = new ElMundoService({
  feedService: mockFeedService,
}) as jest.Mocked<ElMundoService>;

describe('ElMundoService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should extract articles from El Mundo HTML', () => {
    const articles: IArticle[] = elMundoService.extractArticles(elMundoHtml);

    expect(articles.length).toBeGreaterThan(0);
    expect(articles[0].title).toBeDefined();
    expect(articles[0].body).toBeDefined();
    expect(articles[0].image).toBeDefined();
    expect(articles[0].link).toBeDefined();
  });

  it('should read feeds from El Mundo', async () => {
    // Spy on the private method fetchHtml
    const fetchHtmlSpy = jest.spyOn(elMundoService as any, 'fetchHtml');
    fetchHtmlSpy.mockResolvedValue(elMundoHtml);

    const result = await elMundoService.readFeeds();

    expect(result).toBeDefined();
    expect(fetchHtmlSpy).toHaveBeenCalledTimes(1);

    fetchHtmlSpy.mockRestore();
  });

  it('should throw an error when fetchHtml fails', async () => {
    const fetchHtmlSpy = jest.spyOn(elMundoService as any, 'fetchHtml');
    fetchHtmlSpy.mockRejectedValue(new Error('Error fetching HTML'));

    await expect(elMundoService.readFeeds()).rejects.toThrowError(
      'Error fetching HTML',
    );

    expect(fetchHtmlSpy).toHaveBeenCalledTimes(1);

    fetchHtmlSpy.mockRestore();
  });

  it('should read feeds from El Mundo with a limit', async () => {
    const fetchHtmlSpy = jest.spyOn(elMundoService as any, 'fetchHtml');
    fetchHtmlSpy.mockResolvedValue(elMundoHtml);

    const result = await elMundoService.readFeeds(1);

    expect(result).toBeDefined();
    expect(fetchHtmlSpy).toHaveBeenCalledTimes(1);

    fetchHtmlSpy.mockRestore();
  });
});
