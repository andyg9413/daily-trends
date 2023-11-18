import { ElpaisService } from '../scrapping/elpais.service';
import { IArticle } from '../scrapping/article.interface';
import { FeedRepository } from "../repositories/feed.repository";
import { FeedEntity } from "../entities/feed.entity";
import { FeedService } from "../services/feed.service";
import * as fs from "fs";
import * as path from "path";

jest.mock('../repositories/feed.repository');
jest.mock('../entities/feed.entity');

const elpaisHtmlPath = path.join(__dirname, 'utils/elpais.html');
const elpaisHtml = fs.readFileSync(elpaisHtmlPath, 'utf-8');

const mockFeedRepository = new FeedRepository({
    feedEntity: new FeedEntity(),
}) as jest.Mocked<FeedRepository>;

const mockFeedService = new FeedService({
    feedRepository: mockFeedRepository,
}) as jest.Mocked<FeedService>;

const elpaisService = new ElpaisService({ feedService: mockFeedService }) as jest.Mocked<ElpaisService>;

describe('ElpaisService', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should extract articles from El Pais HTML', () => {
        const articles: IArticle[] = elpaisService.extractArticles(elpaisHtml);

        expect(articles.length).toBeGreaterThan(0);
        expect(articles[0].title).toBeDefined();
        expect(articles[0].body).toBeDefined();
        expect(articles[0].image).toBeDefined();
        expect(articles[0].link).toBeDefined();
    });

    it('should read feeds from El Pais', async () => {
        const fetchHtmlSpy = jest.spyOn(elpaisService as any, 'fetchHtml');
        fetchHtmlSpy.mockResolvedValue(elpaisHtml);

        const result = await elpaisService.readFeeds();

        expect(result).toBeDefined();
        expect(fetchHtmlSpy).toHaveBeenCalledTimes(1);

        fetchHtmlSpy.mockRestore();
    });
});
