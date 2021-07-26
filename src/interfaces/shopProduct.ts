export class ShopProduct {
  id: string;
  name: string;
  description: string;
  taxedPrice: number;
}

export interface GetPaginatedListOfProductsResponse {
  items: ShopProduct[];
  pages: number;
}
