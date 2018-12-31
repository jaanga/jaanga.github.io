// Copyright 2018 Ladybug Tools authors. MIT License
// jshint esversion: 6
/* globals navMenu, divW3Schools, divBootswatch, THMcssW3schools, THMcssBootswatch */

const THM = { "release": "R1.0", "date": "2018-12-30" };

THM.currentStatus =
	`
		<h3>THM ${ THM.release} status ${ THM.date }</h3>

		<p>Jaanga Switch Theme</p>

`;

THM.description = THM.description || document.head.querySelector( "[ name=description ]" ).content;

THM.stylesheet = "style.css";


THM.themeName = localStorage.getItem( 'themeName' ) || 'THMcssBasic';

// 'https://bootswatch.com/_vendor/bootstrap/dist/css/bootstrap.css';

THM.themeBootswatch = 'https://bootswatch.com/_vendor/bootstrap/dist/css/bootstrap.css';




THM.init = function() {

	console.log( 'THM.themeName', THM.themeName );

	 if ( THM.themeName.includes( 'w3schools' ) ) {

		THM.loadCssW3schools();

	} else if ( THM.themeName.includes( 'bootstrap' ) ) {

		THM.loadCssBootswatch();

	} else {

		THM.loadCssBasic();

	}
}




THM.getMenuTheme = function() {

	const htm =
	`
		<details open >

			<summary>Select Theme
				<a class=helpItem href="JavaScript:setPopupShowHide(THM.currentStatus);" >&nbsp; ? &nbsp;</a>
			</summary>

			<div>

			<p>
				<button id=but onclick=THM.loadCssBasic(); accessKey='z' title='access key: z '>load CSS Basic</button>
			</p>

			<p>
				<button id=butW3 onclick=THM.loadCssW3schools(); accessKey='x' title='access key: x '>load CSS W3schools</button>
			</p>

			<p id=divW3Schools ></p>

			<p>
				<button onclick=THM.loadCssBootswatch() >load CSS Bootswatch</button>
			</p>

			<div id=divBootswatch ></div>

			</div>

		</details>
	`;

	return htm;

};


THM.tidy = function() {

	Array.prototype.forEach.call( document.querySelectorAll( 'style,[rel="stylesheet"],[type="text/css"]'),
	function( element ){

		try{

			element.parentNode.removeChild(element)

		}
		catch(err){}
	} );

}



THM.loadCssBasic = function() {

	THM.tidy();

	const cssBasic = document.head.appendChild( document.createElement( 'link' ) );
	cssBasic.rel = "stylesheet";
	cssBasic.id = 'THMcssBasic';
	cssBasic.href = THM.stylesheet;
	//console.log( 'cssBasic', cssBasic );

	THM.toggleTagsClassListW3schools( 'remove' );

	THM.toggleTagsClassListBootswatch( 'remove' );

	localStorage.setItem( 'themeName', 'THMcssBasic' );

};



THM.loadCssW3schools = function() {

	//THM.tidy();

	THM.toggleTagsClassListBootswatch( 'remove' );

	const cssW3 = document.head.appendChild( document.createElement( 'link' ) );
	cssW3.rel = "stylesheet";
	cssW3.href = "https://www.w3schools.com/w3css/4/w3.css";

	THM.themeName = THM.themeName.includes( 'w3schools' ) ? THM.themeName : "https://www.w3schools.com/lib/w3-theme-red.css";

	if ( !THM.cssW3Theme ) {

		THM.cssW3Theme = document.head.appendChild( document.createElement( 'link' ) );
		THM.cssW3Theme.rel = "stylesheet";
		THM.cssW3Theme.id = "THMcssW3schools";
		THM.cssW3Theme.href = THM.themeName;

	}

	THM.toggleTagsClassListW3schools( 'add' );

	localStorage.setItem( 'themeName', THM.cssW3Theme.href );

};



THM.toggleTagsClassListW3schools= function( action = 'add' ) {

	document.body.querySelectorAll( 'nav' )
	.forEach( item => item.classList[ action ]( "w3-theme-l5" ) );

	document.body.querySelectorAll( 'a' )
	.forEach( item => item.classList[ action ]( "w3-text-theme", "w3-hover-shadow" ) );

	navMenu.querySelectorAll( 'div' )
	.forEach( item => item.classList[ action ]( "w3-container", "w3-text-theme" ) );

	document.body.querySelectorAll( 'summary' )
	.forEach( item => item.classList[ action ]( "w3-bar-item", "w3-theme", "w3-padding-small", "w3-hover-shadow"  ) );

	document.body.querySelectorAll( 'button' )
	.forEach( item => item.classList[ action ]( "w3-btn", "w3-theme-l2", "w3-round" ) );

	document.body.querySelectorAll( 'input' )
	.forEach( item => item.classList[ action ]( "w3-input", "w3-theme-l4", "w3-round", "w3-border", "w3-hover-theme" ) );

	document.body.querySelectorAll( 'select' )
	.forEach( item => item.classList[ action ]( "w3-select", "w3-theme-l2", "w3-round" ) );

	THM.toggleDivW3schools( action );

};



THM.toggleDivW3schools = function( action = 'add' ) {

	if ( action === 'add' ) {

		const themes = [ 'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'khaki', 'yellow',
			'amber', 'orange', 'deep-orange', 'blue-grey', 'brown', 'grey', 'dark-grey', 'black', 'w3schools' ];

		const pThemes = themes.reduce( ( acc, theme ) =>
			acc + `<a href=JavaScript: onclick=THM.setCssW3schools("${ theme }"); style=font-size:2rem;line-height:1rem;text-decoration:none;color:${ theme.replace( '-', '' ) }
			title="${ theme }" >&bull;</a> `, '' );

		divW3Schools.innerHTML =
		`
			<p id=pThemes >${ pThemes }</p>

			<p><a href="https://www.w3schools.com/w3css/" target="_blank" >www.w3schools.com/w3css</a></p>

		`;

	} else {

		divW3Schools.innerHTML = '';

	}

};



THM.setCssW3schools = function( color ) {

	THMcssW3schools.href = "https://www.w3schools.com/lib/w3-theme-" + color + ".css";

	localStorage.setItem( 'themeName', THM.cssW3Theme.href );

};



//////////

THM.loadCssBootswatch = function() {

	THM.toggleTagsClassListW3schools( 'remove' );

	THM.themeName = THM.themeName.includes( 'bootstrap' ) ? THM.themeName : THM.themeBootswatch;

	//if ( !THM.cssBootswatch ) {

		THM.cssBootswatch = document.head.appendChild( document.createElement('link') );
		THM.cssBootswatch.rel = "stylesheet";
		THM.cssBootswatch.id = 'THMcssBootswatch';
		THM.cssBootswatch.href = THM.themeName;
		//console.log( 'THM.cssBootswatch', THM.cssBootswatch );

	//}

	THM.toggleTagsClassListBootswatch();

};



THM.toggleTagsClassListBootswatch = function( action = 'add' ) {

	document.body.querySelectorAll( 'nav' )
		.forEach( item => item.classList[ action ]( "jumbotron" ) );

	document.body.querySelectorAll( 'summary' )
		.forEach( item => item.classList[ action ]( "nav-link", "btn", "btn-primary" ) );

	document.body.querySelectorAll( 'button' )
		.forEach( item => item.classList[ action ]( "btn", "btn-primary", "btn-sm" ) );

	document.body.querySelectorAll( 'input' )
		.forEach( item => item.classList[ action ]( "form-control" ) );

	document.body.querySelectorAll( 'select' )
		.forEach( item => item.classList[ action ]( "form-control") );

	THM.toggleDivBootswatch( action );

};



THM.toggleDivBootswatch = function( action = 'add' ) {

	if ( action === 'add') {

		const themesBootswatch = [
			{ 'Default': 'background-color: white; color: #007bff' },
			{ "Cerulean": 'background-color: white; color: #2FA4E7;' },
			{ 'Cosmo': 'background-color: white; color: #2780E3;' },
			{ 'Cyborg': 'background-color: #060606; color: #2A9FD6; font-style: italic;' },
			{ 'Darkly': 'background-color: #222; color: #00bc8c; font-style: italic;' },
			{ 'Flatly': 'background-color: white; color: #18BC9C;' },
			{ 'Journal': 'background-color: white; color: #EB6864;' },
			{ 'Litera': 'background-color: white; color: #4582EC;' },
			{ 'Lumen': 'background-color: white; color: #158CBA;' },
			{ 'Lux': 'background-color: white; color: #1a1a1a;' },
			{ 'Materia': 'background-color: white; color: #2196F3;' },
			{ 'Minty': 'background-color: white; color: #78C2AD;' },
			{ 'Pulse': 'background-color: white; color: #593196;' },
			{ 'Sandstone': 'background-color: white; color: #93C54B;' },
			{ 'Simplex': 'background-color: white; color: #D9230F;' },
			{ 'Sketchy': 'background-color: white; color: #333;' },
			{ 'Slate': 'background-color: #272B30; color: #fff; font-style: italic;' },
			{ 'Solar': 'background-color: #002B36; color: #839496; font-style: italic;' },
			{ 'Spacelab': 'background-color: white; color: #3399F3;' },
			{ 'Superhero': 'background-color: #2B3E50; color: #DF691A; font-style: italic;' },
			{ 'United': 'background-color: white; color: #E95420;' },
			{ 'Yeti': 'background-color: white; color: #008cba;' },
		];

		const txt1 = themesBootswatch.map( theme => {

			const name = Object.keys( theme )[ 0 ];

			const link = name === 'Default' ?
				'https://bootswatch.com/_vendor/bootstrap/dist/css/bootstrap.css' :
				`https://stackpath.bootstrapcdn.com/bootswatch/4.1.1/${ name.toLowerCase() }/bootstrap.min.css`;

			const bingo = link === THM.themeName ? '*' : '';

			return `<button class=theme onclick=THM.setCssBootswatch("${ link }"); style="${ theme[name] }" >${ bingo }${ name }${ bingo }</button> `;

		} );

		divBootswatch.innerHTML = '<p>Themes from <a href="https://bootswatch.com/" target=_blank>Bootswatch</a><br>' + txt1.join( '' );

	} else {



		divBootswatch.innerHTML = '';
	}

};



THM.setCssBootswatch = function( link ) {

	THM.themeName = THMcssBootswatch.href = link;

	localStorage.setItem( 'themeName', link );

};
