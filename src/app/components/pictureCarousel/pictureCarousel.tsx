'use client'

import { Carousel } from "react-bootstrap";
import Link from "next/link";

import { pictures } from "@/app/lib/constants";

import styles from './pictureCarousel.module.scss';

export default function PictureCarousel({ carouselId }: { carouselId: string }) {

    return (
        <Carousel className={styles.pictureCarousel} id={carouselId}>
            {pictures.map((picture, index) => {
                return (
                    <Carousel.Item className={styles.carouselItem} style={{ backgroundImage: `url(${picture.sourceLink})` }} key={`carousel-item-${index}`}>
                        <div className={styles.overlay}></div>
                        <div className={styles.carouselItemContent}>
                            <div>
                                <p>{picture.content.join(', ')}</p>
                                <h3><Link href={picture.href}>{picture.titlle}</Link></h3>
                            </div>
                        </div>
                    </Carousel.Item>
                );
            })}
        </Carousel>
    );
}