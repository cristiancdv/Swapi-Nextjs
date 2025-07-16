"use client";
import Card from "@/components/ui/Card";

export default function CardsView({ data }: { data: {title:string,description:string,image:string}[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.map((item: {title:string,description:string,image:string}, idx: number) => (
                <Card key={idx} title={item.title} description={item.description} image={item.image} />
            ))}
        </div>
    );
}