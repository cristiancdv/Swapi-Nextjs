"use client";
import Image from "next/image"

export default function CardImage({url,alt,width,height}:{url:string,alt:string,width:number,height:number}) {
    return (
        <div>
            <Image src={url} alt={alt} width={width} height={height} />
        </div>
    )
}