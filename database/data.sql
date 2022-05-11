USE cvm_db;

INSERT INTO users_types VALUES (
	NULL, 'user'),
	(NULL, 'administrator');
    
INSERT INTO users VALUES (
	NULL, 'userPrueba', 'User', 'User', 'user@email.com', '$2a$10$etSr70X/vY4OeVcxRPDMA.8vNKOKHIs4quSTrZ/2Ur5ORfRUUlc52', DEFAULT, 1),
	(NULL, 'marie27', 'María', 'Copete', 'maria@email.com', '$2a$10$dm/TUZgmLnQTxyPdGDH25.C/NdOxar8Vv5Wkbi.SiD09GtRi3v8vO', 'user_1650666569840.png', 2);

INSERT INTO formats VALUES (
	NULL, 'Tapa blanda'),
	(NULL, 'Tapa dura'),
    (NULL, 'Deluxe');

INSERT INTO products VALUES (
	NULL, 'Vota a Loki', 'Loki quiere convertirse en el próximo presidente de Estados Unidos. ¡Es cierto! El Dios de las Mentiras quiere gobernar el mundo libre. ¿Será otra de sus maquinaciones? Un hecho es cierto: con su sonrisa ganadora y lengua de plata, la campaña será más interesante.', 'product1.png', 'Langdon Foss, Christopher Hastings', 1, 120, 81000, 1, 0, 0, 15),
    (NULL, 'La noche más oscura (Deluxe)', 'Entre 2004 y 2011, Geoff Johns revitalizó la franquicia de uno de los iconos de la editorial, Green Lantern, convirtiendo la serie que protagonizaba en una auténtica y trepidante space opera, cuyas ramificaciones llegaron a todos los puntos del Universo DC. En 2008, La noche más oscura se convirtió en el momento culminante del trabajo del autor con el Gladiador Esmeralda.', 'product2.png', 'Geoff Johns, Doug Mahnke, Ivan Reis', 3, 584, 375000, 1, 0, 0, 15),
    (NULL, 'Shingeki No Kyojin Vol. 27 (El ataque de los titanes)', 'Eren logró infiltrarse en Marley y asestó al imperio un golpe devastador. Sin embargo el verdadero objetivo de la misión siempre fue el de llevar a Zeke hasta la Isla Paradis en secreto. Ahora que este Titán de sangre real está tras los Muros, el gobierno militar de la Isla tiene finalmente su arma de destrucción masiva que “hará temblar la tierra”.', 'product3.png', 'Hajime Isayama', 1, 192, 56000, 1, 0, 0, 15),
    (NULL, 'Scott Pilgrim VOL. 04', 'Ha llegado el momento de que Scott Pilgrim tome algunas decisiones: ¿ama de verdad a Ramona, la misteriosa mensajera en patines?, ¿sonará bien algún día Sex BobOmb, su banda?, ¿logrará pagar el alquiler?, ¿será capaz de conservar un trabajo?, ¿por qué le siguen dos ninjas? Las referencias a las bandas de rock independientes, los videojuegos y el manga siguen brillando en este nuevo volumen, en el que los agudos diálogos de O’Malley capturan la chulería, la insensibilidad y la desorientación de los componentes de una generación para la que trabajar de lavaplatos supone montárselo a lo grande.', 'product4.png', 'Bryan Lee O Halley', 1, 192, 53000, 1, 0, 0, 15),
    (NULL, 'Ajin (Semihumano) VOL. 01', 'La humanidad ha descubierto una subraza dentro del género humano: los semihumanos, seres de aspecto humano pero incapaces de morir y que aparecen muy de vez en cuando entre la población. Cuando el joven protagonista descubre que es uno de ellos, se inicia su pesadilla…', 'product5.png', 'Gamon Sakurai, Tsuina Miura', 1, 228, 42900, 1, 0, 0, 15),
    (NULL, 'Marvel Must-Have / Planeta Hulk', 'La más espectacular aventura jamás protagonizada por Hulk! Un planeta alienígena salvaje. Tribus bárbaras oprimidas. Un emperador corrupto. Mortíferos guerreros. Gladiadores y esclavos. Hachas de batalla y puños golpeadores. Monstruos y héroes. El cóctel explosivo se culmina con la llegada de un Hulk que ha sido traicionado por sus amigos y está muy, muy enfadado. ¡Que comience la batalla!', 'product6.png', 'Gary Frank, Aaron Lopresti, Carlo Pagulayan, Greg Pak', 2, 376, 103500, 1, 0, 0, 15),
    (NULL, 'Marvel Must-Have / Masacre: La guerra de Wade Wilson', 'Ya has visto a Masacre en incontables aventuras, pero nunca en una como ésta. ¡Te lo aseguramos! ¿Quieres respuestas sobre Wade, como por qué siempre se niega a quitarse su máscara o de dónde viene su nombre? ¿De verdad fue parte de un equipo de operaciones encubiertas del que nadie ha oído hablar nunca?', 'product7.png', 'Duane Swierczynski, Jason Pearson', 2, 376, 82000, 1, 0, 0, 15),
    (NULL, 'Marvel Must-Have / Spiderman: Universo Spiderman', '¡La saga que reúne a todos los Hombres Araña y Mujeres Araña que han existido jamás! Más peligroso que nunca, Morlun amenaza a todos los Hombres Araña que existen en el Multiverso, pero esta vez no está solo: tiene a la familia a su lado. ¡Todos los Spiderman que han existido están en peligro!', 'product8.png', 'Dan Slott, Olivier Coipel', 2, 184, 94000, 1, 0, 0, 15),
    (NULL, 'Liga de la Justicia - Los superhéroes más grandiosos de la tierra', 'SUPERMAN. BATMAN. ¡SHAZAM! WONDER WOMAN. LA LJA. Se los conoce como los mejores héroes de DC Comics, ¡y están preparados para salvar al mundo de sí mismo! Estas son historias épicas de los personajes más famosos, coloridos e icónicos de DC Comics.', 'product9.png', 'Alex Ross, Paul Dini', 1, 400, 272000, 0, 0, 0, 15),
    (NULL, 'V DE VENDETTA (Deluxe)', 'Reconocida unánimemente como una obra maestra, V de vendetta es uno de los trabajos más personales y logrados de sus autores: Alan Moore (Watchmen, Batman: La broma asesina) y David Lloyd (Hellblazer). Con esta nueva edición, volveremos a disfrutar de la historia protagonizada por el subversivo V, ahora acompañada de interesante material extra.', 'product10.png', 'Alan Moore, David Lloyd', 3, 400, 279000, 0, 0, 0, 15),
    (NULL, 'Invencible VOL. 01', 'Mark Grayson es como casi todos los jóvenes de su edad. Está en el último año de un instituto americano normal. Tiene un trabajo basura a tiempo parcial después de la escuela y los fines de semana. Le gustan bastante las chicas, pero no las entiende del todo. Le gusta salir con sus amigos y dormir hasta tarde los sábados (al menos hasta que comienzan sus dibujos animados favoritos).', 'product11.png', 'Robert Kirkman, Cory Walker, Ryan Ottley', 2, 320, 205000, 0, 0, 0, 15),
    (NULL, 'Spawn integral VOL. 01', 'Nunca se había visto ningún héroe como el Spawn de Todd McFarlane. Al Simmons era un agente del gobierno a quien asesinaron sus propios compañeros. Tras resucitar en lo más profundo del infierno, regresa a la Tierra convertido en Spawn, un guerrero que protege a los marginados que viven en los callejones de Nueva York.', 'product12.png', 'Todd McFarlane, Alan Moore, Frank Miller, Todd McFarlane, Greg Capullo', 2, 344, 357000, 0, 0, 0, 15),
    (NULL, 'The Crow (Edición definitiva)', 'The Crow fue todo un fenómeno underground desde su aparición en 1989, convirtiéndose en un sorprendente éxito para un cómic publicado de forma serializada desde una pequeña editorial independiente. Hoy ya es un clásico.', 'product13.png', 'James O´barr', 2, 272, 357000, 0, 0, 0, 15),
    (NULL, 'Maximum Berserk VOL. 01', 'Edición de lujo de una de las más aclamadas series manga de todos los tiempos. Un viaje épico y salvaje a un reino de fantasía. Guts es un guerrero vestido de negro de los pies a la cabeza que porta una gigantesca espada más larga que su propia estatura y un robusto brazo ortopédico de hierro.', 'product14.png', 'Kentaro Miura', 1, 456, 160000, 0, 0, 0, 15),
    (NULL, 'Maximum Gantz VOL. 01', 'Kurono y Kato, antiguos amigos en la escuela primaria, acaban atropellados por un tren cuando se disponían a ayudar a un borracho. Sin embargo, al cabo de un instante aparecen en un piso de aspecto anodino. Allí no están solos: otras personas que también han experimentado el instante previo a la muerte les acompañan, así como una esfera negra, Gantz, que les indica, sin dar pie a ningún tipo de discusión, que deben acabar... ¿¡con el cebollense...!? ¡Así empieza una batalla llena de incógnitas!', 'product15.png', 'Hiroya Oku', 1, 440, 108000, 0, 0, 0, 15),
    (NULL, 'Batman: Año 1 (Deluxe)', '¿Cómo llegó a convertirse Bruce Wayne en el Hombre Murciélago? ¿Qué supuso para Gotham City la llegada de James Gordon? En 1986, Frank Miller y David Mazzuchelli dieron respuesta a ambos interrogantes, creando una obra maestra que presentamos ahora en un espectacular formato, con extras inéditos en España.', 'product16.png', 'Frank Miller, David Mazzucchelli', 3, 264, 220000, 0, 0, 0, 15);

INSERT INTO categories VALUES (
	NULL, 'Cómic DC'),
	(NULL, 'Cómic Marvel'),
    (NULL, 'Cómic Independiente'),
    (NULL, 'Manga'),
    (NULL, 'Fantasía'),
    (NULL, 'Terror'),
    (NULL, 'Ciencia Ficción'),
    (NULL, 'Drama');

INSERT INTO products_categories VALUES (
	NULL, 1, 2),
    (NULL, 1, 7),
    (NULL, 2, 1),
    (NULL, 2, 7),
    (NULL, 3, 4),
    (NULL, 3, 7),
    (NULL, 4, 3),
    (NULL, 4, 5),
    (NULL, 5, 4),
    (NULL, 5, 6),
    (NULL, 6, 2),
    (NULL, 6, 7),
    (NULL, 7, 2),
    (NULL, 7, 7),
    (NULL, 8, 2),
    (NULL, 8, 7),
    (NULL, 9, 1),
    (NULL, 9, 7),
    (NULL, 10, 1),
    (NULL, 10, 8),
    (NULL, 11, 3),
    (NULL, 11, 7),
    (NULL, 12, 3),
    (NULL, 12, 6),
    (NULL, 13, 3),
    (NULL, 13, 6),
    (NULL, 14, 4),
    (NULL, 14, 6),
    (NULL, 15, 4),
    (NULL, 15, 6),
    (NULL, 16, 1),
    (NULL, 16, 7);

