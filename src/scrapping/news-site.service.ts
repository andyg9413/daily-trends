import { FeedService } from '../services/feed.service';
import { IArticle } from './article.interface';
import axios from 'axios';

export abstract class NewsSite {
  protected abstract url: string;
  protected readonly feedService: FeedService;

  constructor({ feedService }: { feedService: FeedService }) {
    this.feedService = feedService;
  }

  abstract extractArticles(html: string): IArticle[];

  async readFeeds(limit?: number): Promise<IArticle[]> {
    const html = await this.fetchHtml();

    const articles = this.extractArticles(html);

    !limit && (await this.saveArticlesAsFeeds(articles));

    return articles;
  }

  private async fetchHtml(): Promise<string> {
    try {
      const response = await axios.get(this.url);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching HTML from ${this.url}`);
    }
  }

  private async saveArticlesAsFeeds(articles: IArticle[]): Promise<void> {
    try {
      for (const article of articles) {
        const existingFeed = await this.feedService.findOneFeed({
          description: article.body,
          isDeleted: false,
        });
        if (existingFeed) {
          continue;
        }
        await this.feedService.addFeed({
          ...article,
          datePublished: new Date(Date.now()),
          scrapped: true,
          description: article.body,
          title: article.title || '',
        });
      }
    } catch (error) {
      console.error('Error saving feeds:', error);
    }
  }
}
