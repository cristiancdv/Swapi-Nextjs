"use client";
// import CardImage from "./CardImage";

export default function Card({title,description/*,image*/}:{title:string,description:string/*,image:string*/}) {
    return (
        <div className="w-full bg-gray-800 rounded-lg p-4">
            <h1 className="text-white text-2xl font-bold">{title}</h1>
            {description.split('\n').map((line, index) => (
                <p className="text-white text-sm" key={index}>{line}</p>
            ))}
            {/* <CardImage url={image} alt={title} width={100} height={100} /> */}
        </div>
    )
}