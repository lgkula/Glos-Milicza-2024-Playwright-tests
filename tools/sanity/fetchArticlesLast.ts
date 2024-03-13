import { buildArticlePath, buildCategoryPath, buildImageUrl, buildTabPath } from "./builders";
import { sanityClient } from "./sanityClient";
import { ArticleSummaryItem } from "./types";

interface FetchArticlesLastParams {
    categorySlug?: string;
    ignorePinnedPost?: boolean;
    limit?: number;
    page?: number;
    tabSlug?: string;
}

export const fetchArticlesLast = async ({
    categorySlug,
    ignorePinnedPost = false,
    limit = 10,
    page = 1,
    tabSlug,
}: FetchArticlesLastParams): Promise<ArticleSummaryItem[]> => {
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    const articles = await sanityClient.fetch(
        `*[_type == "post" && !(_id in path('drafts.**')) && (publishedAt <= now()) ${
            categorySlug ? `&& category->slug.current == "${categorySlug}"` : ''
        } ${tabSlug ? `&& category->tab->slug.current == "${tabSlug}"` : ''} ${
            ignorePinnedPost
                ? `&& !(_id in *[_type=="pinnedPost"].post._ref)`
                : ''
        }
  ]{ _id, title, likes, dislikes, "comments": count(*[_type == "comment" && references(^._id)]), views, category->{ title, slug, tab->{title, slug }}, author->{name, slug},  lead, publishedAt, body, mainImage, slug} | order(publishedAt desc) [${start}..${end}]`,
    );

    return mapDataToArticleSummaryItems(articles);
};

export interface SanityArticleSummaryItem {
    author: {
        name: string;
        slug: {
            current: string;
        };
    };
    body: any;
    category: {
        name: string;
        slug: {
            current: string;
        };
        tab: {
            name: string;
            slug: {
                current: string;
            };
        };
    };
    lead: string;
    likes: number;
    dislikes: number;
    comments: number;
    views: number;
    mainImage: {
        asset: {
            _ref: string;
        };
        alt: string;
        description: string;
    };
    publishedAt: Date;
    slug: {
        current: string;
    };
    title: string;
}

export const mapDataToArticleSummaryItems = (
    data: SanityArticleSummaryItem[],
): ArticleSummaryItem[] => {
    return data.map((post) => {
        return {
            author: {
                id: post.author.slug.current,
                name: post.author.name,
                path: post.author.slug.current,
            },
            category: {
                slug: post.category.slug.current,
                name: post.category.name,
                path: buildCategoryPath(post.category.slug.current),
                tabSlug: post.category.tab.slug.current,
                tabName: post.category.tab.name,
                tabPath: buildTabPath(post.category.tab.slug.current),
            },
            createdOn: formatDateToString(post.publishedAt),
            id: post.slug.current,
            lead: post.lead,
            likes: post.likes,
            comments: post.comments,
            dislikes: post.dislikes,
            views: post.views,
            path: buildArticlePath(post.slug.current),
            statistics: {
                comments: 0,
                dislikes: 0,
                likes: 0,
                views: 0,
            },
            photo: {
                path: buildImageUrl(post.mainImage.asset._ref),
                description: post.mainImage.description,
                alt: post.mainImage.alt,
            },
            title: post.title,
        };
    });
};




export const formatDateToString = (date: Date): string => {
    const dateValue = new Date(date);

    if (!dateValue) return '';

    const day = String(dateValue.getDate()).padStart(2, '0');
    const month = String(dateValue.getMonth() + 1).padStart(2, '0');
    const year = String(dateValue.getFullYear());

    return `${day}.${month}.${year}`;
};
