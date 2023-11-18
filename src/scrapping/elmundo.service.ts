import { NewsSite } from './news-site.service';
import { IArticle } from './article.interface';
import * as cheerio from 'cheerio';

export class ElMundoService extends NewsSite {
  protected url: string = process.env.EL_MUNDO_URL || '';

  extractArticles(html: string): IArticle[] {
    const $ = cheerio.load(html);
    const articles: IArticle[] = [];

    $('article.ue-c-cover-content').each((index, element) => {
      const title = $(element)
        .find('span.ue-c-cover-content__kicker')
        .text()
        .trim();
      const body = $(element)
        .find('header h2.ue-c-cover-content__headline')
        .text()
        .trim();
      const link =
        $(element).find('a.ue-c-cover-content__link').attr('href') || '';
      const image =
        $(element).find('div.ue-c-cover-content__media img').attr('src') || '';

      articles.push({ title, body, link, image });
    });

    return articles;
  }
}
