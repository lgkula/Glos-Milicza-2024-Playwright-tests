export const buildArticlePath = (articleSlug: string) => {
    return `/article/${articleSlug}`;
};

export const buildAuthorPath = (articleSlug: string) => {
    return `/author/${articleSlug}`;
};

export const buildCategoryPath = (categorySlug: string) => {
    return `/category/${categorySlug}`;
};

export const buildTabPath = (tabSlug: string) => {
    return `/tab/${tabSlug}`;
};

export const buildPhotoPath = (photoPath: string) => {
    return `${photoPath}`;
};

export const aboutPagePath = `/about`;
export const rulesPagePath = `/rules`;

export const buildImageUrl = (ref: string) => {
    return `https://cdn.sanity.io/images/${
        process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    }/production/${ref
        .slice(6)
        .replace('-webp', '.webp')
        .replace('-jpeg', '.jpeg')
        .replace('-png', '.png')
        .replace('-jpg', '.jpg')}`;
};
