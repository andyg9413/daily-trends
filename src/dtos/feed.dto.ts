interface CreateFeedDto {
  title: string;
  link: string;
  author?: string;
  image?: string;
  datePublished: Date;
  scrapped?: boolean;
  description?: string;
}

interface UpdateFeedDto {
  title?: string;
  link?: string;
  author?: string;
  image?: string;
  datePublished?: Date;
}

interface GetFeedDto {
  id: string;
}

export type { CreateFeedDto, UpdateFeedDto, GetFeedDto };
