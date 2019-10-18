# XML Read Write Read Me

## Lessons learned

The DOM parser is:

* Good and helps find issues
* Slow
* Cannot handle large files
* The JavaScript methods for parsing XML are a complex and convoluted area of code that is its own special world


Keeping XML as a string

* Has handled file as big as 700 MB
* Fast
* Can be use with plain-vanilla JavaScript

Translating XML to JavaScript

* Slows things down
* Requires you deal with XML, JSON and strings



DOMParser can parse XML or HTML source stored in a string into a DOM Document.

* https://developer.mozilla.org/en-US/docs/Web/Guide/Parsing_and_serializing_XML
* https://developer.mozilla.org/en-US/docs/Archive/JXON#Reverse_Algorithms
* https://www.w3schools.com/xml/dom_intro.asp
* http://archive.oreilly.com/pub/h/2127


vkbeautify

* http://www.eslinstructor.net/vkbeautify/

Pretty print

* http://jsfiddle.net/zrosfz7x/3/

### UTF16 to UTF8

* https://gist.github.com/kongchen/941a652882d89bb96f87
* https://www.onicos.com/staff/iz/amuse/javascript/expert/utf.txt
* http://jonisalonen.com/2012/from-utf-16-to-utf-8-in-javascript/
* https://stackoverflow.com/questions/18729405/how-to-convert-utf8-string-to-byte-array/46241050

More

* https://flaviocopes.com/javascript-unicode/
* https://stackoverflow.com/questions/27253150/json-stringify-to-utf-8/27253223#27253223


## Change Log

### 2019-10-14 ~ Theo

* update readme
