<?php
	
/* ---------------------------------------------------- */
/* All CSS Options and settings							*/
/* ---------------------------------------------------- */
echo "<ul class='yp-editor-list'>
		
		<li class='yp-li-about active'>
			<h3><small>".__('You are customizing','yp')."</small> <div>".yp_customizer_name()."</div></h3>
		</li>
		
		<li>
			<h3>".__('Text','yp')." ".yp_arrow_icon()."</h3>
			<div class='yp-this-content'>
			
				".yp_get_select_markup(
					'font-family',
					__('Font Family','yp')
					,array(
					
						// Safe Fonts.
						"Georgia, serif" => "Georgia",
						"'Palatino Linotype', 'Book Antiqua', Palatino, serif" => "Palatino Linotype",
						"'Times New Roman', Times, serif" => "Times New Roman",
						"Arial, Helvetica, sans-serif" => "Arial",
						"'Arial Black', Gadget, sans-serif" => "Arial Black",
						"Impact, Charcoal, sans-serif" => "Impact",
						"'Lucida Sans Unicode', 'Lucida Grande', sans-serif" => "Lucida Sans Unicode",
						"Tahoma, Geneva, sans-serif" => "Tahoma",
						"Verdana, Geneva, sans-serif" => "Verdana",
						
						// Google fonts.
						"'Open Sans', sans-serif" => "Open Sans",
						"'Roboto', sans-serif" => "Roboto",
						"'Slabo 27px', serif" => "Slabo 27px",
						"'Lato', sans-serif" => "Lato",
						"'Oswald', sans-serif" => "Oswald",
						"'Roboto Condensed', sans-serif" => "Roboto Condensed",
						"'Lora', serif" => "Lora",
						"'Source Sans Pro', sans-serif" => "Source Sans Pro",
						"'PT Sans', sans-serif" => "PT Sans",
						"'Montserrat', sans-serif" => "Montserrat",
						"'Open Sans Condensed', sans-serif" => "Open Sans Condensed",
						"'Raleway', sans-serif" => "Raleway",
						"'Droid Sans', sans-serif" => "Droid Sans",
						"'Ubuntu', sans-serif" => "Ubuntu",
						"'Droid Serif', serif" => "Droid Serif",
						"'Roboto Slab', serif" => "Roboto Slab",
						"'Arimo', sans-serif" => "Arimo",
						"'PT Sans Narrow', sans-serif" => "PT Sans Narrow",
						"'Merriweather', serif" => "Merriweather",
						"'Noto Sans', sans-serif" => "Noto Sans",
						"'Titillium Web', sans-serif" => "Titillium Web",
						"'Bitter', serif" => "Bitter",
						"'Indie Flower', handwriting" => "Indie Flower",
						"'Poiret One', display" => "Poiret One",
						"'PT Serif', serif" => "PT Serif",
						"'Lobster', display" => "Lobster",
						"'Yanone Kaffeesatz', sans-serif" => "Yanone Kaffeesatz",
						"'Oxygen', sans-serif" => "Oxygen",
						"'Dosis', sans-serif" => "Dosis",
						"'Fjalla One', sans-serif" => "Fjalla One",
						"'Cabin', sans-serif" => "Cabin",
						"'Playfair Display', serif" => "Playfair Display",
						"'Arvo', serif" => "Arvo",
						"'Hind', sans-serif" => "Hind",
						"'Abel', sans-serif" => "Abel",
						"'Muli', sans-serif" => "Muli",
						"'Vollkorn', serif" => "Vollkorn",
						"'Noto Serif', serif" => "Noto Serif",
						"'Bree Serif', serif" => "Bree Serif",
						"'Nunito', sans-serif" => "Nunito",
						"'Play', sans-serif" => "Play",
						"'Inconsolata', monospace" => "Inconsolata",
						"'Francois One', sans-serif" => "Francois One",
						"'Signika', sans-serif" => "Signika",
						"'Shadows Into Light', handwriting" => "Shadows Into Light",
						"'Archivo Narrow', sans-serif" => "Archivo Narrow",
						"'Libre Baskerville', serif" => "Libre Baskerville",
						"'Josefin Sans', sans-serif" => "Josefin Sans",
						"'Pacifico', handwriting" => "Pacifico",
						"'Cuprum', sans-serif" => "Cuprum",
						"'Alegreya', serif" => "Alegreya",
						"'Ubuntu Condensed', sans-serif" => "Ubuntu Condensed",
						"'Asap', sans-serif" => "Asap",
						"'Rokkitt', serif" => "Rokkitt",
						"'Merriweather Sans', sans-serif" => "Merriweather Sans",
						"'Maven Pro', sans-serif" => "Maven Pro",
						"'Anton', sans-serif" => "Anton",
						"'Exo 2', sans-serif" => "Exo 2",
						"'Sigmar One', display" => "Sigmar One",
						"'Karla', sans-serif" => "Karla",
						"'Quicksand', sans-serif" => "Quicksand",
						"'Varela Round', sans-serif" => "Varela Round",
						"'Orbitron', sans-serif" => "Orbitron",
						"'Dancing Script', handwriting" => "Dancing Script",
						"'PT Sans Caption', sans-serif" => "PT Sans Caption",
						"'Questrial', sans-serif" => "Questrial",
						"'Pathway Gothic One', sans-serif" => "Pathway Gothic One",
						"'Exo', sans-serif" => "Exo",
						"'Crimson Text', serif" => "Crimson Text",
						"'Monda', sans-serif" => "Monda",
						"'Fira Sans', sans-serif" => "Fira Sans",
						"'Bangers', display" => "Bangers",
						"'Abril Fatface', display" => "Abril Fatface",
						"'Architects Daughter', handwriting" => "Architects Daughter",
						"'Chewy', display" => "Chewy",
						"'News Cycle', sans-serif" => "News Cycle",
						"'Ropa Sans', sans-serif" => "Ropa Sans",
						"'EB Garamond', serif" => "EB Garamond",
						"'Gudea', sans-serif" => "Gudea",
						"'Armata', sans-serif" => "Armata",
						"'Pontano Sans', sans-serif" => "Pontano Sans",
						"'Gloria Hallelujah', handwriting" => "Gloria Hallelujah",
						"'Russo One', sans-serif" => "Russo One",
						"'Patua One', display" => "Patua One",
						"'Covered By Your Grace', handwriting" => "Covered By Your Grace",
						"'Crete Round', serif" => "Crete Round",
						"'Josefin Slab', serif" => "Josefin Slab",
						"'Righteous', display" => "Righteous",
						"'Sanchez', serif" => "Sanchez",
						"'Amatic SC', handwriting" => "Amatic SC",
						"'Istok Web', sans-serif" => "Istok Web",
						"'Ruda', sans-serif" => "Ruda",
						"'Source Code Pro', monospace" => "Source Code Pro",
						"'Kaushan Script', handwriting" => "Kaushan Script",
						"'Noticia Text', serif" => "Noticia Text",
						"'Quattrocento Sans', sans-serif" => "Quattrocento Sans",
						"'BenchNine', sans-serif" => "BenchNine",
						"'Lobster Two', display" => "Lobster Two",
						"'Passion One', display" => "Passion One",
						"'Coming Soon', handwriting" => "Coming Soon",
						"'Hammersmith One', sans-serif" => "Hammersmith One",
						"'Old Standard TT', serif" => "Old Standard TT",
						"'Philosopher', sans-serif" => "Philosopher",
						"'Cabin Condensed', sans-serif" => "Cabin Condensed",
						"'Cinzel', serif" => "Cinzel",
						"'Fredoka One', display" => "Fredoka One",
						"'Courgette', handwriting" => "Courgette",
						"'Varela', sans-serif" => "Varela",
						"'Alfa Slab One', display" => "Alfa Slab One",
						"'Economica', sans-serif" => "Economica",
						"'Kreon', serif" => "Kreon",
						"'Pinyon Script', handwriting" => "Pinyon Script",
						"'Rock Salt', handwriting" => "Rock Salt",
						"'Playball', display" => "Playball",
						"'Advent Pro', sans-serif" => "Advent Pro",
						"'Comfortaa', display" => "Comfortaa",
						"'Archivo Black', sans-serif" => "Archivo Black",
						"'Tinos', serif" => "Tinos",
						"'Cardo', serif" => "Cardo",
						"'Sintony', sans-serif" => "Sintony",
						"'Permanent Marker', handwriting" => "Permanent Marker",
						"'Cantarell', sans-serif" => "Cantarell",
						"'Satisfy', handwriting" => "Satisfy",
						"'ABeeZee', sans-serif" => "ABeeZee",
						"'Paytone One', sans-serif" => "Paytone One",
						"'Squada One', display" => "Squada One",
						"'Handlee', handwriting" => "Handlee",
						"'Nobile', sans-serif" => "Nobile",
						"'Changa One', display" => "Changa One",
						"'Antic Slab', serif" => "Antic Slab",
						"'Fugaz One', display" => "Fugaz One",
						"'Bevan', display" => "Bevan",
						"'Source Serif Pro', serif" => "Source Serif Pro",
						"'Sorts Mill Goudy', serif" => "Sorts Mill Goudy",
						"'Special Elite', display" => "Special Elite",
						"'Amaranth', sans-serif" => "Amaranth",
						"'Jura', sans-serif" => "Jura",
						"'Cookie', handwriting" => "Cookie",
						"'Playfair Display SC', serif" => "Playfair Display SC",
						"'Marvel', sans-serif" => "Marvel",
						"'Molengo', sans-serif" => "Molengo",
						"'Didact Gothic', sans-serif" => "Didact Gothic",
						"'Droid Sans Mono', monospace" => "Droid Sans Mono",
						"'Waiting for the Sunrise', handwriting" => "Waiting for the Sunrise",
						"'Tangerine', handwriting" => "Tangerine",
						"'Quattrocento', serif" => "Quattrocento",
						"'Great Vibes', handwriting" => "Great Vibes",
						"'Marck Script', handwriting" => "Marck Script",
						"'Shadows Into Light Two', handwriting" => "Shadows Into Light Two",
						"'Gentium Book Basic', serif" => "Gentium Book Basic",
						"'Signika Negative', sans-serif" => "Signika Negative",
						"'Fontdiner Swanky', display" => "Fontdiner Swanky",
						"'Luckiest Guy', display" => "Luckiest Guy",
						"'Cinzel Decorative', display" => "Cinzel Decorative",
						"'Fauna One', serif" => "Fauna One",
						"'Patrick Hand', handwriting" => "Patrick Hand",
						"'Glegoo', serif" => "Glegoo",
						"'Vidaloka', serif" => "Vidaloka",
						"'Scada', sans-serif" => "Scada",
						"'Audiowide', display" => "Audiowide",
						"'Alegreya Sans SC', sans-serif" => "Alegreya Sans SC",
						"'Viga', sans-serif" => "Viga",
						"'Alegreya Sans', sans-serif" => "Alegreya Sans",
						"'Voltaire', sans-serif" => "Voltaire",
						"'Enriqueta', serif" => "Enriqueta",
						"'Domine', serif" => "Domine",
						"'Actor', sans-serif" => "Actor",
						"'Limelight', display" => "Limelight",
						"'Days One', sans-serif" => "Days One",
						"'Amiri', serif" => "Amiri",
						"'Damion', handwriting" => "Damion",
						"'Basic', sans-serif" => "Basic",
						"'Just Another Hand', handwriting" => "Just Another Hand",
						"'Niconne', handwriting" => "Niconne",
						"'Chivo', sans-serif" => "Chivo",
						"'Bubblegum Sans', display" => "Bubblegum Sans",
						"'Oleo Script', display" => "Oleo Script",
						"'Calligraffitti', handwriting" => "Calligraffitti",
						"'Ultra', serif" => "Ultra",
						"'Neuton', serif" => "Neuton",
						"'Arapey', serif" => "Arapey",
						"'Aldrich', sans-serif" => "Aldrich",
						"'Rambla', sans-serif" => "Rambla",
						"'Cantata One', serif" => "Cantata One",
						"'Allerta', sans-serif" => "Allerta",
						"'Lusitana', serif" => "Lusitana",
						"'Mako', sans-serif" => "Mako",
						"'Julius Sans One', sans-serif" => "Julius Sans One",
						"'Berkshire Swash', handwriting" => "Berkshire Swash",
						"'Michroma', sans-serif" => "Michroma",
						"'Crafty Girls', handwriting" => "Crafty Girls",
						"'Walter Turncoat', handwriting" => "Walter Turncoat",
						"'Bad Script', handwriting" => "Bad Script",
						"'Volkhov', serif" => "Volkhov",
						"'Electrolize', sans-serif" => "Electrolize",
						"'Share', display" => "Share",
						"'Alegreya SC', serif" => "Alegreya SC",
						"'Nixie One', display" => "Nixie One",
						"'Marmelad', sans-serif" => "Marmelad",
						"'Doppio One', sans-serif" => "Doppio One",
						"'Jockey One', sans-serif" => "Jockey One",
						"'Cutive', serif" => "Cutive",
						"'Syncopate', sans-serif" => "Syncopate",
						"'Acme', sans-serif" => "Acme",
						"'Coda', display" => "Coda",
						"'Reenie Beanie', handwriting" => "Reenie Beanie",
						"'Homenaje', sans-serif" => "Homenaje",
						"'Cherry Cream Soda', display" => "Cherry Cream Soda",
						"'Nothing You Could Do', handwriting" => "Nothing You Could Do",
						"'Alice', serif" => "Alice",
						"'Rosario', sans-serif" => "Rosario",
						"'Kameron', serif" => "Kameron",
						"'Yellowtail', handwriting" => "Yellowtail",
						"'Gochi Hand', handwriting" => "Gochi Hand",
						"'Carrois Gothic', sans-serif" => "Carrois Gothic",
						"'Adamina', serif" => "Adamina",
						"'Montserrat Alternates', sans-serif" => "Montserrat Alternates",
						"'Boogaloo', display" => "Boogaloo",
						"'Six Caps', sans-serif" => "Six Caps",
						"'Gentium Basic', serif" => "Gentium Basic",
						"'Copse', serif" => "Copse",
						"'Overlock', display" => "Overlock",
						"'Homemade Apple', handwriting" => "Homemade Apple",
						"'Poller One', display" => "Poller One",
						"'Sacramento', handwriting" => "Sacramento",
						"'Ubuntu Mono', monospace" => "Ubuntu Mono",
						"'Goudy Bookletter 1911', serif" => "Goudy Bookletter 1911",
						"'Trocchi', serif" => "Trocchi",
						"'Rajdhani', sans-serif" => "Rajdhani",
						"'Contrail One', display" => "Contrail One",
						"'Aclonica', sans-serif" => "Aclonica",
						"'Rochester', handwriting" => "Rochester",
						"'Convergence', sans-serif" => "Convergence",
						"'Fredericka the Great', display" => "Fredericka the Great",
						"'Carme', sans-serif" => "Carme",
						"'Telex', sans-serif" => "Telex",
						"'Coustard', serif" => "Coustard",
						"'Rancho', handwriting" => "Rancho",
						"'Frijole', display" => "Frijole",
						"'Alex Brush', handwriting" => "Alex Brush",
						"'Allerta Stencil', sans-serif" => "Allerta Stencil",
						"'Arbutus Slab', serif" => "Arbutus Slab",
						"'Unkempt', display" => "Unkempt",
						"'PT Serif Caption', serif" => "PT Serif Caption",
						"'Radley', serif" => "Radley",
						"'Prata', serif" => "Prata",
						"'Neucha', handwriting" => "Neucha",
						"'Antic', sans-serif" => "Antic",
						"'Unica One', display" => "Unica One",
						"'Quantico', sans-serif" => "Quantico",
						"'Allura', handwriting" => "Allura",
						"'Cabin Sketch', display" => "Cabin Sketch",
						"'Ceviche One', display" => "Ceviche One",
						"'Average', serif" => "Average",
						"'Lateef', handwriting" => "Lateef",
						"'Racing Sans One', display" => "Racing Sans One",
						"'Fanwood Text', serif" => "Fanwood Text",
						"'Freckle Face', display" => "Freckle Face",
						"'Nova Square', display" => "Nova Square",
						"'Belleza', sans-serif" => "Belleza",
						"'Black Ops One', display" => "Black Ops One",
						"'Inder', sans-serif" => "Inder",
						"'Alef', sans-serif" => "Alef",
						"'Sansita One', display" => "Sansita One",
						"'Gruppo', display" => "Gruppo",
						"'Hanuman', serif" => "Hanuman",
						"'Spinnaker', sans-serif" => "Spinnaker",
						"'Kotta One', serif" => "Kotta One",
						"'Schoolbell', handwriting" => "Schoolbell",
						"'Carter One', display" => "Carter One",
						"'Marcellus', serif" => "Marcellus",
						"'Parisienne', handwriting" => "Parisienne",
						"'Puritan', sans-serif" => "Puritan",
						"'Oranienbaum', serif" => "Oranienbaum",
						"'Port Lligat Slab', serif" => "Port Lligat Slab",
						"'Candal', sans-serif" => "Candal",
						"'Slackey', display" => "Slackey",
						"'Petit Formal Script', handwriting" => "Petit Formal Script",
						"'Cousine', monospace" => "Cousine",
						"'Duru Sans', sans-serif" => "Duru Sans",
						"'The Girl Next Door', handwriting" => "The Girl Next Door",
						"'Metrophobic', sans-serif" => "Metrophobic",
						"'Tenor Sans', sans-serif" => "Tenor Sans",
						"'Marcellus SC', serif" => "Marcellus SC",
						"'Yesteryear', handwriting" => "Yesteryear",
						"'Magra', sans-serif" => "Magra",
						"'Capriola', sans-serif" => "Capriola",
						"'Paprika', display" => "Paprika",
						"'Megrim', display" => "Megrim",
						"'Leckerli One', handwriting" => "Leckerli One",
						"'Halant', serif" => "Halant",
						"'Chelsea Market', display" => "Chelsea Market",
						"'IM Fell English', serif" => "IM Fell English",
						"'Londrina Solid', display" => "Londrina Solid",
						"'Pompiere', display" => "Pompiere",
						"'Grand Hotel', handwriting" => "Grand Hotel",
						"'Merienda One', handwriting" => "Merienda One",
						"'Caudex', serif" => "Caudex",
						"'Denk One', sans-serif" => "Denk One",
						"'Euphoria Script', handwriting" => "Euphoria Script",
						"'Forum', display" => "Forum",
						"'Seaweed Script', display" => "Seaweed Script",
						"'Lilita One', display" => "Lilita One",
						"'Ovo', serif" => "Ovo",
						"'Lemon', display" => "Lemon",
						"'Tauri', sans-serif" => "Tauri",
						"'Average Sans', sans-serif" => "Average Sans",
						"'Allan', display" => "Allan",
						"'Alike', serif" => "Alike",
						"'Corben', display" => "Corben",
						"'Andika', sans-serif" => "Andika",
						"'Lily Script One', display" => "Lily Script One",
						"'Orienta', sans-serif" => "Orienta",
						"'Press Start 2P', display" => "Press Start 2P",
						"'Baumans', display" => "Baumans",
						"'Annie Use Your Telescope', handwriting" => "Annie Use Your Telescope",
						"'PT Mono', monospace" => "PT Mono",
						"'Finger Paint', display" => "Finger Paint",
						"'Give You Glory', handwriting" => "Give You Glory",
						"'Just Me Again Down Here', handwriting" => "Just Me Again Down Here",
						"'IM Fell DW Pica', serif" => "IM Fell DW Pica",
						"'Love Ya Like A Sister', display" => "Love Ya Like A Sister",
						"'Delius', handwriting" => "Delius",
						"'Voces', display" => "Voces",
						"'Timmana', sans-serif" => "Timmana",
						"'Lustria', serif" => "Lustria",
						"'Anaheim', sans-serif" => "Anaheim",
						"'Podkova', serif" => "Podkova",
						"'Headland One', serif" => "Headland One",
						"'Fenix', serif" => "Fenix",
						"'Khand', sans-serif" => "Khand",
						"'Averia Sans Libre', display" => "Averia Sans Libre",
						"'Crushed', display" => "Crushed",
						"'Gilda Display', serif" => "Gilda Display",
						"'La Belle Aurore', handwriting" => "La Belle Aurore",
						"'Simonetta', display" => "Simonetta",
						"'Mystery Quest', display" => "Mystery Quest",
						"'Gravitas One', display" => "Gravitas One",
						"'Ek Mukta', sans-serif" => "Ek Mukta",
						"'Imprima', sans-serif" => "Imprima",
						"'Monoton', display" => "Monoton",
						"'Kelly Slab', display" => "Kelly Slab",
						"'Judson', serif" => "Judson",
						"'Codystar', display" => "Codystar",
						"'Strait', sans-serif" => "Strait",
						"'Brawler', serif" => "Brawler",
						"'Shanti', sans-serif" => "Shanti",
						"'Uncial Antiqua', display" => "Uncial Antiqua",
						"'Mr De Haviland', handwriting" => "Mr De Haviland",
						"'Knewave', display" => "Knewave",
						"'Norican', handwriting" => "Norican",
						"'Khmer', display" => "Khmer",
						"'Montez', handwriting" => "Montez",
						"'Lekton', sans-serif" => "Lekton",
						"'Loved by the King', handwriting" => "Loved by the King",
						"'Graduate', display" => "Graduate",
						"'Oregano', display" => "Oregano",
						"'UnifrakturMaguntia', display" => "UnifrakturMaguntia",
						"'Rye', display" => "Rye",
						"'Italianno', handwriting" => "Italianno",
						"'Kalam', handwriting" => "Kalam",
						"'Rufina', serif" => "Rufina",
						"'Sue Ellen Francisco', handwriting" => "Sue Ellen Francisco",
						"'Bentham', serif" => "Bentham",
						"'Belgrano', serif" => "Belgrano",
						"'Iceland', display" => "Iceland",
						"'Patrick Hand SC', handwriting" => "Patrick Hand SC",
						"'Quando', serif" => "Quando",
						"'IM Fell French Canon', serif" => "IM Fell French Canon",
						"'Skranji', display" => "Skranji",
						"'Khula', sans-serif" => "Khula",
						"'GFS Didot', serif" => "GFS Didot",
						"'Wire One', sans-serif" => "Wire One",
						"'Titan One', display" => "Titan One",
						"'Creepster', display" => "Creepster",
						"'Chau Philomene One', sans-serif" => "Chau Philomene One",
						"'Averia Gruesa Libre', display" => "Averia Gruesa Libre",
						"'Share Tech', sans-serif" => "Share Tech",
						"'Qwigley', handwriting" => "Qwigley",
						"'Clicker Script', handwriting" => "Clicker Script",
						"'Prosto One', display" => "Prosto One",
						"'Salsa', display" => "Salsa",
						"'Nova Mono', monospace" => "Nova Mono",
						"'Happy Monkey', display" => "Happy Monkey",
						"'Kranky', display" => "Kranky",
						"'Tienne', serif" => "Tienne",
						"'Merienda', handwriting" => "Merienda",
						"'Over the Rainbow', handwriting" => "Over the Rainbow",
						"'Geo', sans-serif" => "Geo",
						"'Oxygen Mono', monospace" => "Oxygen Mono",
						"'Unna', serif" => "Unna",
						"'Short Stack', handwriting" => "Short Stack",
						"'Carrois Gothic SC', sans-serif" => "Carrois Gothic SC",
						"'Yeseva One', display" => "Yeseva One",
						"'Fjord One', serif" => "Fjord One",
						"'IM Fell English SC', serif" => "IM Fell English SC",
						"'Sarala', sans-serif" => "Sarala",
						"'Stardos Stencil', display" => "Stardos Stencil",
						"'Aladin', handwriting" => "Aladin",
						"'Sunshiney', handwriting" => "Sunshiney",
						"'Buenard', serif" => "Buenard",
						"'Englebert', sans-serif" => "Englebert",
						"'Mountains of Christmas', display" => "Mountains of Christmas",
						"'Mouse Memoirs', sans-serif" => "Mouse Memoirs",
						"'Poly', serif" => "Poly",
						"'Federo', sans-serif" => "Federo",
						"'Delius Swash Caps', handwriting" => "Delius Swash Caps",
						"'Meddon', handwriting" => "Meddon",
						"'Numans', sans-serif" => "Numans",
						"'Cantora One', sans-serif" => "Cantora One",
						"'Expletus Sans', display" => "Expletus Sans",
						"'Teko', sans-serif" => "Teko",
						"'Andada', serif" => "Andada",
						"'Sniglet', display" => "Sniglet",
						"'Arizonia', handwriting" => "Arizonia",
						"'Metamorphous', display" => "Metamorphous",
						"'Italiana', serif" => "Italiana",
						"'Bowlby One SC', display" => "Bowlby One SC",
						"'Holtwood One SC', serif" => "Holtwood One SC",
						"'Kristi', handwriting" => "Kristi",
						"'Life Savers', display" => "Life Savers",
						"'Bowlby One', display" => "Bowlby One",
						"'Stalemate', handwriting" => "Stalemate",
						"'Oldenburg', display" => "Oldenburg",
						"'Anonymous Pro', monospace" => "Anonymous Pro",
						"'Gafata', sans-serif" => "Gafata",
						"'VT323', monospace" => "VT323",
						"'Roboto Mono', monospace" => "Roboto Mono",
						"'Mr Dafoe', handwriting" => "Mr Dafoe",
						"'Medula One', display" => "Medula One",
						"'Gabriela', serif" => "Gabriela",
						"'Bilbo Swash Caps', handwriting" => "Bilbo Swash Caps",
						"'Rationale', sans-serif" => "Rationale",
						"'Oleo Script Swash Caps', display" => "Oleo Script Swash Caps",
						"'Concert One', display" => "Concert One",
						"'Herr Von Muellerhoff', handwriting" => "Herr Von Muellerhoff",
						"'Dawning of a New Day', handwriting" => "Dawning of a New Day",
						"'Mate SC', serif" => "Mate SC",
						"'Amethysta', serif" => "Amethysta",
						"'Cutive Mono', monospace" => "Cutive Mono",
						"'Cedarville Cursive', handwriting" => "Cedarville Cursive",
						"'Cambo', serif" => "Cambo",
						"'Engagement', handwriting" => "Engagement",
						"'Vast Shadow', display" => "Vast Shadow",
						"'Galindo', display" => "Galindo",
						"'Sancreek', display" => "Sancreek",
						"'Maiden Orange', display" => "Maiden Orange",
						"'Henny Penny', display" => "Henny Penny",
						"'Vibur', handwriting" => "Vibur",
						"'Averia Serif Libre', display" => "Averia Serif Libre",
						"'Sofia', handwriting" => "Sofia",
						"'Suwannaphum', display" => "Suwannaphum",
						"'Kite One', sans-serif" => "Kite One",
						"'IM Fell Double Pica', serif" => "IM Fell Double Pica",
						"'Ruslan Display', display" => "Ruslan Display",
						"'Tulpen One', display" => "Tulpen One",
						"'Zeyada', handwriting" => "Zeyada",
						"'Trade Winds', display" => "Trade Winds",
						"'Kavoon', display" => "Kavoon",
						"'Coda Caption', sans-serif" => "Coda Caption",
						"'Amarante', display" => "Amarante",
						"'Fresca', sans-serif" => "Fresca",
						"'IM Fell DW Pica SC', serif" => "IM Fell DW Pica SC",
						"'Ledger', serif" => "Ledger",
						"'Shojumaru', display" => "Shojumaru",
						"'Slabo 13px', serif" => "Slabo 13px",
						"'Monofett', display" => "Monofett",
						"'Mate', serif" => "Mate",
						"'Dorsa', sans-serif" => "Dorsa",
						"'Ramabhadra', sans-serif" => "Ramabhadra",
						"'Butcherman', display" => "Butcherman",
						"'Rouge Script', handwriting" => "Rouge Script",
						"'Raleway Dots', display" => "Raleway Dots",
						"'Junge', serif" => "Junge",
						"'Overlock SC', display" => "Overlock SC",
						"'Flamenco', display" => "Flamenco",
						"'Artifika', serif" => "Artifika",
						"'Share Tech Mono', monospace" => "Share Tech Mono",
						"'Esteban', serif" => "Esteban",
						"'McLaren', display" => "McLaren",
						"'Londrina Outline', display" => "Londrina Outline",
						"'Donegal One', serif" => "Donegal One",
						"'Delius Unicase', handwriting" => "Delius Unicase",
						"'Nova Round', display" => "Nova Round",
						"'Balthazar', serif" => "Balthazar",
						"'Cambay', sans-serif" => "Cambay",
						"'Redressed', handwriting" => "Redressed",
						"'Mallanna', sans-serif" => "Mallanna",
						"'IM Fell Great Primer SC', serif" => "IM Fell Great Primer SC",
						"'Inika', serif" => "Inika",
						"'Wallpoet', display" => "Wallpoet",
						"'Miltonian Tattoo', display" => "Miltonian Tattoo",
						"'Quintessential', handwriting" => "Quintessential",
						"'Cherry Swash', display" => "Cherry Swash",
						"'Stint Ultra Expanded', display" => "Stint Ultra Expanded",
						"'Rosarivo', serif" => "Rosarivo",
						"'IM Fell Great Primer', serif" => "IM Fell Great Primer",
						"'Sail', display" => "Sail",
						"'Swanky and Moo Moo', handwriting" => "Swanky and Moo Moo",
						"'Palanquin Dark', sans-serif" => "Palanquin Dark",
						"'Condiment', handwriting" => "Condiment",
						"'Jacques Francois', serif" => "Jacques Francois",
						"'Milonga', display" => "Milonga",
						"'Stint Ultra Condensed', display" => "Stint Ultra Condensed",
						"'Snippet', sans-serif" => "Snippet",
						"'League Script', handwriting" => "League Script",
						"'Snowburst One', display" => "Snowburst One",
						"'Aguafina Script', handwriting" => "Aguafina Script",
						"'IM Fell French Canon SC', serif" => "IM Fell French Canon SC",
						"'Port Lligat Sans', sans-serif" => "Port Lligat Sans",
						"'Ribeye', display" => "Ribeye",
						"'Mandali', sans-serif" => "Mandali",
						"'Battambang', display" => "Battambang",
						"'Scheherazade', serif" => "Scheherazade",
						"'Buda', display" => "Buda",
						"'Sonsie One', display" => "Sonsie One",
						"'Ribeye Marrow', display" => "Ribeye Marrow",
						"'Linden Hill', serif" => "Linden Hill",
						"'Text Me One', sans-serif" => "Text Me One",
						"'Siemreap', display" => "Siemreap",
						"'Cagliostro', sans-serif" => "Cagliostro",
						"'MedievalSharp', display" => "MedievalSharp",
						"'Fira Mono', monospace" => "Fira Mono",
						"'Stoke', serif" => "Stoke",
						"'Atomic Age', display" => "Atomic Age",
						"'Nova Slim', display" => "Nova Slim",
						"'Fondamento', handwriting" => "Fondamento",
						"'Keania One', display" => "Keania One",
						"'Prociono', serif" => "Prociono",
						"'Wellfleet', display" => "Wellfleet",
						"'Julee', handwriting" => "Julee",
						"'Bigshot One', display" => "Bigshot One",
						"'Alike Angular', serif" => "Alike Angular",
						"'Dynalight', display" => "Dynalight",
						"'Griffy', display" => "Griffy",
						"'Rum Raisin', sans-serif" => "Rum Raisin",
						"'UnifrakturCook', display" => "UnifrakturCook",
						"'Jolly Lodger', display" => "Jolly Lodger",
						"'Ruluko', sans-serif" => "Ruluko",
						"'Sofadi One', display" => "Sofadi One",
						"'Astloch', display" => "Astloch",
						"'Averia Libre', display" => "Averia Libre",
						"'Pirata One', display" => "Pirata One",
						"'IM Fell Double Pica SC', serif" => "IM Fell Double Pica SC",
						"'Offside', display" => "Offside",
						"'Wendy One', sans-serif" => "Wendy One",
						"'Bilbo', handwriting" => "Bilbo",
						"'GFS Neohellenic', sans-serif" => "GFS Neohellenic",
						"'Koulen', display" => "Koulen",
						"'Spirax', display" => "Spirax",
						"'Krona One', sans-serif" => "Krona One",
						"'Passero One', display" => "Passero One",
						"'Asul', sans-serif" => "Asul",
						"'Della Respira', serif" => "Della Respira",
						"'Kenia', display" => "Kenia",
						"'Sarina', display" => "Sarina",
						"'Molle', handwriting" => "Molle",
						"'Antic Didone', serif" => "Antic Didone",
						"'Rammetto One', display" => "Rammetto One",
						"'Piedra', display" => "Piedra",
						"'Irish Grover', display" => "Irish Grover",
						"'Marko One', serif" => "Marko One",
						"'Montaga', serif" => "Montaga",
						"'Modern Antiqua', display" => "Modern Antiqua",
						"'Habibi', serif" => "Habibi",
						"'Lovers Quarrel', handwriting" => "Lovers Quarrel",
						"'Smythe', display" => "Smythe",
						"'Elsie', display" => "Elsie",
						"'Nova Flat', display" => "Nova Flat",
						"'Ruthie', handwriting" => "Ruthie",
						"'Trochut', display" => "Trochut",
						"'Mrs Saint Delafield', handwriting" => "Mrs Saint Delafield",
						"'Autour One', display" => "Autour One",
						"'Original Surfer', display" => "Original Surfer",
						"'Chango', display" => "Chango",
						"'Warnes', display" => "Warnes",
						"'New Rocker', display" => "New Rocker",
						"'Lancelot', display" => "Lancelot",
						"'Miniver', display" => "Miniver",
						"'Iceberg', display" => "Iceberg",
						"'Trykker', serif" => "Trykker",
						"'Glass Antiqua', display" => "Glass Antiqua",
						"'Montserrat Subrayada', sans-serif" => "Montserrat Subrayada",
						"'Geostar Fill', display" => "Geostar Fill",
						"'Petrona', serif" => "Petrona",
						"'Devonshire', handwriting" => "Devonshire",
						"'Karma', serif" => "Karma",
						"'Nosifer', display" => "Nosifer",
						"'Spicy Rice', display" => "Spicy Rice",
						"'Almendra', serif" => "Almendra",
						"'Poppins', sans-serif" => "Poppins",
						"'Germania One', display" => "Germania One",
						"'Joti One', display" => "Joti One",
						"'Goblin One', display" => "Goblin One",
						"'Asset', display" => "Asset",
						"'Bubbler One', sans-serif" => "Bubbler One",
						"'Angkor', display" => "Angkor",
						"'Bokor', display" => "Bokor",
						"'Jacques Francois Shadow', display" => "Jacques Francois Shadow",
						"'Nova Script', display" => "Nova Script",
						"'Miltonian', display" => "Miltonian",
						"'Nova Oval', display" => "Nova Oval",
						"'Gurajada', serif" => "Gurajada",
						"'Monsieur La Doulaise', handwriting" => "Monsieur La Doulaise",
						"'Geostar', display" => "Geostar",
						"'Combo', display" => "Combo",
						"'Peralta', display" => "Peralta",
						"'Smokum', display" => "Smokum",
						"'Galdeano', sans-serif" => "Galdeano",
						"'Sarpanch', sans-serif" => "Sarpanch",
						"'Ranchers', display" => "Ranchers",
						"'Eagle Lake', handwriting" => "Eagle Lake",
						"'Diplomata', display" => "Diplomata",
						"'Vampiro One', display" => "Vampiro One",
						"'Dangrek', display" => "Dangrek",
						"'Chicle', display" => "Chicle",
						"'Akronim', display" => "Akronim",
						"'Nova Cut', display" => "Nova Cut",
						"'Emblema One', display" => "Emblema One",
						"'Metal Mania', display" => "Metal Mania",
						"'Federant', display" => "Federant",
						"'Caesar Dressing', display" => "Caesar Dressing",
						"'Aubrey', display" => "Aubrey",
						"'Elsie Swash Caps', display" => "Elsie Swash Caps",
						"'Kdam Thmor', display" => "Kdam Thmor",
						"'Taprom', display" => "Taprom",
						"'NTR', sans-serif" => "NTR",
						"'Ewert', display" => "Ewert",
						"'Emilys Candy', display" => "Emilys Candy",
						"'Vesper Libre', serif" => "Vesper Libre",
						"'Supermercado One', display" => "Supermercado One",
						"'Plaster', display" => "Plaster",
						"'Butterfly Kids', handwriting" => "Butterfly Kids",
						"'Faster One', display" => "Faster One",
						"'Moul', display" => "Moul",
						"'Londrina Shadow', display" => "Londrina Shadow",
						"'Gorditas', display" => "Gorditas",
						"'Biryani', sans-serif" => "Biryani",
						"'Mrs Sheppards', handwriting" => "Mrs Sheppards",
						"'Croissant One', display" => "Croissant One",
						"'Eater', display" => "Eater",
						"'Kurale', serif" => "Kurale",
						"'Felipa', handwriting" => "Felipa",
						"'Ramaraja', serif" => "Ramaraja",
						"'Revalia', display" => "Revalia",
						"'Londrina Sketch', display" => "Londrina Sketch",
						"'Risque', display" => "Risque",
						"'Margarine', display" => "Margarine",
						"'Freehand', display" => "Freehand",
						"'Purple Purse', display" => "Purple Purse",
						"'Rozha One', serif" => "Rozha One",
						"'Bigelow Rules', display" => "Bigelow Rules",
						"'Miss Fajardose', handwriting" => "Miss Fajardose",
						"'Jim Nightshade', handwriting" => "Jim Nightshade",
						"'Nokora', serif" => "Nokora",
						"'Seymour One', sans-serif" => "Seymour One",
						"'Romanesco', handwriting" => "Romanesco",
						"'Odor Mean Chey', display" => "Odor Mean Chey",
						"'Martel Sans', sans-serif" => "Martel Sans",
						"'Content', display" => "Content",
						"'Yantramanav', sans-serif" => "Yantramanav",
						"'Meie Script', handwriting" => "Meie Script",
						"'Laila', serif" => "Laila",
						"'Sevillana', display" => "Sevillana",
						"'Martel', serif" => "Martel",
						"'Preahvihear', display" => "Preahvihear",
						"'Fascinate', display" => "Fascinate",
						"'Erica One', display" => "Erica One",
						"'Princess Sofia', handwriting" => "Princess Sofia",
						"'Chela One', display" => "Chela One",
						"'Dr Sugiyama', handwriting" => "Dr Sugiyama",
						"'Sirin Stencil', display" => "Sirin Stencil",
						"'Arbutus', display" => "Arbutus",
						"'Macondo Swash Caps', display" => "Macondo Swash Caps",
						"'Palanquin', sans-serif" => "Palanquin",
						"'Stalinist One', display" => "Stalinist One",
						"'Moulpali', display" => "Moulpali",
						"'Mr Bedfort', handwriting" => "Mr Bedfort",
						"'Underdog', display" => "Underdog",
						"'Kantumruy', sans-serif" => "Kantumruy",
						"'Flavors', display" => "Flavors",
						"'Dekko', handwriting" => "Dekko",
						"'Almendra SC', serif" => "Almendra SC",
						"'Rubik One', sans-serif" => "Rubik One",
						"'Macondo', display" => "Macondo",
						"'Tenali Ramakrishna', sans-serif" => "Tenali Ramakrishna",
						"'Dhurjati', sans-serif" => "Dhurjati",
						"'Ruge Boogie', handwriting" => "Ruge Boogie",
						"'Bayon', display" => "Bayon",
						"'Metal', display" => "Metal",
						"'Gidugu', sans-serif" => "Gidugu",
						"'Diplomata SC', display" => "Diplomata SC",
						"'Suravaram', serif" => "Suravaram",
						"'Sree Krushnadevaraya', serif" => "Sree Krushnadevaraya",
						"'Fasthand', serif" => "Fasthand",
						"'Chenla', display" => "Chenla"

					),
					'inherit',
					__('Search for and select fonts','yp')
				)."
				
				
				".yp_get_select_markup(
					'font-weight',
					__('Font Weight','yp')
					,array(
						'300' => __('Light',"yp").' 300',
						'400' => __('normal',"yp").' 400',
						'500' => __('Semi-Bold',"yp").' 500',
						'600' => __('Bold',"yp").' 600',
						'700' => __('Extra-Bold',"yp").' 700'
					),
					'inherit',
					__('Set the font weight','yp')
				)."
	
				
				".yp_get_radio_markup(
					'font-style',
					__('Font Style','yp'),
					array(
						'normal' => __('Normal','yp'),
						'italic' => __('Italic','yp')
					),
					'inherit'
				)."
				
			
				".yp_get_color_markup(
					'color',
					__('Color','yp'),
					'Set the text color'
				)."
				
				".yp_get_select_markup(
					'text-shadow',
					__('Text Shadow','yp')
					,array(
						'none' => 'none',
						'rgba(0, 0, 0, 0.3) 0px 1px 1px' => 'Basic Shadow',
						'rgb(255, 255, 255) 1px 1px 0px, rgb(170, 170, 170) 2px 2px 0px' => 'Shadow Multiple',
						'rgb(255, 0, 0) -1px 0px 0px, rgb(0, 255, 255) 1px 0px 0px' => 'Anaglyph',
						'rgb(255, 255, 255) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px' => 'Emboss',
						'rgb(255, 255, 255) 0px 0px 2px, rgb(255, 255, 255) 0px 0px 4px, rgb(255, 255, 255) 0px 0px 6px, rgb(255, 119, 255) 0px 0px 8px, rgb(255, 0, 255) 0px 0px 12px, rgb(255, 0, 255) 0px 0px 16px, rgb(255, 0, 255) 0px 0px 20px, rgb(255, 0, 255) 0px 0px 24px' => 'Neon',
						'rgb(0, 0, 0) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) -1px 0px 1px' => 'Outline'
					),
					'none'
				)."
				
				".yp_get_slider_markup(
					'font-size',
					__('Font Size','yp'),
					'inherit',
					1,        // decimals
					'6,72',   // px value
					'0,100',  // percentage value
					'0,5'     // Em value
				)."
				
				".yp_get_slider_markup(
					'line-height',
					__('Line Height','yp'),
					'inherit',
					1,        // decimals
					'6,72',   // px value
					'0,100',  // percentage value
					'0,5',     // Em value,
					__('Set the leading','yp')
				)."
				
			
				".yp_get_radio_markup(
					'text-decoration',
					__('text Decoration','yp'),
					array(
						'overline' => __('overline','yp'),
						'line-through' => __('through','yp'),
						'underline' => __('underline','yp')
					),
					'none'
				)."
				
				
				
				".yp_get_radio_markup(
					'text-transform',
					__('Text Transform','yp'),
					array(
						'uppercase' => __('upprcase','yp'),
						'lowercase' => __('lowercase','yp'),
						'capitalize' => __('capitalize','yp')
					),
					'none'						
				)."
				
				
				".yp_get_radio_markup(
					'text-align',
					__('Text Align','yp'),
					array(
						'left' => __('left','yp'),
						'center' => __('center','yp'),
						'right' => __('right','yp'),
						'justify' => __('justify','yp')
					),
					'start'
				)."
				
				".yp_get_slider_markup(
					'letter-spacing',
					__('Letter Spacing','yp'),
					'inherit',
					2,        // decimals
					'-5,5',   // px value
					'0,100',  // percentage value
					'0,1'     // Em value
				)."
				
				".yp_get_slider_markup(
					'word-spacing',
					__('Word Spacing','yp'),
					'inherit',
					2,        // decimals
					'-5,5',   // px value
					'0,100',  // percentage value
					'0,1'     // Em value,
				)."
				
			</div>
		</li>
		
		<li>
			<h3>".__('Background','yp')." ".yp_arrow_icon()."</h3>
			<div class='yp-this-content'>
			
				<a class='yp-advanced-link yp-top yp-special-css-link yp-just-desktop'>".__('Background Parallax','yp')."</a>
				<div class='yp-advanced-option yp-special-css-area yp-just-desktop'>

					<div class='little-break yp-lite'></div>
					<p class='yp-alert-warning yp-top-alert yp-lite'>Parallax property not available for lite version. <a target='_blank' href='http://waspthemes.com/yellow-pencil/buy'>Upgrade?</a></p>

					".yp_get_radio_markup( // Special CSS
						'background-parallax',
						__('Effect Status','yp'),
						array(
							'true' => __('Enable','yp'),
							'disable' => __('Disable','yp')
						),
						false						
					)."
					
					".yp_get_slider_markup(
						'background-parallax-speed',
						__('Parallax Speed','yp'),
						'',
						2,        // decimals
						'1,10',   // px value
						'1,10',  // percentage value
						'1,10'     // Em value
					)."
					
					".yp_get_slider_markup(
						'background-parallax-x',
						__('Parallax Position X','yp'),
						'',
						2,        // decimals
						'1,100',   // px value
						'1,100',  // percentage value
						'1,100'     // Em value
					)."
					
				</div>
				
				".yp_get_color_markup(
					'background-color',
					__('Background Color','yp')
				)."
				
				".yp_get_input_markup(
					'background-image',
					__('Background Image','yp'),
					'none'
				)."

				".yp_get_radio_markup(
					'background-size',
					__('Background Size','yp'),
					array(
						'length' => __('length','yp'),
						'cover' => __('cover','yp'),
						'contain' => __('contain','yp')
					),
					'auto auto',
					__('The size of the background image','yp')
				)."				
				
				".yp_get_radio_markup(
					'background-repeat',
					__('Background Repeat','yp'),
					array(
						'repeat-x' => __('repeat-x','yp'),
						'repeat-y' => __('repeat-y','yp'),
						'no-repeat' => __('no-repeat','yp')
					),
					'repeat',
					__('Sets if background image will be repeated','yp')
				)."
				
				".yp_get_radio_markup(
					'background-attachment',
					__('BG. Attachment','yp'),
					array(
						'fixed' => __('fixed','yp'),
						'local' => __('local','yp')
					),
					'scroll',
					__('Sets whether a background image is fixed or scrolls with the rest of the page','yp')
				)."
				

				".yp_get_select_markup(
					'background-position',
					__('BG. Position','yp'),
					array(
						'left top' => __('left top','yp'),
						'left center' => __('left center','yp'),
						'left bottom' => __('left bottom','yp'),
						'right top' => __('right top','yp'),
						'right center' => __('right center','yp'),
						'right bottom' => __('right bottom','yp'),
						'center top' => __('center top','yp'),
						'center center' => __('center center','yp'),
						'center bottom' => __('center bottom','yp')
					),
					'0% 0%',
					__('Sets the starting position of a background image','yp')
				)."
				
			</div>
		</li>
		
		<li>
			<h3>".__('Margin','yp')." ".yp_arrow_icon()."</h3>
			<div class='yp-this-content'>
				
				
				".yp_get_slider_markup(
					'margin-left',
					__('Margin Left','yp'),
					'',
					0,        // decimals
					'-50,250',   // px value
					'-100,100',  // percentage value
					'-3,15',     // Em value,
					__('The margin clears an area around an element. The margin does not have a background color, and is completely transparent.','yp')
				)."
				
				".yp_get_slider_markup(
					'margin-right',
					__('Margin Right','yp'),
					'',
					0,        // decimals
					'-50,250',   // px value
					'-100,100',  // percentage value
					'-3,15',     // Em value
					__('The margin clears an area around an element. The margin does not have a background color, and is completely transparent.','yp')
				)."
				
				".yp_get_slider_markup(
					'margin-top',
					__('Margin Top','yp'),
					'',
					0,        // decimals
					'-50,250',   // px value
					'-100,100',  // percentage value
					'-3,15',     // Em value
					__('The margin clears an area around an element. The margin does not have a background color, and is completely transparent.','yp')
				)."
				
				".yp_get_slider_markup(
					'margin-bottom',
					__('Margin Bottom','yp'),
					'',
					0,        // decimals
					'-50,250',   // px value
					'-100,100',  // percentage value
					'-3,15',     // Em value
					__('The margin clears an area around an element. The margin does not have a background color, and is completely transparent.','yp')
				)."
				
				
			</div>
		</li>
		
		<li>
			<h3>".__('Padding','yp')." ".yp_arrow_icon()."</h3>
			<div class='yp-this-content'>
				
				
				".yp_get_slider_markup(
					'padding-left',
					__('Padding Left','yp'),
					'',
					0,        // decimals
					'0,250',   // px value
					'0,100',  // percentage value
					'0,15',     // Em value
					__('The padding clears an area around the content of an element. The padding is affected by the background color of the element.','yp')
				)."
				
				".yp_get_slider_markup(
					'padding-right',
					__('Padding Right','yp'),
					'',
					0,        // decimals
					'0,250',   // px value
					'0,100',  // percentage value
					'0,15',     // Em value
					__('The padding clears an area around the content of an element. The padding is affected by the background color of the element.','yp')
				)."
				
				".yp_get_slider_markup(
					'padding-top',
					__('Padding Top','yp'),
					'',
					0,        // decimals
					'0,250',   // px value
					'0,100',  // percentage value
					'0,15',     // Em value
					__('The padding clears an area around the content of an element. The padding is affected by the background color of the element.','yp')
				)."
				
				".yp_get_slider_markup(
					'padding-bottom',
					__('Padding Bottom','yp'),
					'',
					0,        // decimals
					'0,250',   // px value
					'0,100',  // percentage value
					'0,15',     // Em value
					__('The padding clears an area around the content of an element. The padding is affected by the background color of the element.','yp')
				)."
				
			
			</div>
		</li>

		
		<li>
			<h3>".__('Border','yp')." ".yp_arrow_icon()."</h3>
			<div class='yp-this-content'>
				
				
				".yp_get_radio_markup(
					'border-style',
					__('Border Style','yp'),
					array(
						'solid' => __('solid','yp'),
						'dotted' => __('dotted','yp'),
						'dashed' => __('dashed','yp'),
						'hidden' => __('hidden','yp')
					),
					'none',
					__('Sets the style of an elements four borders. This property can have from one to four values.','yp')
				)."
				
				
				".yp_get_slider_markup(
					'border-width',
					__('Border Width','yp'),
					'',
					0,        // decimals
					'0,20',   // px value
					'0,100',  // percentage value
					'0,4',     // Em value
					__('Sets the width of an elements four borders. This property can have from one to four values.','yp')
				)."
				
				".yp_get_color_markup(
					'border-color',
					__('Border Color','yp'),
					__('Sets the color of an elements four borders.','yp')
				)."
				
				
				<a class='yp-advanced-link yp-special-css-link'>".__('Border Top','yp')."</a>
				<div class='yp-advanced-option yp-special-css-area'>
				".yp_get_radio_markup(
					'border-top-style',
					__('Style','yp'),
					array(
						'solid' => __('solid','yp'),
						'dotted' => __('dottd','yp'),
						'dashed' => __('dashd','yp'),
						'hidden' => __('hiddn','yp')
					),
					'none',
					__('Sets the style of an elements top border.','yp')
				)."
				
				".yp_get_slider_markup(
					'border-top-width',
					__('Width','yp'),
					'',
					0,        // decimals
					'0,20',   // px value
					'0,100',  // percentage value
					'0,4',     // Em value
					__('Sets the width of an elements top border.','yp')
				)."
				
				".yp_get_color_markup(
					'border-top-color',
					__('Color','yp'),
					__('Sets the color of an elements top border.','yp')
				)."
				</div>
				
				<a class='yp-advanced-link yp-special-css-link'>".__('Border Right','yp')."</a>
				<div class='yp-advanced-option yp-special-css-area'>
				".yp_get_radio_markup(
					'border-right-style',
					__('Style','yp'),
					array(
						'solid' => __('solid','yp'),
						'dotted' => __('dottd','yp'),
						'dashed' => __('dashd','yp'),
						'hidden' => __('hiddn','yp')
					),
					'none',
					__('Sets the style of an elements right border.','yp')
				)."
				
				".yp_get_slider_markup(
					'border-right-width',
					__('Width','yp'),
					'',
					0,        // decimals
					'0,20',   // px value
					'0,100',  // percentage value
					'0,4',     // Em value
					__('Sets the width of an elements right border.','yp')
				)."
				
				".yp_get_color_markup(
					'border-right-color',
					__('Color','yp'),
					__('Sets the color of an elements right border.','yp')
				)."
				</div>
				
				
				<a class='yp-advanced-link yp-special-css-link'>".__('Border Bottom','yp')."</a>
				<div class='yp-advanced-option yp-special-css-area'>
				".yp_get_radio_markup(
					'border-bottom-style',
					__('Style','yp'),
					array(
						'solid' => __('solid','yp'),
						'dotted' => __('dottd','yp'),
						'dashed' => __('dashd','yp'),
						'hidden' => __('hiddn','yp')
					),
					'none',
					__('Sets the style of an elements bottom border.','yp')
				)."
				
				".yp_get_slider_markup(
					'border-bottom-width',
					__('Width','yp'),
					'',
					0,        // decimals
					'0,20',   // px value
					'0,100',  // percentage value
					'0,4',     // Em value
					__('Sets the width of an elements bottom border.','yp')
				)."
				
				".yp_get_color_markup(
					'border-bottom-color',
					__('Color','yp'),
					__('Sets the color of an elements bottom border.','yp')
				)."
				</div>
				
				
				<a class='yp-advanced-link yp-special-css-link'>".__('Border Left','yp')."</a>
				<div class='yp-advanced-option yp-special-css-area'>
				".yp_get_radio_markup(
					'border-left-style',
					__('Style','yp'),
					array(
						'solid' => __('solid','yp'),
						'dotted' => __('dottd','yp'),
						'dashed' => __('dashd','yp'),
						'hidden' => __('hiddn','yp')
					),
					'none',
					__('Sets the style of an elements left border.','yp')
				)."
				
				".yp_get_slider_markup(
					'border-left-width',
					__('Width','yp'),
					'',
					0,        // decimals
					'0,20',   // px value
					'0,100',  // percentage value
					'0,4',     // Em value
					__('Sets the width of an elements left border.','yp')
				)."
				
				".yp_get_color_markup(
					'border-left-color',
					__('Color','yp'),
					__('Sets the color of an elements left border.','yp')
				)."
				</div>
				
				<div style='padding-bottom:1px'></div>
				
			</div>
		</li>
		
		<li>
			<h3>".__('Border Radius','yp')." ".yp_arrow_icon()."</h3>
			<div class='yp-this-content'>
				
				".yp_get_slider_markup(
					'border-top-left-radius',
					__('Top Left Radius','yp'),
					'',
					0,        // decimals
					'0,50',   // px value
					'0,100',  // percentage value
					'0,5',     // Em value
					__('Defines the shape of the border of the top-left corner','yp')
				)."
				
				".yp_get_slider_markup(
					'border-top-right-radius',
					__('Top Right Radius','yp'),
					'',
					0,        // decimals
					'0,50',   // px value
					'0,100',  // percentage value
					'0,5',     // Em value
					__('Defines the shape of the border of the top-right corner','yp')
				)."
				
				".yp_get_slider_markup(
					'border-bottom-left-radius',
					__('Bottom Left Radius','yp'),
					'',
					0,        // decimals
					'0,50',   // px value
					'0,100',  // percentage value
					'0,5',     // Em value
					__('Defines the shape of the border of the bottom-left corner','yp')
				)."
				
				".yp_get_slider_markup(
					'border-bottom-right-radius',
					__('Bottom Right Radius','yp'),
					'',
					0,        // decimals
					'0,50',   // px value
					'0,100',  // percentage value
					'0,5',     // Em value
					__('Defines the shape of the border of the bottom-right corner','yp')
				)."
				
				
			</div>
		</li>
		
		<li>
			<h3>".__('Position','yp')." ".yp_arrow_icon()."</h3>
			<div class='yp-this-content'>
			
				".yp_get_slider_markup(
					'z-index',
					__('Z Index','yp'),
					'auto',
					0,        // decimals
					'-50,250',   // px value
					'-50,250',  // percentage value
					'-50,250',     // Em value
					__('Specifies the stack order of an element. Z index only works on positioned elements (position:absolute, position:relative, or position:fixed).','yp')
				)."	
				
				".yp_get_radio_markup(
					'position',
					__('Position','yp'),
					array(
						'static' => 'static',
						'relative' => 'relative',
						'absolute' => 'absolute',
						'fixed' => 'fixed'
					),
					'',
					__('Specifies the type of positioning method used for an element','yp')
					
				)."
				
				".yp_get_slider_markup(
					'top',
					__('Top','yp'),
					'auto',
					0,        // decimals
					'-50,250',   // px value
					'0,100',  // percentage value
					'-4,15',     // Em value
					__('For absolutely: positioned elements, the top property sets the top edge of an element to a unit above/below the top edge of its containing element. For relatively: positioned elements, the top property sets the top edge of an element to a unit above/below its normal position.','yp')
				)."
				
				".yp_get_slider_markup(
					'bottom',
					__('Bottom','yp'),
					'auto',
					0,        // decimals
					'-50,250',   // px value
					'0,100',  // percentage value
					'-4,15',     // Em value
					__('For absolutely: positioned elements, the bottom property sets the bottom edge of an element to a unit above/below the bottom edge of its containing element. For relatively: positioned elements, the bottom property sets the bottom edge of an element to a unit above/below its normal position.','yp')
				)."
				
				".yp_get_slider_markup(
					'left',
					__('Left','yp'),
					'auto',
					0,        // decimals
					'-50,250',   // px value
					'0,100',  // percentage value
					'-4,15',     // Em value
					__('For absolutely: positioned elements, the left property sets the left edge of an element to a unit to the left/right of the left edge of its containing element. For relatively: positioned elements, the left property sets the left edge of an element to a unit to the left/right to its normal position.','yp')
				)."
				
				".yp_get_slider_markup(
					'right',
					__('Right','yp'),
					'auto',
					0,        // decimals
					'-50,250',   // px value
					'0,100',  // percentage value
					'-4,15',     // Em value
					__('For absolutely: positioned elements, the right property sets the right edge of an element to a unit to the left/right of the right edge of its containing element. For relatively: positioned elements, the right property sets the right edge of an element to a unit to the left/right to its normal position.','yp')
				)."		
				
			</div>
		</li>
		
		<li>
			<h3>".__('Size','yp')." ".yp_arrow_icon()."</h3>
			<div class='yp-this-content'>
				
				".yp_get_slider_markup(
					'width',
					__('Width','yp'),
					'auto',
					0,        // decimals
					'0,250',   // px value
					'0,100',  // percentage value
					'0,15',     // Em value
					__('Sets the width of an element','yp')
				)."
				
				".yp_get_slider_markup(
					'height',
					__('Height','yp'),
					'auto',
					0,        // decimals
					'0,250',   // px value
					'0,100',  // percentage value
					'0,15',     // Em value
					__('sets the height of an element','yp')
				)."
				
				".yp_get_slider_markup(
					'min-width',
					__('Minimum Width','yp'),
					'',
					0,        // decimals
					'0,250',   // px value
					'0,100',  // percentage value
					'0,15',     // Em value
					__('is used to set the minimum width of an element','yp')
				)."
				
				".yp_get_slider_markup(
					'max-width',
					__('Maximum Width','yp'),
					'auto',
					0,        // decimals
					'0,250',   // px value
					'0,100',  // percentage value
					'0,15',     // Em value
					__('is used to set the maximum width of an element','yp')
				)."
				
				".yp_get_slider_markup(
					'min-height',
					__('Minimum Height','yp'),
					'',
					0,        // decimals
					'0,250',   // px value
					'0,100',  // percentage value
					'0,15',    // Em value
					__('is used to set the minimum height of an element','yp')
				)."
				
				".yp_get_slider_markup(
					'max-height',
					__('Maximum Height','yp'),
					'auto',
					0,        // decimals
					'0,250',   // px value
					'0,100',  // percentage value
					'0,15',     // Em value
					__('is used to set the maximum height of an element','yp')
				)."
				
				
			</div>
		</li>
		
		<li>
			<h3>".__('Animation','yp')." <span class='yp-badge yp-lite'>Pro</span> ".yp_arrow_icon()."</h3>
			<div class='yp-this-content'>
				
				<p class='yp-alert-warning yp-top-alert yp-only-pro'>".__('If animation property not working, please set display block property.','yp')."</p>
				<p class='yp-alert-warning yp-top-alert yp-lite'>Animation property not available for lite version. <a target='_blank' href='http://waspthemes.com/yellow-pencil/buy'>Upgrade?</a></p>
				
				".yp_get_select_markup(
					'animation-name',
					__('Animation Name','yp'),
					array(
						'none' => 'none',
						'bounce' => 'bounce',
						'spin' => 'spin',
						'flash' => 'flash',
						'swing' => 'swing',
						'pulse' => 'pulse',
						'rubberBand' => 'rubberBand',
						'shake' => 'shake',
						'tada' => 'tada',
						'wobble' => 'wobble',
						'jello' => 'jello',
						'bounceIn' => 'bounceIn',
						
						'spaceInUp' => 'spaceInUp',
						'spaceInRight' => 'spaceInRight',
						'spaceInDown' => 'spaceInDown',
						'spaceInLeft' => 'spaceInLeft',
						'push' => 'push',
						'pop' => 'pop',
						'bob' => 'bob',
						'wobble-horizontal' => 'wobble-horizontal',
						
						
						'bounceInDown' => 'bounceInDown',
						'bounceInLeft' => 'bounceInLeft',
						'bounceInRight' => 'bounceInRight',
						'bounceInUp' => 'bounceInUp',
						'fadeIn' => 'fadeIn',
						'fadeInDown' => 'fadeInDown',
						'fadeInDownBig' => 'fadeInDownBig',
						'fadeInLeft' => 'fadeInLeft',
						'fadeInLeftBig' => 'fadeInLeftBig',
						'fadeInRight' => 'fadeInRight',
						'fadeInRightBig' => 'fadeInRightBig',
						'fadeInUp' => 'fadeInUp',
						'fadeInUpBig' => 'fadeInUpBig',
						'flipInX' => 'flipInX',
						'flipInY' => 'flipInY',
						'lightSpeedIn' => 'lightSpeedIn',
						'rotateIn' => 'rotateIn',
						'rotateInDownLeft' => 'rotateInDownLeft',
						'rotateInDownRight' => 'rotateInDownRight',
						'rotateInUpLeft' => 'rotateInUpLeft',
						'rotateInUpRight' => 'rotateInUpRight',
						'rollIn' => 'rollIn',
						'zoomIn' => 'zoomIn',
						'zoomInDown' => 'zoomInDown',
						'zoomInLeft' => 'zoomInLeft',
						'zoomInRight' => 'zoomInRight',
						'zoomInUp' => 'zoomInUp',
						'slideInDown' => 'slideInDown',
						'slideInLeft' => 'slideInLeft',
						'slideInRight' => 'slideInRight',
						'slideInUp' => 'slideInUp'
					),
					'none'
				)."
				
				".yp_get_select_markup(
					'animation-play',
					__('Animation Play','yp'),
					array(
						'yp_onscreen' => __('onScreen','yp'),
						'yp_hover' => __('Hover','yp'),
						'yp_click' => __('Click','yp'),
						'yp_focus' => __('Focus','yp')
					),
					'yp_onscreen',
					__('OnScreen: Playing animation when element visible on screen. Hover: Playing animation when mouse on element. Click: Playing animation when element clicked. FOcus: Playing element when click on an text field.','yp')
				)."
				
				".yp_get_select_markup(
					'animation-iteration-count',
					__('animation Iteration','yp'),
					array(
						'1' => '1',
						'2' => '2',
						'infinite' => __('infinite','yp')
					),
					'1'
				)."
				
				
				
				
			</div>
		</li>
		
		<li>
			<h3>".__('Filters','yp')." <span class='yp-badge yp-lite'>Pro</span> ".yp_arrow_icon()."</h3>
			<div class='yp-this-content'>
							<p class='yp-alert-warning yp-top-alert yp-only-pro'>".__('Internet explorer not support filters property.','yp')."</p>
			<p class='yp-alert-warning yp-top-alert yp-lite'>Filter property not available for lite version. <a target='_blank' href='http://waspthemes.com/yellow-pencil/buy'>Upgrade?</a></p>
				".yp_get_slider_markup(
					'blur-filter',
					__('Blur','yp'),
					'0',
					2,        // decimals
					'0,10',   // px value
					'0,10',  // percentage value
					'0,10'     // Em value
				)."
				
				".yp_get_slider_markup(
					'brightness-filter',
					__('Brightness','yp'),
					'0',
					2,        // decimals
					'0,10',   // px value
					'0,10',  // percentage value
					'0,10'     // Em value
				)."
				
				".yp_get_slider_markup(
					'grayscale-filter',
					__('Grayscale','yp'),
					'0',
					2,        // decimals
					'0,1',   // px value
					'0,1',  // percentage value
					'0,1'     // Em value
				)."
				
				".yp_get_slider_markup(
					'contrast-filter',
					__('Contrast','yp'),
					'0',
					2,        // decimals
					'0,10',   // px value
					'0,10',  // percentage value
					'0,10'     // Em value
				)."
				
				".yp_get_slider_markup(
					'hue-rotate-filter',
					__('Hue Rotate','yp'),
					'0',
					2,        // decimals
					'0,360',   // px value
					'0,360',  // percentage value
					'0,360'     // Em value
				)."
				
				".yp_get_slider_markup(
					'saturate-filter',
					__('Saturate','yp'),
					'0',
					2,        // decimals
					'0,10',   // px value
					'0,10',  // percentage value
					'0,10'     // Em value
				)."
				
				".yp_get_slider_markup(
					'sepia-filter',
					__('Sepia','yp'),
					'0',
					2,        // decimals
					'0,1',   // px value
					'0,1',  // percentage value
					'0,1'     // Em value
				)."
			</div>
		</li>
		
		<li>
			<h3>".__('Box Shadow','yp')." ".yp_arrow_icon()."</h3>
			<div class='yp-this-content'>
			
				<p class='yp-top-alert yp-alert-warning'>".__('"box shadow" adding shadow to element. If you want Diable box shadow property, set zero to all box shadow options.','yp')."</p>

				".yp_get_color_markup(
					'box-shadow-color',
					__('Color','yp')
				)."
				
				".yp_get_slider_markup(
					'box-shadow-horizontal',
					__('Horizontal Length','yp'),
					'0',
					0,        // decimals
					'-50,50',   // px value
					'-50,50',  // percentage value
					'-50,50'     // Em value
				)."
				
				".yp_get_slider_markup(
					'box-shadow-vertical',
					__('Vertical Length','yp'),
					'0',
					0,        	// decimals
					'-50,50',   // px value
					'-50,50',  // percentage value
					'-50,50'     // Em value
				)."
				
				".yp_get_slider_markup(
					'box-shadow-blur-radius',
					__('Blur Radius','yp'),
					'0',
					0,        	// decimals
					'0,50',   // px value
					'0,50',  // percentage value
					'0,50'     // Em value
				)."
				
				".yp_get_slider_markup(
					'box-shadow-spread',
					__('Spread','yp'),
					'0',
					0,        	// decimals
					'-50,100',   // px value
					'-50,100',  // percentage value
					'-50,100'     // Em value
				)."
				
				".yp_get_radio_markup(
					'box-shadow-inset',
					__('Inset','yp'),
					array(
						'no' => __('no','yp'),
						'inset' => __('inset','yp')
					),
					false
				)."				
				
			</div>
		</li>
		
		<li>
			<h3>".__('Extra','yp')." ".yp_arrow_icon()."</h3>
			<div class='yp-this-content'>

				<a class='yp-advanced-link yp-top yp-special-css-link'>".__('Transform','yp')."</a>
				<div class='yp-advanced-option yp-special-css-area'>
				".yp_get_slider_markup(
					'scale-transform',
					__('Scale','yp'),
					'0',
					2,        // decimals
					'0,5',   // px value
					'0,5',  // percentage value
					'0,5'     // Em value
				)."
				
				".yp_get_slider_markup(
					'rotate-transform',
					__('Rotate','yp'),
					'0',
					0,        // decimals
					'0,360',   // px value
					'0,360',  // percentage value
					'0,360'     // Em value
				)."
				
				".yp_get_slider_markup(
					'translate-x-transform',
					__('Translate X','yp'),
					'0',
					0,        // decimals
					'-50,50',   // px value
					'-50,50',  // percentage value
					'-50,50'     // Em value
				)."
				
				".yp_get_slider_markup(
					'translate-y-transform',
					__('Translate Y','yp'),
					'0',
					0,        // decimals
					'-50,50',   // px value
					'-50,50',  // percentage value
					'-50,50'     // Em value
				)."
				
				".yp_get_slider_markup(
					'skew-x-transform',
					__('Skew X','yp'),
					'0',
					0,        // decimals
					'0,360',   // px value
					'0,360',  // percentage value
					'0,360'     // Em value
				)."
				
				".yp_get_slider_markup(
					'skew-y-transform',
					__('skew Y','yp'),
					'0',
					0,        // decimals
					'0,360',   // px value
					'0,360',  // percentage value
					'0,360'     // Em value
				)."
				</div>
				
				
				".yp_get_slider_markup(
					'opacity',
					__('Opacity','yp'),
					'auto',
					2,        // decimals
					'0,1',   // px value
					'0,1',  // percentage value
					'0,1',     // Em value
					__('The opacity property can take a value from 0.0 - 1.0. The lower value, the more transparent.','yp')
				)."
				
				".yp_get_radio_markup(
					'float',
					__('Float','yp'),
					array(
						'left' => __('left','yp'),
						'right' => __('right','yp')
					),
					'none',
					__('Specifies whether or not a box (an element) should float.','yp')
				)."
				
				".yp_get_radio_markup(
					'box-sizing',
					__('Box Sizing','yp'),
					array(
						'border-box' => __('border-box','yp'),
						'content-box' => __('content-box','yp')
					),
					'content-box',
					__('is used to tell the browser what the sizing properties (width and height) should include. Should they include the border-box? Or just the content-box (which is the default value of the width and height properties)?','yp')
				)."
				
				".yp_get_radio_markup(
					'display',
					__('Display','yp'),
					array(
						'inline' => __('inline','yp'),
						'block' => __('block','yp'),
						'inline-block' => __('inl-blck','yp'),
						'table-cell' => __('tbl-cell','yp')
					),
					'none',
					__('Specifies the type of box used for an element.','yp')
				)."
				
				".yp_get_radio_markup(
					'overflow-x',
					__('Overflow X','yp'),
					array(
						'hidden' => __('hidden','yp'),
						'scroll' => __('scroll','yp'),
						'auto' => __('auto','yp')
					),
					'visible',
					__('specifies what to do with the left/right edges of the content - if it overflows the elements content area.','yp')
				)."
				
				".yp_get_radio_markup(
					'overflow-y',
					__('Overflow Y','yp'),
					array(
						'hidden' => __('hidden','yp'),
						'scroll' => __('scroll','yp'),
						'auto' => __('auto','yp')
					),
					'visible',
					__('specifies what to do with the left/right edges of the content - if it overflows the elements content area.','yp')
				)."
				
				
			</div>
		</li>
		
		<li class='yp-li-footer'>
			<h3><a target='_blank' href='http://waspthemes.com/yellow-pencil/documentation'>".__('Documentation','yp')."</a> / <a target='_blank' href='http://waspthemes.com/yellow-pencil?s=plugin'>Yellow Pencil.</a></h3>
		</li>
			
	</ul>";