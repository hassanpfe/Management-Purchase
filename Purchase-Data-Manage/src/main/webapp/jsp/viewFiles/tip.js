var vdpTooltipSelector = null;
var vdpCurrentToolTipTimeout = null;
var vdpCurrentToolTipXHR = null;
var vdpCurrentToolTip = null;
var vdpToolTipParent = null;
var vdpToolTipDontFollow = false;
/**
 * Affiche le tooltip selon son id
 * 
 * @param tipId id du tooltip
 */
function stm(tipId, self, event) {
	$handler = vdpGetTooltipHandler();
	$tip = $("#" + tipId);
	if($tip.length < 0) // Le tooltip n'existe pas dans le DOM
		return;
	vdpToolTipParent = $(self);

	if($handler.length > 0)
	{
		var mode, positioning, callAjax, showTimeout, hideTimeout, isAjax;
		var alreadyLoad = false;
		if(vdpCurrentToolTip != null && vdpCurrentToolTip != undefined && tipId == vdpCurrentToolTip["id"] )
		{
			var showIcon = vdpCurrentToolTip["showIcon"];
			var positioning = vdpCurrentToolTip["positioning"];
			var callAjax =  vdpCurrentToolTip["callAjax"];
			var showTimeout = vdpCurrentToolTip["showTimeout"];
			var hideTimeout = vdpCurrentToolTip["hideTimeout"];
			var isAjax = vdpCurrentToolTip["isAjax"];
			var cssClass = vdpCurrentToolTip["cssClass"];
			alreadyLoad = true;
			vdpToolTipDontFollow = false;
		}
		else {
			var showIcon = vdpGetAttr( $tip, "data-show-icon", "false" ) == "true"; // mode click or hover
			var positioning = vdpGetAttr( $tip, "data-positioning", "follow" ); // positioning fixed or follow
			var callAjax =  vdpGetAttr( $tip, "data-ajax", null); // url call ajax
			var showTimeout = vdpGetAttr( $tip, "data-show-timeout", 0); // tooltip timeout to show
			var hideTimeout = vdpGetAttr( $tip, "data-hide-timeout", 250); // tooltip timeout to hide
			var cssClass = vdpGetAttr( $tip, "data-css-class", null); // tooltip additionnal cssClass
			var isAjax = callAjax != null && callAjax != undefined && callAjax.length > 0;
			vdpToolTipDontFollow = true;
		}
		
		if(!isAjax && $tip.html().length <= 0) // Le tooltip est vide
			return;
		
		if(showIcon && positioning == "fixed")
		{
			clearTimeout(vdpCurrentToolTipTimeout);
			if(vdpCurrentToolTip != null && vdpCurrentToolTip != undefined && alreadyLoad && vdpCurrentToolTip["isShow"]) // On le cache
				htm(); //vdpCurrentToolTipTimeout = setTimeout(vdpHideTooltip, hideTimeout);
			else vdpCurrentToolTipTimeout = setTimeout(function(){ vdpShowTooltip( $handler, $tip, tipId, showIcon, positioning, showTimeout, hideTimeout, isAjax, callAjax, cssClass ); }, showTimeout);
		}
		else {
			if(positioning == "follow")
			{
				vdpToolTipParent.unbind("mousemove").bind("mousemove", function(event){
					$(this).attr("data-x", event.pageX);
					$(this).attr("data-y", event.pageY);
				});
			}
			clearTimeout(vdpCurrentToolTipTimeout);
			vdpCurrentToolTipTimeout = setTimeout(function(){ vdpShowTooltip( $handler, $tip, tipId, showIcon, positioning, showTimeout, hideTimeout, isAjax, callAjax, cssClass ); }, showTimeout);	
		}
	}
}

/**
 * Cache le tooltip courant
 */
function htm() {
	if(vdpCurrentToolTipTimeout != undefined && vdpCurrentToolTipTimeout != null)
		clearTimeout(vdpCurrentToolTipTimeout);
	
	// Si le current tooltip existe bien on le cache
	if( vdpCurrentToolTip != null && vdpCurrentToolTip != undefined )
	{
		vdpCurrentToolTipTimeout = setTimeout(vdpHideTooltip, vdpCurrentToolTip["hideTimeout"]);
	}
}

/**
 * 
 * @returns
 */
function vdpGetTooltipHandler()
{
	if(!(vdpTooltipSelector != null && vdpTooltipSelector != undefined && vdpTooltipSelector.length > 0))
		vdpTooltipSelector = $("#ToolTip");
	return vdpTooltipSelector;
}

function vdpShowTooltip(toolTipHandler, tip, tipId, showIcon, positioning, showTimeout, hideTimeout, isAjax, callAjax, cssClass)
{
	// Si on est pendant le chargement on affiche pas de tooltip
	if( ( typeof vdpLoading != "undefined" ) && vdpLoading) {
		return;
	}
	delete(vdpCurrentToolTip);
	vdpCurrentToolTip = new Array();
	vdpCurrentToolTip["handler"] = tip;
	vdpCurrentToolTip["id"] = tipId;
	vdpCurrentToolTip["showIcon"] = showIcon;
	vdpCurrentToolTip["positioning"] = positioning;
	vdpCurrentToolTip["callAjax"] =  callAjax;
	vdpCurrentToolTip["showTimeout"] = showTimeout;
	vdpCurrentToolTip["hideTimeout"] = hideTimeout;
	vdpCurrentToolTip["isAjax"] = isAjax;
	vdpCurrentToolTip["cssClass"] = cssClass;
	vdpCurrentToolTip["isShow"] = true;
	vdpToolTipDontFollow = false;
	
	var toolTipHandlerContent = toolTipHandler.find(".tooltip-content");
	if(vdpCurrentToolTip["cssClass"] != null)
		toolTipHandler.addClass(vdpCurrentToolTip["cssClass"]);
	// On vide et on supprime la class de loading du tooltip handler avant d'afficher
	toolTipHandlerContent.empty();
	toolTipHandlerContent.removeClass("loading");
	
	if(isAjax) {
		toolTipHandlerContent.addClass("loading");
		vdpCurrentToolTipXHR = $.ajax({
			type: "GET",
			url: callAjax,
			success: function( data ) {
				$data = $(data);
				if($data.find("ajax-response").attr("noToolTip") != undefined && $data.find("ajax-response").attr("noToolTip") == "false")
				{
					$handler = vdpGetTooltipHandler();
					$handlerContent = $handler.find(".tooltip-content");
					$handlerContent.removeClass("loading");
					$handlerContent.append($(data).find("ajax-html").text());
					vdpTooltipMaxWidth($handler);
					vdpTooltipInitPlacing( vdpCurrentToolTip["positioning"] );
				}
				else {
					vdpHideTooltip();
				}
				vdpCurrentToolTipXHR = null;
			}
		});
	}
	else {
		toolTipHandlerContent.append(tip.html());
		vdpTooltipMaxWidth(toolTipHandler);
	}
	
	if(!(showIcon && positioning == "fixed")) {
		toolTipHandler.unbind("mouseenter").bind("mouseenter", function() {
			clearTimeout(vdpCurrentToolTipTimeout);
		});
		
		toolTipHandler.unbind("mouseleave").bind("mouseleave", function() {
			htm();
		});
	}
	
	vdpTooltipInitPlacing( positioning );
	
	toolTipHandler.fadeIn();
}

function vdpTooltipInitPlacing(positioning)
{
	if(positioning == "fixed") {
		$handler.find(".tooltip-arrow").show();
		var x = vdpToolTipParent.offset().left + vdpToolTipParent.width();
		var y = vdpToolTipParent.offset().top;
		vdpPlaceToolTip( x, y );
	}
	else
	{
		$handler.find(".tooltip-arrow").hide();
		vdpToolTipParent.unbind("mousemove").bind("mousemove", function(event) {
			if(!vdpToolTipDontFollow)
				vdpMouseMoveTips( event );
		});
	
		var x = vdpToolTipParent.attr("data-x");
		var y = vdpToolTipParent.attr("data-y");
		if( x == null || x == undefined || y == null || y == undefined )
		{
			x = vdpToolTipParent.offset().left + vdpToolTipParent.width();
			y = vdpToolTipParent.offset().top;
		}
		
		vdpPlaceToolTip( x, y );
	}
}

function vdpTooltipMaxWidth($handler)
{
	$handler.css("width", "auto");
	var tooltipMaxWidth = 500;
	if(parseInt($handler.outerWidth()) > tooltipMaxWidth) {
		$handler.css("width", tooltipMaxWidth + "px");
	}
}

function vdpHideTooltip()
{
	if(vdpCurrentToolTip != null)
	{
		vdpCurrentToolTip["isShow"] = false;
		if(vdpCurrentToolTip["positioning"] == "follow")
			vdpToolTipParent.unbind("mousemove");
	}
	
	vdpToolTipClearCalls();
	
	$handler = vdpGetTooltipHandler();
	if($handler.length > 0)
	{
		$handler.unbind("mouseenter mouseout");
		$handler.hide(0, {
			complete : function() {
				$handler.css({ "top" : "-1000px", "left" : "0px" });
				if(vdpCurrentToolTip != null && vdpCurrentToolTip != undefined && vdpCurrentToolTip["cssClass"] != null)
					$handler.removeClass(vdpCurrentToolTip["cssClass"]);
			}
		});	
	}
}

function vdpMouseMoveTips(event)
{
	vdpPlaceToolTip( event.pageX, event.pageY );
}

function vdpPlaceToolTip(x, y)
{
	x = parseInt(x);
	y = parseInt(y);
	var offsetMouseTooltip = 10;
	
	$handler = vdpGetTooltipHandler();
	
	var height = parseInt($handler.outerHeight());
	var width = parseInt($handler.outerWidth());
	
	//Infos de la fenetre
	var windowHeight = parseInt($(window).height());
	var windowWidth = parseInt($(window).width());
	var windowScrollTop = parseInt($(window).scrollTop());
	var windowScrollLeft = parseInt($(window).scrollLeft());
	
	var newTop = y - height - offsetMouseTooltip;
	if(newTop < windowScrollTop && ((y + height + offsetMouseTooltip) <= (windowScrollTop + windowHeight)) )
		newTop = y + offsetMouseTooltip;

	var newLeft = x + offsetMouseTooltip;
	if( ( (newLeft + width) > (windowScrollLeft + windowWidth)) && ( (x - offsetMouseTooltip - width) >= windowScrollLeft) )
		newLeft = x - offsetMouseTooltip - width;
	
	$handler.css({ "top" : newTop + "px", "left" : newLeft + "px" });
}

/**
 * Get attribute value
 * 
 * @param $selector
 * @param name
 * @param defaultValue
 * @returns
 */
function vdpGetAttr($selector, name, defaultValue)
{
	if($selector != null && $selector != undefined && $selector.length > 0)
	{
		var value = $selector.attr(name);
		if(value != null && value != undefined && value.length > 0)
		{
			return value;
		}
	}

	return defaultValue;
}

/**
 * Appel�e par le vdpFireMessage() cache le tooltip et clear le timer
 */
function vdpTooltipClear()
{
	vdpToolTipClearCalls();	
	if(vdpCurrentToolTip != null && vdpCurrentToolTip != undefined && vdpCurrentToolTip["id"] != null )
	{
		if(vdpCurrentToolTip["positioning"] == "follow" && vdpToolTipParent != null && vdpToolTipParent != undefined) {
			vdpToolTipParent.unbind("mousemove");
		}
		$handler = vdpGetTooltipHandler();
		if($handler != null && $handler != undefined && $handler.length > 0)
		{
			$handler.unbind("mouseenter mouseout");
			$handler.hide();
			$handler.css({ "top" : "-1000px", "left" : "0px" });
		}
		delete(vdpCurrentToolTip);
	}
}

function vdpToolTipClearCalls()
{
	//On clear le timeout aussi si il existe
	if(vdpCurrentToolTipTimeout != null && vdpCurrentToolTipTimeout != undefined)
		clearTimeout(vdpCurrentToolTipTimeout);
	
	// On annule le call ajax si ce dernier existe
	if(vdpCurrentToolTipXHR != null)
		vdpCurrentToolTipXHR.abort();
}