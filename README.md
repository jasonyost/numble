# numble
## Description
numble is a simple jQuery plugin to override the default HTML5 field, to facilitate better cross browser styling and consistency. The default number input renders differently in different browsers making it difficult to match styles. numble hides the original control and adds a new element containing the hidden original. The new control allows the number to be changed using either the mouse scroll wheel or embedded increment and decrement controls.

[![build status](https://travis-ci.org/jasonyost/numble.svg)](https://travis-ci.org/jasonyost/numble)

## Planned Features
- [x] option to toggle scroll functionality
- [x] options to change increment/decrement text
- [ ] expose API
- [ ] allow for direct edit of value in numble control
- [ ] bower and npm install support

## Installation & Usage
Download or clone the repo and include the [jquery.numble.min.js](https://raw.githubusercontent.com/jasonyost/numble/master/dist/jquery.numble.min.js) file in your html. numble is a jQuery plugin so be sure it is loaded after jQuery

```html
<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script src="dist/jquery.numble.min.js" charset="utf-8"></script>
```

numble can then be called on the desired input(s)

```javascript
$('input[type=number]').numble();
```

## Parameters
numble accepts the following parameters with defaults listed

```javascript
$('input[type=number]').numble({
  debug: false, // if set to true will log console messages from numble
  includeButtons: true, // if set to false up and down arrows won't be added to the control
  allowNegative: true, // if set to false numble won't decrement the value below zero
  maxValue: undefined, // if set numble won't increment value above setting
  minValue: undefined, // if set numble won't decrement the value below setting, a minValue of 0 will have no effect unless allowNegative is set to false
  initialValue: undefined, // if set numble will set the initial value of the control to this instead of 0 if the field does not already contain a value
  allowScroll: true, // if set to false numble won't bind to the mouse scroll event.
  incrementText: "&#x25B2;", // numble will display this text for increment
  decrementText: "&#x25BC;" // numble will display this text for decrement
});
```

## Styling
numble adds a few elements add classes to the page and control. Inline CSS is not added by numble other than to hide the original input, you will need to provide styles for the control in your own stylesheet or use the [demo stylesheet](https://raw.githubusercontent.com/jasonyost/numble/master/demo/demo.css).

```css
.numble-wrapper{
  /* contains the original input and the numble control */
}

.numble-control{
  width: 27px;
  height: 21px;
  padding: 10px;
  border: 1px solid #ccc;
  color: #5D8CAE;
  font-family: Arial;
  background-color: #EEEEEE;
  position: relative; /* should probably keep this, the rest can be customized to your liking */
}

/* These styles are only applicable if includeButtons is set to true */
.numble-control .numble-arrow{
  position: absolute;
  right: 2px;
  font-size: 0.8em;
  cursor: pointer;
}

.numble-control .numble-increment{
  top: 5px;
}

.numble-control .numble-decrement{
  top: 20px;
}
```

## Form interactions
numble updates the original hidden field with the number as it changes, the change event of the field is bound to update the display of the control on change.

## Thanks
Based on the excellent [jquery-boilerplate/jquery-boilerplate](https://github.com/jquery-boilerplate/jquery-boilerplate)
