import cron from 'node-cron';
export class ScrapCron {
  private readonly scheduledTask: cron.ScheduledTask;
  constructor() {
    this.scheduledTask = cron.schedule(
      '0 6 * * *',
      async () => await this.execute(),
      { scheduled: false },
    );
  }

  start(): void {
    this.scheduledTask.start();
  }

  async execute(): Promise<void> {
    try {
      console.log('Cron job executed successfully');
    } catch (error) {
      console.error('Error in cron job:', error);
    }
  }
}
