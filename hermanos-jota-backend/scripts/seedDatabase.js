require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const connectDB = require('../config/database');

const productosIniciales = [
  {
    nombre: "Aparador Uspallata",
    descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
    precio: 485000,
    categoria: "aparadores",
    material: "Nogal macizo",
    certificacion: "FSC",
    especificaciones: {
      medidas: "180x45x75 cm",
      materiales: "Nogal macizo FSC®, herrajes de latón",
      acabado: "Aceite natural ecológico",
      peso: "68 kg",
      capacidad: "6 compartimentos interiores"
    },
    enStock: true,
    stock: 5,
    imagenUrl: "aparador-uspallata.jpg"
  },
  {
    nombre: "Biblioteca Recoleta",
    descripcion: "Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro. Perfecta para colecciones y objetos de diseño, su diseño versátil se adapta a cualquier espacio contemporáneo con elegancia funcional.",
    precio: 325000,
    categoria: "bibliotecas",
    material: "Acero y Roble",
    certificacion: "FSC",
    especificaciones: {
      medidas: "100x35x200 cm",
      materiales: "Estructura de acero, estantes de roble",
      acabado: "Laca mate ecológica",
      capacidad: "45 kg por estante",
      modulares: "5 estantes ajustables"
    },
    enStock: true,
    stock: 8,
    imagenUrl: "biblioteca-recoleta.jpg"
  },
  {
    nombre: "Butaca Mendoza",
    descripcion: "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú. El respaldo curvo abraza el cuerpo y ofrece máximo confort, mientras que su diseño orgánico aporta calidez y sofisticación a cualquier ambiente contemporáneo.",
    precio: 275000,
    categoria: "butacas",
    material: "Guatambú y Bouclé",
    certificacion: "Premium",
    especificaciones: {
      medidas: "80x75x85 cm",
      materiales: "Guatambú macizo, tela bouclé",
      acabado: "Cera vegetal, tapizado premium",
      tapizado: "Repelente al agua y manchas",
      confort: "Espuma alta densidad"
    },
    enStock: true,
    stock: 12,
    imagenUrl: "butaca-mendoza.jpg"
  },
  {
    nombre: "Sillón Copacabana",
    descripcion: "Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna. Inspirado en la estética brasilera moderna de los 60, combina comodidad excepcional con un diseño icónico que trasciende tendencias y épocas.",
    precio: 595000,
    categoria: "sillones",
    material: "Cuero y Acero",
    certificacion: "Premium",
    especificaciones: {
      medidas: "90x85x95 cm",
      materiales: "Cuero curtido vegetal, acero pintado",
      acabado: "Cuero anilina premium",
      rotacion: "360° silenciosa y suave",
      garantia: "10 años en estructura"
    },
    enStock: true,
    stock: 3,
    imagenUrl: "sillon-copacabana.jpg"
  },
  {
    nombre: "Mesa de Centro Araucaria",
    descripcion: "Mesa de centro con sobre circular de mármol Patagonia y base de tres patas en madera de nogal. Su diseño minimalista se convierte en el punto focal perfecto para cualquier sala de estar contemporánea, combinando la frialdad del mármol con la calidez de la madera.",
    precio: 395000,
    categoria: "mesas",
    material: "Mármol y Nogal",
    certificacion: "Premium",
    especificaciones: {
      medidas: "90x90x45 cm",
      materiales: "Sobre de mármol Patagonia, patas de nogal",
      acabado: "Mármol pulido, aceite natural en madera",
      peso: "42 kg",
      carga_maxima: "25 kg distribuidos"
    },
    enStock: true,
    stock: 6,
    imagenUrl: "mesa-centro-araucaria.jpg"
  },
  {
    nombre: "Mesa de Noche Aconcagua",
    descripcion: "Mesa de noche con cajón oculto y repisa inferior en roble certificado FSC®. Su diseño limpio y funcional permite convivir con diferentes estilos de dormitorio, ofreciendo almacenamiento discreto y elegante para objetos personales.",
    precio: 125000,
    categoria: "mesas",
    material: "Roble macizo",
    certificacion: "FSC",
    especificaciones: {
      medidas: "45x35x60 cm",
      materiales: "Roble macizo FSC®, herrajes soft-close",
      acabado: "Barniz mate de poliuretano",
      almacenamiento: "1 cajón + repisa inferior",
      caracteristicas: "Cajón con cierre suave"
    },
    enStock: true,
    stock: 15,
    imagenUrl: "mesa-noche-aconcagua.jpg"
  },
  {
    nombre: "Cama Neuquén",
    descripcion: "Cama plataforma con cabecero flotante tapizado en lino natural y estructura de madera maciza. Su diseño minimalista y sofisticado crea un ambiente de serenidad y elegancia, perfecto para dormitorios contemporáneos que buscan paz y simplicidad.",
    precio: 625000,
    categoria: "camas",
    material: "Roble y Lino",
    certificacion: "FSC",
    especificaciones: {
      medidas: "160x200x90 cm",
      materiales: "Roble macizo FSC® tapizado en lino",
      acabado: "Aceite natural, tapizado premium",
      colchon: "Compatible con colchón 160x200",
      caracteristicas: "Cabecero flotante acolchado"
    },
    enStock: true,
    stock: 4,
    imagenUrl: "cama-neuquen.jpg"
  },
  {
    nombre: "Sofá Patagonia",
    descripcion: "Sofá de tres cuerpos tapizado en lino Warm Alabaster con patas cónicas de madera. Los cojines combinan espuma de alta resiliencia con plumón reciclado, ofreciendo comodidad duradera y sostenible para el hogar moderno.",
    precio: 745000,
    categoria: "sofas",
    material: "Eucalipto y Lino",
    certificacion: "FSC",
    especificaciones: {
      medidas: "220x90x80 cm",
      estructura: "Madera de eucalipto certificada FSC®",
      tapizado: "Lino 100% natural premium",
      relleno: "Espuma HR + plumón reciclado",
      sostenibilidad: "Materiales 100% reciclables"
    },
    enStock: true,
    stock: 2,
    imagenUrl: "sofa-patagonia.jpg"
  },
  {
    nombre: "Mesa Comedor Pampa",
    descripcion: "Mesa extensible de roble macizo con tablero biselado y sistema de apertura suave. Su diseño robusto y elegante se adapta perfectamente a reuniones íntimas o grandes celebraciones familiares, extendiéndose de 6 a 10 comensales.",
    precio: 565000,
    categoria: "mesas",
    material: "Roble macizo",
    certificacion: "FSC",
    especificaciones: {
      medidas: "160/240x90x75 cm",
      materiales: "Roble macizo FSC®, mecanismo alemán",
      acabado: "Aceite-cera natural",
      capacidad: "6-10 comensales",
      extension: "Sistema de mariposa central"
    },
    enStock: true,
    stock: 7,
    imagenUrl: "mesa-comedor-pampa.jpg"
  },
  {
    nombre: "Sillas Córdoba (Set x4)",
    descripcion: "Set de cuatro sillas apilables en contrachapado moldeado de nogal y estructura tubular pintada en Sage Green. Su diseño ergonómico y materiales de calidad garantizan comodidad y durabilidad en el uso diario, perfectas para comedores contemporáneos.",
    precio: 185000,
    categoria: "sillas",
    material: "Nogal y Acero",
    certificacion: "Premium",
    especificaciones: {
      medidas: "45x52x80 cm (cada una)",
      materiales: "Contrachapado nogal, tubo de acero",
      acabado: "Laca mate, pintura epoxi",
      apilables: "Hasta 6 sillas",
      incluye: "Set de 4 sillas"
    },
    enStock: true,
    stock: 10,
    imagenUrl: "sillas-cordoba.jpg"
  },
  {
    nombre: "Escritorio Costa",
    descripcion: "Escritorio compacto con cajón organizado y tapa pasacables integrada en bambú laminado. Ideal para espacios de trabajo en casa, combina funcionalidad moderna con estética minimalista y sostenible, perfecto para el trabajo remoto.",
    precio: 295000,
    categoria: "escritorios",
    material: "Bambú laminado",
    certificacion: "Sustentable",
    especificaciones: {
      medidas: "120x60x75 cm",
      materiales: "Bambú laminado, herrajes ocultos",
      acabado: "Laca mate resistente",
      almacenamiento: "1 cajón con organizador",
      cables: "Pasacables integrado"
    },
    enStock: true,
    stock: 9,
    imagenUrl: "escritorio-costa.jpg"
  },
  {
    nombre: "Silla de Trabajo Belgrano",
    descripcion: "Silla ergonómica regulable en altura con respaldo de malla transpirable y asiento tapizado en tejido reciclado. Diseñada para largas jornadas de trabajo con máximo confort y apoyo lumbar, ideal para oficinas en casa y espacios de coworking.",
    precio: 165000,
    categoria: "sillas",
    material: "Malla técnica y Tejido reciclado",
    certificacion: "Ergonómica",
    especificaciones: {
      medidas: "60x60x90-100 cm",
      materiales: "Malla técnica, tejido reciclado",
      acabado: "Base cromada, tapizado premium",
      regulacion: "Altura + inclinación respaldo",
      certificacion: "Ergonomía europea EN 1335"
    },
    enStock: true,
    stock: 20,
    imagenUrl: "silla-trabajo-belgrano.jpg"
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Limpiar la colección
    await Product.deleteMany({});
    console.log('🗑️  Base de datos limpiada');

    // Insertar productos
    const productosCreados = await Product.insertMany(productosIniciales);
    console.log(`✅ ${productosCreados.length} productos insertados exitosamente`);

    console.log('========================================');
    productosCreados.forEach(p => {
      console.log(`- ${p.nombre} (${p.categoria}) - $${p.precio.toLocaleString()}`);
    });
    console.log('========================================');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error);
    process.exit(1);
  }
};

seedDatabase();