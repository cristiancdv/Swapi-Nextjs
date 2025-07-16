"use client";
import { 
    TableBody,
    TableCell,
    TableColumn,
    Table as TableComponent,
    TableHeader,
    TableRow
     } from "@heroui/react";

export default function Table({ data ,entity }: { data: {title:string,description:string}[], entity: string }) {
    return (
        <TableComponent aria-label={`table-${entity}`}>
            <TableHeader>
                {Object.keys(data[0]).map((key) => (
                    <TableColumn key={key}>{key}</TableColumn>
                ))}
            </TableHeader>
            <TableBody>
                {data.map((item: {title:string,description:string}) => (
                    <TableRow key={item.title}>
                        {Object.values(item).map((value: string) => (
                            <TableCell key={value}>{value}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </TableComponent>
    );
}