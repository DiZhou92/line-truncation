# Line Truncation

Line Truncation is a zero dependency tool that truncate text by user defined line number.

The solution was inspired by [line-clamp](https://www.npmjs.com/package/line-clamp) and [shave](https://www.npmjs.com/package/shave). Line Truncation blends in their strengths, and being crafted to be faster and more capable.

## Feature

- Works with nest DOM element
- Maintain original HTML element tags and styles
- Lightening fast and capable
- Custom ellipsis character
- Callback provided

## Installation

To install, simply run

`npm install line-truncation`

for front end

```js
import { truncate } from 'line-truncation';
```

(browser support will be added in shortly)
There are some tool functions that come with this library, some of them provide you more control in whether you want to execute the truncation

truncateWhenNecessary(element, tries = 1, maxTries = 10)
// execute truncation in safe manner, so that you don't have to check if there is line height.
// it's going to use retry logic to wait until you have all the pre-requisition of truncation
(when work with framework, you might want to put it in life cycle hook that the DOM render has initialized )
truncate(element, lines, ellipsis = ellipsisCharacter, callback = val => {}) // truncate function  
getContentHeight(element) // get element's content height exclude padding,margin etc.
getLineHeight(element) // get element's line height, fallback to 1.2\*fontSize when there is no line height

## How to use

[line-truncation] works with any html tags that has text content as child such as div, p, span
For example, you have some text in [p]

```html
<p id="example">
  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt consequatur ipsum unde
  doloremque aliquid hic vitae iure necessitatibus, maiores repellendus, quos dignissimos Quis
  necessitatibus quos voluptas nesciunt facere mollitia cupiditate.
</p>
```

and then you could just simply get the element and call [LineTruncation.truncate()] with this element, your desired number of lines

```js
import * as LineTruncation from 'line-truncation';

var textElement = document.querySelector('p#example');
var lineHeight = text.clientHeight;

LineTruncation.lineTruncation(textElement, 2);
```

sometimes, above code won't work because the function might executes before DOM initialized
you can do, or write your own logic

```js
import * as LineTruncation from 'line-truncation';

var textElement = document.querySelector('p#example');
LineTruncation.truncateWhenNecessary(text);
```

Additionally, ou can also provide the ellipsis character you would like to see as third parameter, also a handler function you wish to execute when truncation finish as fourth parameter

```js
var text = document.querySelector('p#example');
var lineHeight = text.clientHeight;
var handler = function(hasTruncated) {
  if(hasTruncated) (console.log('hello');
  }

LineTruncation.lineTruncation(text, 2, '✂', handler);
```

## Contact me

If you have more idea about improving this package, feel free to make a contribution. And you could always reach out to me at chaodyz@gmail.com

## License

The repository code is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
