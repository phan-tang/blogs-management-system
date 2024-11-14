'use client'

import { useEffect, useState, use } from 'react';

import Loading from '../../loading';
import Card from '../../components/card/card';
import CustomPagination from '@/app/components/customPagination/customPagination';
import SearchField from '@/app/components/searchField/searchField';
import { BlogItem } from '../../models/blogModel';
import { getBlogs } from '@/app/services/blogService';
import { toastError } from '@/app/lib/toastify';
import { resizeGridRow } from '../../lib/plugins';
import { categories, pageSize } from '@/app/lib/constants';
import styles from './../categories.module.scss';

export default function Category({ params }: { params: Promise<{ slug: string }> }) {
    const [cardItems, setCardItems] = useState<BlogItem[]>([]);
    const [blogsData, setBlogsData] = useState<BlogItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const category = categories.filter(item => item.toLowerCase() === use(params).slug)[0];

    const resizeAllItemsGridRow = (): void => {
        cardItems?.forEach((item, index) => {
            let id: string = `categories-card-${index}`;
            resizeGridRow(id);
        })
    }

    const handleChangePage = (pageIndex: number): void => {
        setLoading(true);
        setCardItems(blogsData.slice(pageSize * (pageIndex - 1), pageSize * pageIndex));
        setLoading(false);
        window.scrollTo(0, 0);
    }

    const handleSearch = (searchValue: string) => {
        getBlogs(searchValue).then(
            (data) => {
                setBlogsData(data);
                setCardItems(data.slice(0, pageSize));
                setLoading(false);
            }
        ).catch((err) => {
            toastError('Failed to load blogs data')
        });
    }

    useEffect(() => {
        getBlogs().then(
            (data) => {
                let categoryBlogsData = data.filter((item) => item.catLinks.includes(category));
                setBlogsData(categoryBlogsData);
                setCardItems(categoryBlogsData.slice(0, pageSize));
                setLoading(false);
            }
        ).catch((err) => {
            toastError('Failed to load blogs data');
        }
        );
    }, []);

    return (
        <>
            {loading && <Loading />}
            {!loading && <section>
                <div className='page-header'>
                    <div className="row">
                        <div className="col-12">
                            <h1>Category: {category}</h1>
                            <div className={styles.search}>
                                <SearchField handleSearch={handleSearch} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'with-top-sep ' + styles.categories}>
                    <div className="masonry" onLoad={() => { resizeAllItemsGridRow() }}>
                        {cardItems.map((item, index) => {
                            return (
                                <Card cardItem={item} id={`categories-card-${index}`} key={`categories-card-${index}`} />
                            );
                        })}
                    </div>
                </div>
                <CustomPagination numberOfPages={Math.ceil(blogsData.length / pageSize)} handleChangePage={handleChangePage} />
            </section>}
        </>
    );
}