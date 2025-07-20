


export const translateKeys = (entity:string,object:object) => {
    const t =  translation[entity]
    const filteredObject = Object.fromEntries(Object.entries(object).filter(([key]) => t[key]))
    
    return Object.fromEntries(Object.entries(filteredObject).map(([key,value]) => [t[key],value]))
}


const translation: { [key: string]: { [key: string]: string } } = {
    characters: {
        height: "Altura",
        mass: "Peso",
        hair_color: "Color de pelo",
        skin_color: "Color de piel",
        eye_color: "Color de ojos",
        birth_year: "Año de nacimiento",
        gender: "Género",
    },
    planets: {
        diameter: "Diámetro",
        rotation_period: "Periodo de rotación",
        orbital_period: "Periodo orbital",
        gravity: "Gravedad",
        terrain: "Terreno",
        surface_water: "Agua superficial",
    },
    movies: {
        director: "Director",
        producer: "Productor",
        release_date: "Fecha de estreno",
        episode_id: "Número de episodio",
        opening_crawl: "Crawl de apertura",
    },
    ships: {
        model: "Modelo",
        manufacturer: "Fabricante",
        cost_in_credits: "Costo en créditos",
        length: "Longitud",
        max_atmosphering_speed: "Velocidad máxima",
        crew: "Tripulación",
        passengers: "Pasajeros",
        cargo_capacity: "Capacidad de carga",
        consumables: "Consumibles",
        hyperdrive_rating: "Rating de hiperimpulsor",
        MGLT: "MGLT",
        starship_class: "Clase de nave",
    }
}
