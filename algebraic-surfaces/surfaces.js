var surfaces = {

'Stemkoski (default)' : {
eqn:'x^2 + y^2 - z^2 - 70',
htm:'x<sup>2</sup> + y<sup>2</sup> - z<sup>2</sup> - 70',
mat: '',
max:10,
min:-10,
scl:1,
tag: '',
ttl:'Stemkoski (default)'
},

'Calyx' : {
eqn:'x^2 + y^2 * z^3 - z^4',
htm:'x<sup>2</sup> + y<sup>2</sup>z<sup>3</sup> = z<sup>4</sup>',
mat: '',
max:5,
min:-5,
scl:2,
tag: '',
ttl:'Calyx'
},

'Calypso' : {
eqn:'x^2 + y^2 * z - z^2',
htm:'x<sup>2</sup> + y<sup>2</sup>z = z<sup>2</sup>',
mat: '',
max:10,
min:-10,
scl:1,
tag: '',
ttl:'Calypso'
},

'Columpius' : {
eqn:'x^3*y + x*z^3 + y^3 * z + z^3 + 7 * z^2 + 5*z',
htm:'x<sup>3</sup>y + xz<sup>3</sup> + y<sup>3</sup>z + z<sup>3</sup> + 7z<sup>2</sup> + 5z = 0 ',
mat: '',
max:3,
min:-3,
scl:5,
tag: '',
ttl:'Columpius'
},

'Cube' : {
eqn:'x^6 + y^6 + z^6 - 1',
htm:'x<sup>6</sup> + y<sup>6</sup> + z<sup>6</sup> = 1',
mat: '',
max:2,
min:-2,
scl:8,
tag: '',
ttl:'Cube'
},

'Dattel' : {
eqn:'3*x^3 + 3*y^3 + z^2 - 1',
htm:'3x<sup>2</sup> + 3y<sup>2</sup> + z<sup>2</sup> = 1',
mat: '',
max:2,
min:-2,
scl:8,
tag: '',
ttl:'Dattel'
},

'Daisy' : {
eqn:'(x^2 - y^3) * (x^2 - y^3) - (z^2 - y^2)^3',
htm:'(x<sup>2</sup> - y<sup>3</sup>)<sup>2</sup> = (z<sup>2</sup> - y<sup>2</sup>)<sup>3</sup>',
mat: '',
max:0.5,
min:-0.5,
scl:12,
tag: '',
ttl:'Daisy'
},

'DingDong' : {
eqn:'x^2 + y^2 + z^3 - z^2',
htm:'x<sup>2</sup> + y<sup>2</sup> + z<sup>3</sup> = z<sup>2</sup>',
mat: '',
max:2,
min:-2,
scl:8,
tag: '',
ttl:'DingDong'
},

'Distel' : {
eqn:'x^2 + y^2 + z^2 + 1000*(x^2 + y^2) * (x^2 + z^2) * (y^2 + z^2) - 1',
htm:'x<sup>2</sup> + y<sup>2</sup> + z<sup>2</sup> + 1000(x<sup>2</sup> + y<sup>2</sup>)(x<sup>2</sup> + z<sup>2</sup>)(y<sup>2</sup> + z<sup>2</sup>) = 1',
mat: '',
max:0.8,
min:-0.8,
scl:20,
tag: '',
ttl:'Distel'
},

'Durchblick' : {
eqn:'x^3*y + x*z^3 + y^3*z + z^3 + 5*z',
htm:'x<sup>3</sup>y + xz<sup>3</sup> + y<sup>3</sup>z + z<sup>3</sup> + 5z = 0',
mat: '',
max:5,
min:-5,
scl:3,
tag: '',
ttl:'Durchblick'
},

'Eistüte' : {
eqn:'(x^2 + y^2)^3 - 4*x^2*y^2 * (z^2 + 1)',
htm:'(x<sup>2</sup> + y<sup>2</sup>)<sup>3</sup> = 4x<sup>2</sup>y<sup>2</sup>(z<sup>2</sup> + 1)',
mat: '',
max:2,
min:-2,
scl:5,
tag: '',
ttl:'Eistüte'
},

'Eve' : {
eqn:'5*x^2 + 2*x*z^2 + 5*y^6 + 15*y^4 + 5*z^2 - 15*y^5 - 5*y^3',
htm:'5x<sup>2</sup> + 2xz<sup>2</sup> + 5y<sup>6</sup> + 15y<sup>4</sup> + 5z<sup>2</sup> = 15y<sup>5</sup> + 5y<sup>3</sup>',
mat: '',
max:5.5,
min:-5.5,
scl:2,
tag: '',
ttl:'Eve'
},

'Flirt' : {
eqn:'x^2 - x^3 + y^2 + y^4 + z^3 - 10*z^4',
htm:'x<sup>2</sup> - x<sup>3</sup> + y<sup>2</sup> + y<sup>4</sup> + z<sup>3</sup> - 10z<sup>4</sup> = 0',
mat: '',
max:1,
min:-1,
scl:8,
tag: '',
ttl:'Flirt'
},

'Geisha' : {
eqn:'x^2*y*z + x^2*z^2 - y^3*z - y^3',
htm:'x<sup>2</sup>yz + x<sup>2</sup>z<sup>2</sup> = y<sup>3</sup>z + y<sup>3</sup>',
mat: '',
max:10,
min:-10,
scl:1,
tag: '',
ttl:'Geisha'
},

'Harlekin' : {
eqn:'x^3*z + 10*x^2*y + x*y^2 + y*z^2 - z^3',
htm:'x<sup>3</sup>z + 10x<sup>2</sup>y + xy<sup>2</sup> + yz<sup>2</sup> = z<sup>3</sup>',
mat: '',
max:10,
min:-10,
scl:1,
tag: '',
ttl:'Harlekin'
},

'Helix' : {
eqn:'6*x^2 + 2*x^4 - y^2*z^2',
htm:'6x<sup>2</sup> - 2x<sup>4</sup> = y<sup>2</sup>z<sup>2</sup>',
mat: '',
max:2,
min:-2,
scl:8,
tag: '',
ttl:'Helix'
},

'Herz' : {
eqn:'y^2 + z^3 - z^4 - x^2*z^2',
htm:'y<sup>2</sup> + z<sup>3</sup> - z<sup>4</sup> - x<sup>2</sup>z<sup>2</sup> = 0',
mat: '',
max:1,
min:-1,
scl:8,
tag: '',
ttl:'Herz'
},

'Himmel und Hölle' : {
eqn:'x^2 - y^2*z^2',
htm:'x<sup>2</sup> - y<sup>2</sup>z<sup>2</sup> = 0',
mat: '',
max:1.5,
min:-1.5,
scl:8,
tag: '',
ttl:'Himmel und Hölle'
},

'Kolobri' : {
eqn:'x^3 + x^2*z^2 - y^2',
htm:'x<sup>3</sup> + x<sup>2</sup>z<sup>2</sup> - y<sup>2</sup>',
mat: '',
max:2,
min:-2,
scl:8,
tag: '',
ttl:'Kolobri'
},

'Leopold' : {
eqn:'x^2*y^2*z^2 + 3*x^2 + 3*y^2 + z^2 - 1',
htm:'x<sup>2</sup>y<sup>2</sup>z<sup>2</sup> + 3x<sup>2</sup> + 3y<sup>2</sup> + z<sup>2</sup> = 1',
mat: '',
max:1,
min:-1,
scl:8,
tag: '',
ttl:'Leopold'
},

'Octdong' : {
eqn:'x^2 + y^2 + z^4 - z^2',
htm:'x<sup>2</sup> + y<sup>2</sup> + z<sup>4</sup> = z<sup>2</sup>',
mat: '',
max:2,
min:-2,
scl:8,
tag: '',
ttl:'Octdong'
},

'Plop' : {
eqn:'x^2 + (z + y^2)^3',
htm:'x<sup>2</sup> + (z + y<sup>2</sup>)<sup>3</sup> = 0',
mat: '',
max:2,
min:-2,
scl:8,
tag: '',
ttl:'Plop'
},

'Seepferdchen' : {
eqn:'(x^2 - y^2)^2 - (x^2 + y^2)* z^3',
htm:'(x<sup>2</sup> - y<sup>3</sup>)<sup>2</sup> = (x + y<sup>2</sup>)z<sup>3</sup>',
mat: '',
max:2,
min:-2,
scl:8,
tag: '',
ttl:'Seepferdchen'
},

'Sofa' : {
eqn:'x^2 + y^3 + z^5',
htm:'x<sup>2</sup> + y<sup>3</sup> + z<sup>5</sup> = 0',
mat: '',
max:2,
min:-2,
scl:8,
tag: '',
ttl:'Sofa'
},

'Solitude' : {
eqn:'x^2*y*z + x*y^2 + y^3 *y^3*z - x^2*z^2',
htm:'x<sup>2</sup>yz + xy<sup>2</sup> + y<sup>3</sup> + y<sup>3</sup>z = x<sup>2</sup>z<sup>2</sup>',
mat: '',
max:6,
min:-6,
scl:3,
tag: '',
ttl:'Solitude'
},

'Süss' : {
eqn:'(x^2 + 9/4*y^2 + z^2 - 1)*(x^2 + 9/4*y^2 + z^2 - 1)*(x^2 + 9/4*y^2 + z^2 - 1) - x^2*z^3 - 9/80*y^2*z^3',
htm:'(x<sup>2</sup> + 9/4y<sup>2</sup> + z<sup>2</sup> - 1)<sup>3</sup> - x<sup>2</sup>z<sup>3</sup> - 9/80y<sup>2</sup>z<sup>3</sup> = 0',
mat: '',
max:2,
min:-2,
scl:8,
tag: '',
ttl:'Süss'
},

'Tanz' : {
eqn:'x^4 - x^2 - y^2*z^2',
htm:'x<sup>4</sup> - x<sup>2</sup> - y<sup>2</sup>z<sup>2</sup> = 0',
mat: '',
max:10,
min:-10,
scl:1,
tag: '',
ttl:'Tanz'
},

'Taube' : {
eqn:'256*z^3 - 128*x^2*z^2 + 16*x^4*z + 144*x*y^2*z - 4*x^3*y^2 - 27*y^4',
htm:'256z<sup>3</sup> - 128x<sup>2</sup>z<sup>2</sup> + 16x<sup>4</sup>z + 144xy<sup>2</sup>z - 4x<sup>3</sup>y<sup>2</sup> - 27y<sup>4</sup> = 0',
mat: '',
max:10,
min:-10,
scl:1,
tag: '',
ttl:'Taube'
},

'Quaste' : {
eqn:'',
htm:'0',
mat: '',
max:1,
min:-1,
scl:10,
tag: '',
ttl:'Quaste'
},

'Spitz' : {
eqn:'(y^3 - x^2 - z^2)^3 - 27*x^2*y^3*z^2',
htm:'(y<sup>3</sup> - x<sup>2</sup> - z<sup>2</sup>)<sup>3</sup> = 27x<sup>2</sup>y<sup>3</sup>z<sup>2</sup>',
mat: '',
max:2,
min:-2,
scl:8,
tag: '',
ttl:'Spitz'
},

'Tobel' : {
eqn:'x^3*z + x^2 + y*z^3 + z^4 - 3*x*y*z',
htm:'x<sup>3</sup> z + x<sup>2</sup> + yz<sup>3</sup> + z<sup>4</sup> = 3xyz',
mat: '',
max:1.5,
min:-1.5,
scl:8,
tag: '',
ttl:'Tobel'
},

'Vis a viss' : {
eqn:'x^2 - x^3 + y^2 + y^4 + z^3 - z^4',
htm:'x<sup>2</sup> - x<sup>3</sup> + y<sup>2</sup> + y<sup>4</sup> + z<sup>3</sup> - z<sup>4</sup> = 0',
mat: '',
max:1.5,
min:-1.5,
scl:8,
tag: '',
ttl:'Vis a viss'
},

'Wedeln' : {
eqn:'x^3 - y*(1 - z^2)^2',
htm:'x<sup>3</sup> = y (1 - z<sup>2</sup>)<sup>2</sup>',
mat: '',
max:2,
min:-2,
scl:5,
tag: '',
ttl:'Wedeln'
},

'Windkanal' : {
eqn:' - x^2 + y^4 + z^4 - x*y*z - 100',
htm:' - x<sup>2</sup> + y<sup>4</sup> + z<sup>4</sup> - xyz = 100',
mat: '',
max:10,
min:-10,
scl:1,
tag: '',
ttl:'Windkanal'
},

'Xano' : {
eqn:'x^4 + z^3 - y*z^2',
htm:'x<sup>4</sup> + z<sup>3</sup> = yz<sup>2</sup>',
mat: '',
max:10,
min:-10,
scl:1,
tag: '',
ttl:'Xano'
},

'Zitrus' : {
eqn:'x^2 + z^2 + y^3*(y - 1)^3',
htm:'x<sup>2</sup> + z<sup>2</sup> = y<sup>3</sup>(y - 1)<sup>3</sup>',
mat: '',
max:2,
min:-2,
scl:8,
tag: '',
ttl:'Zitrus'
},

'Croissant' : {
eqn:'',
htm:'0',
mat: '',
max:1,
min:-1,
scl:10,
tag: '',
ttl:'Croissant'
},

'Dromedar' : {
eqn:'x^4 - 3*x^2 + y^2 + z^3',
htm:'x<sup>4</sup> - 3x<sup>2</sup> + y<sup>2</sup> + z<sup>3</sup> = 0',
mat: '',
max:2,
min:-2,
scl:8,
tag: '',
ttl:'Dromedar'
},

'Zeppelin' : {
eqn:'x*y*z + y*z + 2*z^5',
htm:'xyz + yz + 2z<sup>5</sup> = 0',
mat: '',
max:1.25,
min:-1.25,
scl:10,
tag: '',
ttl:'Zeppelin'
},

'Zweiloch' : {
eqn:'x*y*z + y*z + 2*z^5',
htm:'xyz + yz + 2z<sup>5</sup> = 0',
mat: '',
max:10,
min:-10,
scl:1,
tag: '',
ttl:'Zweiloch'
},

'Michaelangelo' : {
eqn:'x^2 + y^4 + y^3*z^2',
htm:'x<sup>2</sup> + y<sup>4</sup> + y<sup>3</sup>z<sup>2</sup> = 0',
mat: '',
max:2,
min:-2,
scl:8,
tag: '',
ttl:'Michaelangelo'
},

'Stern' : {
eqn:'x^2*y^2 + y^2*z^2 + x^2*z^2 + 100*(x^2 + y^2 + z^2 - 1)*(x^2 + y^2 + z^2 - 1)*(x^2 + y^2 + z^2 - 1)',
htm:'x<sup>2</sup>y<sup>2</sup> + y<sup>2</sup>z<sup>2</sup> + x<sup>2</sup>z<sup>2</sup> + 100 ( x<sup>2</sup> + y<sup>2</sup> + z<sup>2</sup> - 1)<sup>3</sup> = 0',
mat: '',
max:0.85,
min:-0.85,
scl:8,
tag: '',
ttl:'Stern'
},

'Möbius' : {
eqn:'',
htm:'0',
mat: '',
max:1,
min:-1,
scl:10,
tag: '',
ttl:'Möbius'
},

'Sphäre' : {
eqn:'x^2 + y^2 + z^2 - 1',
htm:'x<sup>2</sup> + y<sup>2</sup> + z<sup>2</sup> = 1',
mat: '',
max:2,
min:-2,
scl:8,
tag: '',
ttl:'Sphäre'
},

'Limao' : {
eqn:'x^2 - y^3*z^3',
htm:'x<sup>2</sup> - y<sup>3</sup>z<sup>3</sup> = 0',
mat: '',
max:1,
min:-1,
scl:8,
tag: '',
ttl:'Limao'
},

'Torus' : {
eqn:'(x^2 + y^2 + z^2 + 4 - 1)^2 - 4*(x^2 + y^2)',
htm:'(x<sup>2</sup> + y<sup>2</sup> + z<sup>2</sup> + R<sup>2</sup> - r<sup>2</sup>)<sup>2</sup> = R<sup>2</sup>(x<sup>2</sup> + y<sup>2</sup>)',
mat: '',
max:10,
min:-10,
scl:1,
tag: '',
ttl:'Torus'
},

'Whitney' : {
eqn:'x^2 - y^2*z',
htm:'x<sup>2</sup> - y<sup>2</sup>z = 0',
mat: '',
max:1,
min:-1,
scl:8,
tag: '',
ttl:'Whitney'
},

'Buggle' : {
eqn:'x^4*y^2 + y^4*x^2 - x^2*y^2 + z^6',
htm:'x<sup>4</sup>y<sup>2</sup> + y<sup>4</sup>x<sup>2</sup> - x<sup>2</sup>y<sup>2</sup> + z<sup>6</sup> = 0',
mat: '',
max:1,
min:-1,
scl:8,
tag: '',
ttl:'Buggle'
},

'Zylinder' : {
eqn:'y^2 + z^2 - 1',
htm:'y<sup>2</sup> + z<sup>2</sup> = 1',
mat: '',
max:1,
min:-1,
scl:8,
tag: '',
ttl:'Zylinder'
},

'Diabolo' : {
eqn:'x^2 - (y^2 + z^2)^2',
htm:'x<sup>2</sup> = (y<sup> 2</sup> + z<sup>2</sup>)<sup>2</sup>',
mat: '',
max:1,
min:-1,
scl:8,
tag: '',
ttl:'Diabolo'
},

'Dullo' : {
eqn:'(x^2 + y^2 + z^2)^2 - (x^2 + y^2)',
htm:'(x<sup>2</sup> + y<sup>2</sup> + z<sup>2</sup>)<sup>2</sup> - (x<sup>2</sup> + y<sup>2</sup>) = 0',
mat: '',
max:1,
min:-1,
scl:8,
tag: '',
ttl:'Dullo'
},

'Miau' : {
eqn:'x^2*y*z + x^2*z^2 + 2*y^3*z + 3*y^3',
htm:'x<sup>2</sup>yz + x<sup>2</sup>z<sup>2</sup> + 2 y<sup>3</sup>z + 3 y<sup>3</sup> = 0',
mat: '',
max:4,
min:-4,
scl:5,
tag: '',
ttl:'Miau'
},

'Trichter' : {
eqn:'x^2 + z^3 - y^2*z^2',
htm:' x<sup>2</sup> + z<sup>3</sup> = y<sup>2</sup>z<sup>2</sup> ',
mat: '',
max:2,
min:-2,
scl:5,
tag: '',
ttl:'Trichter'
},

'Nepali' : {
eqn:'(x*y - z^3 - 1)^2 + (x^2 + y^2 - 1)*(x^2 + y^2 - 1)*(x^2 + y^2 - 1)',
htm:'(xy - z<sup>3</sup> - 1)<sup>2</sup> + (x<sup>2</sup> + y<sup>2</sup> - 1)<sup>3</sup> = 0',
mat: '',
max:1.5,
min:-1.5,
scl:8,
tag: '',
ttl:'Nepali'
},

'Pilzchen' : {
eqn:'(z^3 - 1)^2 + (x^2 + y^2 - 1)^3',
htm:'(z<sup>3</sup> - 1)<sup>2</sup> + (x<sup>2</sup> + y<sup>2</sup> - 1)<sup>3</sup> = 0 ',
mat: '',
max:1,
min:-1,
scl:8,
tag: '',
ttl:'Pilzchen'
},

'Subway' : {
eqn:'x^2*y^2 - (z^2 - 1)^3',
htm:'x<sup>2</sup>y<sup>2</sup> = (z<sup>2</sup> - 1)<sup>3</sup>',
mat: '',
max:2,
min:-2,
scl:5,
tag: '',
ttl:'Subway'
},

'Polsterzipf' : {
eqn:'(x^3 - 1)^2 + (y^3 - 1)^2 + (z^2 - 1)^3',
htm:' (x<sup>3</sup> - 1)<sup>2</sup> + (y<sup>3</sup> - 1)<sup>2</sup> + (z<sup>2</sup> - 1)<sup>3</sup> = 0 ',
mat: '',
max:1.5,
min:-1.5,
scl:10,
tag: '',
ttl:'Polsterzipf'
},

'Crixxi' : {
eqn:'(y^2 + z^2 - 1)^2 + (x^2 + y^2 - 1)^3',
htm:' (y<sup>2</sup> + z<sup>2</sup> - 1)<sup>2</sup> + (x<sup>2</sup> + y<sup>2</sup> - 1)<sup>3</sup> = 0',
mat: '',
max:1.5,
min:-1.5,
scl:5,
tag: '',
ttl:'Crixxi'
},

'Berg' : {
eqn:'x^2 + y^2*z^2 + z^3',
htm:'x<sup>2</sup> + y<sup>2</sup>z<sup>2</sup> + z<sup>3</sup> = 0',
mat: '',
max:2,
min:-2,
scl:5,
tag: '',
ttl:'Berg'
},

'Gupf' : {
eqn:'x^2 + y^2 + z',
htm:'x<sup>2</sup> + y<sup>2</sup> + z = 0',
mat: '',
max:1,
min:-1,
scl:8,
tag: '',
ttl:'Gupf'
},

'Kegel' : {
eqn:'x^2 + y^2 - z^2',
htm:'x<sup>2</sup> + y<sup>2</sup> - z<sup>2</sup> = 0',
mat: '',
max:1,
min:-1,
scl:8,
tag: '',
ttl:'Kegel'
},

'Wigwam' : {
eqn:'x^2 + y^2*z^3',
htm:'x<sup>2</sup> + y<sup>2</sup>z<sup>3</sup> = 0',
mat: '',
max:3,
min:-3,
scl:3,
tag: '',
ttl:'Wigwam'
},

'Tuelle' : {
eqn:'y*z*(x^2 + y - z)',
htm:'yz(x<sup>2</sup> + y - z) = 0',
mat: '',
max:1,
min:-1,
scl:8,
tag: '',
ttl:'Tuelle'
},

'Pipe' : {
eqn:'x^2 - z',
htm:'x<sup>2</sup> - z = 0',
mat: '',
max:1,
min:-1,
scl:8,
tag: '',
ttl:'Pipe'
},

'Fanfare' : {
eqn:' - x^3 + z^2 + y^2',
htm:' - x<sup>3</sup> + z<sup>2</sup> + y<sup>2</sup> = 0',
mat: '',
max:0.5,
min:-0.5,
scl:20,
tag: '',
ttl:'Fanfare'
},

'Kreuz' : {
eqn:'x * y * z',
htm:'xyz = 0',
mat: '',
max:10,
min:-10,
scl:1,
tag: '',
ttl:'Kreuz'
},

'Spindel' : {
eqn:'x^2 + y^2 - z^2 - 1',
htm:'x<sup>2</sup> + y<sup>2</sup> - z<sup>2</sup> = 1',
mat: '',
max:10,
min:-10,
scl:1,
tag: '',
ttl:'Spindel'
},

'Twilight' : {
eqn:'(z^3 - 2)^2 + (x^2 + y^2 - 3)^3',
htm:' (z<sup>3</sup> - 2)<sup>2</sup> + (x<sup>2</sup> + y<sup>2</sup> - 3)<sup>3</sup> = 0 ',
mat: '',
max:2,
min:-2,
scl:5,
tag: '',
ttl:'Twilight'
},

'Ufo' : {
eqn:'z^2 - x^2 - y^2 - 1',
htm:'z<sup>2</sup> - x<sup>2</sup> - y<sup>2</sup> = 1',
mat: '',
max:10,
min:-10,
scl:1,
tag: '',
ttl:'Ufo'
},

'Wendel' : {
eqn:'',
htm:'0',
mat: '',
max:1,
min:-1,
scl:10,
tag: '',
ttl:'Wendel'
},

'Zeck' : {
eqn:'x^2 + y^2 - z^3*(1 - z)',
htm:'x<sup>2</sup> + y<sup>2</sup> - z<sup>3</sup>(1 - z) = 0',
mat: '',
max:1,
min:-1,
scl:15,
tag: '',
ttl:'Zeck'
},

'Sattel' : {
eqn:'x^2 + y^2*z + z^3',
htm:'x<sup>2</sup> + y<sup>2</sup>z + z<sup>3</sup> = 0',
mat: '',
max:10,
min:-10,
scl:1,
tag: '',
ttl:'Sattel'
},

'Schneeflocke' : {
eqn:'x^2* + y^2*z^3 + y*z^4',
htm:'x<sup>3</sup> + y<sup>2</sup>z<sup>3</sup> + yz<sup>4</sup> = 0',
mat: '',
max:1,
min:-1,
scl:8,
tag: '',
ttl:'Schneeflocke'
},

'Cylinder' : {
eqn:'x^2 + y^2 - 1',
htm:'x<sup>2</sup> + y<sup>2</sup> = 1',
mat: '',
max:2,
min:-2,
scl:8,
tag: '',
ttl:'Cylinder'
},

// Jalape 
'Cylinder 1' : {
eqn:'x^3 - x^2 + y^2',
htm:'x<sup>3</sup> - x<sup>2</sup> + y<sup>2</sup>',
mat: '',
max:1,
min:-1,
scl:10,
tag: '',
ttl:'Cylinder 1'
},

'Cylinder 3' : {
eqn:' x^4 + y^4 + 2*x^2*y^2 + 3*x^2*y - y^3',
htm:'x<sup>4</sup> + y<sup>4</sup> + 2x<sup>2</sup>y<sup>2</sup> + 3x<sup>2</sup>y - y<sup>3</sup>',
mat: '',
max:1,
min:-1,
scl:10,
tag: '',
ttl:'Cylinder 3'
},

'Bifolia' : {
eqn:'(x^2 + y^2 + z^2)^2 - 3*(x^2 + z^2)*y',
htm:'(x<sup>2</sup> + y<sup>2</sup> + z<sup>2</sup>)<sup>2</sup> - 3(x<sup>2</sup> + z<sup>2</sup>)y',
mat: '',
max:1,
min:-1,
scl:10,
tag: '',
ttl:'Bifolia'
},

'Boy Surface (broken)' : {
eqn:'64*(1 - z)^3 * z^3 - 48*(1 - z)^2 * z^2*(3*x^2 + 3*y^2 + 2*z^2) + 12*(1 - z)*z*(27*(x^2 + y^2)^2 - 24*z^2*(x^2 + y^2) + 36*1.414*y*z*(y^2 - 3*x^2) + 4*z^4) + (9*x^2 + 9*y^2 - 2*z^2)*( - 81*(x^2 + y^2)^2 - 72*z^2*(x^2 + y^2) + 108*1.414*x*z*(x^2 - 3*y^2) + 4*z^4)',
htm:'64(1 - z)<sup>3</sup>  z<sup>3</sup> - 48(1 - z)^2  z^2(3x^2 + 3y^2 + 2z^2) + 12(1 - z)z(27(x^2 + y^2)^2 - 24z^2(x^2 + y^2) + 361.414yz(y^2 - 3x^2) + 4z<sup>4</sup>) + (9x^2 + 9y^2 - 2z^2)( - 81(x^2 + y^2)^2 - 72z^2(x^2 + y^2) + 1081.414xz(x^2 - 3y^2) + 4z<sup>4</sup>)',
mat: '',
max:3,
min:-3,
scl:5,
tag: '',
ttl:'Boy Surface (broken)'
},

'Cassini' : {
eqn:'(x^2 + y^2 + z^2 + 0.45*0.45)^2 - (16*0.45)*(16*0.45)*(x^2 + z^2) - 0.25 ',
htm:'(x<sup>2</sup> + y<sup>2</sup> + z<sup>2</sup> + 0.45*0.45)<sup>2</sup> - (16*0.45)*(16*0.45)*(x<sup>2</sup> + z<sup>2</sup>) - 0.25 ',
mat: '',
max:10,
min:-10,
scl:1,
tag: '',
ttl:'Cassini'
},

'Chair' : {
eqn:'(x^2 + y^2 + z^2 - 0.95*25)^2 - 0.8*(z - 5)^2 - 2*x^2*(z + 5)^2 - 2*y^2',
htm:'(x^2 + y^2 + z^2 - 0.95*25)^2 - 0.8(z - 5)^2 - 2*x^2*(z + 5)^2 - 2y^2',
mat: '',
max:10,
min:-10,
scl:1,
tag: '',
ttl:'Chair'
},

'Cayley Cubic' : {
eqn:'- 5*(x^2*y + x^2*z + y^2*x + y^2*z + z^2*y + z^2*x) + 2*(x*y + x*z + y*z)',
htm:'-5(x<sup>2</sup>y + x<sup>2</sup>z + y<sup>2</sup>x + y<sup>2</sup>z + z<sup>2</sup>y + z<sup>2</sup>x) + 2(xy + xz + yz)',
mat: '',
max:10,
min:-10,
scl:1,
tag: '',
ttl:'Cayley Cubic'
},

'Clebsh diagonal cubic' : {
eqn:'81*(x^3 + y^3 + z^3) - 189*(x^2*y + x^2*z + y^2*x + y^2*z + z^2*x + z^2*y) + 54*(x*y*z) + 126*(x*y + x*z + y*z) - 9*(x^2 + y^2 + z^2) - 9*(x + y + z) + 1',
htm:'81(x<sup>3</sup> + y<sup>3</sup> + z<sup>3</sup>) - 189(x<sup>2</sup>y + x<sup>2</sup>z + y<sup>2</sup>x + y<sup>2</sup>z + z<sup>2</sup>x + z<sup>2</sup>y) + 54(xyz) + 126(xy + xz + yz) - 9(x<sup>2</sup> + y<sup>2</sup> + z<sup>2</sup>) - 9(x + y + z) + 1',
mat: '',
max:1,
min:-1,
scl:10,
tag: '',
ttl:'Clebsh diagonal cubic'
},

'Crossed trough' : {
eqn:'x^2*z^2 - y',
htm:'x<sup>2</sup>z<sup>2</sup> - y',
mat: '',
max:1,
min:-1,
scl:10,
tag: '',
ttl:'Crossed trough'
},

'Cubic saddle' : {
eqn:'x^3 - y^3 - z',
htm:'x<sup>3</sup> - y<sup>3</sup> - z',
mat: '',
max:1,
min:-1,
scl:10,
tag: '',
ttl:'Cubic saddle'
},

'Cushion' : {
eqn:'z^2*x^2 - z^4 - 2*z*x^2 + 2*z^3 + x^2 - z^2 - (x^2 - z)^2 - y^4 - 2*x^2*y^2 - y^2*z^2 + 2*y^2*z + y^2',
htm:'z<sup>2</sup>x<sup>2</sup> - z<sup>4</sup> - 2zx<sup>2</sup> + 2z<sup>3</sup> + x<sup>2</sup> - z<sup>2</sup> - (x<sup>2</sup> - z)<sup>2</sup> - y<sup>4</sup> - 2x<sup>2</sup>y<sup>2</sup> - y<sup>2</sup>z<sup>2</sup> + 2y<sup>2</sup>z + y<sup>2</sup>',
mat: '',
max:2,
min:-2,
scl:10,
tag: '',
ttl:'Cushion'
}

};