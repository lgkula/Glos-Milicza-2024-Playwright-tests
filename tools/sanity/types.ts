export interface ArticleSummaryItem {
    author: AuthorItem;
    category: CategoryItem;
    createdOn: string;
    comments: number;
    id: string;
    lead: string;
    likes: number;
    dislikes: number;
    views: number;
    path: string;
    photo: PhotoItem;
    statistics: StatisticsItem;
    title: string;
}

export interface AuthorItem {
    id: string;
    name: string;
    path: string;
}

export interface CategoryItem {
    slug: string;
    name: string;
    path: string;
    tabSlug: string;
    tabName: string;
    tabPath: string;
}

export interface PhotoItem {
    author?: AuthorItem;
    alt: string;
    description: string;
    id?: number;
    isMain?: boolean;
    path: string;
}

export interface StatisticsItem {
    comments: number;
    dislikes: number;
    likes: number;
    views: number;
}