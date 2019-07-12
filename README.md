# v-nouislider
Vue component for dual range sliders using noUiSlider.js

Cf. https://refreshless.com/nouislider/ for customization options


## Usage


    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/noUiSlider/14.0.2/nouislider.min.css" >
    <link rel="stylesheet" href="style.css" >
    
    
          <v-nouislider 
            :stops="[1900, 1920, 1940, 1960, 1970, 1980, 1990, 2000, 2005, 2010, 2015, 2016, 2017, 2018, 2019, 2020"
            vmodel="$root.filterDateYear"
            ></v-nouislider>
              
              
          <v-nouislider 
            :stops="[0,180]" 
            :step="5"
            vmodel="$root.filterRuntime"
            ></v-nouislider>
              
    
    <script src="v-nouislider.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/noUiSlider/14.0.2/nouislider.min.js"></script>
    

## DEMO

https://codepen.io/Tardigrad/pen/xoepOV?editors=1010
