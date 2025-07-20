"use client";
import ErrorMessage from "@/components/ui/ErrorMessage";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import SwitchButton from "@/components/ui/SwitchButton";
import PaginationData from "@/components/ui/PaginationData";
import { useEntityAllData } from "@/hooks/UseEntityData";
import { useViewMode } from "@/hooks/UseViewMode";
import CardsView from "./CardsView";
import TableView from "./TableView";
import { useEffect, useState } from "react";
import { SWRResponse } from "swr";
import { useDisclosure } from "@heroui/react";
import ModalEntityView from "./ModalEntityView";

type EntityType = 'characters' | 'movies' | 'ships' | 'planets';

export default function EntityView({ entity }: { entity: EntityType }) {
  const [page, setPage] = useState(1);
    const { data, error, isLoading, mutate,isValidating }:SWRResponse<{results: {id:string,title:string,description:string,image:string}[],count:number}> = useEntityAllData(entity,page);
    const { viewMode, toggleViewMode, isHydrated } = useViewMode();
    const { onOpen,isOpen,onOpenChange} = useDisclosure();
    const [selectedId, setSelectedId] = useState<number >(0);

 useEffect(() => {
  console.log(selectedId);
 }, [selectedId]);

  return (
    <div className="p-6 min-h-full flex flex-col">
      <div className="flex justify-end items-center w-full mb-4">
        {isHydrated && <SwitchButton viewMode={viewMode} toggleViewMode={toggleViewMode} />}
      </div>

      {isOpen && <ModalEntityView   isOpen={isOpen} onOpenChange={onOpenChange} selectedId={selectedId} entity={entity} />}
      {(isLoading || (isValidating && !data?.results)) && (
        <div className="flex flex-col items-center h-[80vh] justify-center w-full  max-h-screen">
          <LoadingSpinner />
        </div>
      )}
      {error && <ErrorMessage message="Error al cargar datos" onRetry={() => mutate( [] as unknown as {results: {id:string,title:string,description:string,image:string}[],count:number})} />}
      {!isLoading && !error && data?.results && (
        <>
          <div className="flex-1">
            {viewMode === 'card' ? (
              <CardsView data={data?.results as {id:string, name?:string,title?:string,description:string,image:string}[]} setSelectedId={setSelectedId} onOpen={onOpen} />
            ) : (
              <TableView setSelectedId={setSelectedId} onOpen={onOpen} data={data?.results as {id:string, name?:string,title?:string,description:string,image:string}[]} entity={entity} />
            )}
          </div>
          {data.count > 10 && (
            <div className="flex justify-end items-center w-full mt-auto pt-6">
              <PaginationData page={page} setPage={setPage} count={data.count} />
            </div>
          )}
        </>
      )}
      
    </div>
    

  );
}

