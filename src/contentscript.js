/**
 * Shows all comments in a thread. Defined on the server side.
 */
function main(){
  showAllComments();
}


/**
 * Work-around for running the showAllComments() function, which is defined server-side
*/
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
document.head.appendChild(script);


/**
 * Parses HTML to find the summary div, and all relevant comment divs
 */
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
      var textNode = checkSpam(comments[i]);
      censorText(textNode);
    }
  }
});


/**
 * Most comments with links are automatically tagged as spam
 * This unhides the comment and checks to see if it contains a link, or is actually spam.
 */
function checkSpam(textNode){

  var v = textNode.innerHTML;
  var checkSpam = "This comment is hidden because it's likely to be inappropriate or spam. ";
  var spam = v.search(checkSpam);
  if(spam >= 0){   
    var button = $(textNode).find("a");
    if(button[0] != null){
       $(button[0]).click();
    }
  }
  return textNode;
}

/**
 * Changes the CSS of all non-links(spoilers) to have a black background and thus be unreadable
 */
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
