# dom.js
fast and simple document object model library

[![pablo.png](https://s1.postimg.org/mzkaghsnj/pablo.png)](https://postimg.org/image/j36yki7nv/)

## Selectors

### Get Elements by CSS Selector
```javascript
const
  articlesImgElements = dom('article img'); // uses querySelectorAll, returns a NodeList object
  
```

### Get Element By Id
```javascript
const 
  introElement1 = dom('intro', 'id'),  // uses getElementById, returns an Element object
  introElement2 = dom('#intro', 'id'); // uses getElementById, returns an Element object
  
```

### Get Element by First Instance
```javascript
const
  noteAnchorElement = dom('.note a', 'first');  // uses querySelector, returns an Element object
  
```

### Get Elements by Class
```javascript
const
  redElements1 = dom('red', 'class'),  // uses getElementsByClassName, returns a HTMLCollection object
  redElements2 = dom('.red', 'class'); // uses getElementsByClassName, returns a HTMLCollection object
  
```

### Get Elements by Tag
```javascript
const
  spanElements = dom('span', 'tag'); // uses getElementsByTagName, returns a HTMLCollection object
  
```

## Return Methods

### html()
```javascript
myElement.html(); // returns outerHTML string
myElements.html(); // returns outerHTML string containing each element
```

### node()
```javascript
myElement.node(); // returns the element Node object
myElements.node(); // returns the elements wrapped in a div Node object

```
### hasClass() and eachHaveClass()
```javascript
myElement.hasClass('note'); // returns true or false
myElements.eachHaveClass('note'); // returns true or false

```

## Chainable Methods

### addClass()
```javascript
myElement.addClass('note');     // add class to Element
myElements.addClass('note');    // add class to HTMLCollection or NodeList

```

### removeClass()
```javascript
myElement.removeClass('note');  // remove class from Element
myElements.removeClass('note'); // remove class from HTMLCollection or NodeList

```

### toggleClass()
```javascript
myElement.toggleClass('note');  // toggle class on Element
myElements.toggleClass('note'); // toggle class on HTMLCollection or NodeList

```

### onTouch()
```javascript
myElement.onTouch(event);  // listen for click event on Element
myElements.onTouch(event); // listen for click event on HTMLCollection or NodeList

```
