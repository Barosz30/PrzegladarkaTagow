import { Order } from "./Order";

export type SettingsProp = {
    tagsPerPage: number;
    setTagsPerPage: React.Dispatch<React.SetStateAction<number>>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    order: Order;
    setOrder: React.Dispatch<React.SetStateAction<Order>>;
  };