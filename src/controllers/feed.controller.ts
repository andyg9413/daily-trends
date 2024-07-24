import { FeedService } from '../services/feed.service';
import { DELETE, GET, PATCH, POST, route } from 'awilix-express';
import { IFeed } from '../entities/feed.interface';
import { Request, Response } from 'express';
import { CreateFeedDto, UpdateFeedDto } from '../dtos/feed.dto';
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
  async getFeeds(
    req: Request,
    res: Response<{ feeds: IFeed[]; total: number }>,
  ) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    res.send(await this.feedService.getFeeds(page, limit));
  }

  @POST()
  @route('/')
  async addFeed(req: Request<any, any, CreateFeedDto>, res: Response<IFeed>) {
    res.send(await this.feedService.addFeed(req.body));
  }

  @GET()
  @route('/:id')
  async getFeed(req: Request, res: Response<IFeed>) {
    res.send(await this.feedService.getFeed(req.params.id));
  }

  @PATCH()
  @route('/:id')
  async updateFeed(
    req: Request<any, any, UpdateFeedDto>,
    res: Response<IFeed>,
  ) {
    res.send(await this.feedService.updateFeed(req.params.id, req.body));
  }

  @DELETE()
  @route('/:id')
  async deleteFeed(req: Request, res: Response<boolean>) {
    res.send(await this.feedService.deleteFeed(req.params.id));
  }

  @GET()
  @route('/dashboard/news')
  async dashboard(req: Request, res: Response) {
    res.send(await this.scrapperService.getAndSaveAllFeeds(5));
  }

  @POST()
  @route('/scrap')
  async scrapFeed(req: Request, res: Response) {
    res.send(await this.scrapperService.getAndSaveAllFeeds());
  }
}
