import React from "react";
import {ImageList, ImageListItem} from "@mui/material";
import air_force from "../images/air_force.jpg";
import boost from "../images/boost_350.jpg";
import dunk from "../images/dunk.jpg";
import jordan1 from "../images/jordan1.jpg";
import jordan4 from "../images/jordan4.jpg";
import nb from "../images/nb.jpg";
import yezze700 from "../images/yezze700.jpg";
import sweetshot from "../images/sweetshot.jpg";
import {Navigate} from "react-router-dom";


function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
            size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
}




export function Start_Page() {
        // const imageClick = () => {
        //     return <Redirect/>
        // }

        return (
        <>
            <div className="bg-gray-300 w-full mr-2 overflow-hidden">
                <div className="mt-2 inline-block w-fit">
                    <ImageList
                        sx={{width: 360, height: 800}}
                        variant="quilted"
                        cols={4}
                        rowHeight={121}
                        className="oveflow-hiden"
                    >
                        {itemData.map((item) => (
                            <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1} sx={{m:1}}>
                                <div className="text-center font-bold text-sm">{item.title}</div>
                                <img
                                    {...srcset(item.img, 121, item.rows, item.cols)}
                                    alt={item.title}
                                    loading="lazy"
                                    onClick={() => {window.location.href = "/product";}}/>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            </div>
        </>
    )
}

const itemData = [
    {
        img: air_force,
        title: 'air_force',
        rows: 2,
        cols: 2,
    },
    {
        img: sweetshot,
        title: 'sweetshot',
        rows: 2,
        cols: 2,
    },
    {
        img: boost,
        title: 'boost',
        rows: 2,
        cols: 2,
    },
    {
        img: dunk,
        title: 'dunk',
        rows: 2,
        cols: 2,
    },
    {
        img: jordan1,
        title: 'jordan1',
        rows: 2,
        cols: 2,
    },
    {
        img: jordan4,
        title: 'jordan4',
        rows: 2,
        cols: 2,
    },
    {
        img: nb,
        title: 'nb',
        rows: 2,
        cols: 2,
    },
    {
        img: yezze700,
        title: 'yezze700',
        rows: 2,
        cols: 2,
    }
];