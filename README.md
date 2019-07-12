# v-nouislider
Vue component for dual range sliders using [noUiSlider.js](https://refreshless.com/nouislider/) + simple Material Design CSS.

![Alt text](/screenshot.png?raw=true "v-nouislider screenshot")



## DEMO

https://codepen.io/Tardigrad/pen/xoepOV?editors=1010

## Usage

```html
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/noUiSlider/14.0.2/nouislider.min.css" >
<link rel="stylesheet" href="style.css" >

  <v-nouislider 
    vmodel="$root.filterDateYear" 
    :stops="[1900, 1920, 1940, 1960, 1970, 1980, 1990, 2000, 
             2005, 2010, 2015, 2016, 2017, 2018, 2019, 2020]"
    ></v-nouislider>
      
  <v-nouislider 
    vmodel="$root.filterRuntime"
    :stops="[0,180]" 
    :step="5"
    ></v-nouislider>

<script src="v-nouislider.js"></script>

<script src="//code.jquery.com/jquery-3.2.1.min.js" ></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/noUiSlider/14.0.2/nouislider.min.js"></script>
    
```

## Features
- Material design
- Collision detection
- 2-way binding with $root data

## Requirements
- jquery-3.2.1 (it could easily be replaced)
- vue-2.6.10
- noUiSlider-14.0.2
