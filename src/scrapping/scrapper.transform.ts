import { IArticle } from './article.interface';
import { IFeed } from '../entities/feed.interface';

const mapArticleToFeed = (article: IArticle): IFeed => {
  return {
    title: article.title,
    link: article.link,
    datePublished: new Date(Date.now()),
    image: article.image,
    scrapped: true,
    description: article.body,
  };
};

export { mapArticleToFeed };
