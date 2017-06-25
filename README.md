# dom.js
fast and simple document object model library

[![Screenshot 2017-06-25 at 12.08.28 PM.png](https://s15.postimg.org/hktnjbjvv/Screenshot_2017-06-25_at_12.08.28_PM.png)](https://postimg.org/image/kewswrm1z/)

## Selectors

### equivalent to document.getElementById()
```javascript
const 
  $introElement1 = dom('intro', 'id'),  // uses getElementById, returns an Element object
  $introElement2 = dom('#intro', 'id'); // uses getElementById, returns an Element object
  
```

### equivalent to document.querySelector()
```javascript
const
  $noteAnchorElement = dom('.note a', 'first');  // uses querySelector, returns an Element object
  
```

### equivalent to document.getElementsByClassName()
```javascript
const
  $redElements1 = dom('red', 'class'),  // uses getElementsByClassName, returns a HTMLCollection object
  $redElements2 = dom('.red', 'class'); // uses getElementsByClassName, returns a HTMLCollection object
  
```

### equivalent to document.getElementsByTagName()
```javascript
const
  $spanElements = dom('span', 'tag'); // uses getElementsByTagName, returns a HTMLCollection object
  
```

### equivalent to document.querySelectorAll()
```javascript
const
  $articlesImgElements = dom('article img'); // uses querySelectorAll, returns a NodeList object
  
```

## Return Methods

### return HTML of Element
```javascript
  myElement.html(); // returns outerHTML string
```

### return HTML of HTMLCollection or NodeList
```javascript
  myElements.html(); // returns outerHTML string containing each element
```

### return Node object of Element
```javascript
myElement.node(); // returns the element Node object
```

### return Node object of HTMLCollection or NodeList
```javascript
myElements.node(); // returns the elements wrapped in a div Node object

```
### Check if an element has a class
```javascript
myElement.hasClass('note'); // returns true or false

```
### Check if each element—within an HTMLCollection or NodeList—has a class
```javascript
myElements.eachHaveClass('note'); // returns true or false

```

## Chainable Methods
```javascript
myElement.addClass('note');     // add class to Element
myElements.addClass('note');    // add class to HTMLCollection or NodeList
myElement.removeClass('note');  // remove class from Element
myElements.removeClass('note'); // remove class from HTMLCollection or NodeList
myElement.toggleClass('note');  // toggle class on Element
myElements.toggleClass('note'); // toggle class on HTMLCollection or NodeList
myElement.onTouch(myFunction);  // listen for click event on Element
myElements.onTouch(myFunction); // isten for click event on HTMLCollection or NodeList

```
