



/************* Try and force the page to run showAllComments(). Won't display hidden spam links, ***
************** but will display all comments at the bottom    ************************************* */


/* Loops through HTML and extracts all the comment links */
 $(function(){

  var comments = $("li").find("p");

   for(var i = 0; i < comments.length; i++){

     censorText(comments[i]);

   }

 });


/* Replaces all non-links with a black bar */
function censorText(textNode) 
{



  var v = textNode.innerHTML;
  var changed = false;
  var regexLinks = /(https?:\/\/[^\s]+)/g;
  var checkSpam = "This comment is hidden because it's likely to be inappropriate or spam."

  var spam = v.search(checkSpam)
  if(spam == '-1'){

    var findLinks = v.match(regexLinks)

    if(findLinks == null){

      // Un-commenting this changes the text under the black censor to "#"
      //v = v.replace(/./gm, "#");
      changed = true;

    }
  }

  textNode.innerHTML = v;

  if(changed){
    textNode.style.background = 'black';
  }
  //return changed;
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


