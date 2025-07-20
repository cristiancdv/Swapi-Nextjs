"use client";
import Card from "@/components/ui/Card";

export default function CardsView({
    data,
    setSelectedId,
    onOpen
}: { 
    data: {
        id:string,
        name?:string,
        title?:string,
        description:string,
        }[],
    setSelectedId: (id:number) => void,
    onOpen:() => void
}) {

    const handleClick = (id:number) => {
        if(setSelectedId && onOpen){
        setSelectedId(id);
        onOpen();
        }
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full h-full">
            {data?.map((item: {id:string,name?:string,title?:string,description:string}, idx: number) => (
                  <div key={idx} className="w-full bg-gray-800 rounded-lg p-4"  onClick={() => handleClick(parseInt(item.id))}>
                <Card  title={item.title || item.name || ''} description={item.description.split("\n")} />
                </div>
            ))}
        </div>
    );
}