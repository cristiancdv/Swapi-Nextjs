import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    ModalFooter,
  } from "@heroui/react";


  export default function ModalComponent({children,title,isOpen,onOpenChange}:{children:React.ReactNode,title:string,isOpen:boolean,onOpenChange:() => void}) {
  
    
     return (
        <Modal classNames={{
          closeButton: "hidden",
          wrapper: "fixed inset-0 flex items-center md:left-[36%] left-[10%] w-[80%] md:w[30%] justify-center",
          header: "flex flex-col gap-2",
          body: "flex flex-col gap-2",
          base: "relative"
          }} className=" rounded-lg bg-gray-800"  isOpen={isOpen} onOpenChange={onOpenChange}  >
            <ModalContent >
             {(onClose)=>(
                <>
                <ModalHeader >
                    <h1 className="text-2xl font-bold">{title}</h1>
                </ModalHeader>
                <ModalBody>{children}</ModalBody>
                <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                    </Button>
                    </ModalFooter>
                </>
             )}
            </ModalContent>
        </Modal>
    ) 
  }