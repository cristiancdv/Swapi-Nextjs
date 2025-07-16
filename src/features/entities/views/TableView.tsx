"use client";
import Table from "@/components/ui/Table";

export default function TableView({ data ,entity}: { data: {title:string,description:string,image:string}[], entity: string }) {
    return (
        <Table data={data} entity={entity} />
    );
}

