




/* ------ Show all the non-spam comments on the webpage ---------*/ 


/* Work-around for running functions defined outside the DOM */
function main(){


  showAllComments();

}
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
document.head.appendChild(script);

/* ------- All comments should be shown ------------ */




/* Loops through HTML and extracts all the comment links */
$(function(){


  // Censors the summary
  var summary = $("li").find("div");

  for(var i = 0; i < summary.length; i++){

    var parentClass = $(summary[i]).parent().attr('class');
    if(parentClass === 'cfix mb_1'){
      summary[i].style.background = 'black';
    }

  }


  var comments = $("li").find("p");

  for(var i = 0; i < comments.length ; i++){

    var parentName = $(comments[i]).parent().attr('name');

    if(parentName != "fcomments"){

      censorText(comments[i]);

    }
  }



});


/* Replaces all non-links with a black bar */
function censorText(textNode) 
{

  var v = textNode.innerHTML;
  var changed = false;
  var regexLinks = /(https?:\/\/[^\s]+)/g;
  var checkSpam = "This comment is hidden because it's likely to be inappropriate or spam.";


  var spam = v.search(checkSpam);


  if(spam >= 0){
    // View possible spam / links
    var button = $(textNode).find("a");
    button[0].click();

  }

  var findLinks = v.match(regexLinks);

  if(findLinks == null){

    // Un-commenting this changes the text under the black censor to "#"
    //v = v.replace(/./gm, "#");
    changed = true;

  }
  else{

    var returnString = "";
    for(var i = 0; i < findLinks.length;i++){
      returnString += findLinks[i];

    }
    v = returnString;

  }
  


  textNode.innerHTML = v;

  if(changed){
    textNode.style.background = 'black';
  }

}



