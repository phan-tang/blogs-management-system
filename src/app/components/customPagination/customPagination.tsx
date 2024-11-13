'use client'

import { Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import { displayItems } from "@/app/lib/constants";
import './customPagination.scss';

export default function CustomPagination({ numberOfPages, handleChangePage }: { numberOfPages: number, handleChangePage: Function }) {
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [paginationItems, setPaginationItems] = useState<number[]>([]);

    const generatePaginationItems = (numberOfItems: number, startValue: number): number[] => {
        let items: number[] = Array(numberOfItems).fill(0);
        return items.map((item, index) => {
            return startValue + index;
        })
    }

    const changePage = (index: number): void => {
        handleChangePage(index);
        setPageIndex(index);
    }

    const getPaginationItems = (): number[] => {
        if (numberOfPages <= displayItems) {
            return generatePaginationItems(numberOfPages, 1);
        }
        let floorDisplayItemsDivide2 = Math.floor(displayItems / 2);
        let ceilDisplayItemsDivide2 = Math.ceil(displayItems / 2);
        if (pageIndex > floorDisplayItemsDivide2 && pageIndex < (numberOfPages - floorDisplayItemsDivide2)) {
            return [1, -1, ...generatePaginationItems(ceilDisplayItemsDivide2, pageIndex - Math.floor(floorDisplayItemsDivide2 / 2)), -1, numberOfPages]
        }
        let numberOfItems: number = ceilDisplayItemsDivide2 + Math.floor(floorDisplayItemsDivide2 / 2);
        if (pageIndex >= (numberOfPages - floorDisplayItemsDivide2)) {
            return [1, -1, ...generatePaginationItems(numberOfItems, numberOfPages - (numberOfItems - 1))]
        }
        return [...generatePaginationItems(numberOfItems, 1), -1, numberOfPages];
    }

    useEffect(() => {
        let items = getPaginationItems();
        setPaginationItems(items);
    }, [pageIndex]);

    return (
        <>
            {numberOfPages > 1 && <div className="custom-pagination">
                <Pagination>
                    <Pagination.First disabled={pageIndex === 1} onClick={() => changePage(1)} />
                    <Pagination.Prev disabled={pageIndex === 1} onClick={() => changePage(pageIndex - 1)} />
                    {paginationItems.map((item, itemIndex) => {
                        return (
                            <Pagination.Item
                                active={item === pageIndex}
                                disabled={item < 0}
                                onClick={() => changePage(item)}
                                key={`pagination-item-${itemIndex}`}>{item > 0 ? item : '...'}</Pagination.Item>
                        );
                    })}
                    <Pagination.Next disabled={pageIndex === numberOfPages} onClick={() => changePage(pageIndex + 1)} />
                    <Pagination.Last disabled={pageIndex === numberOfPages} onClick={() => changePage(numberOfPages)} />
                </Pagination>
            </div>}
        </>
    );
}