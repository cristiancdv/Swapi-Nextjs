import { Button } from "@heroui/react";

export default function PaginationData({ page, setPage, count }: { page: number, setPage: (page: number) => void, count: number }) {

    const totalPages = Math.ceil(count / 10);
    return (
        <div className="flex gap-2 items-center justify-center">
            {page>1 && <Button className="rounded-full bg-gradient-to-b from-gray-600 to-gray-800" onPress={() => setPage(page - 1)}>Anterior</Button>}
            <span className="mx-2 text-white text-sm">Página {page} de {totalPages}</span>
            {page<totalPages && <Button className="rounded-full bg-gradient-to-b from-gray-600 to-gray-800" onPress={() => setPage(page + 1)}>Siguiente </Button>}
        </div>
    )
}