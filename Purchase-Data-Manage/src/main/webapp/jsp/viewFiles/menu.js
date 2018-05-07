// Ancien menu (a supprimer)

/**
 * This code will show / hide action menu
 * To use it : you need to call showActionsMenu(object, actionsMenuName)
 */
var keepMenuVisible = false;
var inverseSubMenu = false;
var menuWidth = 0;
var pxUnit = 'px';
var displayedMenu = null; // display or not actions menu
function showActionsMenu(object, actionsMenuName) {
	
	hideActionsMenu();
	
	var x = findPosX(object);
	var y = findPosY(object);
	var w = findWindowWidth();
	var h = findWindowHeight();
	
	var xoffset = 20;
	if((w-x)<150) {
		xoffset = -120;
	}

	var handler = document.getElementById(actionsMenuName);
	handler.style.top = (y + 20) + pxUnit;
	handler.style.left = (x + xoffset) + pxUnit;
	handler.style.visibility = 'visible';
	keepMenuVisible = true;
	if (displayedMenu == null)
	{ // First click
		document.onclick = hideActionsMenu; // attach event on the onclick
	}
	setHover(handler);
	displayedMenu = actionsMenuName;
}

function hideActionsMenu() {
	if(keepMenuVisible) {
		keepMenuVisible = false;
		return;
	}
	if (displayedMenu == null || displayedMenu == '')
	{
		return;
	}
	var handler = document.getElementById(displayedMenu);
	displayedMenu = '';
	
	if(handler.style.visibility == 'visible')
		handler.style.visibility = 'hidden';
}

function findPosX(obj)
{
	var $objectSelector = $(obj);
	if($objectSelector.length > 0)
		return $objectSelector.offset().left;
	else return 0;
}

function findPosY(obj)
{
	var $objectSelector = $(obj);
	if($objectSelector.length > 0)
		return $objectSelector.offset().top;
	else return 0;
}

function findWindowWidth() {
	  var w = 0;
	  if( typeof( window.innerWidth ) == 'number' ) { 
	    //Non-IE
	    w = window.innerWidth;
	  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
	    //IE 6+ in 'standards compliant mode'
	    w = document.documentElement.clientWidth;
	  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
	    //IE 4 compatible
	    w = document.body.clientWidth;
	  }
	  return w;
	}

	function findWindowHeight() {
	  var h = 0;
	  if( typeof( window.innerWidth ) == 'number' ) {
	    //Non-IE
	    h = window.innerHeight;
	  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
	    //IE 6+ in 'standards compliant mode'
	    h = document.documentElement.clientHeight;
	  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
	    //IE 4 compatible
	    h = document.body.clientHeight;
	  }
	  return h;
	}

function hover(obj){
	var UL = obj.getElementsByTagName('ul');
    if(UL.length > 0){
      var subMenuStyle = UL[0].style;
      if(subMenuStyle.display == 'none' || subMenuStyle.display == ''){
    	  if(inverseSubMenu)
    		  subMenuStyle.left = (0 - 2 - menuWidth) + pxUnit;
    	  else
    		  subMenuStyle.left = menuWidth + pxUnit;
    	  subMenuStyle.display = 'block';
      }else{
    	  subMenuStyle.display = 'none';
      }
    }
}

function setHover(handler){
 var LI = handler.getElementsByTagName('li');
 var nLI = LI.length;
 if(nLI > 0) {
	 try {
		 menuWidth = LI[0].getElementsByTagName('a')[0].scrollWidth;
		 if(menuWidth > 0) {
			 var x = findPosX(handler);
			 var w = findWindowWidth();
			 inverseSubMenu = (w-x)<(menuWidth*2);
		 }
	 } catch(e) {}
 }
 for(i=0; i < nLI; i++){
    LI[i].onmouseover = function(){
      hover(this);
    }
    LI[i].onmouseout = function(){
    	hover(this);
    }
  }
}


function hover2(obj){
	var UL = obj.getElementsByTagName('ul');
    if(UL.length > 0){
      var subMenuStyle = UL[0].style;
      if(subMenuStyle.display == 'none' || subMenuStyle.display == ''){
    	  subMenuStyle.display = 'block';
      }else{
    	  subMenuStyle.display = 'none';
      }
    }
}

function setHover2(handler){
 var LI = handler.getElementsByTagName('li');
 var nLI = LI.length;
 for(i=0; i < nLI; i++){
    LI[i].onmouseover = function(){
      hover2(this);
    }
    LI[i].onmouseout = function(){
    	hover2(this);
    }
  }
}