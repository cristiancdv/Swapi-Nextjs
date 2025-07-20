"use client";
import Card from "@/components/ui/Card";

export default function CardsView({ data/*,entity*/ }: { data: {id:string,name?:string,title?:string,description:string,image:string}[],entity?:string }) {
    //const endpoint = `/${entity}/`;
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full h-full">
            {data?.map((item: {id:string,name?:string,title?:string,description:string,image:string}, idx: number) => (
                <Card key={idx} title={item.title || item.name || ''} description={item.description} /*image={endpoint+item.id+'.jpg'}*/ />
            ))}
        </div>
    );
}