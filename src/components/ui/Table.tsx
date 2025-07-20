"use client";
import { 
    TableBody,
    TableCell,
    TableColumn,
    Table as TableComponent,
    TableHeader,
    TableRow
     } from "@heroui/react";

export default function Table({ data ,entity,setSelectedId,onOpen }: { data: {id:string,name?:string,title?:string,description:string,image:string}[], entity: string,setSelectedId: (id:number) => void,onOpen:() => void }) {
    const dataTable = data.filter((item) => item.name || item.title);
    
    // Función para parsear la descripción y extraer campos
    const parseDescription = (description: string) => {
        const fields: { [key: string]: string } = {};
        
        // Dividir por líneas y procesar cada una
        const lines = description.split('\n').filter(line => line.trim());
        
        lines.forEach(line => {
            if (line.includes(':')) {
                const [key, ...valueParts] = line.split(':');
                const value = valueParts.join(':').trim();
                
                // Limpiar la clave
                const cleanKey = key.trim()
                    .replace(/^-\s*/, '') // Quitar guiones iniciales
                    .replace(/\s+/g, '_') // Espacios a guiones bajos
                    .toLowerCase();
                
                if (cleanKey && value) {
                    fields[cleanKey] = value;
                }
            }
        });
        
        return fields;
    };
    
    // Procesar los datos para extraer campos de la descripción
    const processedData = dataTable.map(item => {
        const parsedFields = parseDescription(item.description);
        return {
            id: item.id,
            // Para películas, usar solo título, para otros usar nombre
            nombre: entity === 'movies' ? (item.title || '') : (item.name || item.title || ''),
            ...parsedFields
        };
    });
    
    // Obtener todas las columnas únicas
    const allColumns = new Set<string>();
    processedData.forEach(item => {
        Object.keys(item).forEach(key => allColumns.add(key));
    });
    
    const visibleColumns = Array.from(allColumns).filter(col => col !== 'image');
    
    // Traducir nombres de columnas
    const columnNames: { [key: string]: string } = {
        id: 'ID',
        nombre: 'NOMBRE',
        altura: 'ALTURA',
        peso: 'PESO',
        episodio: 'EPISODIO',
        director: 'DIRECTOR',
        productor: 'PRODUCTOR',
        pelicula: 'PELÍCULA',
        titulo: 'TÍTULO',
        diametro: 'DIÁMETRO',
        periodo_de_rotacion: 'ROTACIÓN',
        periodo_orbital: 'ÓRBITA',
        agua_superficial: 'AGUA',
        poblacion: 'POBLACIÓN',
        clima: 'CLIMA',
        terreno: 'TERRENO',
        color_de_pelo: 'COLOR DE PELO',
        color_de_piel: 'COLOR DE PIEL',
        color_de_ojos: 'COLOR DE OJOS',
        año_de_nacimiento: 'AÑO DE NACIMIENTO',
        género: 'GÉNERO'
    };
    const handleClick = (id:string) => {
        setSelectedId(parseInt(id));
        onOpen();
    }
    return (
        <div className="w-full overflow-x-auto p-4">
            <TableComponent 
                className="w-full"
                aria-label={`table-${entity}`}
                classNames={{
                    wrapper: "min-h-[400px] shadow-xl rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50",
                    th: "bg-gray-700 border-b border-gray-700/30 text-white font-bold text-sm uppercase tracking-wider py-4 px-4",
                    td: "text-gray-100 border-b border-gray-700/30 py-3 px-4",
                    tbody: "divide-y divide-gray-700/30",
                    tr: "hover:bg-gray-700/30 transition-colors duration-200"
                }}
            >
                <TableHeader>
                    {visibleColumns.map((key) => (
                        <TableColumn key={key} className="text-center">
                            <span>
                                {columnNames[key] || key.replace(/_/g, ' ').toUpperCase()}
                            </span>
                        </TableColumn>
                    ))}
                </TableHeader>
                <TableBody>
                    {processedData.map((item: { [key: string]: string }, index) => (
                        <TableRow key={item.id} className={index % 2 === 0 ? "bg-gray-800/20" : "bg-gray-900/20"} onClick={() => handleClick(item.id)}>
                            {visibleColumns.map((key) => (
                                <TableCell key={`${item.id}-${key}`} className="text-center hover:cursor-pointer">
                                    {key === 'id' ? (
                                        <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-mono">
                                            #{item[key]}
                                        </span>
                                    ) : key === 'nombre' ? (
                                        <span className="font-bold text-yellow-400">
                                            {item[key] || '-'}
                                        </span>
                                    ) : (
                                        <span className="text-gray-300">
                                            {item[key] || '-'}
                                        </span>
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </TableComponent>
        </div>
    );
}