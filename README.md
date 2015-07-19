# numble
A simple number input field plugin

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
  minValue: undefined, // if set numble won't increment the value below setting, a minValue of 0 will have no effect unless allowNegative is set to false
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

## Form posts
numble updates the original field with the number as it changes, updates to the form handler should not be required.
