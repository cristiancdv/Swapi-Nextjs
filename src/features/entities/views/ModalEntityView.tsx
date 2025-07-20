import ErrorMessage from "@/components/ui/ErrorMessage";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ModalComponent from "@/components/ui/Modal";
import { useEntityOneData } from "@/hooks/UseEntityData";
import { SWRResponse } from "swr";
import Card from "@/components/ui/Card";
import { useEffect, useState } from "react";
import { translateKeys } from "@/utils/translateKeys";

export default function ModalEntityView({entity,selectedId, isOpen,onOpenChange}:{entity:string,selectedId:number, isOpen:boolean,onOpenChange:() => void}) {
    const {data,error,isValidating,isLoading,mutate} : SWRResponse = useEntityOneData(entity,selectedId);
    const [title,setTitle] = useState<string>('');
    const [transformedData,setTransformedData] = useState<string[]>([]);
    const [image,setImage] = useState<string>('');
    useEffect(() => {
        if(data){
            setTitle(data.title || data.name ||  '');
          const setData =translateKeys(entity,data)
           console.log(setData)
            const keys = Object.keys(setData)
            const values = Object.values(setData).map((value) => value.toString())
            setTransformedData(keys.map((key,index) => ( `${key}: ${values[index]}`)))
            setImage(entity+'/'+data.id+'.jpeg')
        }
    }, [data,entity]);
    return (
        <>
     
        
        <ModalComponent title={title} isOpen={isOpen} onOpenChange={onOpenChange}>
        {(isLoading || (isValidating && !data)) && (
            <div className="flex flex-col items-center mt-[10vh]  h-[10vh] justify-center w-full  max-h-screen">
            <LoadingSpinner />
            </div>
        )}
        {error && <ErrorMessage message="Error al cargar datos" onRetry={() => mutate( [] as unknown as {results: {id:string,title:string,description:string,image:string}[],count:number})} />}
        {data && (
            <div className="flex flex-col gap-2 h-full w-full">
                <div className="w-full h-full bg-gray-600 rounded-lg p-4">
                 <Card title={data.title} description={transformedData} image={image} />
                </div>
            </div>
            )}
        </ModalComponent>
   
        </>
    );
}