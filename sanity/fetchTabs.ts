import { sanityClient } from "./sanityClient";

export const fetchTabs = async (): Promise<TabItem[]> => {
  const tabs = await sanityClient.fetch(
    '*[_type == "tab" && !(_id in path("drafts.**")) ]{name, slug, order, "categories": *[_type=="category" && references(^._id)]{ name, slug }} | order(order asc)',
  );

  return mapToTabItem(tabs);
};

export interface SanityTabItem {
  name: string;
  categories: {
    name: string;
    slug: {
      current: string;
    };
  }[];
  slug: {
    current: string;
  };
}

export const mapToTabItem = (data: SanityTabItem[]): TabItem[] => {
  return data.map((tab) => {
    return {
      tabSlug: tab.slug.current,
      categories: tab.categories.map((category) => {
        return {
          slug: category.slug.current,
          name: category.name,
          path: `/category/${category.name}`,
          tabSlug: tab.slug.current,
          tabName: tab.name,
          tabPath: `/tab/${tab.name}`,
        };
      }),
      name: tab.name,
    };
  });
};

export interface TabItem {
  tabSlug: string;
  categories: CategoryItem[];
  name: string;
}

export interface CategoryItem {
  slug: string;
  name: string;
  path: string;
  tabSlug: string;
  tabName: string;
  tabPath: string;
}
