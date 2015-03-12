var pages = [],
    links = [];
var numLinks = 0;
var numPages = 0;
var pageTime = 800; //same as CSS transition
var preTabUrl;

//create the pageShow type event.
var pageshow = document.createEvent("CustomEvent");
pageshow.initEvent("pageShow", false, true);

document.addEventListener("DOMContentLoaded", function () { //deviceready,DOMContentLoaded
    //device ready listener
    document.addEventListener("scroll", handleScrolling, false);

    pages = document.querySelectorAll('[data-role="page"]');
    numPages = pages.length;
    links = document.querySelectorAll('[data-role="pagelink"]');
    numLinks = links.length;
    for (var i = 0; i < numLinks; i++) {
        links[i].addEventListener("click", handleNav, false);
    }
    //add the listener for pageshow to each page
    for (var p = 0; p < numPages; p++) {
        pages[p].addEventListener("pageShow", handlePageShow, false);
    }
    loadPage(null);
    
    //for default selection
//  preTabUrl="home";
//  selecteTab("home");
    
    var svgEmbed = document.querySelector("#homeSVG");
    svgEmbed.addEventListener("load", function(){
        preTabUrl="home";
        selecteTab("home");
    });
    
});

function handleNav(ev) {
    ev.preventDefault();
    var href = ev.target.href;
    console.log(href);
    var parts = href.split("#");
    loadPage(parts[1]);
    return false;
}

function handlePageShow(ev) {
    ev.target.className = "active";
}

function loadPage(url) {
    if (url == null) {
        //home page first call
        pages[0].className = 'active';
        history.replaceState(null, null, "#home");      
        
    } else {
        for (var i = 0; i < numPages; i++) {
            pages[i].className = "hidden";
            //get rid of all the hidden classes
            //but make them display block to enable anim.
            if (pages[i].id == url) {
                pages[i].className = "show";
                //add active to the proper page
                history.pushState(null, null, "#" + url);
                setTimeout(addDispatch, 50, i);
            }
        }
        //set the activetab class on the nav menu
        for (var t = 0; t < numLinks; t++) {
            links[t].className = "";
            if (links[t].href == location.href) {
                links[t].className = "activetab";
            }
        }
        
        //If same tab clicked, do nothing
        if(preTabUrl != url)
        {
            //Change selection
            selecteTab(url);
            preTabUrl=url;
        }
    }
}

function addDispatch(num) {
    pages[num].dispatchEvent(pageshow);
    //num is the value i from the setTimeout call
    //using the value here is creating a closure
}



//For tab change selection
function tabSwitch(currentTab) {
    if (currentTab == "home") {
        //Home tab
        var localHome1 = document.getElementById("homeSVG");
        var localHome2 = localHome1.contentDocument;
        var localHome3 = localHome2.querySelector("#Capa_home");
        localHome3.setAttribute("fill", "#009FD4"); 

        //Location Tab
        var localLocation1 = document.getElementById("locationSVG");
        var localLocation2 = a1.contentDocument;
        var localLocation3 = b1.querySelector("#Capa_location");
        localLocation3.setAttribute("fill", "grey");

        //ContactTab
        var localContact1 = document.getElementById("contactsSVG");
        var localContact2 = a2.contentDocument;
        var localContact3 = b2.querySelector("#Capa_contact");
        localContact3.setAttribute("fill", "grey");

    } else if (currentTab == "locations") {
        
        //Home tab
        var localHome21 = document.getElementById("homeSVG");
        var localHome22 = a.contentDocument;
        var localHome23 = b.querySelector("#Capa_home");
        localHome23.setAttribute("fill", "grey");

        //Location Tab
        var localLocation21 = document.getElementById("locationSVG");
        var localLocation22 = localLocation21.contentDocument;
        var localLocation23 = localLocation22.querySelector("#Capa_location");
        localLocation23.setAttribute("fill", "#009FD4");

        //ContactTab
        var localContact21 = document.getElementById("contactsSVG");
        var localContact22 = localContact31.contentDocument;
        var localContact23 = localContact32.querySelector("#Capa_contact");
        localContact23.setAttribute("fill", "grey");
        
        //Get location
        createLocations();
        
    } else if (currentTab == "contacts") {
        
        //Home tab
        var localHome31 = document.getElementById("homeSVG");
        var localHome32 = localHome31.contentDocument;
        var localHome33 = localHome32.querySelector("#Capa_home");
        localHome33.setAttribute("fill", "grey");

        //Location Tab
        var localLocation31 = document.getElementById("locationSVG");
        var localLocation32 = a1.contentDocument;
        var localLocation33 = b1.querySelector("#Capa_location");
        localLocation33.setAttribute("fill", "grey");

        //ContactTab
        var localContact31 = document.getElementById("contactsSVG");
        var localContact32 = a2.contentDocument;
        var localContact33 = b2.querySelector("#Capa_contact");
        localContact33.setAttribute("fill", "#009FD4");
        
        //Get contacts
        fetchingContacts();
    }
}

//handle 300ms delay
function touchHandler(ev){
  //this function will run when the touch events happen
  if( ev.type == "touchend"){
    ev.preventDefault();
    var touch = evt.changedTouches[0];        //this is the first object touched
    
    var newEvt = document.createEvent("MouseEvent");    //old method works across browsers, though it is deprecated.
    /**
    event.initMouseEvent(type, canBubble, cancelable, view,
                     detail, screenX, screenY, clientX, clientY,
                     ctrlKey, altKey, shiftKey, metaKey,
                     button, relatedTarget); **/
    newEvt.initMouseEvent("click", true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY);
    //var newEvt = new MouseEvent("click");             //new method
    //REF: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent.MouseEvent
    ev.currentTarget.dispatchEvent(newEvt);
    //change the touchend event into a click event and dispatch it immediately
    //this will skip the built-in 300ms delay before the click is fired by the browser
  }