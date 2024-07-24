import { FeedService } from '../services/feed.service';
import { DELETE, GET, PATCH, POST, route } from 'awilix-express';
import { IFeed } from '../entities/feed.interface';
import { Request, Response } from 'express';
import { CreateFeedDto, GetAllDto, GetFeedDto, UpdateFeedDto } from '../dtos/feed.dto';

@route('/feeds')
export class FeedController {
  private readonly feedService: FeedService;
  constructor({ feedService }: { feedService: FeedService }) {
    this.feedService = feedService;
  }

  @GET()
  @route('/')
  async getFeeds(req: Request<GetAllDto>, res: Response<IFeed[]>) {
    console.log(req.query);
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
}