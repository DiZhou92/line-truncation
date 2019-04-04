(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  /**
   *  Inspired by https://www.npmjs.com/package/line-clamp and https://www.npmjs.com/package/shave,
   *  adapted our own solution for better performance
   */
  // export function truncateWhenNecessary(
  //   element: HTMLElement,
  //   tries: number,
  //   ellipsis: string,
  //   calbackFunction: (hasTruncated?: boolean) => void
  // ) {
  //   if (tries > 0) {
  //     // Allows buffer period for DOM to be ready
  //     setTimeout(() => {
  //       const clientHeight = element.clientHeight;
  //       /**
  //        * Recursively call the truncate itself if Client Height is not ready
  //        */
  //       if (clientHeight > 0) {
  //         const contentHeight = getContentHeight(element);
  //         const lineHeight = this.getLineHeight(element);
  //         const targetHeight = this.lines * lineHeight;
  //         if (contentHeight > targetHeight) {
  //           try {
  //            lineTruncation(element, this.lines, lineHeight);
  //           } catch (error) {
  //             // this.logger.debug(`[truncate-lines.directive:lineTruncation] ${error}`);
  //           }
  //         } else {
  //           this.domCtrl.write(() => {
  //             this.renderer.removeStyle(this.elem, 'visibility');
  //           });
  //         }
  //       } else {
  //         // this.logger.debug(`${11 - tries} time truncation try for element:`, { context: elem });
  //         this.truncateWhenNecessary(element, --tries);
  //       }
  //     }, 100);
  //   } else {
  //     // this.logger.debug(
  //     //   "[truncate-lines.directive:truncateWhenNecessary(elem, maxTries)] Cannot retrieve item's clientHeight"
  //     // );
  //   }
  // }
  // /**
  //  * Line Truncation driver.
  //  * @param rootElement The root element that needs to be truncated.
  //  * @param truncateHeight The desired height.
  //  * @param options The passed in options by the user.
  //  */
  // function lineTruncation(rootElement, lines, lineHeight) {
  //   // TODO: find a solution to truncate correctly while applying styles
  //   // rootElement.style.cssText +=
  //   //   'overflow:hidden;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;hyphens: auto;border - bottom: none';
  //   ellipsisCharacter = options.ellipsis ? options.ellipsis : ellipsisCharacter;
  //   const truncateHeight = lines * lineHeight;
  //   if (Math.floor(getContentHeight(rootElement) / 2) > truncateHeight) {
  //     const childNodes = [];
  //     while (rootElement.firstChild) {
  //       childNodes.push(rootElement.removeChild(rootElement.firstChild));
  //     }
  //     options.onFinish(appendElementNode(childNodes, rootElement, lines, lineHeight));
  //   } else {
  //     options.onFinish(truncateElementNode(rootElement, rootElement, lines, lineHeight));
  //   }
  // }
  // /**
  //  * Append first level child nodes to empty rootElement, start truncating element when text overflowing desired height
  //  * @param childNodes the set of original child nodes
  //  * @param rootElement The root node.
  //  * @param lines number of truncate lines
  //  * @param lineHeight  text line height
  //  */
  // function appendElementNode(childNodes, rootElement, lines, lineHeight): boolean {
  //   const truncateHeight = lines * lineHeight;
  //   let i = 0;
  //   while (i < childNodes.length) {
  //     // Add child nodes until the height of the element is more than the desired height.
  //     const childNode = childNodes[i++];
  //     rootElement.appendChild(childNode);
  //     // if rootElement's height matches truncation height, add ellipsis and exit
  //     if (getContentHeight(rootElement) === truncateHeight) {
  //       addEllipsis(rootElement, truncateHeight);
  //       return true;
  //     }
  //     // If adding the root element's height exceeding the desired height, stop adding child element and start truncation from the the end of root element
  //     if (getContentHeight(rootElement) > truncateHeight) {
  //       const childNodeType = childNode.nodeType;
  //       if (
  //         (childNodeType === NODE_TYPE_ELEMENT && truncateElementNode(childNode, rootElement, lines, lineHeight)) ||
  //         (childNodeType === NODE_TYPE_TEXT && truncateTextNode(childNode, rootElement, truncateHeight))
  //       ) {
  //         return true;
  //       }
  //       // Remove the element if the node type is not ELEMENT_NODE or TEXT_NODE
  //       rootElement.removeChild(childNode);
  //     }
  //   }
  //   return false;
  // }
  // function truncateElementNode(element, rootElement, lines, lineHeight): boolean {
  //   const childNodes = element.childNodes;
  //   const truncateHeight = lines * lineHeight;
  //   let i = childNodes.length - 1;
  //   while (i > -1) {
  //     // start removing child nodes from the end until the height of the element is less than the desired height.
  //     const childNode = childNodes[i--];
  //     element.removeChild(childNode);
  //     // if rootElement's height matches truncation height, add ellipsis and exit
  //     if (getContentHeight(rootElement) === truncateHeight) {
  //       addEllipsis(rootElement, truncateHeight);
  //       return true;
  //     }
  //     // If removing the element decrese the height beyond the desired height then we know that we need to truncate in
  //     // this element to achieve the desired height
  //     if (getContentHeight(rootElement) < truncateHeight) {
  //       const childNodeType = childNode.nodeType;
  //       element.appendChild(childNode);
  //       if (
  //         (childNodeType === NODE_TYPE_ELEMENT && truncateElementNode(childNode, rootElement, lines, lineHeight)) ||
  //         (childNodeType === NODE_TYPE_TEXT && truncateTextNode(childNode, rootElement, truncateHeight))
  //       ) {
  //         return true;
  //       }
  //       // Remove the element if the node type is not ELEMENT_NODE or TEXT_NODE
  //       element.removeChild(childNode);
  //     }
  //   }
  //   return false;
  // }
  // /**
  //  * Locate the position closest to our desired text content by using divide and conquer.
  //  * @param textNode The child node in the root element.
  //  * @param rootElement The root node.
  //  * @param truncateHeight The desired height.
  //  */
  // function truncateTextNode(textNode, rootElement, truncateHeight): boolean {
  //   textNode.textContent = textNode.textContent.replace(TRAILING_WHITESPACE_AND_PUNCTUATION_REGEX, '');
  //   if (textNode.textContent === '') {
  //     return true;
  //   }
  //   const wholeTextContent = textNode.textContent; // A copy of text content before the truncation
  //   let left = 0;
  //   let right = wholeTextContent.length - 1;
  //   // Aggressively truncate text until truncating anymore would reduce our height beyond the desired height
  //   while (left <= right) {
  //     const mid = left + Math.floor((right - left) / 2);
  //     textNode.textContent = wholeTextContent.substring(0, mid);
  //     if (getContentHeight(rootElement) > truncateHeight) {
  //       right = mid - 1;
  //     } else {
  //       left = mid + 1;
  //     }
  //   }
  //   addEllipsis(rootElement, truncateHeight);
  //   return true;
  // }
  // /**
  //  * Truncate Text Node by remove the last character
  //  * @param textNode The child node in the root element.
  //  * @param rootElement The root node.
  //  * @param truncateHeight The desired height.
  //  */
  // function truncateTextNodeByCharacter(textNode, rootElement, truncateHeight): boolean {
  //   let currentLength = textNode.textContent.length;
  //   while (currentLength > 0) {
  //     // Trim off one trailing character and any trailing punctuation and whitespace.
  //     textNode.textContent = textNode.textContent.replace(TRAILING_WHITESPACE_AND_PUNCTUATION_REGEX, '');
  //     // When text content is empty, exit
  //     if (textNode.textContent === '') {
  //       break;
  //     }
  //     textNode.textContent = textNode.textContent.substring(0, currentLength - 1);
  //     // Add ellipsis before comparing height
  //     textNode.insertAdjacentHTML('beforeend', `<span class="trunk-char">${ellipsisCharacter}</span>`);
  //     if (getContentHeight(rootElement) <= truncateHeight) {
  //       break;
  //     }
  //     // Take out ellipsis character for the next iteration
  //     textNode.removeChild(textNode.lastChild);
  //     currentLength = textNode.textContent.length;
  //   }
  //   return true;
  // }
  // /**
  //  * Try Add ellipsis before the end of the last element that hold text content (so that the ellipsis stay with last text content
  //  * , e.g. a paragraph), Adds the ellipsis character if the text overflows to the next line, remove characters to compensate.
  //  * @param rootElement The root node.
  //  * @param truncateHeight  The desired height.
  //  */
  // function addEllipsis(rootElement, truncateHeight) {
  //   const lastTextChildElement = getLastElementThatHasText(rootElement); // since our root element is a element, it has at least 1 child
  //   lastTextChildElement.insertAdjacentHTML('beforeend', `<span class="trunk-char">${ellipsisCharacter}</span>`);
  //   if (getContentHeight(rootElement) > truncateHeight) {
  //     lastTextChildElement.removeChild(lastTextChildElement.lastChild); // remove the ellipsis that we just inserted
  //     truncateTextNodeByCharacter(lastTextChildElement, rootElement, truncateHeight);
  //   }
  // }
  // /**
  //  * Get last element that holds text content
  //  * @param element
  //  */
  // function getLastElementThatHasText(element) {
  //   if (!element.hasChildNodes()) {
  //     throw Error('Must have child node');
  //   }
  //   return element.lastChild.nodeType === NODE_TYPE_TEXT ? element : getLastElementThatHasText(element.lastChild);
  // }
  // export function getContentHeight(element: HTMLElement) {
  //   const computedStyle = getComputedStyle(element);
  //   if (!(computedStyle.paddingTop || computedStyle.paddingBottom)) {
  //     return element.clientHeight;
  //   }
  //   const paddingY = parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
  //   return element.clientHeight - paddingY;
  // }

}));
