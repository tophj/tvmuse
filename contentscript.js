
/************* Try and force the page to run showAllComments(). Won't display hidden spam links, ***
************** but will display all comments at the bottom    ************************************* */




walk(document.body);

// DOM walking function 
function walk(node) 
{
  var child, next;

  switch ( node.nodeType )  
  {
    case 1:  // Element
    case 9:  // Document
    case 11: // Document fragment
      child = node.firstChild;
      while ( child ) 
      {
        next = child.nextSibling;
        walk(child);
        child = next;
      }
      break;

    case 3: // Text node
      censorText(node);
      break;
  }
}


/* Replaces all non-links with a '#' */
function censorText(textNode) 
{
  var v = textNode.nodeValue;

  var regexLinks = /(https?:\/\/[^\s]+)/g;
  var checkSpam = "This comment is hidden because it's likely to be inappropriate or spam."

  var spam = v.search(checkSpam)
  if(spam == '-1'){

    var findLinks = v.match(regexLinks)

    if(findLinks == null){
      v = v.replace(/./gm, "#");

    }

  }
  else{
    v = "Either link or spam. ----> "
  }

  textNode.nodeValue = v;
}

//alert("Got here");


// var injectedCode = 'sendAction('2h', null, null, null, null, new Array('672007'))';
// var script = document.createElement('script');
// script.appendChild(document.createTextNode('('+ injectedCode +')();'));
// (document.body || document.head || document.documentElement).appendChild(script);

// var evt = document.createEvent('Event');
// evt.initEvent('myCustomEvent', true,false);

// document.dispatchEvent(evt);
// document.showAllComments();

// document.addEventListener('myCustomEvent', function()){

//   //alert("HELLO");



// }

//var x = document.getElementById("showAllComments");


