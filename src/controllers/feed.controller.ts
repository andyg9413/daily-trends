import { FeedService } from '../services/feed.service';
import { DELETE, GET, PATCH, POST, route } from 'awilix-express';
import { IFeed } from '../entities/feed.interface';
import { Request, Response } from 'express';
import { CreateFeedDto, GetFeedDto, UpdateFeedDto } from '../dtos/feed.dto';
import { ScrapperService } from '../scrapping/scrapper.service';

@route('/feeds')
export class FeedController {
  private readonly feedService: FeedService;
  private readonly scrapperService: ScrapperService;
  constructor({
    feedService,
    scrapperService,
  }: {
    feedService: FeedService;
    scrapperService: ScrapperService;
  }) {
    this.feedService = feedService;
    this.scrapperService = scrapperService;
  }

  @GET()
  @route('/')
  async getFeeds(req: Request, res: Response<IFeed[]>) {
    res.send(await this.feedService.getFeeds());
  }

  @POST()
  @route('/')
  async addFeed(req: Request<any, any, CreateFeedDto>, res: Response<IFeed>) {
    res.send(await this.feedService.addFeed(req.body));
  }

  @GET()
  @route('/:id')
  async getFeed(req: Request<GetFeedDto>, res: Response<IFeed>) {
    res.send(await this.feedService.getFeed(req.params.id));
  }

  @PATCH()
  @route('/:id')
  async updateFeed(
    req: Request<GetFeedDto, any, UpdateFeedDto>,
    res: Response<IFeed>,
  ) {
    res.send(await this.feedService.updateFeed(req.params.id, req.body));
  }

  @DELETE()
  @route('/:id')
  async deleteFeed(req: Request<GetFeedDto>, res: Response<boolean>) {
    res.send(await this.feedService.deleteFeed(req.params.id));
  }

  @GET()
  @route('/dashboard/news')
  async dashboard(req: Request, res: Response) {
    try {
      res.send(await this.scrapperService.getAndSaveAllFeeds(5));
    } catch (error) {
      console.error('Error getting and saving feeds:', error);
      res.status(400).send({ message: 'Error getting and saving feeds' });
    }
  }

  @POST()
  @route('/scrap')
  async scrapFeed(req: Request, res: Response) {
    try {
      res.send(await this.scrapperService.getAndSaveAllFeeds());
    } catch (error) {
      console.error('Error getting and saving feeds:', error);
      res.status(400).send({ message: 'Error getting and saving feeds' });
    }
  }
}
