import React, { useEffect, useState, useRef, RefObject } from "react";
import Slider from "react-slick";
import styles from '@styles/modules/components/primitives/Carousel.module.scss';
import { Button } from "./Button";

export type CarouselProps = {
    sliderRef: React.RefObject<Slider>;
    className?: string;
    linkedRef?: React.RefObject<Slider>;
    arrows?: boolean;
    draggable?: boolean;
    fade?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({sliderRef, children, className, linkedRef, arrows, draggable, fade}) => {
    const [slideNumber, setSlideNumber] = useState<number>(0);
    const [linkedSlider, setLinkedSlider] = useState<Slider>();
    const settings = {
        draggable: draggable ? true : false,
        swipe: draggable ? true : false,
        arrows: false,
        infinite: true,
        speed: fade ? 0 : 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        easing: "ease-in-out",
        accessibility: false,
        beforeChange: (current: number, next: number) => setSlideNumber(next)
    };

    useEffect(() => {
        if (linkedRef && linkedRef.current) setLinkedSlider(linkedRef.current);
    }, [linkedRef]);

    const onClickPrevious = () => {
        if (sliderRef && sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    }

    const onClickNext = () => {
        if (sliderRef && sliderRef.current) {
            sliderRef.current.slickNext();
        }
    }

    return <div className={(className ? className + " " : "") + styles["carousel"] + " " + styles["carousel--arrows-" + (arrows ? "true" : "false")]}>
        { arrows &&
            <div className={styles["carousel__previous"]}>
                <Button icon={{ type: "fontawesome", name: "caret-left", position: "center"}} onClick={onClickPrevious} />
            </div>
        }
        <Slider ref={sliderRef} className={styles["carousel__content"]} asNavFor={linkedSlider} {...settings}>
            { React.Children.map(children, (child, index) => {
                return <div className={[styles["carousel__slide"], slideNumber === index ? styles["carousel__slide--active"] : ""].filter(Boolean).join(" ")}>
                    { child }
                </div>
            }) }
        </Slider>
        { arrows &&
            <div className={styles["carousel__next"]}>
                <Button icon={{ type: "fontawesome", name: "caret-right", position: "center"}} onClick={onClickNext} />
            </div>
        }
  </div>
}