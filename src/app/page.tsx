'use client'
import styles from '../styles/home.module.css'

export default function Home() {
  return (
    <div className={`relativ ${styles.perspective} h-full overflow-hidden text-yellow-400`}>
    <div className={`relative z-10  ${styles['preserve-3d']} flex items-end justify-center pb-12`}>
    <div className={`w-[60%] ${styles['animate-crawl']} text-justify space-y-6 text-lg leading-8`}>
        <h1 className="text-center text-3xl font-bold mb-4">Hola, soy Cristian Damian Vazquez</h1>
        <p>En tiempos de bugs y deadlines, los desarrolladores buscan balancear el caos con buenas prácticas.</p>
        <p>Como líder técnico, mi misión es defender la arquitectura limpia, mentorizar a los jóvenes padawan y
            optimizar los procesos del imperio tecnológico.</p>
        <p>Donde otros ven errores, yo veo oportunidades de refactorización.</p>
        <p>Y aunque el lado oscuro del código espagueti es tentador, la disciplina Jedi me guía.</p>
        <p>Si estás viendo esta intro, es porque estás listo para unirte a la rebelión del código elegante !!.</p>
        <p>Soy un TL Jedi con más de 3 años de experiencia en el rubro del desarrollo.</p>
        <p>Trabajo guiado por los principios del TDD y el clean-code, siempre con la Fuerza como aliada.</p>
        <p>Vivo junto a mi padawan Quiz, una aprendiz sensible a la Fuerza con gran potencial.</p>
        <p>Nos acompañan nuestros fieles robogatitos: K3R0, G414, M1N0S y C0SM0S, expertos en vigilancia y ronroneo
            galáctico.</p>
        <p>Esta página fue construida en honor a la galaxia, el buen diseño y el código limpio.</p>
        <p>Espero que la disfruten... ¡y que la Fuerza los acompañe!</p>
    </div>
</div>
</div>
  );
}
