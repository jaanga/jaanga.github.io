var surfaces = {

'Stemkoski': {
ttl: 'Stemkoski',
tag: 'The default equation',
htm: 'x<sup>2</sup> + y<sup>2</sup> - z<sup>2</sup> - 70',
mat: '',
eqn: 'x^2 + y^2 - z^2 - 70',
min: -10,
max: 10,
scl: 1,
},

'Calyx': {
ttl: 'Calyx',
tag: '',
htm: 'x<sup>2</sup> + y<sup>2</sup>z<sup>3</sup> = z<sup>4</sup>',
mat: '',
eqn: 'x^2 + y^2 * z^3 - z^4',
min: -5,
max: 5,
scl: 2	
},

'Calypso': {
ttl: 'Calypso',
tag: '',
htm: 'x<sup>2</sup>+y<sup>2</sup>z = z<sup>2</sup> </a>',
eqn: 'x^2 + y^2 * z - z^2',
mat: '',
min: -10,
max: 10,
scl: 1
},

'Columpius': {
ttl: 'Columpius',
tag: '',
htm: 'x<sup>3</sup>y+xz<sup>3</sup>+y<sup>3</sup>z+z<sup>3</sup>+7z<sup>2</sup>+5z=0 ',
eqn: 'x^3*y + x*z^3 + y^3*z + z^3 + 7*z^2 + 5*z',
mat: '',
min: -3,
max: 3,
scl: 10
},
'Cube': {
ttl: 'Cube',
tag: '',
htm: 'x<sup>6</sup> + y<sup>6</sup> + z<sup>6</sup> = 1',
eqn: 'x^6 + y^6 + z^6 - 1',
mat: '',
min: -2,
max: 2,
scl: 30
},

'Dattel': {
ttl: 'Dattel',
tag: '',
htm: '3x<sup>2</sup> + 3y<sup>2</sup> + z<sup>2</sup> = 1',
eqn: '3*x^3 + 3*y^3 + z^2 - 1',
mat: '',
min: -2,
max: 2,
scl: 20
},

'Daisy': {
eqn: '(x^2 - y^3) * (x^2 - y^3) - (z^2 - y^2)^3',
htm: '(x<sup>2</sup> - y<sup>3</sup>)<sup>2</sup> = (z<sup>2</sup> - y<sup>2</sup>)<sup>3</sup>',
mat: '',
max: 0.5,
min: -0.5,
scl: 30,
tag: '',
ttl: 'Daisy'
},

'DingDong': {
eqn: 'x^2 + y^2 + z^3 - z^2',
htm: 'x<sup>2</sup> +y<sup>2</sup> +z<sup>3</sup> = z<sup>2</sup>',
mat: '',
max: 2,
min: -2,
scl: 20,
tag: '',
ttl: 'DingDong'
}


/*
'': {
eqn: '',
htm: '',
mat: ,
max: ,
min: -,
scl: ,
tag: '',
ttl: ''
}
*/	
}; 
 
// console.log(surfaces);
 /*

 var surf = [];
  // surf[] = ['','',0,0,0,''];
  // http://homepage.univie.ac.at/herwig.hauser/bildergalerie/gallery.html
  surf[0] = ['Stemkoski (default)','x^2 + y^2 - z^2 - 70', -10, 10, 1, 'x<sup>2</sup>+y<sup>2</sup>-z<sup>2</sup>-70'];
  surf[1] = ['Calyx','x^2 + y^2 * z^3 - z^4', -5, 5, 2,'x<sup>2</sup>+y<sup>2</sup>z<sup>3</sup> = z<sup>4</sup>'];
  surf[2] = ['Calypso','x^2 + y^2 * z - z^2', -10, 10, 1,'x<sup>2</sup>+y<sup>2</sup>z = z<sup>2</sup> </a>'];
  surf[3] = ['Columpius','x^3*y + x*z^3 + y^3*z + z^3 + 7*z^2 + 5*z', -3, 3, 5,'x<sup>3</sup>y+xz<sup>3</sup>+y<sup>3</sup>z+z<sup>3</sup>+7z<sup>2</sup>+5z=0 ']; // Columpius
  // http://gauravtiwari.org/2011/03/05/curves/columpius/
  // http://m.wolframalpha.com/input/?i=columpius+surface&lk=1&a=ClashPrefs_*Surface.ColumpiusSurface-
  surf[4] = ['Cube','x^6 + y^6 + z^6 - 1', -2, 2, 8,'x<sup>6</sup>+y<sup>6</sup>+z<sup>6</sup>=1']; // cube
  surf[5] = ['Dattel','3*x^3 + 3*y^3 + z^2 - 1', -2, 2, 8,'3x<sup>2</sup>+3y<sup>2</sup>+z<sup>2</sup>=1']; //dattel
  surf[6] = ['Daisy','(x^2 - y^3) * (x^2 - y^3) - (z^2 - y^2)^3', -0.5, 0.5, 12, '(x<sup>2</sup> - y<sup>3</sup>)<sup>2</sup>=(z<sup>2</sup>-y<sup>2</sup>)<sup>3</sup>']; //daisy
  surf[7] = ['DingDong','x^2 + y^2 + z^3 - z^2', -2, 2, 8,'x<sup>2</sup> +y<sup>2</sup> +z<sup>3</sup> = z<sup>2</sup>']; // ding dong
  surf[8] = ['Distel','x^2 + y^2 + z^2 + 1000*(x^2 + y^2) * (x^2 + z^2) * (y^2 + z^2) - 1', -0.8, 0.8, 20,'x<sup>2</sup>+y<sup>2</sup>+z<sup>2</sup>+1000(x<sup>2</sup>+y<sup>2</sup>)(x<sup>2</sup>+z<sup>2</sup>)(y<sup>2</sup>+z<sup>2</sup>)=1']; // distel
  surf[9] = ['Durchblick','x^3*y + x*z^3 + y^3*z + z^3 + 5*z', -5, 5, 3,'x<sup>3</sup>y+xz<sup>3</sup>+y<sup>3</sup>z+z<sup>3</sup>+5z = 0']; // Durchblick
  surf[10] = ['Eist&uuml;te','(x^2 + y^2)^3 - 4*x^2*y^2 * (z^2 + 1)', -2, 2, 5,'(x<sup>2</sup>+y<sup>2</sup>)<sup>3</sup> = 4x<sup>2</sup>y<sup>2</sup>(z<sup>2</sup>+1)']; // Eistute
  surf[11] = ['Eve','5*x^2 + 2*x*z^2 + 5*y^6 + 15*y^4 + 5*z^2 - 15*y^5 - 5*y^3', -5.5, 5.5, 2,'5x<sup>2</sup> + 2xz<sup>2</sup> + 5y<sup>6</sup> + 15y<sup>4</sup> + 5z<sup>2</sup> = 15y<sup>5</sup> + 5y<sup>3</sup>']; // eve
  surf[12] = ['Flirt','x^2 - x^3 + y^2 + y^4 + z^3 - 10*z^4', -1, 1, 8,'x<sup>2</sup>-x<sup>3</sup>+y<sup>2</sup>+y<sup>4</sup>+z<sup>3</sup>-10z<sup>4</sup>=0']; //flirt
  surf[13] = ['Geisha','x^2*y*z + x^2*z^2 - y^3*z - y^3', -10, 10, 1,'x<sup>2</sup>yz + x<sup>2</sup>z<sup>2</sup> = y<sup>3</sup>z + y<sup>3</sup>']; // geisha
  surf[14] = ['Harlekin','x^3*z + 10*x^2*y + x*y^2 + y*z^2 - z^3', -10, 10, 1, 'x<sup>3</sup>z + 10x<sup>2</sup>y + xy<sup>2</sup> + yz<sup>2</sup> = z<sup>3</sup>']; //harlequin
  surf[15] = ['Helix','6*x^2 + 2*x^4 - y^2*z^2', -2, 2, 8,'6x<sup>2</sup> - 2x<sup>4</sup> = y<sup>2</sup>z<sup>2</sup>']; //helix
  surf[16] = ['Herz','y^2 + z^3 - z^4 - x^2*z^2', -1, 1, 8,'y<sup>2</sup>+z<sup>3</sup>-z<sup>4</sup>-x<sup>2</sup>z<sup>2</sup> = 0']; // herz
  surf[17] = ['Himmel und H&ouml;lle','x^2 - y^2*z^2', -1.5, 1.5, 8,'x<sup>2</sup>-y<sup>2</sup>z<sup>2</sup>=0']; // Himmel und Holle
  surf[18] = ['Kolobri','x^3 + x^2*z^2 - y^2', -2, 2, 8,'x<sup>3</sup> + x<sup>2</sup>z<sup>2</sup> - y<sup>2</sup>']; // kolobri
  surf[19] = ['Leopold','x^2*y^2*z^2 + 3*x^2 + 3*y^2 + z^2 - 1', -1, 1, 8,'x<sup>2</sup>y<sup>2</sup>z<sup>2</sup>+3x<sup>2</sup>+3y<sup>2</sup>+z<sup>2</sup>=1']; // leopold
  surf[20] = ['Octdong','x^2 + y^2 + z^4 - z^2', -2, 2, 8,'x<sup>2</sup> + y<sup>2</sup> + z<sup>4</sup> = z<sup>2</sup>']; // Octdong
  surf[21] = ['Plop','x^2 + (z + y^2)^3', -2, 2, 8,'x<sup>2</sup> + (z+y<sup>2</sup>)<sup>3</sup> = 0']; //plop
  surf[22] = ['Seepferdchen','(x^2 - y^2)^2 - (x^2 + y^2)* z^3', -2, 2, 8,'(x<sup>2</sup>-y<sup>3</sup>)<sup>2</sup>=(x+y<sup>2</sup>)z<sup>3</sup>']; //Seepferdchen
  surf[23] = ['Sofa','x^2 + y^3 + z^5', -2, 2, 8,'x<sup>2</sup>+y<sup>3</sup>+z<sup>5</sup> = 0']; // sofa
  surf[24] = ['Solitude','x^2*y*z + x*y^2 + y^3 *y^3*z - x^2*z^2', -6, 6, 3, 'x<sup>2</sup>yz +xy<sup>2</sup>+y<sup>3</sup>+y<sup>3</sup>z=x<sup>2</sup>z<sup>2</sup>']; // solitude
  surf[25] = ['S&uuml;ss','(x^2+9/4*y^2+z^2-1)*(x^2+9/4*y^2+z^2-1)*(x^2+9/4*y^2+z^2-1) - x^2*z^3-9/80*y^2*z^3', -2, 2, 8 ,'(x<sup>2</sup>+9/4y<sup>2</sup>+z<sup>2</sup>-1)<sup>3</sup> - x<sup>2</sup>z<sup>3</sup>-9/80y<sup>2</sup>z<sup>3</sup>=0']; // Suss
  surf[26] = ['Tanz','x^4 - x^2  - y^2*z^2', -10, 10, 1,'x<sup>4</sup>-x<sup>2</sup>-y<sup>2</sup>z<sup>2</sup>=0']; // Tanz
  surf[27] = ['Taube','256*z^3 - 128*x^2*z^2 + 16*x^4*z + 144*x*y^2*z - 4*x^3*y^2 - 27*y^4', -10, 10, 1,'256z<sup>3</sup>-128x<sup>2</sup>z<sup>2</sup>+16x<sup>4</sup>z+144xy<sup>2</sup>z - 4x<sup>3</sup>y<sup>2</sup>-27y<sup>4</sup> =0']; // taube
  surf[28] = ['Quaste','','','???']; // Quaste
  surf[29] = ['Spitz','(y^3 - x^2 - z^2)^3 - 27*x^2*y^3*z^2', -2, 2, 8,'(y<sup>3</sup>-x<sup>2</sup>-z<sup>2</sup>)<sup>3</sup> = 27x<sup>2</sup>y<sup>3</sup>z<sup>2</sup>']; // Spitz
  surf[30] = ['Tobel','x^3*z + x^2 + y*z^3 + z^4 - 3*x*y*z', -1.5, 1.5, 8,'x<sup>3</sup> z + x<sup>2</sup> + yz<sup>3</sup> + z<sup>4</sup> = 3xyz']; //Tobel
  surf[31] = ['Vis a viss','x^2 - x^3 + y^2 + y^4 + z^3 - z^4', -1.5, 1.5, 8,'x<sup>2</sup>-x<sup>3</sup>+y<sup>2</sup>+y<sup>4</sup>+z<sup>3</sup>-z<sup>4</sup>=0']; // vis a vis
  surf[32] = ['Wedeln','x^3 - y*(1 - z^2)^2', -2, 2, 5,'x<sup>3</sup> = y (1-z<sup>2</sup>)<sup>2</sup>']; // Wedeln
  surf[33] = ['Windkanal','-x^2 + y^4 + z^4 - x*y*z - 100', -10, 10, 1,'- x<sup>2</sup> + y<sup>4</sup> + z<sup>4</sup> - xyz = 100']; // Windkanal
  surf[34] = ['Xano','x^4 + z^3 - y*z^2', -10, 10, 1,'x<sup>4</sup> +z<sup>3</sup> = yz<sup>2</sup>']; // Xano
  surf[35] = ['Zitrus','x^2 + z^2 + y^3*(y - 1)^3', -2, 2, 8 ,'x<sup>2</sup>+z<sup>2</sup> = y<sup>3</sup>(y-1)<sup>3</sup>']; // Zitrus
  surf[36] = ['Croissant','', '','???']; // Croissant
  surf[37] = ['Dromedar','x^4 - 3*x^2 + y^2 + z^3', -2, 2, 8,'x<sup>4</sup> - 3x<sup>2</sup> + y<sup>2</sup>+z<sup>3</sup> = 0']; // Dromedar
  surf[38] = ['Zeppelin','x*y*z + y*z + 2*z^5', -1.25, 1.25, 10,'xyz+yz+2z<sup>5</sup>= 0']; // Zeppelin
  surf[39] = ['Zweiloch','x*y*z + y*z + 2*z^5', -10, 10, 1,'xyz+yz+2z<sup>5</sup>= 0']; // Zweilach
  surf[40] = ['Michaelangelo','x^2 + y^4 + y^3*z^2', -2, 2, 8,'x<sup>2</sup>+y<sup>4</sup>+y<sup>3</sup>z<sup>2</sup>=0']; // Michaelangelo
  surf[41] = ['Stern','x^2*y^2 + y^2*z^2 + x^2*z^2 + 100*(x^2 + y^2 + z^2 - 1)*(x^2 + y^2 + z^2 - 1)*(x^2 + y^2 + z^2 - 1)', -0.85, 0.85, 8,'x<sup>2</sup>y<sup>2</sup> + y<sup>2</sup>z<sup>2</sup> + x<sup>2</sup>z<sup>2</sup> + 100 ( x<sup>2</sup> + y<sup>2</sup> + z<sup>2</sup> - 1)<sup>3</sup> = 0']; // Stern
  surf[42] = ['M&ouml;bius','', '','???']; // Mobius
  surf[43] = ['Sph&auml;re','x^2 + y^2 + z^2 - 1', -2, 2, 8,'x<sup>2</sup> + y<sup>2</sup>+ z<sup>2</sup> = 1']; // Sphare
  surf[44] = ['Limao','x^2 - y^3*z^3', -1, 1, 8,'x<sup>2</sup>-y<sup>3</sup>z<sup>3</sup> = 0'];
  surf[45] = ['Torus','(x^2 + y^2 + z^2 + 4 - 1)^2 - 4*(x^2 + y^2)', -10, 10, 1,'(x<sup>2</sup>+y<sup>2</sup>+z<sup>2</sup>+R<sup>2</sup>-r<sup>2</sup>)<sup>2</sup> = R<sup>2</sup>(x<sup>2</sup>+y<sup>2</sup>)'];
  surf[46] = ['Whitney','x^2 - y^2*z', -1, 1, 8,'x<sup>2</sup>-y<sup>2</sup>z=0'];
  surf[47] = ['Buggle','x^4*y^2 + y^4*x^2 - x^2*y^2 + z^6', -1, 1, 8,'x<sup>4</sup>y<sup>2</sup>+y<sup>4</sup>x<sup>2</sup>-x<sup>2</sup>y<sup>2</sup>+z<sup>6</sup>=0'];
  surf[48] = ['Zylinder','y^2 + z^2 - 1', -1, 1, 8,'y<sup>2</sup> + z<sup>2</sup> = 1'];
  surf[49] = ['Diabolo','x^2 - (y^2 + z^2)^2', -1, 1, 8,'x<sup>2</sup> = (y<sup> 2</sup>+ z<sup>2</sup>)<sup>2</sup>'];
  surf[50] = ['Dullo','(x^2 + y^2 + z^2)^2 - (x^2 + y^2)', -1, 1, 8,'(x<sup>2</sup>+y<sup>2</sup>+z<sup>2</sup>)<sup>2</sup>-(x<sup>2</sup>+y<sup>2</sup>) = 0'];
  surf[51] = ['Miau','x^2*y*z + x^2*z^2 + 2*y^3*z + 3*y^3', -4, 4, 5,'x<sup>2</sup>yz + x<sup>2</sup>z<sup>2</sup>  + 2 y<sup>3</sup>z + 3 y<sup>3</sup>  = 0'];
  surf[52] = ['Trichter','x^2 + z^3 - y^2*z^2', -2, 2, 5,'  x<sup>2</sup> + z<sup>3</sup> = y<sup>2</sup>z<sup>2</sup> '];
  surf[53] = ['Nepali','(x*y - z^3 - 1)^2 + (x^2 + y^2 - 1)*(x^2 + y^2 - 1)*(x^2 + y^2 - 1)', -1.5, 1.5, 8, '(xy-z<sup>3</sup>-1)<sup>2</sup> + (x<sup>2</sup>+y<sup>2</sup>-1)<sup>3</sup> = 0'];
  surf[54] = ['Pilzchen','(z^3 - 1)^2 + (x^2 + y^2 - 1)^3', -1, 1, 8,'(z<sup>3</sup> - 1)<sup>2</sup> + (x<sup>2</sup>+y<sup>2</sup>-1)<sup>3</sup>=0 '];
  surf[55] = ['Subway','x^2*y^2 - (z^2 - 1)^3', -2, 2, 5,'x<sup>2</sup>y<sup>2</sup> = (z<sup>2</sup>-1)<sup>3</sup>'];
  surf[56] = ['Polsterzipf','(x^3 - 1)^2 + (y^3 - 1)^2 + (z^2 - 1)^3', -1.5, 1.5, 10,' (x<sup>3</sup>-1)<sup>2</sup> + (y<sup>3</sup>-1)<sup>2</sup>+ (z<sup>2</sup>-1)<sup>3</sup> = 0  '];
  surf[57] = ['Crixxi','(y^2 + z^2 - 1)^2 + (x^2 + y^2 - 1)^3', -1.5, 1.5, 5,' (y<sup>2</sup>+z<sup>2</sup>-1)<sup>2</sup> +(x<sup>2</sup>+y<sup>2</sup>-1)<sup>3</sup> = 0'];
  surf[58] = ['Berg','x^2 + y^2*z^2 + z^3', -2, 2, 5,'x<sup>2</sup>+y<sup>2</sup>z<sup>2</sup>+z<sup>3</sup> = 0'];
  surf[59] = ['Gupf','x^2 + y^2 + z', -1, 1, 8,'x<sup>2</sup>+y<sup>2</sup>+z=0'];
  surf[60] = ['Kegel','x^2 + y^2 - z^2', -1, 1, 8,'x<sup>2</sup>+y<sup>2</sup>-z<sup>2</sup>=0'];
  surf[61] = ['Wigwam','x^2 + y^2*z^3', -3, 3, 3,'x<sup>2</sup>+y<sup>2</sup>z<sup>3</sup>=0'];
  surf[62] = ['Tuelle','y*z*(x^2 + y - z)', -1, 1, 8,'yz(x<sup>2</sup>+y-z) = 0</a><\/p>'];
  surf[63] = ['Pipe','x^2 - z', -1, 1, 8,'x<sup>2</sup>-z=0</a><\/p>'];
  surf[64] = ['Fanfare','-x^3 + z^2 + y^2', -0.5, 0.5, 20,'-x<sup>3</sup>+z<sup>2</sup>+y<sup>2</sup>=0'];
  surf[65] = ['Kreuz','x * y * z', -10, 10, 1,'xyz = 0'];
  surf[66] = ['Spindel','x^2 + y^2 - z^2 - 1', -10, 10, 1,'x<sup>2</sup> + y<sup>2</sup> - z<sup>2</sup> = 1'];
  surf[67] = ['Twilight','(z^3 - 2)^2 + (x^2 + y^2 - 3)^3', -2, 2, 5,' (z<sup>3</sup> - 2)<sup>2</sup> + (x<sup>2</sup> + y<sup>2</sup> - 3)<sup>3</sup> = 0  '];
  surf[68] = ['Ufo','z^2 - x^2 - y^2 - 1', -10, 10, 1,'z<sup>2</sup> - x<sup>2</sup> - y<sup>2</sup> = 1'];
  surf[69] = ['Wendel','','','???'];
  surf[70] = ['Zeck','x^2 + y^2 - z^3*(1-z)', -1, 1, 15,'x<sup>2</sup> + y<sup>2</sup> - z<sup>3</sup>(1 - z) = 0'];
  surf[71] = ['Sattel','x^2 + y^2*z + z^3', -10, 10, 1,'x<sup>2</sup> + y<sup>2</sup>z + z<sup>3</sup> = 0'];
  surf[72] = ['Schneeflocke','x^2* + y^2*z^3  + y*z^4', -1, 1, 8,'x<sup>3</sup> + y<sup>2</sup>z<sup>3</sup> + yz<sup>4</sup>=0'];
  surf[73] = ['Cylinder','x^2 + y^2 - 1', -2, 2, 8,'x<sup>2</sup> + y<sup>2</sup> = 1'];

  // http://jalape.no/math/surfaces.htm
  surf[80] = ['Cylinder 1','x^3 - x^2 + y^2',-1,1,10,'x^3 - x^2 + y^2'];
  surf[81] = ['Cylinder 3',' x^4 + y^4 + 2*x^2*y^2 + 3*x^2*y - y^3',-1,1,10,'x^4 + y^4 + 2*x^2*y^2 + 3*x^2*y - y^3'];
  surf[82] = ['Bifolia','(x^2 + y^2 + z^2)^2 - 3*(x^2 + z^2)*y',-1,1,10,''];
  surf[83] = ['Boy Surface (broken)','64*(1-z)^3 * z^3-48*(1-z)^2 * z^2*(3*x^2+3*y^2+2*z^2) + 12*(1-z)*z*(27*(x^2+y^2)^2 - 24*z^2*(x^2+y^2) + 36*1.414*y*z*(y^2-3*x^2)+4*z^4)+ (9*x^2+9*y^2-2*z^2)*(-81*(x^2+y^2)^2 - 72*z^2*(x^2+y^2)+ 108*1.414*x*z*(x^2-3*y^2)+4*z^4)',-3,3,5,''];    
  surf[84] = ['Cassini','(x^2 + y^2 + z^2 + 0.45*0.45)^2 - (16*0.45)*(16*0.45)*(x^2 + z^2) - 0.25 ',0,0,0,''];
  surf[85] = ['Chair','(x^2 + y^2 + z^2-0.95*25)^2 - 0.8*(z - 5)^2 - 2*x^2*(z+5)^2 - 2*y^2',0,0,0, ''];
  surf[86] = ['Cayley Cubic','-5*(x^2*y+x^2*z+y^2*x+y^2*z+z^2*y+z^2*x) + 2*(x*y+x*z+y*z)',-10,10,1,''];
  surf[87] = ['Clebsh diagonal cubic','81*(x^3 + y^3 + z^3) - 189*(x^2*y + x^2*z + y^2*x + y^2*z + z^2*x + z^2*y) + 54*(x*y*z) + 126*(x*y + x*z + y*z) - 9*(x^2 + y^2 + z^2)-  9*(x + y + z) + 1',0,0,0,''];
  surf[88] = ['Crossed trough','x^2*z^2 - y',0,0,0,''];
  surf[89] = ['Cubic saddle','x^3 - y^3 - z',0,0,0,''];
  surf[90] = ['Cushion','z^2*x^2 - z^4 - 2*z*x^2 + 2*z^3 + x^2 - z^2 - (x^2 - z)^2 - y^4 - 2*x^2*y^2 - y^2*z^2 + 2*y^2*z + y^2',-2,2,10,''];  
*/
