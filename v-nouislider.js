Vue.component('v-nouislider', {
  props: ['stops','snap','step', 'vmodel', 'bigNumbers'],
  data:{
    myid: null,
    default: [0,100],
  },
  mounted: function(){
    // console.log('----== v-nouislider '+this._uid+' ==----')
    var that=this;
    
    // that.default = [0,100];
    
    // PROPS ================================== 
    // step ---
    if(!that.step) that.step=1;
    // console.log('step:', that.step) 
    // vmodel ---
    if(!that.vmodel) that.vmodel='default';
    // console.log('vmodel:', that.vmodel) 
    // vmodelval ---
    if(that.vmodel.split('.').length<2) vmodelval = that[that.vmodel];
    else vmodelval = that[that.vmodel.split('.')[0]][that.vmodel.split('.')[1]];
    // console.log('vmodelval:', vmodelval) 
    // stops ---
    if(!that.stops) that.stops = vmodelval;
    // console.log('stops:', that.stops) 
    // snap ---
    that.snap=true;
    if(that.stops.length==2) that.snap=false;
    
    // FORMAT ---
    var myFormat = {to:v=>Math.round(v*1000)/1000, from:v=>v};
    if(that.bigNumbers) myFormat = {to:v=> (Math.round(v*1000)/1000+'?').replace('000000?','M').replace('000?','k').replace('?','') , from:v=>v};
    
    
    // FORMATTING RANGE AT EQUAL INTERVALS ==================================
    // CREATE continuous range      
    // var stops=[rangeyear[0], 1920, 1940, 1960, 1970, 1980, 1990, 2000, 2005, 2010, 2015, 2016, 2017, 2018, 2019, rangeyear[1]];
    var thisstops=this.stops;
    var rr={};
    thisstops.forEach(function(d,i){
      if(i==0) rr.min=d;
      else if(i==thisstops.length-1) rr.max=d;
      else rr[Math.round(100*(100*i/(thisstops.length-1)))/100+'%']=d;
    });
    // e.g. -->   { 'min': 0, '10%': 10, '50%': 80, '80%': 150, 'max': 200 }
    
    
    myid = document.getElementById('slider-'+this._uid);
    that.myid = myid;
    
    // CREATING THE SLIDER ==================================
    var myslider = noUiSlider.create(myid, {
      start: vmodelval,
      step: +that.step, // no step in range
      // margin: 5, // no margin in range
      tooltips: [myFormat, myFormat], // not needed in 1st because of collision detection
      behaviour: 'unconstrained-drag-tap',
      snap: that.snap,
      connect: true,
      range: rr,
    });
    
    // V-MODEL ==================================
    // 1st-way binding (lazy) ------------------
    myid.noUiSlider.on('set',(val, handle) => { // end set change
      val = [+val[0],+val[1]].sort((a, b) => a - b);
      if(that[that.vmodel.split('.')[0]][that.vmodel.split('.')[1]].join('') != val.join('')) 
          that[that.vmodel.split('.')[0]][that.vmodel.split('.')[1]] = val;
    });
    // WATCH 2nd-way binding ------------------
    this.$watch(that.vmodel, val => {
      if( +val[0] != +that.myid.noUiSlider.get()[0] || +val[1] != +that.myid.noUiSlider.get()[1]) 
          that.myid.noUiSlider.set(val);
    });
    
    // COLLISION MERGING 2 TOOLTIPS ==================================
    var initleft =null;
    myid.noUiSlider.on('update',(val, handle) => {
      val = [+val[0],+val[1]].sort((a, b) => a - b);
      
      tt1 = $('#slider-'+this._uid +' .noUi-tooltip:eq(0)');
      tt2 = $('#slider-'+this._uid +' .noUi-tooltip:eq(1)'); 
      // they can be inverted in the DOM
      // if(+tt1.text() > +tt2.text()) {
      //   console.log('INVERTED !!!')
      //   tt3 = tt1;
      //   tt1 = tt2;
      //   tt2 = tt3;
      // }
      
      space = Math.abs(Math.round(tt2.parent().parent().position().left - tt1.parent().parent().position().left));
      // var distance = Math.abs(thisstops.indexOf(val[0])-thisstops.indexOf(val[1]));
      if(space<30) {
        tt2.hide();                                                             // hide 2nd tooltip
        if(that.bigNumbers)                                                     // mix 2 val in 1st tooltip
          tt1.text((val[0]+'?').replace('000000?','M').replace('000?','k').replace('?','') + '–' + (val[1]+'?').replace('000000?','M').replace('000?','k').replace('?','')); 
        else tt1.text(val.join('–'));
        if(!initleft) initleft = +tt1.css('left').replace('px','');             // store the constant
        tt1.css('left', initleft + space/2);                                    // move to the middle
        tt1.css('width', 'auto');                                               // move to the middle
      }else{                                                                    // restore normal
        tt2.show();
        if(that.bigNumbers) 
          tt1.text((val[0]+'?').replace('000000?','M').replace('000?','k').replace('?',''));
        else tt1.text(val[0]);
        if(!initleft) initleft = +tt1.css('left').replace('px','');
        tt1.css('left', initleft);
      }
    });
    
  },
  template: `<div :id="'slider-'+this._uid"></div>`
});
