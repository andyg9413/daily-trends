import { ElMundoService } from '../src/scrapping/elmundo.service';
import { IArticle } from '../src/scrapping/article.interface';
import { FeedRepository } from '../src/repositories/feed.repository';
import { FeedEntity } from '../src/entities/feed.entity';
import { FeedService } from '../src/services/feed.service';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('../src/repositories/feed.repository');
jest.mock('../src/entities/feed.entity');

const elmundoHtmlPath = path.join(__dirname, 'utils/elmundo.html');
const elmundoHtml = fs.readFileSync(elmundoHtmlPath, 'utf-8');

const mockFeedRepository = new FeedRepository({
  feedEntity: new FeedEntity(),
}) as jest.Mocked<FeedRepository>;

const mockFeedService = new FeedService({
  feedRepository: mockFeedRepository,
}) as jest.Mocked<FeedService>;

const elmundoService = new ElMundoService({
  feedService: mockFeedService,
}) as jest.Mocked<ElMundoService>;

describe('ElMundoService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should extract articles from El Mundo HTML', () => {
    const articles: IArticle[] = elmundoService.extractArticles(elmundoHtml);

    expect(articles.length).toBeGreaterThan(0);
    expect(articles[0].title).toBeDefined();
    expect(articles[0].body).toBeDefined();
    expect(articles[0].image).toBeDefined();
    expect(articles[0].link).toBeDefined();
  });

  it('should read feeds from El Mundo', async () => {
    // Spy on the private method fetchHtml
    const fetchHtmlSpy = jest.spyOn(elmundoService as any, 'fetchHtml');
    fetchHtmlSpy.mockResolvedValue(elmundoHtml);

    const result = await elmundoService.readFeeds();

    expect(result).toBeDefined();
    expect(fetchHtmlSpy).toHaveBeenCalledTimes(1);

    // Don't forget to restore the original implementation after the test
    fetchHtmlSpy.mockRestore();
  });
});
