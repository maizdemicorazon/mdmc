import React from "react";
import MapSection from "./MapSection";
import BusinessStatusBanner from "../components/BusinessStatusBanner";
import {useBusinessHours} from "../hooks/useBusinessHours";

// --- Datos integrados desde tu data_catalogs.json ---
const CATEGORIES = [
  { id: 1, name: "Esquites", desc: "Variedad de esquites tradicionales y especiales" },
  { id: 2, name: "Elotes", desc: "Elotes preparados de diferentes formas" },
  { id: 3, name: "Bebidas", desc: "Refrescos, jugos y aguas" },
  { id: 4, name: "De la casa", desc: "Platillo de la casa" },
  { id: 5, name: "Botana", desc: "Papas sin maíz" },
];

// Métodos de pago
const PAYMENT_METHODS = [
  { name: "Efectivo", icon: "💵" },
  { name: "Tarjeta", icon: "💳" },
  { name: "Transferencia", icon: "🏦" },
  { name: "QR", icon: "📱" },
  { name: "Link", icon: "🔗" },
];

// Salsas
const SAUCES = [
  { name: "Sin picante", image: "mdmc/catalogs/sauces/no_chile.jpg" },
  { name: "Buffalo", image: "mdmc/catalogs/sauces/buffalo.jpg" },
  { name: "Valentina", image: "mdmc/catalogs/sauces/valentina.jpg" },
  { name: "Habanero", image: "mdmc/catalogs/sauces/habanero.jpg" },
  { name: "Botanera", image: "mdmc/catalogs/sauces/botanera.jpg" },
  { name: "Salsas Negras", image: "mdmc/catalogs/sauces/salsas_negras.jpg" },
  { name: "Macha", image: "mdmc/catalogs/sauces/macha.jpg" },
  { name: "Tajin en polvo", image: "mdmc/catalogs/sauces/tajinpolvo.jpeg" },
  { name: "Tajin alimonado", image: "mdmc/catalogs/sauces/tajinalimonado.png" },
  { name: "Tajin afrutado", image: "mdmc/catalogs/sauces/tajinafrutado.jpg" },
  { name: "Chile que pica", image: "mdmc/catalogs/sauces/pica.jpg" },
  { name: "Chile que no pica", image: "mdmc/catalogs/sauces/no_pica.jpg" },
];

// Extras
const EXTRAS = [
  { name: "Queso Manchego Extra", desc: "Rebanada de queso extra", price: 10 },
  { name: "Queso Amarillo Extra", desc: "50 ml Queso amarillo líquido extra", price: 10 },
  { name: "Proteina extra", desc: "200g aprox. de proteina de puerco", price: 25 },
];

// --- Productos, variantes y sabores ---
// (Por claridad, si quieres todos los productos solo agrega más; aquí dejo algunos de ejemplo)
const PRODUCTS = [
      {
         id: 1,
         category: 1,
         name: "Doriesquites",
         image: "mdmc/catalogs/products/doriesquites.jpg",
         variants: [
             {
                 size: "Único",
                 price: 55.00
             }
         ],
         flavors: [
             {
                 name: "Nachos"
             },
             {
                 name: "Incognita"
             },
             {
                 name: "Flaming Hot"
             }
         ]
      },
      {
         id: 2,
         category: 1,
         name: "Tostiesquites",
         image: "mdmc/catalogs/products/tostiesquites.jpg",
         variants: [
             {
                 size: "Único",
                 price: 55.00
             }
         ],
         flavors: [
             {
                 name: "Salsa Verde"
             },
             {
                 name: "Flaming Hot"
             }
         ]
      },
      {
         id: 3,
         category: 1,
         name: "Esquites Tradicionales",
         image: "mdmc/catalogs/products/esquite_tradicional.jpg",
         variants: [
             {
                 size: "Chico (8oz)",
                 price: 30.00
             },
             {
                 size: "Mediano (10oz)",
                 price: 40.00
             },
             {
                 size: "Grande (12oz)",
                 price: 50.00
             },
             {
                 size: "Extra Grande (16oz)",
                 price: 60.00
             }
         ]
      },
      {
         id: 4,
         category: 1,
         name: "Esquites con Queso",
         image: "mdmc/catalogs/products/esquites_manchego.jpg",
         variants: [
             {
                 size: "Chico (8oz)",
                 price: 35.00
             },
             {
                 size: "Mediano (10oz)",
                 price: 45.00
             },
             {
                 size: "Grande (12oz)",
                 price: 55.00
             },
             {
                 size: "Extra Grande (16oz)",
                 price: 65.00
             }
         ]
      },
      {
         id: 5,
         category: 1,
         name: "Esquite Maruchan",
         image: "mdmc/catalogs/products/esquite_maruchan.jpg",
         variants: [
             {
                 size: "Único",
                 price: 70.00
             }
         ],
         flavors: [
             {
                 name: "Camaron"
             },
             {
                 name: "Camaron Habanero"
             },
             {
                 name: "Camaron Piquin"
             },
             {
                 name: "Pollo"
             },
             {
                 name: "Res"
             }
         ]
      },
      {
         id: 6,
         category: 4,
         name: "Maíz Puerco",
         image: "mdmc/catalogs/products/maizpuerco.jpg",
         variants: [
             {

                 size: "Único",
                 price: 120.00
             }
         ],
         flavors: [
             {
                 name: "Camaron"
             },
             {
                 name: "Camaron Habanero"
             },
             {
                 name: "Camaron Piquin"
             },
             {
                 name: "Pollo"
             },
             {
                 name: "Res"
             }
         ]
      },
      {
         id: 7,
         category: 4,
         name: "Maíz Puerco sin sopa",
         image: "mdmc/catalogs/products/maizpuerco_sm.jpg",
         variants: [
             {
                 size: "Único",
                 price: 100.00
             }
         ]
      },
      {
         id: 8,
         category: 2,
         name: "Elote Tradicional",
         image: "mdmc/catalogs/products/elote_tradicional.jpg",
         variants: [
             {
                 size: "Único",
                 price: 30.00
             }
         ]
      },
      {
         id: 9,
         category: 2,
         name: "Elote Revolcado",
         image: "mdmc/catalogs/products/elote_revolcado.jpg",
         variants: [
             {

                 size: "Único",
                 price: 45.00
             }
         ],
         flavors: [
             {

                 name: "Sabritas Cruji FH"
             },
             {

                 name: "Rancheritos"
             },
             {

                 name: "Doritos Nachos"
             }
         ]
      },
      {
         id: 10,
         category: 3,
         name: "Red Cola 600ml",
         image: "mdmc/catalogs/products/red600.jpg",
         variants: [
             {

                 "size": "600ml",
                 "price": 20.00
             }
         ]
      },
      {
         id: 11,
         category: 3,
         name: "Coca Cola",
         image: "mdmc/catalogs/products/coca.jpg",
         variants: [
             {
                 size: "400ml",
                 price: 20.00
             },
             {
                 size: "600ml",
                 price: 25.00
             },
             {
                 size: "355ml",
                 price: 18.00
             },
             {
                 size: "355ml",
                 price: 25.00
             }
         ]
      },
      {
         id: 12,
         category: 3,
         name: "Boing 500ml",
         image: "mdmc/catalogs/products/boing500.jpg",
         variants: [
             {
                 "size": "500ml",
                 "price": 20.00
             }
         ],
         flavors: [
             {
                 name: "Mango"
             },
             {
                 name: "Manzana"
             },
             {
                 name: "Guayaba"
             }
         ]
      },
      {
         id: 13,
         category: 3,
         name: "Jumex Lata",
         image: "mdmc/catalogs/products/jumex355.jpg",
         variants: [
             {
                 "size": "355ml",
                 "price": 20.00
             }
         ],
         flavors: [
             {
                 name: "Mango"
             },
             {
                 name: "Durazno"
             },
             {
                 name: "Manzana"
             }
         ]
      },
      {
         id: 14,
         category: 3,
         name: "Agua de frutos",
         image: "mdmc/catalogs/products/agua_fruta.jpg",
         variants: [
             {
                 size: "500ml",
                 price: 25.00
             },
             {
                 size: "1000ml",
                 price: 45.00
             }
         ],
         flavors: [
             {
                 name: "Jamaica"
             },
             {
                 name: "Limón"
             },
             {
                 name: "Limón con chia"
             },
             {
                 name: "Frutos Rojos"
             },
             {
                 name: "Mango"
             }
         ]
      },
      {
         id: 15,
         category: 5,
         name: "Tostitos con queso",
         image: "mdmc/catalogs/products/tostitosconqueso.png",
         variants: [
             {
                 "size": "Único",
                 "price": 25.00
             }
         ]
      },
      {
         id: 16,
         category: 5,
         name: "Doritos con queso",
         image: "mdmc/catalogs/products/doritosconqueso.jpeg",
         variants: [
             {
                 "size": "Único",
                 "price": 25.00
             }
         ]
      },
      {
         id: 17,
         category: 3,
         name: "Jarrito",
         image: "mdmc/catalogs/products/jarritos.jpg",
         variants: [
             {
                 "size": "500ml",
                 "price": 18.00
             }
         ],
         flavors: [
             {
                 name: "Tamarindo"
             },
             {
                 name: "Mandarina"
             },
             {
                 name: "Piña"
             }
         ]
      },
      {
         id: 18,
         category: 3,
         name: "Agua",
         image: "mdmc/catalogs/products/agua.jpg",
         variants: [
             {
                 size: "1000ml",
                 price: 15.00
             }
         ],
         flavors: [
             {
                 name: "Agua Bonafont"
         }
      ]
   }
];

// --- Component principal ---
export default function Publicidad() {
  const { isOpen } = useBusinessHours();
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 text-zinc-800 dark:text-white">
      {/* HEADER */}
      <header className="flex flex-col items-center gap-3 py-6">
        <img
          src="/mdmc/mdmc_logo.jpg"
          alt="Logo Maíz de mi Corazón"
          className="w-36 md:w-44 rounded-2xl shadow-lg border-4 border-yellow-300 dark:border-yellow-700"
          loading="eager"
        />
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-yellow-700 dark:text-yellow-300
                        cinzel-decorative-regular">
          Maíz de mi Corazón
        </h1>
        <p className="text-lg md:text-2xl italic font-medium text-yellow-600 dark:text-yellow-200">
           Calidad, servicio e higiene a toda maíz
        </p>
         {/* Aviso de cerrado */}
        <BusinessStatusBanner/>
        <div className="flex flex-row gap-4 mt-3">
          <a
            href="https://wa.me/5591646649"
            target="_blank"
            rel="noopener"
             className={`text-lg rounded-xl px-8 py-3 font-bold shadow-lg transition ${
                isOpen
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-400 text-gray-700 pointer-events-none cursor-not-allowed'
              }`}
          >
            Pide por WhatsApp
          </a>
        </div>
        <div className="bg-yellow-200 dark:bg-yellow-900 border-l-4 border-yellow-400 dark:border-yellow-700 rounded-xl p-4 gap-3 items-center">
          <svg className="w-7 h-7 text-yellow-600 dark:text-yellow-300 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} fill="none" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
          </svg>
          <div className="text-center text-4xl">
             <b>¡Importante!</b>
           </div>
           <div>
                Los pedidos por WhatsApp requieren <b>el pago por adelantado</b> para confirmar tu orden.<br/>
                <b>Envíos a domicilio con cargo extra, usamos uber flash o recibimos a tu recolector.</b>
            </div>
        </div>
         <div className="flex flex-col items-center mt-10">
            <img
              src="/mdmc/qrmdmc.png"
              alt="QR Uber Eats Maíz de mi Corazón"
              className="w-30 h-30 rounded-lg border-2 border-green-500 dark:border-green-300 shadow-xl"
              loading="lazy"
            />
            <span className="text-4xl font-semibold text-green-600 dark:text-green-300 mt-5">
              ¡Pide en Uber Eats!
            </span>
          </div>
      </header>

      {/* MENÚ */}
      {CATEGORIES.map((cat) => (
        <section key={cat.id} className="py-8 px-4 max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-yellow-700 dark:text-yellow-200">
            {cat.name}
          </h2>
          <p className="text-base mb-4 text-zinc-500 dark:text-zinc-400">
            {cat.desc}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {PRODUCTS.filter((p) => p.category === cat.id).map((p) => (
              <div
                key={p.id}
                className="bg-white dark:bg-zinc-800 rounded-2xl shadow p-4 flex flex-col items-center border border-yellow-100 dark:border-yellow-900"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="rounded-xl w-full h-36 object-cover mb-2"
                  loading="lazy"
                />
                <span className="font-semibold text-lg text-center">{p.name}</span>
                <span className="text-xs text-center mb-1">{p.desc}</span>
                <div className="flex flex-col gap-1 my-2">
                  {p.variants.map((v, i) => (
                    <span key={i} className="text-sm">
                      <b>{v.size}</b>: <span className="text-green-700 dark:text-green-300 font-bold">${v.price}</span>
                    </span>
                  ))}
                </div>
                {p.flavors && p.flavors.length > 0 && (
                  <div className="flex flex-wrap gap-2 my-2 justify-center">
                    {p.flavors.map((flavor, i) => (
                      <span key={i} className="bg-yellow-200 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 px-2 py-1 rounded-full text-xs">
                        {flavor.name}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-2 my-1 justify-center">
                  {EXTRAS.map((e) => (
                    <span key={e.name} className="bg-zinc-100 dark:bg-zinc-700 rounded-full px-3 py-1 text-xs text-zinc-800 dark:text-white border border-yellow-200 dark:border-yellow-900">
                      + {e.name} (${e.price})
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Salsas */}
      <section className="py-8 px-4 max-w-4xl mx-auto">
        <h3 className="text-xl md:text-2xl font-bold mb-4 text-center text-red-700 dark:text-red-300">
          Salsas para tu antojo
        </h3>
        <div className="flex flex-wrap gap-4 justify-center">
          {SAUCES.map((s) => (
            <div key={s.name} className="flex flex-col items-center w-24">
              <img
                src={s.image}
                alt={s.name}
                className="rounded-full w-16 h-16 object-cover border-2 border-yellow-200 dark:border-yellow-900"
                loading="lazy"
              />
              <span className="text-xs mt-1 text-center">{s.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Combina tu pedido */}
      <section className="py-6 px-4 max-w-2xl mx-auto">
        <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 dark:border-yellow-700 p-4 rounded-xl shadow text-center text-lg">
          <b>¡Arma tu pedido perfecto!</b> <br />
          Elige tu producto, sabor, salsa y extras para una experiencia única.
        </div>
      </section>

      {/* Métodos de pago */}
      <section className="py-4 px-4 max-w-xl mx-auto">
        <h3 className="text-xl md:text-2xl font-bold mb-2 text-center text-yellow-700 dark:text-yellow-200">
          Aceptamos todos los métodos de pago:
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          {PAYMENT_METHODS.map((pm) => (
            <div key={pm.name} className="flex flex-col items-center">
              <span className="text-3xl">{pm.icon}</span>
              <span className="text-xs">{pm.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Extras */}
      <section className="py-6 px-4 max-w-3xl mx-auto">
        <h3 className="text-lg md:text-xl font-bold mb-2 text-yellow-700 dark:text-yellow-200">
          Extras para tu antojo
        </h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {EXTRAS.map((e) => (
            <div key={e.name} className="bg-white dark:bg-zinc-800 border border-yellow-100 dark:border-yellow-900 rounded-xl px-3 py-2 flex flex-col items-center">
              <span className="font-semibold">{e.name}</span>
              <span className="text-xs text-center">{e.desc}</span>
              <span className="text-green-700 dark:text-green-300 font-bold">${e.price}</span>
            </div>
          ))}
        </div>
      </section>
      {/* UBICACIÓN - CORREGIDA */}
      <section className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-6 border border-yellow-200 dark:border-yellow-800 mb-6">
            <MapSection/>
        </div>
      </section>


            {/* FOOTER */}
      <footer className="text-center py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="text-black tracking-wide relative text-xl sm:text-2xl lg:text-3xl drop-shadow-md flex items-center justify-center gap-x-3 sm:gap-x-4">
              <img
               src="/mdmc/mdmc_logo.png"
                alt="Logo Maíz de mi Corazón"
                className="h-8 sm:h-10 object-contain"
              />
              <span className={`cinzel-decorative-regular font-normal`}>
                  Maíz de mi corazón
              </span>
              <img
               src="/mdmc/mdmc_logo.png"
                alt="Logo Maíz de mi Corazón"
                className="h-8 sm:h-10 object-contain"
              />
            </h1>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} Maíz de mi Corazón · Hecho con amor y sabor mexicano
          </p>
        </div>
      </footer>
      <style
          dangerouslySetInnerHTML={{
             __html: `
                .cinzel-decorative-regular {
                    font-family: "Cinzel Decorative", serif;
                    font-weight: 600;
                    font-style: normal;
                 }
             `
           }}
       />
    </div>
  );
}
