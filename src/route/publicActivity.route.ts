import { Request, Response, Router } from 'express';
import mongoose from 'mongoose';
import * as PublicActivityService from '../service/publicActivity.service';
import { throwAPIError } from '../util/error-handler';

const publicActivityRouter = () => {
  const router = Router();

  router.get('/activities/:activityId', async (req: Request, res: Response) => {
    /* #swagger.tags = ['Activity'] */
    const activityId = req.params.activityId;
    const userId = req.query.userId as string;

    try {
      const activities = await PublicActivityService.getActivityDetail({
        activityId: new mongoose.Types.ObjectId(activityId),
        userId,
      });
      res.status(200).send(activities);
    } catch (error) {
      throwAPIError({ res, error, statusCode: 400 });
    }
  });

  return router;
};
const publicActivityRoute = publicActivityRouter();

export default publicActivityRoute;