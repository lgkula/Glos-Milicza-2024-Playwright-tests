/* eslint-disable playwright/expect-expect */
/* eslint-disable playwright/no-conditional-expect */
import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';
import { TemplatePage } from '../pages/template.page';
import { fetchArticlesLast } from '../tools/sanity/fetchArticlesLast';


    test('Nazwa testu z fixture', async () => {
        const articleList = await fetchArticlesLast({});

        console.log('articleList', articleList);
        
    });
