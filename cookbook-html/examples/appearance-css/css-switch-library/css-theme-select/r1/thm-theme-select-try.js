/* Copyright 2018 Ladybug Tools authors. MIT License */


const THM = { "release": "R2.0", "date": "2018-12-30" };

THM.currentStatus =
	`
		<h3>THM ${ THM.release} status ${ THM.date }</h3>

		<p>Jaanga Switch Theme</p>

`;

THM.description = THM.description || document.head.querySelector( "[ name=description ]" ).content;

THM.stylesheet = "style.css";
//let w3Themecss;

THM.themeBootswatch = 'https://bootswatch.com/_vendor/bootstrap/dist/css/bootstrap.css';



THM.getMenuTheme = function() {

	//THM.loadCssBasic();

	htm =
	`
		<details open >

			<summary>Select Theme
				<a class=helpItem href="JavaScript:setPopupShowHide(THM.currentStatus);" >&nbsp; ? &nbsp;</a>
			</summary>

			<div>

			<p>
				<button id=but onclick=THM.loadCssBasic(); accessKey= 'z' title='access key: z '>load CSS Basic</button>
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



THM.loadCssBasic = function() {

	THM.cssBasic = document.head.appendChild( document.createElement('link') );
	THM.cssBasic.rel = "stylesheet";
	THM.cssBasic.href = THM.stylesheet;
	//console.log( 'THM.cssBasic', THM.cssBasic );

	THM.toggleTagsClassListW3schools( 'remove' );

	THM.toggleTagsClassListBootswatch( 'remove' );

};



THM.loadCssW3schools = function() {

	THM.toggleTagsClassListBootswatch( 'remove' );

	if ( !THM.w3Themecss ) {

		const w3css = document.head.appendChild( document.createElement('link') );
		w3css.rel = "stylesheet";
		w3css.href = "https://www.w3schools.com/w3css/4/w3.css";

		THM.w3Themecss = document.head.appendChild( document.createElement('link') );
		THM.w3Themecss.rel = "stylesheet";
		THM.w3Themecss.id = "stylesheetW3schools";
		THM.w3Themecss.href = "https://www.w3schools.com/lib/w3-theme-red.css";

	}


	THM.toggleTagsClassListW3schools( 'add' );

	const themes = [ 'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'khaki', 'yellow',
			'amber', 'orange', 'deep-orange', 'blue-grey', 'brown', 'grey', 'dark-grey', 'black', 'w3schools' ];

	pThemes = themes.reduce( ( acc, theme ) =>
		acc + `<a href=JavaScript: onclick=THM.setStyle("${ theme }"); style=font-size:3rem;line-height:0.5rem;text-decoration:none;color:${ theme.replace( '-', '' ) }
		title="${ theme }" >&bull;</a> `, '' );

	divW3Schools.innerHTML =
	`
		<p id=pThemes >${ pThemes }</p>

		<p><a href="https://www.w3schools.com/w3css/" target="_blank">www.w3schools.com/w3css</a></p>

	`;

	//const css = document.head.appendChild( document.createElement('link') );
	//css.rel = "stylesheet";
	//css.href = THM.stylesheet;
	//console.log( 'css', css );

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

};



THM.setStyle = function( color ) {

	console.log( 'color', color );
	stylesheetW3schools.href="https://www.w3schools.com/lib/w3-theme-" + color + ".css";

	//localStorage.setItem('GbxmlViewerStyleColor', color );

}



THM.loadCssBootswatch = function() {

	THM.toggleTagsClassListW3schools( 'remove' );

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

		const bingo = link === THM.themeBootswatch ? '*' : '';

		return `<button class=theme onclick=THM.updateCss("${ link }"); style="${ theme[name] }" >${ bingo }${ name }${ bingo }</button> `;

	} );

	divBootswatch.innerHTML = '<p>Themes from <a href="https://bootswatch.com/" target=_blank>Bootswatch</a><br>' + txt1.join( '' );

	cssBootswatch = document.head.appendChild( document.createElement('link') );
	cssBootswatch.rel = "stylesheet";
	cssBootswatch.href = THM.themeBootswatch;
	//console.log( 'css', css );

	THM.toggleTagsClassListBootswatch();

	//css = document.head.appendChild( document.createElement('link') );
	//css.rel = "stylesheet";
	//css.href = "style.css";
	//console.log( 'css', css );

};



THM.updateCss = function( link ) {

	THM.themeBootswatch = link;

	THM.loadCssBootswatch();

};



THM.toggleTagsClassListBootswatch = function( action = 'add' ) {

	document.body.querySelectorAll( 'nav' )
		.forEach( item => item.classList[ action ]( "jumbotron" ) );

	document.body.querySelectorAll( 'header' )
	//	.forEach( item => item.classList[ action ]( "w3-bar-item", "w3-theme", "w3-padding" ) );

	navMenu.querySelectorAll( 'div' )
	//	.forEach( item => item.classList[ action ]( "" ) );

	document.body.querySelectorAll( 'summary' )
		.forEach( item => item.classList[ action ]( "nav-link", "btn", "btn-primary" ) );
	//console.log( 'summary', summary );

	document.body.querySelectorAll( 'button' )
		.forEach( item => item.classList[ action ]( "btn", "btn-primary", "btn-sm" ) );

	document.body.querySelectorAll( 'input' )
		.forEach( item => item.classList[ action ]( "form-control" ) );

	select = document.body.querySelectorAll( 'select' )
		.forEach( item => item.classList[ action ]( "form-control") );

};
