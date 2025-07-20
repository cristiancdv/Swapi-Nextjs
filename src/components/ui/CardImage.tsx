"use client";
import Image from "next/image"
import { useEffect, useState } from "react"

export default function CardImage({url,alt,width}:{url:string,alt:string,width:number}) {
   const [img,setImg] = useState<string | null>(null)
    useEffect(() => {
        const fetchImg = async () => {
          let img = null
            try{
            img = await import(`@/assets/${url}`)
            }catch(error){
                console.log(error)
             img = await import(`@/assets/${url}/0.jpeg`)
            }
            if(img.default){
                setImg(img.default as string)

            }
            else{
                setImg(null)
            }
        }
        fetchImg()
   },[url])
    return (
        <>
          {img && <Image src={img} alt={alt} width={width}  />}
        </>
    )
}