import { ElPaisService } from '../src/scrapping/elpais.service';
import { IArticle } from '../src/scrapping/article.interface';
import { ScrapperService } from '../src/scrapping/scrapper.service';
import { ElMundoService } from '../src/scrapping/elmundo.service';
import { FeedRepository } from '../src/repositories/feed.repository';
import { FeedEntity } from '../src/entities/feed.entity';
import { FeedService } from '../src/services/feed.service';

jest.mock('../src/scrapping/news-site.service', () => {
  const originalModule = jest.requireActual(
    '../src/scrapping/news-site.service',
  );
  const mockReadFeeds = jest.fn();

  return {
    ...originalModule,
    NewsSite: jest.fn(() => ({
      readFeeds: mockReadFeeds,
    })),
  };
});

const mockFeedRepository = new FeedRepository({
  feedEntity: new FeedEntity(),
}) as jest.Mocked<FeedRepository>;

const mockFeedService = new FeedService({
  feedRepository: mockFeedRepository,
}) as jest.Mocked<FeedService>;

const mockElpaisService = new ElPaisService({
  feedService: mockFeedService,
}) as jest.Mocked<ElPaisService>;
const mockElmundoService = new ElMundoService({
  feedService: mockFeedService,
}) as jest.Mocked<ElMundoService>;

const scrapperService = new ScrapperService({
  elPaisService: mockElpaisService,
  elMundoService: mockElmundoService,
}) as jest.Mocked<ScrapperService>;

describe('ScrapperService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get and save all feeds without limit', async () => {
    const mockElpaisArticles: IArticle[] = [
      {
        title: 'Elpais Title 1',
        body: 'Elpais Body 1',
        link: 'https://elpais.com/1.png',
        image: 'https://image.elpais.com/1.png',
      },
      {
        title: 'Elpais Title 2',
        body: 'Elpais Body 2',
        link: 'https://elpais.com/2.png',
        image: 'https://image.elpais.com/1.png',
      },
    ];
    const mockElmundoArticles: IArticle[] = [
      {
        title: 'Elmundo Title 1',
        body: 'Elmundo Body 1',
        link: 'https://elmundo.es/1.png',
        image: 'https://image.elmundo.es/1.png',
      },
      {
        title: 'Elmundo Title 2',
        body: 'Elmundo Body 2',
        link: 'https://elmundo.es/2.png',
        image: 'https://image.elmundo.es/2.png',
      },
    ];

    mockElpaisService.readFeeds.mockResolvedValue(mockElpaisArticles);
    mockElmundoService.readFeeds.mockResolvedValue(mockElmundoArticles);

    await scrapperService.getAndSaveAllFeeds();

    expect(mockElpaisService.readFeeds).toHaveBeenCalledTimes(2);
  });
});
