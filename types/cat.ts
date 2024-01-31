export interface Cat {
  breeds: any[];
  categories: CatCategory[];
  height: number;
  id: string;
  url: string;
  width: number;
  isLiked?: boolean;
}

interface CatCategory {
  id: number;
  name: string;
}
