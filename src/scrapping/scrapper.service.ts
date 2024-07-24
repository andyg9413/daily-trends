import { NewsSite } from './news-site.service';
import { IArticle } from './article.interface';
import { IFeed } from '../entities/feed.interface';
import { mapArticleToFeed } from './scrapper.transform';

export class ScrapperService {
  private readonly elPaisService: NewsSite;
  private readonly elMundoService: NewsSite;

  constructor({
    elPaisService,
    elMundoService,
  }: {
    elPaisService: NewsSite;
    elMundoService: NewsSite;
  }) {
    this.elPaisService = elPaisService;
    this.elMundoService = elMundoService;
  }

  async getAndSaveAllFeeds(limit?: number): Promise<IFeed[]> {
    try {
      const newsElPais: IArticle[] = await this.elPaisService.readFeeds(limit);

      const newsElMundo: IArticle[] =
        await this.elMundoService.readFeeds(limit);

      const elPaisFeeds: IFeed[] = (
        limit ? newsElPais.slice(0, limit) : newsElPais
      ).map(mapArticleToFeed);
      const elMundoFeeds: IFeed[] = (
        limit ? newsElMundo.slice(0, limit) : newsElMundo
      ).map(mapArticleToFeed);

      return [...elPaisFeeds, ...elMundoFeeds];
    } catch (error) {
      throw error;
    }
  }
}
