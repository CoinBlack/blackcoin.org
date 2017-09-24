!function(t){t.fn.hoverIntent=function(e,i,s){var o={interval:100,sensitivity:6,timeout:0};o="object"==typeof e?t.extend(o,e):t.isFunction(i)?t.extend(o,{over:e,out:i,selector:s}):t.extend(o,{over:e,out:e,selector:i});var n,r,a,l,h=function(t){n=t.pageX,r=t.pageY},c=function(e,i){return i.hoverIntent_t=clearTimeout(i.hoverIntent_t),Math.sqrt((a-n)*(a-n)+(l-r)*(l-r))<o.sensitivity?(t(i).off("mousemove.hoverIntent",h),i.hoverIntent_s=!0,o.over.apply(i,[e])):(a=n,l=r,i.hoverIntent_t=setTimeout(function(){c(e,i)},o.interval),void 0)},u=function(t,e){return e.hoverIntent_t=clearTimeout(e.hoverIntent_t),e.hoverIntent_s=!1,o.out.apply(e,[t])},d=function(e){var i=t.extend({},e),s=this;s.hoverIntent_t&&(s.hoverIntent_t=clearTimeout(s.hoverIntent_t)),"mouseenter"===e.type?(a=i.pageX,l=i.pageY,t(s).on("mousemove.hoverIntent",h),s.hoverIntent_s||(s.hoverIntent_t=setTimeout(function(){c(i,s)},o.interval))):(t(s).off("mousemove.hoverIntent",h),s.hoverIntent_s&&(s.hoverIntent_t=setTimeout(function(){u(i,s)},o.timeout)))};return this.on({"mouseenter.hoverIntent":d,"mouseleave.hoverIntent":d},o.selector)}}(jQuery),function(t,e){"use strict";var i,s=t.document,o=s.documentElement,n=t.Modernizr,r=function(t){return t.charAt(0).toUpperCase()+t.slice(1)},a="Moz Webkit O Ms".split(" "),l=function(t){var e,i=o.style;if("string"==typeof i[t])return t;t=r(t);for(var s=0,n=a.length;n>s;s++)if(e=a[s]+t,"string"==typeof i[e])return e},h=l("transform"),c=l("transitionProperty"),u={csstransforms:function(){return!!h},csstransforms3d:function(){var t=!!l("perspective");if(t&&"webkitPerspective"in o.style){var i=e("<style>@media (transform-3d),(-webkit-transform-3d){#modernizr{height:3px}}</style>").appendTo("head"),s=e('<div id="modernizr" />').appendTo("html");t=3===s.height(),s.remove(),i.remove()}return t},csstransitions:function(){return!!c}};if(n)for(i in u)n.hasOwnProperty(i)||n.addTest(i,u[i]);else{n=t.Modernizr={_version:"1.6ish: miniModernizr for Isotope"};var d,f=" ";for(i in u)d=u[i](),n[i]=d,f+=" "+(d?"":"no-")+i;e("html").addClass(f)}if(n.csstransforms){var p=n.csstransforms3d?{translate:function(t){return"translate3d("+t[0]+"px, "+t[1]+"px, 0) "},scale:function(t){return"scale3d("+t+", "+t+", 1) "}}:{translate:function(t){return"translate("+t[0]+"px, "+t[1]+"px) "},scale:function(t){return"scale("+t+") "}},m=function(t,i,s){var o,n,r=e.data(t,"isoTransform")||{},a={},l={};a[i]=s,e.extend(r,a);for(o in r)n=r[o],l[o]=p[o](n);var c=l.translate||"",u=l.scale||"",d=c+u;e.data(t,"isoTransform",r),t.style[h]=d};e.cssNumber.scale=!0,e.cssHooks.scale={set:function(t,e){m(t,"scale",e)},get:function(t){var i=e.data(t,"isoTransform");return i&&i.scale?i.scale:1}},e.fx.step.scale=function(t){e.cssHooks.scale.set(t.elem,t.now+t.unit)},e.cssNumber.translate=!0,e.cssHooks.translate={set:function(t,e){m(t,"translate",e)},get:function(t){var i=e.data(t,"isoTransform");return i&&i.translate?i.translate:[0,0]}}}var y,v;n.csstransitions&&(y={WebkitTransitionProperty:"webkitTransitionEnd",MozTransitionProperty:"transitionend",OTransitionProperty:"oTransitionEnd otransitionend",transitionProperty:"transitionend"}[c],v=l("transitionDuration"));var g,_=e.event,w="dispatch";_.special.smartresize={setup:function(){e(this).bind("resize",_.special.smartresize.handler)},teardown:function(){e(this).unbind("resize",_.special.smartresize.handler)},handler:function(t,e){var i=this,s=arguments;t.type="smartresize",g&&clearTimeout(g),g=setTimeout(function(){_[w].apply(i,s)},"execAsap"===e?0:100)}},e.fn.smartresize=function(t){return t?this.bind("smartresize",t):this.trigger("smartresize",["execAsap"])},e.Isotope=function(t,i,s){this.element=e(i),this._create(t),this._init(s)};var C=["width","height"],b=e(t);e.Isotope.settings={resizable:!0,layoutMode:"masonry",containerClass:"isotope",itemClass:"isotope-item",hiddenClass:"isotope-hidden",hiddenStyle:{opacity:0,scale:.001},visibleStyle:{opacity:1,scale:1},containerStyle:{position:"relative",overflow:"hidden"},animationEngine:"best-available",animationOptions:{queue:!1,duration:800},sortBy:"original-order",sortAscending:!0,resizesContainer:!0,transformsEnabled:!0,itemPositionDataEnabled:!1},e.Isotope.prototype={_create:function(t){this.options=e.extend({},e.Isotope.settings,t),this.styleQueue=[],this.elemCount=0;var i=this.element[0].style;this.originalStyle={};var s=C.slice(0);for(var o in this.options.containerStyle)s.push(o);for(var n=0,r=s.length;r>n;n++)o=s[n],this.originalStyle[o]=i[o]||"";this.element.css(this.options.containerStyle),this._updateAnimationEngine(),this._updateUsingTransforms();var a={"original-order":function(t,e){return e.elemCount++,e.elemCount},random:function(){return Math.random()}};this.options.getSortData=e.extend(this.options.getSortData,a),this.reloadItems(),this.offset={left:parseInt(this.element.css("padding-left")||0,10),top:parseInt(this.element.css("padding-top")||0,10)};var l=this;setTimeout(function(){l.element.addClass(l.options.containerClass)},0),this.options.resizable&&b.bind("smartresize.isotope",function(){l.resize()}),this.element.delegate("."+this.options.hiddenClass,"click",function(){return!1})},_getAtoms:function(t){var e=this.options.itemSelector,i=e?t.filter(e).add(t.find(e)):t,s={position:"absolute"};return i=i.filter(function(t,e){return 1===e.nodeType}),this.usingTransforms&&(s.left=0,s.top=0),i.css(s).addClass(this.options.itemClass),this.updateSortData(i,!0),i},_init:function(t){this.$filteredAtoms=this._filter(this.$allAtoms),this._sort(),this.reLayout(t)},option:function(t){if(e.isPlainObject(t)){this.options=e.extend(!0,this.options,t);var i;for(var s in t)i="_update"+r(s),this[i]&&this[i]()}},_updateAnimationEngine:function(){var t,e=this.options.animationEngine.toLowerCase().replace(/[ _\-]/g,"");switch(e){case"css":case"none":t=!1;break;case"jquery":t=!0;break;default:t=!n.csstransitions}this.isUsingJQueryAnimation=t,this._updateUsingTransforms()},_updateTransformsEnabled:function(){this._updateUsingTransforms()},_updateUsingTransforms:function(){var t=this.usingTransforms=this.options.transformsEnabled&&n.csstransforms&&n.csstransitions&&!this.isUsingJQueryAnimation;t||(delete this.options.hiddenStyle.scale,delete this.options.visibleStyle.scale),this.getPositionStyles=t?this._translate:this._positionAbs},_filter:function(t){var e=""===this.options.filter?"*":this.options.filter;if(!e)return t;var i=this.options.hiddenClass,s="."+i,o=t.filter(s),n=o;if("*"!==e){n=o.filter(e);var r=t.not(s).not(e).addClass(i);this.styleQueue.push({$el:r,style:this.options.hiddenStyle})}return this.styleQueue.push({$el:n,style:this.options.visibleStyle}),n.removeClass(i),t.filter(e)},updateSortData:function(t,i){var s,o,n=this,r=this.options.getSortData;t.each(function(){s=e(this),o={};for(var t in r)o[t]=i||"original-order"!==t?r[t](s,n):e.data(this,"isotope-sort-data")[t];e.data(this,"isotope-sort-data",o)})},_sort:function(){var t=this.options.sortBy,e=this._getSorter,i=this.options.sortAscending?1:-1,s=function(s,o){var n=e(s,t),r=e(o,t);return n===r&&"original-order"!==t&&(n=e(s,"original-order"),r=e(o,"original-order")),(n>r?1:r>n?-1:0)*i};this.$filteredAtoms.sort(s)},_getSorter:function(t,i){return e.data(t,"isotope-sort-data")[i]},_translate:function(t,e){return{translate:[t,e]}},_positionAbs:function(t,e){return{left:t,top:e}},_pushPosition:function(t,e,i){e=Math.round(e+this.offset.left),i=Math.round(i+this.offset.top);var s=this.getPositionStyles(e,i);this.styleQueue.push({$el:t,style:s}),this.options.itemPositionDataEnabled&&t.data("isotope-item-position",{x:e,y:i})},layout:function(t,e){var i=this.options.layoutMode;if(this["_"+i+"Layout"](t),this.options.resizesContainer){var s=this["_"+i+"GetContainerSize"]();this.styleQueue.push({$el:this.element,style:s})}this._processStyleQueue(t,e),this.isLaidOut=!0},_processStyleQueue:function(t,i){var s,o,r,a,l=this.isLaidOut&&this.isUsingJQueryAnimation?"animate":"css",h=this.options.animationOptions,c=this.options.onLayout;if(o=function(t,e){e.$el[l](e.style,h)},this._isInserting&&this.isUsingJQueryAnimation)o=function(t,e){s=e.$el.hasClass("no-transition")?"css":l,e.$el[s](e.style,h)};else if(i||c||h.complete){var u=!1,d=[i,c,h.complete],f=this;if(r=!0,a=function(){if(!u){for(var e,i=0,s=d.length;s>i;i++)e=d[i],"function"==typeof e&&e.call(f.element,t,f);u=!0}},this.isUsingJQueryAnimation&&"animate"===l)h.complete=a,r=!1;else if(n.csstransitions){for(var p,m=0,g=this.styleQueue[0],_=g&&g.$el;!_||!_.length;){if(p=this.styleQueue[m++],!p)return;_=p.$el}var w=parseFloat(getComputedStyle(_[0])[v]);w>0&&(o=function(t,e){e.$el[l](e.style,h).one(y,a)},r=!1)}}e.each(this.styleQueue,o),r&&a(),this.styleQueue=[]},resize:function(){this["_"+this.options.layoutMode+"ResizeChanged"]()&&this.reLayout()},reLayout:function(t){this["_"+this.options.layoutMode+"Reset"](),this.layout(this.$filteredAtoms,t)},addItems:function(t,e){var i=this._getAtoms(t);this.$allAtoms=this.$allAtoms.add(i),e&&e(i)},insert:function(t,e){this.element.append(t);var i=this;this.addItems(t,function(t){var s=i._filter(t);i._addHideAppended(s),i._sort(),i.reLayout(),i._revealAppended(s,e)})},appended:function(t,e){var i=this;this.addItems(t,function(t){i._addHideAppended(t),i.layout(t),i._revealAppended(t,e)})},_addHideAppended:function(t){this.$filteredAtoms=this.$filteredAtoms.add(t),t.addClass("no-transition"),this._isInserting=!0,this.styleQueue.push({$el:t,style:this.options.hiddenStyle})},_revealAppended:function(t,e){var i=this;setTimeout(function(){t.removeClass("no-transition"),i.styleQueue.push({$el:t,style:i.options.visibleStyle}),i._isInserting=!1,i._processStyleQueue(t,e)},10)},reloadItems:function(){this.$allAtoms=this._getAtoms(this.element.children())},remove:function(t,e){this.$allAtoms=this.$allAtoms.not(t),this.$filteredAtoms=this.$filteredAtoms.not(t);var i=this,s=function(){t.remove(),e&&e.call(i.element)};t.filter(":not(."+this.options.hiddenClass+")").length?(this.styleQueue.push({$el:t,style:this.options.hiddenStyle}),this._sort(),this.reLayout(s)):s()},shuffle:function(t){this.updateSortData(this.$allAtoms),this.options.sortBy="random",this._sort(),this.reLayout(t)},destroy:function(){var t=this.usingTransforms,e=this.options;this.$allAtoms.removeClass(e.hiddenClass+" "+e.itemClass).each(function(){var e=this.style;e.position="",e.top="",e.left="",e.opacity="",t&&(e[h]="")});var i=this.element[0].style;for(var s in this.originalStyle)i[s]=this.originalStyle[s];this.element.unbind(".isotope").undelegate("."+e.hiddenClass,"click").removeClass(e.containerClass).removeData("isotope"),b.unbind(".isotope")},_getSegments:function(t){var e,i=this.options.layoutMode,s=t?"rowHeight":"columnWidth",o=t?"height":"width",n=t?"rows":"cols",a=this.element[o](),l=this.options[i]&&this.options[i][s]||this.$filteredAtoms["outer"+r(o)](!0)||a;e=Math.floor(a/l),e=Math.max(e,1),this[i][n]=e,this[i][s]=l},_checkIfSegmentsChanged:function(t){var e=this.options.layoutMode,i=t?"rows":"cols",s=this[e][i];return this._getSegments(t),this[e][i]!==s},_masonryReset:function(){this.masonry={},this._getSegments();var t=this.masonry.cols;for(this.masonry.colYs=[];t--;)this.masonry.colYs.push(0)},_masonryLayout:function(t){var i=this,s=i.masonry;t.each(function(){var t=e(this),o=Math.ceil(t.outerWidth(!0)/s.columnWidth);if(o=Math.min(o,s.cols),1===o)i._masonryPlaceBrick(t,s.colYs);else{var n,r,a=s.cols+1-o,l=[];for(r=0;a>r;r++)n=s.colYs.slice(r,r+o),l[r]=Math.max.apply(Math,n);i._masonryPlaceBrick(t,l)}})},_masonryPlaceBrick:function(t,e){for(var i=Math.min.apply(Math,e),s=0,o=0,n=e.length;n>o;o++)if(e[o]===i){s=o;break}var r=this.masonry.columnWidth*s,a=i;this._pushPosition(t,r,a);var l=i+t.outerHeight(!0),h=this.masonry.cols+1-n;for(o=0;h>o;o++)this.masonry.colYs[s+o]=l},_masonryGetContainerSize:function(){var t=Math.max.apply(Math,this.masonry.colYs);return{height:t}},_masonryResizeChanged:function(){return this._checkIfSegmentsChanged()},_fitRowsReset:function(){this.fitRows={x:0,y:0,height:0}},_fitRowsLayout:function(t){var i=this,s=this.element.width(),o=this.fitRows;t.each(function(){var t=e(this),n=t.outerWidth(!0),r=t.outerHeight(!0);0!==o.x&&n+o.x>s&&(o.x=0,o.y=o.height),i._pushPosition(t,o.x,o.y),o.height=Math.max(o.y+r,o.height),o.x+=n})},_fitRowsGetContainerSize:function(){return{height:this.fitRows.height}},_fitRowsResizeChanged:function(){return!0},_cellsByRowReset:function(){this.cellsByRow={index:0},this._getSegments(),this._getSegments(!0)},_cellsByRowLayout:function(t){var i=this,s=this.cellsByRow;t.each(function(){var t=e(this),o=s.index%s.cols,n=Math.floor(s.index/s.cols),r=(o+.5)*s.columnWidth-t.outerWidth(!0)/2,a=(n+.5)*s.rowHeight-t.outerHeight(!0)/2;i._pushPosition(t,r,a),s.index++})},_cellsByRowGetContainerSize:function(){return{height:Math.ceil(this.$filteredAtoms.length/this.cellsByRow.cols)*this.cellsByRow.rowHeight+this.offset.top}},_cellsByRowResizeChanged:function(){return this._checkIfSegmentsChanged()},_straightDownReset:function(){this.straightDown={y:0}},_straightDownLayout:function(t){var i=this;t.each(function(){var t=e(this);i._pushPosition(t,0,i.straightDown.y),i.straightDown.y+=t.outerHeight(!0)})},_straightDownGetContainerSize:function(){return{height:this.straightDown.y}},_straightDownResizeChanged:function(){return!0},_masonryHorizontalReset:function(){this.masonryHorizontal={},this._getSegments(!0);var t=this.masonryHorizontal.rows;for(this.masonryHorizontal.rowXs=[];t--;)this.masonryHorizontal.rowXs.push(0)},_masonryHorizontalLayout:function(t){var i=this,s=i.masonryHorizontal;t.each(function(){var t=e(this),o=Math.ceil(t.outerHeight(!0)/s.rowHeight);if(o=Math.min(o,s.rows),1===o)i._masonryHorizontalPlaceBrick(t,s.rowXs);else{var n,r,a=s.rows+1-o,l=[];for(r=0;a>r;r++)n=s.rowXs.slice(r,r+o),l[r]=Math.max.apply(Math,n);i._masonryHorizontalPlaceBrick(t,l)}})},_masonryHorizontalPlaceBrick:function(t,e){for(var i=Math.min.apply(Math,e),s=0,o=0,n=e.length;n>o;o++)if(e[o]===i){s=o;break}var r=i,a=this.masonryHorizontal.rowHeight*s;this._pushPosition(t,r,a);var l=i+t.outerWidth(!0),h=this.masonryHorizontal.rows+1-n;for(o=0;h>o;o++)this.masonryHorizontal.rowXs[s+o]=l},_masonryHorizontalGetContainerSize:function(){var t=Math.max.apply(Math,this.masonryHorizontal.rowXs);return{width:t}},_masonryHorizontalResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_fitColumnsReset:function(){this.fitColumns={x:0,y:0,width:0}},_fitColumnsLayout:function(t){var i=this,s=this.element.height(),o=this.fitColumns;t.each(function(){var t=e(this),n=t.outerWidth(!0),r=t.outerHeight(!0);0!==o.y&&r+o.y>s&&(o.x=o.width,o.y=0),i._pushPosition(t,o.x,o.y),o.width=Math.max(o.x+n,o.width),o.y+=r})},_fitColumnsGetContainerSize:function(){return{width:this.fitColumns.width}},_fitColumnsResizeChanged:function(){return!0},_cellsByColumnReset:function(){this.cellsByColumn={index:0},this._getSegments(),this._getSegments(!0)},_cellsByColumnLayout:function(t){var i=this,s=this.cellsByColumn;t.each(function(){var t=e(this),o=Math.floor(s.index/s.rows),n=s.index%s.rows,r=(o+.5)*s.columnWidth-t.outerWidth(!0)/2,a=(n+.5)*s.rowHeight-t.outerHeight(!0)/2;i._pushPosition(t,r,a),s.index++})},_cellsByColumnGetContainerSize:function(){return{width:Math.ceil(this.$filteredAtoms.length/this.cellsByColumn.rows)*this.cellsByColumn.columnWidth}},_cellsByColumnResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_straightAcrossReset:function(){this.straightAcross={x:0}},_straightAcrossLayout:function(t){var i=this;t.each(function(){var t=e(this);i._pushPosition(t,i.straightAcross.x,0),i.straightAcross.x+=t.outerWidth(!0)})},_straightAcrossGetContainerSize:function(){return{width:this.straightAcross.x}},_straightAcrossResizeChanged:function(){return!0}},e.fn.imagesLoaded=function(t){function i(){t.call(o,n)}function s(t){var o=t.target;o.src!==a&&-1===e.inArray(o,l)&&(l.push(o),--r<=0&&(setTimeout(i),n.unbind(".imagesLoaded",s)))}var o=this,n=o.find("img").add(o.filter("img")),r=n.length,a="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",l=[];return r||i(),n.bind("load.imagesLoaded error.imagesLoaded",s).each(function(){var t=this.src;this.src=a,this.src=t}),o};var x=function(e){t.console&&t.console.error(e)};e.fn.isotope=function(t,i){if("string"==typeof t){var s=Array.prototype.slice.call(arguments,1);this.each(function(){var i=e.data(this,"isotope");return i?e.isFunction(i[t])&&"_"!==t.charAt(0)?void i[t].apply(i,s):void x("no such method '"+t+"' for isotope instance"):void x("cannot call methods on isotope prior to initialization; attempted to call method '"+t+"'")})}else this.each(function(){var s=e.data(this,"isotope");s?(s.option(t),s._init(i)):e.data(this,"isotope",new e.Isotope(t,this,i))});return this}}(window,jQuery),function(t,e,i){function s(t){var e={},s=/^jQuery\d+$/;return i.each(t.attributes,function(t,i){i.specified&&!s.test(i.name)&&(e[i.name]=i.value)}),e}function o(t,e){var s=this,o=i(s);if(s.value==o.attr("placeholder")&&o.hasClass("placeholder"))if(o.data("placeholder-password")){if(o=o.hide().next().show().attr("id",o.removeAttr("id").data("placeholder-id")),t===!0)return o[0].value=e;o.focus()}else s.value="",o.removeClass("placeholder"),s==r()&&s.select()}function n(){var t,e=this,n=i(e),r=this.id;if(""==e.value){if("password"==e.type){if(!n.data("placeholder-textinput")){try{t=n.clone().attr({type:"text"})}catch(a){t=i("<input>").attr(i.extend(s(this),{type:"text"}))}t.removeAttr("name").data({"placeholder-password":n,"placeholder-id":r}).bind("focus.placeholder",o),n.data({"placeholder-textinput":t,"placeholder-id":r}).before(t)}n=n.removeAttr("id").hide().prev().attr("id",r).show()}n.addClass("placeholder"),n[0].value=n.attr("placeholder")}else n.removeClass("placeholder")}function r(){try{return e.activeElement}catch(t){}}var a,l,h="[object OperaMini]"==Object.prototype.toString.call(t.operamini),c="placeholder"in e.createElement("input")&&!h,u="placeholder"in e.createElement("textarea")&&!h,d=i.fn,f=i.valHooks,p=i.propHooks;c&&u?(l=d.placeholder=function(){return this},l.input=l.textarea=!0):(l=d.placeholder=function(){var t=this;return t.filter((c?"textarea":":input")+"[placeholder]").not(".placeholder").bind({"focus.placeholder":o,"blur.placeholder":n}).data("placeholder-enabled",!0).trigger("blur.placeholder"),t},l.input=c,l.textarea=u,a={get:function(t){var e=i(t),s=e.data("placeholder-password");return s?s[0].value:e.data("placeholder-enabled")&&e.hasClass("placeholder")?"":t.value},set:function(t,e){var s=i(t),a=s.data("placeholder-password");return a?a[0].value=e:s.data("placeholder-enabled")?(""==e?(t.value=e,t!=r()&&n.call(t)):s.hasClass("placeholder")?o.call(t,!0,e)||(t.value=e):t.value=e,s):t.value=e}},c||(f.input=a,p.value=a),u||(f.textarea=a,p.value=a),i(function(){i(e).delegate("form","submit.placeholder",function(){var t=i(".placeholder",this).each(o);setTimeout(function(){t.each(n)},10)})}),i(t).bind("beforeunload.placeholder",function(){i(".placeholder").each(function(){this.value=""})}))}(this,document,jQuery),jQuery(document).ready(function(t){t("input, textarea").placeholder()}),+function(t){"use strict";function e(i,s){var o,n=t.proxy(this.process,this);this.$element=t(t(i).is("body")?window:i),this.$body=t("body"),this.$scrollElement=this.$element.on("scroll.bs.scroll-spy.data-api",n),this.options=t.extend({},e.DEFAULTS,s),this.selector=(this.options.target||(o=t(i).attr("href"))&&o.replace(/.*(?=#[^\s]+$)/,"")||"")+" .x-nav li > a",this.offsets=t([]),this.targets=t([]),this.activeTarget=null,this.refresh(),this.process()}e.DEFAULTS={offset:10},e.prototype.refresh=function(){var e=this.$element[0]==window?"offset":"position";this.offsets=t([]),this.targets=t([]);{var i=this;this.$body.find(this.selector).map(function(){var s=t(this),o=s.data("target")||s.attr("href"),n=/^#\w/.test(o)&&t(o);return n&&n.length&&[[n[e]().top+(!t.isWindow(i.$scrollElement.get(0))&&i.$scrollElement.scrollTop()),o]]||null}).sort(function(t,e){return t[0]-e[0]}).each(function(){i.offsets.push(this[0]),i.targets.push(this[1])})}},e.prototype.process=function(){var t,e=this.$scrollElement.scrollTop()+this.options.offset,i=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,s=i-this.$scrollElement.height(),o=this.offsets,n=this.targets,r=this.activeTarget;if(e>=s)return r!=(t=n.last()[0])&&this.activate(t);for(t=o.length;t--;)r!=n[t]&&e>=o[t]&&(!o[t+1]||e<=o[t+1])&&this.activate(n[t])},e.prototype.activate=function(e){this.activeTarget=e,t(this.selector).parents(".current-menu-item").removeClass("current-menu-item");var i=this.selector+'[data-target="'+e+'"],'+this.selector+'[href="'+e+'"]',s=t(i).parents("li").addClass("current-menu-item");s.parent(".dropdown-menu").length&&(s=s.closest("li.dropdown").addClass("current-menu-item")),s.trigger("activate.bs.scrollspy")};var i=t.fn.scrollspy;t.fn.scrollspy=function(i){return this.each(function(){var s=t(this),o=s.data("bs.scrollspy"),n="object"==typeof i&&i;o||s.data("bs.scrollspy",o=new e(this,n)),"string"==typeof i&&o[i]()})},t.fn.scrollspy.Constructor=e,t.fn.scrollspy.noConflict=function(){return t.fn.scrollspy=i,this},t(window).on("load",function(){t('[data-spy="scroll"]').each(function(){var e=t(this);e.scrollspy(e.data())})})}(jQuery),jQuery(document).ready(function(t){function e(e,i,s){t("html, body").animate({scrollTop:t(e).offset().top-o-n+1},i,s)}var i=t("body"),s=i.outerHeight(),o=t("#wpadminbar").outerHeight(),n=t(".x-navbar-fixed-top-active .x-navbar").outerHeight(),r=location.href,a=r.indexOf("#"),l=r.substr(a);if(t(window).load(function(){-1!==a&&t(l).length&&e(l,1,"linear")}),t('a[href*="#"]').on("touchstart click",function(i){if($href=t(this).attr("href"),notComments=-1===$href.indexOf("#comments"),notAccordion=-1===$href.indexOf("#collapse-"),notTabbedContent=-1===$href.indexOf("#tab-"),"#"!==$href&&notComments&&notAccordion&&notTabbedContent){var s=$href.split("#").pop(),o=t("#"+s);o.length>0&&(i.preventDefault(),e(o,850,"easeInOutExpo"))}}),i.hasClass("x-one-page-navigation-active")){i.scrollspy({target:".x-nav-wrap.desktop",offset:o+n}),t(window).resize(function(){i.scrollspy("refresh")});var h=0,c=setInterval(function(){h+=1;var t=i.outerHeight();t!==s&&i.scrollspy("refresh"),10===h&&clearInterval(c)},500)}}),jQuery(function(t){t(".x-slider-container.above .x-slider-scroll-bottom").on("touchstart click",function(e){e.preventDefault(),t("html, body").animate({scrollTop:t(".x-slider-container.above").outerHeight()},850,"easeInOutExpo")}),t(".x-slider-container.below .x-slider-scroll-bottom").on("touchstart click",function(e){e.preventDefault();var i=t(".masthead").outerHeight(),s=t(".x-navbar-fixed-top-active .x-navbar").outerHeight(),o=t(".x-slider-container.above").outerHeight(),n=t(".x-slider-container.below").outerHeight(),r=i+o+n-s;t("html, body").animate({scrollTop:r},850,"easeInOutExpo")})}),jQuery(document).ready(function(t){var e=t(".x-cart-notification");e.length>0&&(t(".add_to_cart_button.product_type_simple").on("click",function(){e.addClass("bring-forward appear loading")}),t("body").on("added_to_cart",function(){e.removeClass("loading").addClass("added"),setTimeout(function(){e.removeClass("appear"),setTimeout(function(){e.removeClass("added bring-forward")},650)},1e3)}))});