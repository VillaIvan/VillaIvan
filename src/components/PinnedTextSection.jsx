import { useEffect, useRef } from "react";
import gsap from "gsap";
import Img1 from "@/components/images/Vela.webp";

export default function PinnedTextSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  const images = Array.from({ length: 11 }, (_, i) => ({
    id: i,
    src: Img1.src,
    sizeClass:
      i % 3 === 0 ? "w-[250px]" : i % 3 === 1 ? "w-[300px]" : "w-[400px]",
  }));

  const positionStyles = [
    "top-[13%] left-[64%] lg:top-[24%] lg:left-[3%]",
    "top-[19%] left-[-10%] lg:top-[23%] lg:left-[35%]",
    "top-[21%] left-[50%] lg:top-[18%] lg:left-[78%]",
    "top-[32%] left-[114%] lg:top-[35%] lg:left-[70%]",
    "top-[34%] left-[29%] lg:top-[38%] lg:left-[16%]",
    "top-[39%] left-[69%] lg:top-[45%] lg:right-[15%]",
    "top-[44%] left-[2%] lg:top-[38%] lg:left-[95%]",
    "top-[47%] left-[88%] lg:top-[50%] lg:left-[6%]",
    "top-[50%] left-[30%] lg:top-[56%] lg:left-[45%]",
    "top-[56%] left-[68%] lg:top-[51%] lg:left-[92%]",
    "top-[26%] left-[55%] lg:top-[62%] lg:left-[75%]",
  ];

  useEffect(() => {
    let ctx;
    const setupAnimation = async () => {
      const module = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(module.default);

      const isMobile = window.innerWidth < 768; // o el breakpoint que uses

      ctx = gsap.context(() => {
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: isMobile ? "bottom bottom" : "bottom-=22% bottom", // 👈 breakpoint relativo
            pin: textRef.current,
            scrub: true,
            markers: true,
          },
        });

        gsap.to(".bg-img", {
          y: 300,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
          stagger: 0.1,
        });
      }, sectionRef);
    };

    setupAnimation();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[450vh] bg-dark overflow-hidden z-10 mx-full"
    >
      {/* Texto fijo */}
      <div
        ref={textRef}
        className="h-screen flex items-center justify-center z-30 pointer-events-none"
      >
        <h2 className="text-white text-6xl md:text-[9rem] font-light text-center leading-tight px-4">
          Mis
          <br />
          Proyectos—
          <br />
          Favoritos
        </h2>
      </div>

      {/* Imágenes fondo no pinneadas, simplemente posicionadas */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {images.map((img, i) => (
          <img
            key={img.id}
            src={img.src}
            alt={`img-${i}`}
            className={`absolute w-[200px] lg:w-[400px] transform -translate-x-1/2 -translate-y-1/2 ${positionStyles[i]}`}
          />
        ))}
      </div>
      <div className="h-auto sm:h-[100svh] w-[85%] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-8 justify-items-center items-center pb-10 sm:pb-0">
        <div>
          <h3 className="text-3xl sm:text-6xl md:text-7xl text-white p-4 text-center">
            Villa Ivan es un estudio de diseño y desarrollo web con base en La
            Plata, Buenos Aires. Creamos identidades visuales sólidas,
            funcionales y estructuradas, donde cada detalle está pensado para
            destacar.
          </h3>
        </div>
        <div className="flex flex-col xl:flex-row gap-0 xl:gap-8 text-white p-4  justify-center items-center xl:justify-end">
          <p className="w-full xl:w-80">
            Nuestro trabajo se apoya en grillas precisas, un diseño estructurado
            y una estética que combina minimalismo con brutalismo visual. Nos
            obsesiona la claridad, la jerarquía tipográfica y el impacto desde
            lo simple.
          </p>
          <p className="w-full xl:w-80">
            Creemos que una identidad fuerte se siente tanto como se ve. Por
            eso, diseñamos experiencias digitales que conectan emocionalmente
            con el usuario, sin perder jamás la funcionalidad ni la coherencia
            visual.
          </p>
        </div>
      </div>
    </section>
  );
}
//${img.sizeClass}
