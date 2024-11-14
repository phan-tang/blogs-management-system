'use client'

import { useEffect, useState } from 'react';
import Loading from '../loading';
import Card from '../components/card/card';
import SearchField from '../components/searchField/searchField';
import CustomPagination from '../components/customPagination/customPagination';
import { BlogItem } from '../models/blogModel';
import { getBlogs } from '../services/blogService';
import { toastError } from '../lib/toastify';
import { resizeGridRow } from '../lib/plugins';
import { pageSize } from '../lib/constants';
import styles from './categories.module.scss';

export default function Categories() {
    const [cardItems, setCardItems] = useState<BlogItem[]>([]);
    const [blogsData, setBlogsData] = useState<BlogItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const resizeAllItemsGridRow = () => {
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
        setLoading(true);
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
                setBlogsData(data);
                setCardItems(data.slice(0, pageSize));
                setLoading(false);
            }
        ).catch((err) => {
            toastError('Failed to load blogs data')
        });
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {loading && <Loading />}
            {!loading && <section>
                <div className='page-header'>
                    <div className="row">
                        <div className="col-12">
                            <h1>Categories</h1>
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