# KeyboardObserver

JavaScript utility for observing keyboard events fired while a specific element
is focused, with an API inspired by native observers like
[MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
and
[ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).

## Installation

```bash
npm install @evanminto/keyboard-observer --save-dev
```

## Usage
```js
// Assuming you're using a module bundler that can resolve Node modules.
import KeyboardObserver from '@evanminto/keyboard-observer';

function keyboardCallback(records) {
  records.forEach(record => {
    // Do something based on the record's event or target properties.
  });
}

// Create the observer (not observing anything yet).
const observer = new KeyboardObserver(keyboardCallback);

const target1 = document.querySelector('#my_element');
const target2 = document.querySelector('#my_element2');

// Start observing a target.
observer.observe(target1);

// You can observe multiple targets at once.
observer.observe(target2);

// Stop observing a single target.
observer.unobserve(target2);

// Stop observing all targets.
observer.disconnect(target2);
```

## Use Cases

Building complex, accessible UI components requires keyboard controls that are
only active when the element has focus. `KeyboardObserver` keeps track of this
focus for you, so that your code can respond to only the keyboard events that
are dispatched while the element is actually active.

## Full Documentation

### KeyboardObserver

Reports keyboard events dispatched while a user is focused on an observed
`Element` or `SVGElement`.

#### Methods

##### KeyboardObserver(callback)

Constructor. Creates and returns new ResizeObserver object.

###### Parameters

**callback:** The method called whenever a keyboard event occurs. The method is called with an array of `KeyboardRecord` objects.

##### disconnect()

##### observe(target)

###### Parameters

**target:** A reference to an `Element` or `SVGElement` to be observed.

##### unobserve(target)

###### Parameters

**target:** A reference to an `Element` or `SVGElement` to be unobserved.

### KeyboardRecord

The object passed to the callback function used in the `KeyboardObserver` constructor.

#### Properties

**event:** (_KeyboardEvent_)

**target:** (_Element|SVGElement_)

