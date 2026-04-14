import { Controller, Get, Query } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Get('check')
  async checkSubscription(
    @Query('fan') fan: string,
    @Query('creator') creator: string,
  ) {
    const isSubscribed = await this.subscriptionService.checkSubscription(fan, creator);
    return { isSubscribed };
  }

  @Get('creator/:creator')
  async getCreatorSubscribers(@Query('creator') creator: string) {
    return this.subscriptionService.getCreatorSubscribers(creator);
  }

  @Get('fan/:fan')
  async getFanSubscriptions(@Query('fan') fan: string) {
    return this.subscriptionService.getFanSubscriptions(fan);
  }
}
