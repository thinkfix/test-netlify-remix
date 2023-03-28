import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

const defaultSlideClasses = "";

export default function SlideButton({direction}) {
    const swiper = useSwiper();

    if (direction === "next") {
        return <button aria-label="Next" onClick={() => swiper.slideNext()}><ArrowRightIcon className="h-6 w-6 mx-4" /></button>
    } else {
        return <button aria-label="Previous" onClick={() => swiper.slidePrev()}><ArrowLeftIcon className="h-6 w-6 mx-4" /></button>
    }
}

export const Carousel = ({slideClasses = "", children, title, ...options }) => {
    const defaultOptions = {
        spaceBetween: 32,
        slidesPerView: 1.5,
        slidesOffsetBefore: 32,
        slidesOffsetAfter: 32,
        breakpoints: {
            1024: {
                slidesPerView: 2.5,
                slidesOffsetBefore: 56,
                slidesOffsetAfter: 56,
            }
        }
    }

    options = {...defaultOptions, ...options}

    return (
        <div className={"py-16 lg:py-24"}>
            <Swiper {...options}
                    className={"flex flex-wrap pb-16 lg:pb-24"}
            >
                <div className={"-order-1 px-8 lg:px-14 flex justify-between w-full pb-4"}>
                    <h3 className={"text-lg lg:text-2xl"}>{title}</h3>
                    <div className={"-mx-4"}>
                        <SlideButton direction={"prev"} />
                        <SlideButton aria-label="Next" direction={"next"} />
                    </div>
                </div>
                { children.map((item, id) => {
                    return (
                        <SwiperSlide className={defaultSlideClasses + slideClasses} key={id}>
                            {item}
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}