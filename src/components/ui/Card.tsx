"use client";
import CardImage from "./CardImage";

export default function Card({
    title,
    description,
    image
}:{
    title:string,
    description:string[],
    image?:string,
}) {
  
  return (
      <div className="relative flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-2">
        <h1 className="text-white text-2xl font-bold">{title}</h1>
        {description.map((line, index) => (
            <p className="text-white text-sm" key={index}>{line}</p>
        ))}
        </div>
        {image && <CardImage url={image} alt={`${title} image`} width={100}  />}
     </div> 
  )
}