'use client'

import { useEffect, useState } from "react";

import { getBlogs } from "./services/blogService";
import { BlogItem } from "./models/blogModel";
import PictureCarousel from "./components/pictureCarousel/pictureCarousel";
import CustomPagination from "./components/customPagination/customPagination";
import Card from "./components/card/card";
import { resizeGridRow } from "./lib/plugins";
import { toastError } from "./lib/toastify";
import styles from "./page.module.scss";
import Loading from "./loading";
import { pageSize } from "./lib/constants";

export default function Home() {
  const carouselId = `home-carousel`;
  const [cardItems, setCardItems] = useState<BlogItem[]>([]);
  const [blogsData, setBlogsData] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const resizeAllItemsGridRow = () => {
    cardItems.forEach((item, index) => {
      let id: string = `home-card-${index}`;
      resizeGridRow(id);
    })
  }

  const handleChangePage = (pageIndex: number): void => {
    setLoading(true);
    setCardItems(blogsData.slice(pageSize * (pageIndex - 1), pageSize * pageIndex));
    setLoading(false);
    window.scrollTo(0, 0);
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
      {!loading && <section className={styles.home}>
        <div className={styles.homeContent}>
          <div className="row">
            <div className="masonry" onLoad={() => { resizeAllItemsGridRow() }}>
              <PictureCarousel carouselId={carouselId} />
              {cardItems.map((item, index) => {
                return (
                  <Card cardItem={item} id={`home-card-${index}`} key={`home-card-${index}`} />
                );
              })}
            </div>
          </div>
          <CustomPagination numberOfPages={Math.ceil(blogsData.length / pageSize)} handleChangePage={handleChangePage} />
        </div>
      </section>}
    </>
  );
}
