import { ElPaisService } from '../scrapping/elpais.service';
import { IArticle } from '../scrapping/article.interface';
import { ScrapperService } from '../scrapping/scrapper.service';
import { ElMundoService } from '../scrapping/elmundo.service';
import { FeedRepository } from '../repositories/feed.repository';
import { FeedEntity } from '../entities/feed.entity';
import { FeedService } from '../services/feed.service';

jest.mock('../scrapping/news-site.service', () => {
  const originalModule = jest.requireActual('../scrapping/news-site.service');
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

const mockElPaisService = new ElPaisService({
  feedService: mockFeedService,
}) as jest.Mocked<ElPaisService>;
const mockElMundoService = new ElMundoService({
  feedService: mockFeedService,
}) as jest.Mocked<ElMundoService>;

const scrapperService = new ScrapperService({
  elPaisService: mockElPaisService,
  elMundoService: mockElMundoService,
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

    mockElPaisService.readFeeds.mockResolvedValue(mockElpaisArticles);
    mockElMundoService.readFeeds.mockResolvedValue(mockElmundoArticles);

    await scrapperService.getAndSaveAllFeeds();

    expect(mockElPaisService.readFeeds).toHaveBeenCalledTimes(2);
  });

    it('should get and save all feeds with limit', async () => {
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

        mockElPaisService.readFeeds.mockResolvedValue(mockElpaisArticles);
        mockElMundoService.readFeeds.mockResolvedValue(mockElmundoArticles);

        await scrapperService.getAndSaveAllFeeds(1);

        expect(mockElPaisService.readFeeds).toHaveBeenCalledTimes(2);
    });
});
