import { Tag } from "./Tag";

export type TagsResponse = {
  items: Tag[];
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
};