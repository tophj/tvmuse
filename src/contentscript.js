/* 
---------------------- contentscript.js -------------------------
 ------  Shows all the non-spam comments on the webpage ---------
 */ 



/* TODO: 
Add blur while censoring is loading
maybe make shows searchable from a button
fix race condition with ajax callbacks
hover over text to view
*/



/* Work-around for running functions defined outside the DOM */
function main(){
  showAllComments();
}
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
document.head.appendChild(script);


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

  // Censors the comments
  var comments = $("li").find("p");
  for(var i = 0; i < comments.length ; i++){
    var parentName = $(comments[i]).parent().attr('name');

    if(parentName != "fcomments"){

      // can look here for i links which represent spam too
      var textNode = checkSpam(comments[i]);
      censorText(textNode);
    }
  }
});


/* Expands a comment and checks if it's spam or not */
function checkSpam(textNode){

  var v = textNode.innerHTML;
  var checkSpam = "This comment is hidden because it's likely to be inappropriate or spam.";
  var spam = v.search(checkSpam);
  

  if(spam >= 0){   
    var button = $(textNode).find("a");
    if(button[0] != null){
       button[0].click();

    } 
  }
  return textNode;
}

/* Replaces all non-links with a black bar */
function censorText(textNode) {

  var v = textNode.innerHTML;
  var changed = false;
  var regexLinks = /(https?:\/\/[^\s]+)/g;
  var findLinks = v.match(regexLinks);

  if(findLinks == null){
    changed = true;
  }
  else{
    var returnString = "";
    var aLinks = $(textNode).find("a");
    var targetLength = v.length;

    if(aLinks.length > 0){
      targetLength = aLinks.length;
      findLinks = aLinks;
    }

    for(var i = 0; i < targetLength;i++){
      returnString += "<a href=" + findLinks[i] + ">" + findLinks[i] + "</a><br>" ; 
    }
    
    v = returnString;
  }  
  
  textNode.innerHTML = v;

  if(changed){
    textNode.style.background = 'black';
  }
}
