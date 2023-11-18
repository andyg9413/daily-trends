import { NewsSite } from './news-site.service';
import { IArticle } from './article.interface';
import { IFeed } from '../entities/feed.interface';
import { mapArticleToFeed } from './scrapper.transform';

export class ScrapperService {
  private readonly elpaisService: NewsSite;
  private readonly elmundoService: NewsSite;

  constructor({
    elpaisService,
    elmundoService,
  }: {
    elpaisService: NewsSite;
    elmundoService: NewsSite;
  }) {
    this.elpaisService = elpaisService;
    this.elmundoService = elmundoService;
  }

  async getAndSaveAllFeeds(limit?: number): Promise<IFeed[]> {
    try {
      const newsElpais: IArticle[] = await this.elpaisService.readFeeds(limit);

      const newsElmundo: IArticle[] =
        await this.elmundoService.readFeeds(limit);

      const elpaisFeeds: IFeed[] = (
        limit ? newsElpais.slice(0, limit) : newsElpais
      ).map(mapArticleToFeed);
      const elmundoFeeds: IFeed[] = (
        limit ? newsElmundo.slice(0, limit) : newsElmundo
      ).map(mapArticleToFeed);

      return [...elpaisFeeds, ...elmundoFeeds];
    } catch (error) {
      throw new Error('Error getting and saving feeds');
    }
  }
}
