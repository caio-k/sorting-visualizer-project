"use strict";angular.module("sortingVisualizerProjectApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/sorting.html",controller:"SortingCtrl",controllerAs:"sorting"}).otherwise({redirectTo:"/"})}]),angular.module("sortingVisualizerProjectApp").controller("SortingCtrl",["$scope","$timeout","animationFactory","mergeSort","quickSort","heapSort","bubbleSort",function(a,b,c,d,e,f,g){function h(){for(var b=[],c=0;c<a.numberOfElements;c++){const d=Math.floor(100*Math.random()+1);b.push({id:c+1,value:d,height:5*d+"px",width:700/a.numberOfElements+"px",marginLeft:100/a.numberOfElements+"px",color:n.defaultColor})}return m=2e3/a.numberOfElements,b}function i(b){var c=angular.copy(a.elements);switch(b){case"mergeSort":return d.sort(c);case"quickSort":return e.sort(c);case"heapSort":return f.sort(c);default:return g.sort(c)}}function j(b){return a.elements.find(function(a){return a.id===b})}function k(b){return a.elements.findIndex(function(a){return a.id===b})}function l(c){return new Promise(function(d){for(var e=0;e<c.length;e++)0===e&&a.elements.forEach(function(a){a.color=n.defaultColor}),b(function(b){return function(){switch(c[b].action){case n.SELECTION_ACTION:if(c[b].firstElementId){var e=j(c[b].firstElementId);e.color=c[b].color}if(c[b].secondElementId){var f=j(c[b].secondElementId);f.color=c[b].color}break;case n.SWAP_ACTION:var g=k(c[b].firstElementId),h=k(c[b].secondElementId),i=a.elements[g];a.elements[g]=a.elements[h],a.elements[h]=i,a.elements[g].color=c[b].color,a.elements[h].color=c[b].color;break;case n.OVERRIDE_ACTION:var l=a.elements.splice(c[b].indexToBeRemoved,1);l[0].color=c[b].color,a.elements.splice(c[b].indexToBeInserted,0,l[0])}b===c.length-1&&(a.elements.forEach(function(a){a.color=n.selectedElementColor}),d())}}(e),m*(e+1))})}a.logo="Sorting Visualizer",a.developer="by Caio Nakazawa",a.generateNewArrayButton="Generate new array",a.setModifier="Change array size and sorting speed",a.sortingTypes=[{label:"Merge sort",algorithm:"mergeSort",active:!1},{label:"Quick sort",algorithm:"quickSort",active:!1},{label:"Heap sort",algorithm:"heapSort",active:!1},{label:"Bubble sort",algorithm:"bubbleSort",active:!1}],a.sortByMessage="Algorithms:",a.blockParameters=!1,a.numberOfElements=50;var m=2e3/a.numberOfElements;const n=c.elementProperties;a.elements=h(),a.generateNewArray=function(){a.blockParameters||(a.elements=h())},a.changeArraySizeAndSortingSpeed=function(){a.elements=h()},a.runSort=function(b){if(!a.blockParameters){a.blockParameters=!0;const c=a.sortingTypes.find(function(a){return a.algorithm===b});c.active=!0;var d=i(b);l(d).then(function(){a.blockParameters=!1,c.active=!1,a.$apply()})}}}]),angular.module("sortingVisualizerProjectApp").service("bubbleSort",["animationFactory",function(a){const b=a.elementProperties;this.sort=function(c){for(var d=[],e=c.length-1;e>=0;e--){for(var f=0;e>f;f++){if(d.push(a.createElementAnimationForSelectionAndSwap(c[f].id,c[f+1].id,b.selectedElementColor,b.SELECTION_ACTION)),c[f].value>c[f+1].value){d.push(a.createElementAnimationForSelectionAndSwap(c[f].id,c[f+1].id,b.selectedElementColor,b.SWAP_ACTION));const g=c[f];c[f]=c[f+1],c[f+1]=g}d.push(a.createElementAnimationForSelectionAndSwap(c[f].id,c[f+1].id,b.defaultColor,b.SELECTION_ACTION))}d.push(a.createElementAnimationForSelectionAndSwap(c[e].id,null,b.selectedElementColor,b.SELECTION_ACTION))}return d}}]),angular.module("sortingVisualizerProjectApp").service("heapSort",["animationFactory",function(a){function b(d,e,f,g){var h=e,i=2*e+1,j=2*e+2;if(f>i&&(g.push(a.createElementAnimationForSelectionAndSwap(d[h].id,d[i].id,c.selectedElementColor,c.SELECTION_ACTION)),g.push(a.createElementAnimationForSelectionAndSwap(d[h].id,d[i].id,c.defaultColor,c.SELECTION_ACTION)),d[h].value<d[i].value&&(h=i)),f>j&&(g.push(a.createElementAnimationForSelectionAndSwap(d[h].id,d[j].id,c.selectedElementColor,c.SELECTION_ACTION)),g.push(a.createElementAnimationForSelectionAndSwap(d[h].id,d[j].id,c.defaultColor,c.SELECTION_ACTION)),d[h].value<d[j].value&&(h=j)),h!==e){g.push(a.createElementAnimationForSelectionAndSwap(d[h].id,d[e].id,c.selectedElementColor,c.SWAP_ACTION)),g.push(a.createElementAnimationForSelectionAndSwap(d[h].id,d[e].id,c.defaultColor,c.SELECTION_ACTION));var k=d[h];d[h]=d[e],d[e]=k,b(d,h,f,g)}}const c=a.elementProperties;this.sort=function(d){for(var e=[],f=d.length,g=Math.floor(f/2)-1;g>=0;g--)b(d,g,f,e);for(var h=f-1;h>0;h--){e.push(a.createElementAnimationForSelectionAndSwap(d[0].id,d[h].id,c.selectedElementColor,c.SWAP_ACTION));var i=d[0];d[0]=d[h],d[h]=i,e.push(a.createElementAnimationForSelectionAndSwap(d[0].id,null,c.defaultColor,c.SELECTION_ACTION)),b(d,0,h,e)}return e.push(a.createElementAnimationForSelectionAndSwap(d[0].id,null,c.selectedElementColor,c.SELECTION_ACTION)),e}}]),angular.module("sortingVisualizerProjectApp").service("mergeSort",["animationFactory",function(a){function b(a,b,c){return 0===a&&b===c-1}function c(c,d,f,g,h){for(var i=angular.copy(c),j=d,k=f+1,l=d;f>=j&&g>=k;)h.push(a.createElementAnimationForSelectionAndSwap(i[j].id,i[k].id,e.selectedElementColor,e.SELECTION_ACTION)),h.push(a.createElementAnimationForSelectionAndSwap(i[j].id,i[k].id,e.defaultColor,e.SELECTION_ACTION)),i[j].value<i[k].value?(h.push(a.createElementAnimationForOverride(l,l,b(d,g,c.length)?e.selectedElementColor:e.defaultColor,e.OVERRIDE_ACTION)),c[l]=i[j],j++):(h.push(a.createElementAnimationForOverride(k,l,b(d,g,c.length)?e.selectedElementColor:e.defaultColor,e.OVERRIDE_ACTION)),c[l]=i[k],k++),l++;for(;f>=j;)h.push(a.createElementAnimationForSelectionAndSwap(i[j].id,null,e.selectedElementColor,e.SELECTION_ACTION)),h.push(a.createElementAnimationForSelectionAndSwap(i[j].id,null,e.defaultColor,e.SELECTION_ACTION)),h.push(a.createElementAnimationForOverride(l,l,b(d,g,c.length)?e.selectedElementColor:e.defaultColor,e.OVERRIDE_ACTION)),c[l]=i[j],j++,l++;for(;g>=k;)h.push(a.createElementAnimationForSelectionAndSwap(i[k].id,null,e.selectedElementColor,e.SELECTION_ACTION)),h.push(a.createElementAnimationForSelectionAndSwap(i[k].id,null,e.defaultColor,e.SELECTION_ACTION)),h.push(a.createElementAnimationForOverride(k,l,b(d,g,c.length)?e.selectedElementColor:e.defaultColor,e.OVERRIDE_ACTION)),c[l]=i[k],k++,l++}function d(a,b,e,f){if(e>b){var g=Math.floor((b+e)/2);d(a,b,g,f),d(a,g+1,e,f),c(a,b,g,e,f)}}const e=a.elementProperties;this.sort=function(a){var b=[];return d(a,0,a.length-1,b),b}}]),angular.module("sortingVisualizerProjectApp").service("quickSort",["animationFactory",function(a){function b(b,c,e,f){for(var g=b[e],h=c,i=c;e>i;i++){if(f.push(a.createElementAnimationForSelectionAndSwap(b[i].id,g.id,d.selectedElementColor,d.SELECTION_ACTION)),b[i].value<=g.value){f.push(a.createElementAnimationForSelectionAndSwap(b[i].id,b[h].id,d.selectedElementColor,d.SWAP_ACTION));var j=b[h];b[h]=b[i],b[i]=j,f.push(a.createElementAnimationForSelectionAndSwap(b[i].id,b[h].id,d.defaultColor,d.SELECTION_ACTION)),h++}f.push(a.createElementAnimationForSelectionAndSwap(b[i].id,g.id,d.defaultColor,d.SELECTION_ACTION))}f.push(a.createElementAnimationForSelectionAndSwap(b[h].id,b[e].id,d.selectedElementColor,d.SELECTION_ACTION)),f.push(a.createElementAnimationForSelectionAndSwap(b[h].id,b[e].id,d.selectedElementColor,d.SWAP_ACTION)),f.push(a.createElementAnimationForSelectionAndSwap(b[h].id,b[e].id,d.defaultColor,d.SELECTION_ACTION));var k=b[h];return b[h]=b[e],b[e]=k,h}function c(a,d,e,f){if(e>d){var g=b(a,d,e,f);c(a,d,g-1,f),c(a,g+1,e,f)}}const d=a.elementProperties;this.sort=function(a){var b=[];return c(a,0,a.length-1,b),b}}]),angular.module("sortingVisualizerProjectApp").factory("animationFactory",function(){return{createElementAnimationForSelectionAndSwap:function(a,b,c,d){return{firstElementId:a,secondElementId:b,color:c,action:d}},createElementAnimationForOverride:function(a,b,c,d){return{indexToBeRemoved:a,indexToBeInserted:b,color:c,action:d}},elementProperties:{selectedElementColor:"#db3d3d",defaultColor:"#2e97eb",SELECTION_ACTION:"SELECTION",SWAP_ACTION:"SWAP",OVERRIDE_ACTION:"OVERRIDE"}}}),angular.module("sortingVisualizerProjectApp").run(["$templateCache",function(a){a.put("views/sorting.html",'<div id="menu"> <div id="logo"> <span>{{logo}}</span> <br> <span id="developer">{{developer}}</span> </div> <div id="generateNewArray" class="topic" ng-class="blockParameters ? \'defaultCursor\' : \'pointerCursor\'" ng-click="generateNewArray()">{{generateNewArrayButton}}</div> <div id="setModifier" class="topic"> {{setModifier}} <input id="modifierSelector" type="range" min="4" max="100" ng-model="numberOfElements" ng-change="changeArraySizeAndSortingSpeed()" ng-disabled="blockParameters"> </div> <div> <div class="topic">{{sortByMessage}}</div> <ul> <li ng-repeat="sorting in sortingTypes" ng-class="sorting.active ? \'currentAlgorithm\' : \'sortingTypes\'" ng-click="runSort(sorting.algorithm)">{{sorting.label}}</li> </ul> </div> </div> <div id="sortingContent"> <div id="elementsSpace"> <div ng-repeat="element in elements track by $index" style="width: {{element.width}}; height: {{element.height}};\n            background-color: {{element.color}}; float: left; margin-left: {{element.marginLeft}}"></div> </div> </div>')}]);