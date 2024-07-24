export interface IFeed {
  title: string;
  link: string;
  datePublished: Date;
  image?: string;
  author?: string;
  createdAt?: Date;
  updatedAt?: Date;
  scrapped?: boolean;
  isDeleted?: boolean;
  description?: string;
}
