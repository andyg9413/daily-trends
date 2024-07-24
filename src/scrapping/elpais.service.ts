import { NewsSite } from './news-site.service';
import { IArticle } from './article.interface';
import * as cheerio from 'cheerio';

export class ElPaisService extends NewsSite {
  protected url: string = process.env.EL_PAIS_URL || '';

  extractArticles(html: string): IArticle[] {
    const $ = cheerio.load(html);
    const articles: IArticle[] = [];

    $('article.c').each((index, element) => {
      const title = $(element).find('header h2.c_t a').text().trim();
      const body = $(element).find('p.c_d').text().trim();
      const image = $(element).find('figure img').attr('src') || '';
      const link = $(element).find('header h2.c_t a').attr('href') || '';

      articles.push({ title, body, image, link });
    });

    return articles;
  }
}
