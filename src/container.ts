import { createContainer, asClass } from 'awilix';
import {FeedService} from "./services/feed.service";
import {FeedRepository} from "./repositories/feed.repository";
import {FeedEntity} from "./entities/feed.entity";
import {FeedController} from "./controllers/feed.controller";

const container = createContainer();

container.register({
  feedService: asClass(FeedService).singleton(),
  feedRepository: asClass(FeedRepository).singleton(),
  feedEntity: asClass(FeedEntity),
  feedController: asClass(FeedController).singleton(),
})

export { container };