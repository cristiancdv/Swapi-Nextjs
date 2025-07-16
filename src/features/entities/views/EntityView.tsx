"use client";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useEntityAllData } from "@/hooks/UseEntityData";
import { useViewMode } from "@/hooks/UseViewMode";
import ErrorMessage from "@/components/ui/ErrorMessage";
import CardsView from "./CardsView";
import TableView from "./TableView";
import SwitchButton from "@/components/ui/SwitchButton";

type EntityType = 'characters' | 'films' | 'starships' | 'planets';

export default function EntityView({ entity }: { entity: EntityType }) {
    const { data, error, isLoading, mutate } = useEntityAllData(entity);
    const { viewMode, toggleViewMode } = useViewMode();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage message="Error al cargar datos" onRetry={mutate} />;
  }
  if (!data) {
    return null
  };

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <SwitchButton viewMode={viewMode} toggleViewMode={toggleViewMode} />
      </div>

      {viewMode === 'card' ? (
        <CardsView data={data as {title:string,description:string,image:string}[]}  />
      ) : (
        <TableView data={data as {title:string,description:string,image:string}[]} entity={entity} />
      )}
    </div>
  );
}
