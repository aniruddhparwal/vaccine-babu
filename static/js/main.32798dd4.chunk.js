(this["webpackJsonpvaccine-babu"]=this["webpackJsonpvaccine-babu"]||[]).push([[0],{27:function(t,e,n){},33:function(t,e,n){},34:function(t,e,n){"use strict";n.r(e);var c=n(2),s=n.n(c),i=n(19),a=n.n(i),o=(n(27),n(12)),r=n(5),l=n(56),j=n(59),d=n(61),g=n(62),h=n(57),b=n(60),u=n(55),O=n(58),p=n(1);var x=function(t){var e=t.info;return Object(p.jsxs)("div",{className:"infoBlock",children:[Object(p.jsx)("span",{children:e.available_capacity}),Object(p.jsx)("span",{children:e.vaccine}),Object(p.jsxs)("span",{children:["Age ",e.min_age_limit,"+"]})]})},m=Object(r.a)((function(t){return{head:{backgroundColor:t.palette.common.black,color:t.palette.common.white},body:{fontSize:14}}}))(g.a),f=Object(r.a)((function(t){return{root:{"&:nth-of-type(odd)":{backgroundColor:t.palette.action.hover}}}}))(u.a),v=Object(l.a)({table:{minWidth:700}});var N=function(t){var e=t.data,n=v(),c=e.centers[0].sessions[0].date.split("-"),s=new Date(c[2],c[1]-1,c[0]);return console.log(s,"Date"),console.log(e,"Data"),Object(p.jsx)("div",{className:"infoContainer",children:Object(p.jsx)(h.a,{component:O.a,children:Object(p.jsxs)(j.a,{className:n.table,"aria-label":"customized table",children:[Object(p.jsx)(b.a,{children:Object(p.jsxs)(u.a,{children:[Object(p.jsx)(m,{children:"Name of Center"}),Object(p.jsx)(m,{align:"right",children:"".concat(s.getDate(),"-").concat(s.getMonth(),"-").concat(s.getFullYear())}),Object(p.jsx)(m,{align:"right",children:"".concat(s.getDate()+1,"-").concat(s.getMonth(),"-").concat(s.getFullYear())}),Object(p.jsx)(m,{align:"right",children:"".concat(s.getDate()+2,"-").concat(s.getMonth(),"-").concat(s.getFullYear())}),Object(p.jsx)(m,{align:"right",children:"".concat(s.getDate()+3,"-").concat(s.getMonth(),"-").concat(s.getFullYear())}),Object(p.jsx)(m,{align:"right",children:"".concat(s.getDate()+4,"-").concat(s.getMonth(),"-").concat(s.getFullYear())}),Object(p.jsx)(m,{align:"right",children:"".concat(s.getDate()+5,"-").concat(s.getMonth(),"-").concat(s.getFullYear())}),Object(p.jsx)(m,{align:"right",children:"".concat(s.getDate()+6,"-").concat(s.getMonth(),"-").concat(s.getFullYear())})]})}),Object(p.jsx)(d.a,{children:e.centers.map((function(t){return Object(p.jsxs)(f,{children:[Object(p.jsx)(m,{component:"th",scope:"row",children:t.name}),Object(p.jsx)(m,{align:"right",children:t.sessions[0]?Object(p.jsx)(x,{info:t.sessions[0]}):Object(p.jsx)(p.Fragment,{children:"NAN"})}),Object(p.jsx)(m,{align:"right",children:t.sessions[1]?Object(p.jsx)(x,{info:t.sessions[1]}):Object(p.jsx)(p.Fragment,{children:"NAN"})}),Object(p.jsx)(m,{align:"right",children:t.sessions[2]?Object(p.jsx)(x,{info:t.sessions[2]}):Object(p.jsx)(p.Fragment,{children:"NAN"})}),Object(p.jsx)(m,{align:"right",children:t.sessions[3]?Object(p.jsx)(x,{info:t.sessions[3]}):Object(p.jsx)(p.Fragment,{children:"NAN"})}),Object(p.jsx)(m,{align:"right",children:t.sessions[4]?Object(p.jsx)(x,{info:t.sessions[4]}):Object(p.jsx)(p.Fragment,{children:"NAN"})}),Object(p.jsx)(m,{align:"right",children:t.sessions[5]?Object(p.jsx)(x,{info:t.sessions[5]}):Object(p.jsx)(p.Fragment,{children:"NAN"})}),Object(p.jsx)(m,{align:"right",children:t.sessions[6]?Object(p.jsx)(x,{info:t.sessions[6]}):Object(p.jsx)(p.Fragment,{children:"NAN"})})]},t.name)}))})]})})})},_=n.p+"static/media/loader.dab66597.png";var F=function(){return Object(p.jsxs)("div",{className:"loader",children:[Object(p.jsx)("img",{src:_}),Object(p.jsx)("h1",{children:"Loading...."})]})};n(33);var D=function(){var t=Object(c.useState)([]),e=Object(o.a)(t,2),n=e[0],s=e[1],i=Object(c.useState)(!1),a=Object(o.a)(i,2),r=a[0],l=a[1];return Object(c.useEffect)((function(){navigator.geolocation.getCurrentPosition((function(t){fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=".concat(t.coords.latitude,",").concat(t.coords.longitude,"&language=en&key=AIzaSyAlELmqkRobpn26ReMLLTirp7GHsaW8vy0")).then((function(t){return t.json()})).then((function(t){console.log("location data",t),console.log("nn",t.results[0].address_components.length-3),fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states").then((function(t){return t.json()})).then((function(e){console.log(e),e.states.map((function(e){e.state_name===t.results[0].address_components[t.results[0].address_components.length-3].long_name&&(console.log("state_id is ",e.state_id),fetch("https://cdn-api.co-vin.in/api/v2/admin/location/districts/".concat(e.state_id)).then((function(t){return t.json()})).then((function(e){console.log(e),e.districts.map((function(e){e.district_name===t.results[0].address_components[t.results[0].address_components.length-4].long_name&&(console.log("district_id is ",e.district_id),fetch("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=".concat(e.district_id,"&date=04-05-2021")).then((function(t){return t.json()})).then((function(t){s(t),l(!0),console.log("Main data",t)})))}))})))}))}))}))})),console.log("app")}),[]),Object(p.jsx)("div",{className:"app",children:r?Object(p.jsx)(N,{data:n}):Object(p.jsx)(F,{})})},A=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,64)).then((function(e){var n=e.getCLS,c=e.getFID,s=e.getFCP,i=e.getLCP,a=e.getTTFB;n(t),c(t),s(t),i(t),a(t)}))};a.a.render(Object(p.jsx)(s.a.StrictMode,{children:Object(p.jsx)(D,{})}),document.getElementById("root")),A()}},[[34,1,2]]]);
//# sourceMappingURL=main.32798dd4.chunk.js.map