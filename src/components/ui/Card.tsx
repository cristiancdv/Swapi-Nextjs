"use client";
import CardImage from "./CardImage";

export default function Card({title,description,image}:{title:string,description:string,image:string}) {
    return (
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
            <CardImage url={image} alt={title} width={100} height={100} />
        </div>
    )
}