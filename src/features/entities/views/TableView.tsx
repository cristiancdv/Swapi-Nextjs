"use client";
import Table from "@/components/ui/Table";

export default function TableView({ data ,entity,setSelectedId,onOpen }: { data: {id:string,name?:string, title?:string,description:string,image:string}[], entity: string,setSelectedId: (id:number) => void,onOpen:() => void }) {
    return (
        <Table setSelectedId={setSelectedId} onOpen={onOpen} data={data} entity={entity} />
    );
}

