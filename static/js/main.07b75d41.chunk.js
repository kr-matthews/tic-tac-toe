(this["webpackJsonptic-tac-toe"]=this["webpackJsonptic-tac-toe"]||[]).push([[0],{18:function(e,t,r){},19:function(e,t,r){},20:function(e,t,r){},21:function(e,t,r){},22:function(e,t,r){"use strict";r.r(t);var n=r(3),c=r.n(n),a=r(9),s=r.n(a),o=r(2),l=r(1),u=r(0);function i(e){var t=e.player,r=1===t.wins?"":"s";return Object(u.jsxs)("span",{className:"infoBox",children:[Object(u.jsx)("span",{className:"spec name",children:Object(u.jsx)("font",{style:{color:t.colour},children:t.name})}),Object(u.jsx)("span",{className:"spec piece",children:Object(u.jsx)("font",{style:{color:t.colour},children:t.piece})}),Object(u.jsxs)("span",{className:"spec wins",children:[t.wins," Win",r]})]})}var j=function(e){var t=e.players,r=1===t[0].draws?"":"s";return Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)("header",{children:[Object(u.jsx)(i,{player:t[0]}),Object(u.jsxs)("span",{className:"spec draws",children:[t[0].draws," Draw",r]}),Object(u.jsx)(i,{player:t[1]})]})})},f=r(5);function b(e){switch(e){case 0:return"Rookie Ron";case 1:return"Seasoned Sam";case 2:return"Expert Ellie";default:return"Error Erik"}}function d(e){switch(e){case 0:return"green";case 1:return"blue";case 2:return"red";default:return"orange"}}function m(e){switch(e){case 0:return.55;case 1:return.8;case 2:return.97;default:return 1}}function O(e){var t=(new Option).style;return t.color=e,""!==t.color}function h(e){return e&&e.trim()}function p(e){var t=e.players,r=e.setPlayers,c=Object(n.useState)({name:"",colour:""}),a=Object(l.a)(c,2),s=a[0],i=a[1];return Object(u.jsxs)("form",{className:"playerForm human",children:[Object(u.jsxs)("label",{htmlFor:"name",children:["Name:",Object(u.jsx)("input",{type:"text",id:"name",name:"name",placeholder:"display name",value:s.name,onChange:function(e){i(Object(f.a)(Object(f.a)({},s),{},{name:e.target.value}))}}),Object(u.jsx)("span",{className:h(s.name)?"":"hide",children:"\u2713"})]}),Object(u.jsxs)("label",{htmlFor:"colour",children:["Colour:",Object(u.jsx)("input",{type:"text",id:"colour",name:"colour",placeholder:"name or hex/decimal code",value:s.colour,onChange:function(e){i(Object(f.a)(Object(f.a)({},s),{},{colour:e.target.value.toLowerCase()}))}}),Object(u.jsx)("span",{className:O(s.colour)?"":"hide",style:O(s.colour)?{color:s.colour}:{},children:"\u2713"})]}),Object(u.jsx)("input",{className:"button",type:"submit",value:"Submit Human",onClick:function(e){e.preventDefault(),h(s.name)?O(s.colour)?(r([].concat(Object(o.a)(t),[{name:s.name.trim(),colour:s.colour,type:"human",wins:0,draws:0,loses:0}])),i(Object(f.a)(Object(f.a)({},s),{},{name:"",colour:""}))):alert("Please enter a valid colour.\nUse a name ('red'), hex code ('#FF0000'), or decimal code ('rgb(255,0,0)')."):alert("Please enter a name with at least one non-whitespace character.")}})]})}function y(e){var t=e.players,r=e.setPlayers,c=Object(n.useState)({difficulty:""}),a=Object(l.a)(c,2),s=a[0],i=a[1];return Object(u.jsxs)("form",{className:"playerForm computer",children:[Object(u.jsxs)("label",{htmlFor:"difficulty",children:["Difficulty:",Object(u.jsxs)("select",{id:"difficulty",name:"difficulty",value:s.difficulty,onChange:function(e){i(Object(f.a)(Object(f.a)({},s),{},{difficulty:e.target.value}))},children:[Object(u.jsx)("option",{value:"",children:"Random"}),Object(u.jsx)("option",{value:"0",children:"Easy"}),Object(u.jsx)("option",{value:"1",children:"Medium"}),Object(u.jsx)("option",{value:"2",children:"Hard"})]})]}),Object(u.jsx)("input",{className:"button",type:"submit",value:"Submit Computer",onClick:function(e){e.preventDefault();var n=function(e){return e?parseInt(e,10):Math.floor(3*Math.random())}(s.difficulty);r([].concat(Object(o.a)(t),[{name:b(n),type:"computer",difficulty:n,colour:d(n),wins:0,draws:0,loses:0}])),i(Object(f.a)(Object(f.a)({},s),{},{difficulty:""}))}})]})}var v=function(e){var t,r=e.players,n=e.setPlayers;return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("h4",{children:"Tic Tac Toe"}),Object(u.jsxs)("div",{children:["Enter the ",(t=r.length,t<13?["First","Second","Third","Fourth","Fifth","Sixth","Seventh","Eight","Ninth","Tenth","Eleventh","Twelth","Thirteenth"][t]:t%10===1?t+"st":t%10===2?t+"nd":t%10===3?t+"rd":t+"th").toLowerCase()," player's information, ",Object(u.jsx)("u",{children:"or"})," select a difficulty for a computer-controlled player."]}),Object(u.jsx)(p,{players:r,setPlayers:n}),Object(u.jsx)(y,{players:r,setPlayers:n})]})};var x=function(e){var t=e.players,r=e.setPlayers,n=e.setToPlay;return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("div",{className:"message",children:"Select which player will go first."}),t.map((function(e,c){return Object(u.jsx)("button",{className:"button",type:"button",onClick:function(){n(c);var e=Object(o.a)(t);e[c].piece="X",e[1-c].piece="O",r(e)},children:Object(u.jsx)("font",{style:{color:e.colour},children:e.name})},c)}))]})},w=[[[0,0],[1,1],[2,2]],[[0,2],[1,1],[2,0]],[[0,0],[0,1],[0,2]],[[1,0],[1,1],[1,2]],[[2,0],[2,1],[2,2]],[[0,0],[1,0],[2,0]],[[0,1],[1,1],[2,1]],[[0,2],[1,2],[2,2]]],g=[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];function N(e){return w.filter((function(t){var r=t.map((function(t){var r=Object(l.a)(t,2),n=r[0],c=r[1];return e[n][c]}));return!r.includes(-1)&&1===new Set(r).size}))}function P(e){var t=e.winner,r=e.square,n=e.r_ind,c=e.c_ind,a=e.players,s=e.outcome,o=e.toPlay,l=e.placePiece,i="square"+function(e,t){var r="";return e<2&&(r+=" bottom"),t<2&&(r+=" right"),r}(n,c);return-1!==r?Object(u.jsx)("td",{className:i+(t?" winner":""),children:Object(u.jsx)("font",{style:{color:a[r].colour},children:a[r].piece})}):-1===s&&o>=0&&"human"===a[o].type?Object(u.jsx)("td",{className:i,children:Object(u.jsx)("button",{type:"button",onClick:function(){return l(n,c)}},c)}):Object(u.jsx)("td",{className:i},c)}var E=function(e){var t=e.board,r=e.players,n=e.toPlay,c=e.outcome,a=e.placePiece,s=N(t);return Object(u.jsx)("table",{className:"board",children:Object(u.jsx)("tbody",{children:t.map((function(e,t){return Object(u.jsx)("tr",{className:"row",children:e.map((function(e,o){return Object(u.jsx)(P,{winner:(i=s,j=t,f=o,i.some((function(e){return e.some((function(e){var t=Object(l.a)(e,2),r=t[0],n=t[1];return r===j&&n===f}))}))),square:e,r_ind:t,c_ind:o,players:r,outcome:c,toPlay:n,placePiece:a},o);var i,j,f}))},t)}))})})};var F=function(e){var t=e.outcome,r=e.players,n=e.toPlay;return-1===t?Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("div",{className:"message",children:"Next to play:"}),Object(u.jsx)("div",{className:"message",children:Object(u.jsx)("font",{style:{color:r[n].colour},children:r[n].name})})]}):2===t?Object(u.jsx)("div",{className:"message",children:"It's a draw."}):Object(u.jsxs)("div",{className:"message",children:[Object(u.jsx)("font",{style:{color:r[t].colour},children:r[t].name})," ","wins!"]})};var S=function(e){e.outcome;var t=e.reset,r=e.resetBoard;return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("button",{className:"button",type:"button",onClick:r,children:"Play Again"}),Object(u.jsx)("button",{className:"button",type:"button",onClick:t,children:"New Players"})]})},C=r(10),q=r(4),k=r.n(q);function T(e,t){return t%4===0?e:T([e[1],2-e[0]],t-1)}function M(e,t,r){return k.a.isEqual(T(e,r),t)}function B(e,t,r){return g.every((function(n){var c=Object(l.a)(n,2),a=c[0],s=c[1],o=T(n,r),u=Object(l.a)(o,2),i=u[0],j=u[1];return e[a][s]===t[i][j]}))}function D(e,t){var r=Object(l.a)(e,2),n=r[0],c=r[1];switch(t){case 1:return[c,n];case 2:return[2-c,2-n];case 3:return[2-n,c];case 4:return[n,2-c];default:return"Error"}}function _(e,t,r){return k.a.isEqual(D(e,r),t)}function I(e,t,r){return g.every((function(n){var c=Object(l.a)(n,2),a=c[0],s=c[1],o=D(n,r),u=Object(l.a)(o,2),i=u[0],j=u[1];return e[a][s]===t[i][j]}))}var R=[2,2];function H(e){return[[1-e,-1,-1],[-1,e,-1],[-1,-1,1-e]]}var J=[0,2],L=[2,0];function z(e,t,r,n,c){return[1,2,3].some((function(t){return M(r,c,t)&&B(e,n,t)}))||[1,2,3,4].some((function(t){return _(r,c,t)&&I(e,n,t)}))}function A(e,t,r){if(z(t,0,e,function(e){return[[e,-1,-1],[-1,1-e,-1],[-1,-1,-1]]}(r),R))return 500;if(z(t,0,e,H(r),J))return-500;if(z(t,0,e,H(r),L))return-500;var n=0;return w.slice().filter((function(t){return r=e,t.some((function(e,t){return k.a.isEqual(r,e)}));var r})).forEach((function(e){n+=function(e,t,r,n){var c=r.map((function(e){var r=Object(l.a)(e,2),n=r[0],c=r[1];return t[n][c]})).sort();return k.a.isEqual(c,[-1,n,n])?1e3:k.a.isEqual(c,[-1,1-n,1-n])?100:k.a.isEqual(c,[-1,-1,n])?10:k.a.isEqual(c,[-1,-1,1-n])?9:k.a.isEqual(c,[-1,-1,-1])?2:k.a.isEqual(c,[-1,0,1])?-2:"Error"}(0,t,e,r)})),n}function U(e,t){if(t.score!==e.score)return t.score-e.score}function W(e,t,r){var n=k.a.shuffle(g.slice()).filter((function(e){return function(e,t){var r=Object(l.a)(e,2),n=r[0],c=r[1];return-1===t[n][c]}(e,t)})).filter((function(e,r,n){return function(e,t,r,n){return n.every((function(n,c){return c>=r||[1,2,3].every((function(r){return!(M(t,n,r)&&B(e,e,r))}))&&[1,2,3,4].every((function(r){return!(_(t,n,r)&&I(e,e,r))}))}))}(t,e,r,n)})).map((function(e){var n=Object(l.a)(e,2);return{row:n[0],col:n[1],score:A(e,t,r)}})).sort(U);console.log(n);var c,a=Object(C.a)(n);try{for(a.s();!(c=a.n()).done;){var s=c.value;if(m(e)>Math.random())return s}}catch(o){a.e(o)}finally{a.f()}return k.a.shuffle(n)[0]}r(18),r(19),r(20),r(21);var X=function(){var e=Object(n.useState)([]),t=Object(l.a)(e,2),r=t[0],c=t[1],a=[[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]],s=Object(n.useState)(a),i=Object(l.a)(s,2),f=i[0],b=i[1],m=Object(n.useState)(-1),O=Object(l.a)(m,2),h=O[0],p=O[1],y=Object(n.useState)(-1),w=Object(l.a)(y,2),g=w[0],P=w[1];function C(e,t){var n=Object(o.a)(f);if(n[e][t]=h,b(n),N(f).length>0){P(h);var a=Object(o.a)(r);a[h].wins+=1,a[1-h].loses+=1,c(a)}else if(function(e){return![].concat(Object(o.a)(e[0]),Object(o.a)(e[1]),Object(o.a)(e[2])).includes(-1)}(f)){P(2);var s=Object(o.a)(r);s[h].draws+=1,s[1-h].draws+=1,c(s)}else p(1-h)}function q(){b(a),P(-1),p(-1);var e=Object(o.a)(r);delete e[0].piece,delete e[1].piece,c(e)}return Object(n.useEffect)((function(){if(h>=0&&"computer"===r[h].type){var e=W(r[h].difficulty,f,h),t=e.row,n=e.col;setTimeout((function(){C(t,n)}),700+350*r[h].difficulty)}}),[h]),Object(n.useEffect)((function(){if(2===r.length&&r[0].colour===r[1].colour)if("computer"===r[1].type){var e=Object(o.a)(r);e[1].colour=d(-1),c(e)}else if("computer"===r[0].type){var t=Object(o.a)(r);t[0].colour=d(-1),c(t)}}),[r.length]),r.length<2?Object(u.jsx)(v,{players:r,setPlayers:c}):-1===h?Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(j,{players:r}),Object(u.jsx)(E,{board:f,players:r,toPlay:h,outcome:g,placePiece:C}),Object(u.jsx)(x,{players:r,setPlayers:c,setToPlay:p})]}):Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(j,{players:r}),Object(u.jsx)(E,{board:f,players:r,toPlay:h,outcome:g,placePiece:C}),Object(u.jsx)(F,{players:r,toPlay:h,outcome:g}),-1!==g&&Object(u.jsx)(S,{outcome:g,reset:function(){q(),c([])},resetBoard:q})]})};s.a.render(Object(u.jsx)(c.a.StrictMode,{children:Object(u.jsx)(X,{})}),document.getElementById("root"))}},[[22,1,2]]]);
//# sourceMappingURL=main.07b75d41.chunk.js.map