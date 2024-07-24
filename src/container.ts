import { createContainer, asClass } from 'awilix';
import { FeedService } from './services/feed.service';
import { FeedRepository } from './repositories/feed.repository';
import { FeedEntity } from './entities/feed.entity';
import { FeedController } from './controllers/feed.controller';
import { ScrapperService } from './scrapping/scrapper.service';
import { ElpaisService } from './scrapping/elpais.service';
import { ElmundoService } from './scrapping/elmundo.service';

const container = createContainer();

container.register({
  feedService: asClass(FeedService).singleton(),
  feedRepository: asClass(FeedRepository).singleton(),
  feedEntity: asClass(FeedEntity),
  feedController: asClass(FeedController).singleton(),
  scrapperService: asClass(ScrapperService).singleton(),
  elpaisService: asClass(ElpaisService).singleton(),
  elmundoService: asClass(ElmundoService).singleton(),
});

export { container };
