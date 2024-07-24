import { FeedService } from '../services/feed.service';
import { DELETE, GET, PATCH, POST, route } from 'awilix-express';
import { Request, Response } from 'express';
import { CreateFeedDto, UpdateFeedDto } from '../dtos/feed.dto';
import { ScrapperService } from '../scrapping/scrapper.service';
import { transformFeed, transformFeedList } from '../dtos/feed.transform';

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
    res: Response<{ feeds: any[]; total: number }>, // Adjusted response type
  ) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const { feeds, total } = await this.feedService.getFeeds(page, limit);
    res.send({
      feeds: transformFeedList(feeds),
      total,
    });
  }

  @POST()
  @route('/')
  async addFeed(req: Request<any, any, CreateFeedDto>, res: Response<any>) {
    const feed = await this.feedService.addFeed(req.body);
    res.send(transformFeed(feed));
  }

  @GET()
  @route('/:id')
  async getFeed(req: Request, res: Response<any>) {
    const feed = await this.feedService.getFeed(req.params.id);
    res.send(transformFeed(feed));
  }

  @PATCH()
  @route('/:id')
  async updateFeed(
    req: Request<any, any, UpdateFeedDto>,
    res: Response<any>, // Adjusted response type
  ) {
    const feed = await this.feedService.updateFeed(req.params.id, req.body);
    res.send(transformFeed(feed));
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
