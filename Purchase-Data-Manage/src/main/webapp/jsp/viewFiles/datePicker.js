//Global variables
var winCal;
var dtToday=new Date();
var Cal;
var docCal;
var exDateTime;//Existing Date and Time
var skinPath="default";

var CalendarTitle;
var MonthName;
var WeekDayName;
var dateFormat;
var DateSeparator;

//Configurable parameters
var cnTop=(screen.height) ? (screen.height-245)/2 : 0;
var cnLeft=(screen.width) ? (screen.width-260)/2 : 0;
var WeekChar=3;//number of character for week day. if 2 then Mo,Tu,We. if 3 then Mon,Tue,Wed.
var DateSeparator="/";//Date Separator, you can change it to "/" if you want.
var TimeMode=24;//default TimeMode value. 12 or 24

var SundayClass="cell1";//Background Class of Sunday.
var SaturdayClass="cell1";//Background Class of Saturday.
var WeekDayClass="cell2";//Background Class of weekdays.
var TodayClass="text-highlighted";
var SelDateClass="cell-highlighted";//Backgrond Class of selected date in textbox.
var MonthSelector="dropdown";
var PrecedeZero=true;//Preceding zero of Date or Month. [true|false]

var CalendarTitle_FR="S&eacute;lection d\'une date";
var CalendarTitle_EN="Pick a date";
var CalendarTitle_DE="Datum ausw&auml;hlen";
var CalendarTitle_ES="Selecciona una fecha";
// A completer
var CalendarTitle_PL="CalendarTitle_PL";

var MonthName_FR="Janvier,F&eacute;vrier,Mars,Avril,Mai,Juin,Juillet,Aout,Septembre,Octobre,Novembre,D&eacute;cembre";
var WeekDayName_FR="Dimanche,Lundi,Mardi,Mercredi,Jeudi,Vendredi,Samedi";
var MonthName_EN="January,February,March,April,May,June,July,August,September,October,November,December";
var WeekDayName_EN="Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday";
var MonthName_DE="Januar,Februar,M&auml;rz,April,Mai,Juni,Juli,August,September,Oktober,November,Dezember";
var WeekDayName_DE="Sontag,Montag,Dienstag,Mittwoch,Donnerstag,Freitag,Samstag";
var MonthName_ES="Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre";
var WeekDayName_ES="Domingo,Lunes,Martes,Miercoles,Jueves,Viernes,Sabado";
// A completer
var MonthName_PL=MonthName_EN;// les caract�res polonais sont incompatibles avec l'encodage de ce fichier. Le passage en utf-8 peut avoir des effets non d�sir�s.		
var WeekDayName_PL=WeekDayName_EN;
var CalendarTitle;
var MonthName;
var WeekDayName;
var baseHref;

function dw(content) {
	winCal.document.write(content+"\n");
}

function datePicker(pCtrl,sLanguage,sSkinPath,pFormat,pBaseHref)
{
	// Restore portal format date
	Calendar.prototype.FormatDate=FormatDate;
	baseHref = pBaseHref;
	//default language=EN
	CalendarTitle=CalendarTitle_EN;
	MonthName=MonthName_EN.split(",");
	WeekDayName=WeekDayName_EN.split(",");
	
	if(sLanguage.toLowerCase()=="fr") { //language=FR
		CalendarTitle=CalendarTitle_FR;
		MonthName=MonthName_FR.split(",");
		WeekDayName=WeekDayName_FR.split(",");
	}
	
	if(sLanguage.toLowerCase()=="de") { //language=DE
		CalendarTitle=CalendarTitle_DE;
		MonthName=MonthName_DE.split(",");
		WeekDayName=WeekDayName_DE.split(",");
	}
	
	if(sLanguage.toLowerCase()=="es") { //language=ES
		CalendarTitle=CalendarTitle_ES;
		MonthName=MonthName_ES.split(",");
		WeekDayName=WeekDayName_ES.split(",");
	}
	
	if(sLanguage.toLowerCase()=="pl") { //language=PL
		CalendarTitle=CalendarTitle_EN;
		MonthName=MonthName_PL.split(",");
		WeekDayName=WeekDayName_PL.split(",");		
	}	
	
	//set skin
	if(sSkinPath!=null)
		skinPath = sSkinPath;
	
	Cal=new Calendar(dtToday);
	if (pCtrl!=null)
		Cal.Ctrl=pCtrl;
	if (pFormat!=null)
		Cal.Format=pFormat.toUpperCase();
	
	exDateTime=document.getElementById(pCtrl).value;
	if (exDateTime!="")//Parse Date String
	{
		var Sp1;//Index of Date Separator 1
		var Sp2;//Index of Date Separator 2 
		var tSp1;//Index of Time Separator 1
		var tSp1;//Index of Time Separator 2
		var strMonth;
		var strDate;
		var strYear;
		var intMonth;
		var YearPattern;
		var winHeight;
		//parse month
		Sp1=exDateTime.indexOf(DateSeparator,0);
		Sp2=exDateTime.indexOf(DateSeparator,(parseInt(Sp1)+1));
		if ((Cal.Format.toUpperCase()=="DDMMYYYY") || (Cal.Format.toUpperCase()=="DDMMMYYYY"))
		{
			strMonth=exDateTime.substring(Sp1+1,Sp2);
			strDate=exDateTime.substring(0,Sp1);
			strYear=exDateTime.substring(Sp2+1,Sp2+5);
		}
		else if ((Cal.Format.toUpperCase()=="MMDDYYYY") || (Cal.Format.toUpperCase()=="MMMDDYYYY"))
		{
			strMonth=exDateTime.substring(0,Sp1);
			strDate=exDateTime.substring(Sp1+1,Sp2);
			strYear=exDateTime.substring(Sp2+1,Sp2+5);

		}
		else if ((Cal.Format.toUpperCase()=="YYYYMMDD") || (Cal.Format.toUpperCase()=="YYYYMMMDD"))
		{
			strMonth=exDateTime.substring(Sp1+1,Sp2);
			strDate=exDateTime.substring(Sp2+1,Sp2+3);
			strYear=exDateTime.substring(0,Sp1);
		}
		
		if (isNaN(strMonth))
			intMonth=Cal.GetMonthIndex(strMonth);
		else
			intMonth=parseInt(strMonth,10)-1;	
		if ((parseInt(intMonth,10)>=0) && (parseInt(intMonth,10)<12))
			Cal.Month=intMonth;
		//end parse month
		//parse Date
		if ((parseInt(strDate,10)<=Cal.GetMonDays()) && (parseInt(strDate,10)>=1))
			Cal.Date=strDate;
		//end parse Date
		//parse year
		YearPattern=/^\d{4}$/;
		if (YearPattern.test(strYear))
			Cal.Year=parseInt(strYear,10);
		//end parse year			
	}
	
	var Agent=navigator.userAgent.toUpperCase();
	if (Agent.indexOf("FIREBIRD")==-1)//for Mozilla Firebird
		winHeight=245;
	else
		winHeight=245;
	if(winCal)
		winCal.close();
	
	winCal=window.open("","DateTimePicker","toolbar=0,status=0,menubar=0,width=260,height=245,resizable=1,top="+cnTop+",left="+cnLeft);
	//docCal=winCal.document;
	
	RenderCal();
}


function vdpDatePicker(pCtrl,sSkinPath)
{
	// Restore process format date
	Calendar.prototype.FormatDate=vdpFormatDate;	
	//set skin
	if(sSkinPath!=null)
	{
    var p = sSkinPath.indexOf(";");
    if( p!=-1 )
	    sSkinPath = sSkinPath.substring(0,p);
		skinPath = sSkinPath;
	}
	
	Cal=new Calendar(dtToday);
	if (pCtrl!=null)
		Cal.Ctrl=pCtrl;
	
	exDateTime=document.getElementById(pCtrl).value;
	if (exDateTime!="")//Parse Date String
	{
		var Sp1;//Index of Date Separator 1
		var Sp2;//Index of Date Separator 2 
		var tSp1;//Index of Time Separator 1
		var tSp1;//Index of Time Separator 2
		var strMonth;
		var strDate;
		var strYear;
		var intMonth;
		var YearPattern;
		var winHeight;
		//parse month
		Sp1=exDateTime.indexOf(DateSeparator,0);
		Sp2=exDateTime.indexOf(DateSeparator,(parseInt(Sp1)+1));		
		if( (dateFormat == "DDMMYYYY") || (dateFormat =="DDMMMYYYY"))
		{
			strMonth=exDateTime.substring(Sp1+1,Sp2);
			strDate=exDateTime.substring(0,Sp1);
			strYear=exDateTime.substring(Sp2+1,Sp2+5);
		}
		else if ((dateFormat=="YYYYMMDD") || (dateFormat=="YYYYMMMDD"))
		{
			strMonth=exDateTime.substring(Sp1+1,Sp2);
			strDate=exDateTime.substring(Sp2+1,Sp2+3);
			strYear=exDateTime.substring(0,Sp1);
		}	
		else 	//if ((dateFormat=="MMDDYYYY") || (dateFormat=="MMMDDYYYY"))
		{
			strMonth=exDateTime.substring(0,Sp1);
			strDate=exDateTime.substring(Sp1+1,Sp2);
			strYear=exDateTime.substring(Sp2+1,Sp2+5);
		}			
		
		if (isNaN(strMonth))
			intMonth=Cal.GetMonthIndex(strMonth);
		else
			intMonth=parseInt(strMonth,10)-1;	
		if ((parseInt(intMonth,10)>=0) && (parseInt(intMonth,10)<12))
			Cal.Month=intMonth;
		//end parse month
		//parse Date
		if ((parseInt(strDate,10)<=Cal.GetMonDays()) && (parseInt(strDate,10)>=1))
			Cal.Date=strDate;
		//end parse Date
		//parse year
		YearPattern=/^\d{4}$/;
		if (YearPattern.test(strYear))
			Cal.Year=parseInt(strYear,10);
		//end parse year			
	}
	
	var Agent=navigator.userAgent.toUpperCase();
	if (Agent.indexOf("FIREBIRD")==-1)//for Mozilla Firebird
		winHeight=245;
	else
		winHeight=245;
	if(winCal)
		winCal.close();
	
	winCal=window.open("","DateTimePicker","toolbar=0,status=0,menubar=0,width=260,height=245,resizable=1,top="+cnTop+",left="+cnLeft);
	//docCal=winCal.document;
	
	vdpRenderCal();
}

function RenderCal()
{	
	var vCalHeader;
	var vCalData;
	var vCalTime;
	var i;
	var j;
	var SelectStr;
	var vDayCount=0;
	var vFirstDay;
	//create Year selector
	var month_selector = "<select name=\"MonthSelector\" onChange=\"javascript:window.opener.Cal.SwitchMth(this.selectedIndex);\">\n";
	for (i=0;i<12;i++) {
		if (i==Cal.Month)
			SelectStr="Selected";
		else
			SelectStr="";	
		month_selector+="<option "+SelectStr+" value >"+MonthName[i]+"\n";
	}	
	month_selector+="</select>";
	
	var year_selector = "<select name=\"YearSelector\" onChange=\"javascript:window.opener.Cal.SwitchYr(this.value);\">\n";
	var yr=1900;
	while(yr<2100) {
		if (yr==Cal.Year)
			SelectStr="Selected";
		else
			SelectStr="";	
		year_selector+="<option "+SelectStr+" value=\""+yr+"\">"+yr+"\n";
		yr=yr+1;
	}	
	year_selector+="</select>";
	
	//create Year selector
	//var year_selector = "<a href=\"javascript:window.opener.Cal.Dec10Year();window.opener.RenderCal();\">--</a>&nbsp;<a href=\"javascript:window.opener.Cal.DecYear();window.opener.RenderCal();\"><img src=\""+skinPath+"/images/mandatory/button_previous.gif\" border=\"0\" align=absmiddle></a><input type=\"text\" id=\"_year\" value=\""+Cal.Year+"\" size=\"2\" class=\"readonly\"><a href=\"javascript:window.opener.Cal.IncYear();window.opener.RenderCal();\"><img src=\""+skinPath+"/images/mandatory/button_next.gif\" border=\"0\" align=absmiddle></a>&nbsp;<a href=\"javascript:window.opener.Cal.SwitchYr(document.getElementById('_year').value);\">++</a>\n";
	//var year_selector="<input type=\"text\" id=\"_year\" value=\""+Cal.Year+"\" size=\"2\"><span class=\"button\" onmouseover=\"javascript:initButton(this)\"><a href=\"javascript:window.opener.Cal.SwitchYr(document.getElementById('_year').value);\"><span class=\"button1-part0\"><span class=\"button1-part1\">ok</span></span></a></span>";
	
	//create Week day header
	var weekday_header="<tr align=\"center\">";
	for (i=0;i<7;i++) {
		weekday_header+="<td class=\"cell-header\">"+WeekDayName[i].substr(0,WeekChar)+"</td>";
	}
	weekday_header+="</tr>";
	//create Calendar detail
	var calendar_detail="<tr align=\"center\">";
	
	CalDate=new Date(Cal.Year,Cal.Month);
	CalDate.setDate(1);
	vFirstDay=CalDate.getDay();
	for (i=0;i<vFirstDay;i++)
	{
		calendar_detail+=GenCell();
		vDayCount=vDayCount+1;
	}
	var max=Cal.GetMonDays()+vFirstDay;
	//alert(max);
	max+=7-(max%7)-vFirstDay;
	//alert(max);
	for (j=1;j<=max;j++)
	{
		var strCell;
		vDayCount=vDayCount+1;
		if ((j==dtToday.getDate())&&(Cal.Month==dtToday.getMonth())&&(Cal.Year==dtToday.getFullYear()))
			strCell=GenCell(j,true,TodayClass);
		else //Highlight today's date
		{
			var selected="";
			if(j<=Cal.GetMonDays())
			{
				if (j==Cal.Date)
				{
					strCell=GenCell(j,false,SelDateClass);
				}
				else
				{					
					if (vDayCount%7==0)
						strCell=GenCell(j,false,SaturdayClass);
					else if ((vDayCount+6)%7==0)
						strCell=GenCell(j,false,SundayClass);
					else
						strCell=GenCell(j,null,WeekDayClass);
				}
			}	
			else
			{
				strCell=GenCell();
			}
		}						
		calendar_detail+=strCell;

		if((vDayCount%7==0)&&(j<Cal.GetMonDays()))
		{
			calendar_detail+="</tr>\n<tr align=\"center\">";
		}
	}
	
	var myHtml="";
	
	//initdw();

	myHtml+="<form method=\"GET\" name=\"Calendar\" action=\"\">";
	myHtml="<table width=\"100%\" height=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"header-border\">";
	myHtml+="	<tr>";
	myHtml+="		<td height=\"1%\" class=\"header-level1\">";
	myHtml+="			<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
	myHtml+="				<tr>";
	myHtml+="					<td style=\"padding-right:4px\">";
	myHtml+=month_selector;
	myHtml+="					</td>";
	myHtml+="					<td>";
	myHtml+=year_selector;
	myHtml+="					</td>";
	myHtml+="				</tr>";
	myHtml+="			</table>";
	myHtml+="		</td>";
	myHtml+="	</tr>";
	myHtml+="	<tr>";
	myHtml+="		<td valign=\"top\" height=\"99%\">";
	myHtml+="			<div class=\"content-zone\" id=\"zone1\">";
	myHtml+="				<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"table-border\" align=\"center\">";
	myHtml+=weekday_header;
	myHtml+=calendar_detail;
	myHtml+="				</table>";
	myHtml+="";
	myHtml+="			</div>";
	myHtml+="		</td>";
	myHtml+="	</tr>";
	myHtml+="</table>";
	myHtml+=" </form>";
	
	winCal.document.open();
	dw("<html>");
	dw("<head>");
	dw("<META Http-Equiv=\"Cache-Control\" Content=\"no-cache\">");
	dw("<META Http-Equiv=\"Pragma\" Content=\"no-cache\">");
	dw("<META Http-Equiv=\"Expires\" Content=\"0\">");
	dw("<title>&nbsp;</title><link rel=\"stylesheet\" type=\"text/css\" href=\""+skinPath+"/global.css\"></link>");
	var skinSuffix;
	if(navigator.userAgent.indexOf("MSIE") > 0) //Internet Explorer 5+
	{
		skinSuffix="_msie";
	}
	else  //other browsers
	{
		skinSuffix="_firefox";
	}
	dw("<link rel=\"stylesheet\" type=\"text/css\" href=\""+skinPath+"/global"+skinSuffix+".css\"></link>");
	dw("<SCRIPT language='javascript'>");
	dw("function Async_xmlHttpRequest()");
	dw("{");
	dw(" 	var httpRequest = false;");
	dw("    if (window.XMLHttpRequest) // Mozilla");
	dw("    {");
	dw("    	httpRequest = new XMLHttpRequest();");
	dw("    }");
	dw("	else if (window.ActiveXObject) // ie");
	dw("    {");
	dw("		try");
	dw("		{");
	dw("        	httpRequest = new ActiveXObject(\"Msxml2.XMLHTTP\");");
	dw("		}");
	dw("		catch (e)");
	dw("		{");
	dw("			try");
	dw("			{");
	dw("				httpRequest = new ActiveXObject(\"Microsoft.XMLHTTP\");");
	dw("			}");
	dw("            catch (e)");
	dw("            {");
	dw("				alert(e);");
	dw("			}");
	dw("		}");
	dw("	}");
	dw("	else");
	dw("	{");
	dw("		alert(\"[Error] XMLHttpRequest not supported !\");");
	dw("	}");
	dw("	if (!httpRequest)");
	dw("    {");
	dw("    	alert('unable to create XMLHttpRequest !');");
	dw("        return false;");
	dw("    }");
	dw("	return httpRequest;");
	dw("}");
	dw("");
	dw("function Async_GETRequest(url, func, param)");
	dw("{");
	dw("    var httpRequest = false;");
	dw("    httpRequest = Async_xmlHttpRequest();");
	dw("    ");
	dw("	if (!httpRequest)");
	dw("    	return false;");
	dw("        ");
	dw("    httpRequest.onreadystatechange = function() { Async_HandleResponse(httpRequest, func, param); };");
	dw("   	httpRequest.open('GET', url, true);");
	dw("	httpRequest.send(null);");
	dw("}");
	dw("");
	dw("function Async_HandleResponse(httpRequest, func, param)");
	dw("{");
	dw("	if (httpRequest.readyState == 4) ");
	dw("	{");
	dw("		if (httpRequest.status == 200) ");
	dw("		{");
	dw("			func(httpRequest, param);");
	dw("		}");
	dw("	}");
	dw("	else");
	dw("	{");
	dw("		return;");
	dw("	}");
	dw("}");
	dw("</SCRIPT>");	
	
	dw("<SCRIPT language='javascript'>function fnt(request, params){");
	dw("var o = window.opener.document.getElementById(params[0]);");
	dw("if (o !=null ){o.value = request.responseText;} setTimeout('window.close()',100);}");
	dw("</SCRIPT>");
	dw("</head>");
	dw("<body leftmargin=\"0\" topmargin=\"0\" marginwidth=\"0\" marginheight=\"0\"><div class=\"popup\"><div class=\"portlet\" id=\"datePicker\"><table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\" height=\"100%\"><tr><td height=\"1%\"><div class=\"outerzone1\"><table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\" class=\"zone1\"><tr><td class=\"left\"></td><td class=\"icon\"></td><td class=\"center\">"+CalendarTitle+"</td><td class=\"action-close\" onclick=\"javascript:window.close();\"></td><td class=\"right\"></td></tr></table></div><div class=\"outerzone2\"><table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\" class=\"zone2\"><tr><td class=\"left\"></td><td class=\"center\"></td><td class=\"right\"></td></tr></table></div></td></tr><tr><td height=\"98%\" valign=\"top\"><div class=\"outerzone3\"><table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\" height=\"100%\" class=\"zone3\"><tr><td class=\"left\" nowrap></td><td class=\"center\" valign=\"top\">");
	dw(myHtml);
	dw("</td><td class=\"right\" nowrap></td></tr></table></div></td></tr><tr><td height=\"1%\"><div class=\"outerzone4\"><table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\" class=\"zone4\"><tr><td class=\"left\"></td><td class=\"center\"></td><td class=\"right\"></td></tr></table></div></td></tr></table></div></div></body>");
	dw("</html>");
	winCal.document.close();
}

function GenCell(pValue,pHighLight,cellclass)//Generate table cell with value
{
	var PValue;
	var PCellStr;
	var vHLstr1;//HighLight string
	var vHlstr2;
	var vTimeStr;
	
	if (pValue==null)
		PValue="";
	else
		PValue=pValue;	
	
	var hlpart1="";
	var hlpart2="";
	if ((pHighLight!=null)&&(pHighLight))
	{
		hlpart1="<span class=\"text-highlighted\">";
		hlpart2="</span>";
	}
	
	if (Cal.ShowTime)
	{
		vTimeStr="window.opener.document.getElementById('"+Cal.Ctrl+"').value+=' '+"+"window.opener.Cal.getShowHour()"+"+':'+"+"window.opener.Cal.Minutes"+"+':'+"+"window.opener.Cal.Seconds";
		if (TimeMode==12)
			vTimeStr+="+' '+window.opener.Cal.AMorPM";
	}	
	else
		vTimeStr="";		
	

	if (pValue!=null)
	{

		PCellStr=mhtml(cellclass, pValue, vTimeStr, hlpart1, hlpart2);
    /*	
		"<td class=\""+cellclass+"\" onclick=\"javascript:window.opener.document.getElementById('"+Cal.Ctrl+"').value='"+Cal.FormatDate(PValue)+"';"+vTimeStr+";window.close();\">"+hlpart1+PValue+hlpart2+"</td>";
    */
	}
	else
	{
		PCellStr="<td style=\"cursor:default\">"+hlpart1+PValue+hlpart2+"</td>";
	}	
	return PCellStr;
}

function mhtml(cellclass, PValue, vTimeStr, hlpart1, hlpart2)
{

	var js1 = "javascript:window.opener.document.getElementById('"+Cal.Ctrl+"').value='"+Cal.FormatDate(PValue)+"';"+vTimeStr+";";
	var js2 = "document.body.style.cursor='wait';Async_GETRequest('portal/action/TimeAction?dateFormat=SHORT&date=" + Cal.FormatDate(PValue) + "&type=date&inputFmt=dd/MM/yyyy', fnt,['Async_"+Cal.Ctrl+"']);";
	var html = "<td class=\""+cellclass+"\" onclick=\""+js1+js2+"\" >"+hlpart1+PValue+hlpart2+"</td>";
	return html;
}





function vdpRenderCal()
{	
	var vCalHeader;
	var vCalData;
	var vCalTime;
	var i;
	var j;
	var SelectStr;
	var vDayCount=0;
	var vFirstDay;
	//create Year selector
	var month_selector = "<select name=\"MonthSelector\" onChange=\"javascript:window.opener.Cal.SwitchMth(this.selectedIndex);\">\n";
	for (i=0;i<12;i++) {
		if (i==Cal.Month)
			SelectStr="Selected";
		else
			SelectStr="";	
		month_selector+="<option "+SelectStr+" value >"+MonthName[i]+"\n";
	}	
	month_selector+="</select>";
	
	var year_selector = "<select name=\"YearSelector\" onChange=\"javascript:window.opener.Cal.SwitchYr(this.value);\">\n";
	var yr=1900;
	while(yr<2100) {
		if (yr==Cal.Year)
			SelectStr="Selected";
		else
			SelectStr="";	
		year_selector+="<option "+SelectStr+" value=\""+yr+"\">"+yr+"\n";
		yr=yr+1;
	}	
	year_selector+="</select>";
	
	//create Year selector
	//var year_selector = "<a href=\"javascript:window.opener.Cal.Dec10Year();window.opener.RenderCal();\">--</a>&nbsp;<a href=\"javascript:window.opener.Cal.DecYear();window.opener.RenderCal();\"><img src=\""+skinPath+"/images/mandatory/button_previous.gif\" border=\"0\" align=absmiddle></a><input type=\"text\" id=\"_year\" value=\""+Cal.Year+"\" size=\"2\" class=\"readonly\"><a href=\"javascript:window.opener.Cal.IncYear();window.opener.RenderCal();\"><img src=\""+skinPath+"/images/mandatory/button_next.gif\" border=\"0\" align=absmiddle></a>&nbsp;<a href=\"javascript:window.opener.Cal.SwitchYr(document.getElementById('_year').value);\">++</a>\n";
	//var year_selector="<input type=\"text\" id=\"_year\" value=\""+Cal.Year+"\" size=\"2\"><span class=\"button\" onmouseover=\"javascript:initButton(this)\"><a href=\"javascript:window.opener.Cal.SwitchYr(document.getElementById('_year').value);\"><span class=\"button1-part0\"><span class=\"button1-part1\">ok</span></span></a></span>";
	
	//create Week day header
	var weekday_header="<tr align=\"center\">";
	for (i=0;i<7;i++) {
		weekday_header+="<td class=\"cell-header\">"+WeekDayName[i].substr(0,WeekChar)+"</td>";
	}
	weekday_header+="</tr>";
	//create Calendar detail
	var calendar_detail="<tr align=\"center\">";
	
	CalDate=new Date(Cal.Year,Cal.Month);
	CalDate.setDate(1);
	vFirstDay=CalDate.getDay();
	for (i=0;i<vFirstDay;i++)
	{
		calendar_detail+=vdpGenCell();
		vDayCount=vDayCount+1;
	}
	var max=Cal.GetMonDays()+vFirstDay;
	//alert(max);
	max+=7-(max%7)-vFirstDay;
	//alert(max);
	for (j=1;j<=max;j++)
	{
		var strCell;
		vDayCount=vDayCount+1;
		if ((j==dtToday.getDate())&&(Cal.Month==dtToday.getMonth())&&(Cal.Year==dtToday.getFullYear()))
			strCell=vdpGenCell(j,true,TodayClass);
		else //Highlight today's date
		{
			var selected="";
			if(j<=Cal.GetMonDays())
			{
				if (j==Cal.Date)
				{
					strCell=vdpGenCell(j,false,SelDateClass);
				}
				else
				{					
					if (vDayCount%7==0)
						strCell=vdpGenCell(j,false,SaturdayClass);
					else if ((vDayCount+6)%7==0)
						strCell=vdpGenCell(j,false,SundayClass);
					else
						strCell=vdpGenCell(j,null,WeekDayClass);
				}
			}	
			else
			{
				strCell=vdpGenCell();
			}
		}						
		calendar_detail+=strCell;

		if((vDayCount%7==0)&&(j<Cal.GetMonDays()))
		{
			calendar_detail+="</tr>\n<tr align=\"center\">";
		}
	}
	
	var myHtml="";
	
	//initdw();

	myHtml+="<form method=\"GET\" name=\"Calendar\" action=\"\">";
	myHtml="<table width=\"100%\" height=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"header-border\">";
	myHtml+="	<tr>";
	myHtml+="		<td height=\"1%\" class=\"header-level1\">";
	myHtml+="			<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
	myHtml+="				<tr>";
	myHtml+="					<td style=\"padding-right:4px\">";
	myHtml+=month_selector;
	myHtml+="					</td>";
	myHtml+="					<td>";
	myHtml+=year_selector;
	myHtml+="					</td>";
	myHtml+="				</tr>";
	myHtml+="			</table>";
	myHtml+="		</td>";
	myHtml+="	</tr>";
	myHtml+="	<tr>";
	myHtml+="		<td valign=\"top\" height=\"99%\">";
	myHtml+="			<div class=\"content-zone\" id=\"zone1\">";
	myHtml+="				<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"table-border\" align=\"center\">";
	myHtml+=weekday_header;
	myHtml+=calendar_detail;
	myHtml+="				</table>";
	myHtml+="";
	myHtml+="			</div>";
	myHtml+="		</td>";
	myHtml+="	</tr>";
	myHtml+="</table>";
	myHtml+=" </form>";
	
	winCal.document.open();
	dw("<html>");
	dw("<head>");
	dw("<META Http-Equiv=\"Cache-Control\" Content=\"no-cache\">");
	dw("<META Http-Equiv=\"Pragma\" Content=\"no-cache\">");
	dw("<META Http-Equiv=\"Expires\" Content=\"0\">");
	dw("<title>&nbsp;</title><link rel=\"stylesheet\" type=\"text/css\" href=\""+skinPath+"/global.css\"></link>");
	var skinSuffix;
	if(navigator.userAgent.indexOf("MSIE") > 0) //Internet Explorer 5+
	{
		skinSuffix="_msie";
	}
	else  //other browsers
	{
		skinSuffix="_firefox";
	}
	dw("<link rel=\"stylesheet\" type=\"text/css\" href=\""+skinPath+"/global"+skinSuffix+".css\"></link>");
	
	dw("</head>");
	dw("<body leftmargin=\"0\" topmargin=\"0\" marginwidth=\"0\" marginheight=\"0\"><div class=\"popup\"><div class=\"portlet\" id=\"datePicker\"><table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\" height=\"100%\"><tr><td height=\"1%\"><div class=\"outerzone1\"><table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\" class=\"zone1\"><tr><td class=\"left\"></td><td class=\"icon\"></td><td class=\"center\">"+CalendarTitle+"</td><td class=\"action-close\" onclick=\"javascript:window.close();\"></td><td class=\"right\"></td></tr></table></div><div class=\"outerzone2\"><table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\" class=\"zone2\"><tr><td class=\"left\"></td><td class=\"center\"></td><td class=\"right\"></td></tr></table></div></td></tr><tr><td height=\"98%\" valign=\"top\"><div class=\"outerzone3\"><table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\" height=\"100%\" class=\"zone3\"><tr><td class=\"left\" nowrap></td><td class=\"center\" valign=\"top\">");
	dw(myHtml);
	dw("</td><td class=\"right\" nowrap></td></tr></table></div></td></tr><tr><td height=\"1%\"><div class=\"outerzone4\"><table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\" class=\"zone4\"><tr><td class=\"left\"></td><td class=\"center\"></td><td class=\"right\"></td></tr></table></div></td></tr></table></div></div></body>");
	dw("</html>");
	winCal.document.close();
}

function vdpGenCell(pValue,pHighLight,cellclass)//Generate table cell with value
{
	var PValue;
	var PCellStr;
	var vHLstr1;//HighLight string
	var vHlstr2;
	var vTimeStr;
	
	if (pValue==null)
		PValue="";
	else
		PValue=pValue;	
	
	var hlpart1="";
	var hlpart2="";
	if ((pHighLight!=null)&&(pHighLight))
	{
		hlpart1="<span class=\"text-highlighted\">";
		hlpart2="</span>";
	}
	
	if (Cal.ShowTime)
	{
		vTimeStr="window.opener.document.getElementById('"+Cal.Ctrl+"').value+=' '+"+"window.opener.Cal.getShowHour()"+"+':'+"+"window.opener.Cal.Minutes"+"+':'+"+"window.opener.Cal.Seconds";
		if (TimeMode==12)
			vTimeStr+="+' '+window.opener.Cal.AMorPM";
	}	
	else
		vTimeStr="";		
	
	if (pValue!=null)
		PCellStr="<td class=\""+cellclass+"\" onclick=\"javascript:window.opener.document.getElementById('"+Cal.Ctrl+"').value='"+Cal.FormatDate(PValue)+"';"+vTimeStr+";window.close();javascript:window.opener.document.getElementById('"+Cal.Ctrl+"').onchange();\">"+hlpart1+PValue+hlpart2+"</td>";
	else
		PCellStr="<td style=\"cursor:default\">"+hlpart1+PValue+hlpart2+"</td>";
	
	return PCellStr;
}


function Calendar(pDate,pCtrl)
{
	//Properties
	this.Date=pDate.getDate();//selected date
	this.Month=pDate.getMonth();//selected month number
	this.Year=pDate.getFullYear();//selected year in 4 digits
	this.Hours=pDate.getHours();	
	
	if (pDate.getMinutes()<10)
		this.Minutes="0"+pDate.getMinutes();
	else
		this.Minutes=pDate.getMinutes();
	
	if (pDate.getSeconds()<10)
		this.Seconds="0"+pDate.getSeconds();
	else		
		this.Seconds=pDate.getSeconds();
		
	this.MyWindow=winCal;
	this.Ctrl=pCtrl;
	this.Format="ddMMyyyy";
	this.Separator=DateSeparator;
	this.ShowTime=false;
	this.Scroller="DROPDOWN";
	if (pDate.getHours()<12)
		this.AMorPM="AM";
	else
		this.AMorPM="PM";	
}

function GetMonthIndex(shortMonthName)
{
	for (i=0;i<12;i++)
	{
		if (MonthName[i].substring(0,3).toUpperCase()==shortMonthName.toUpperCase())
		{	return i;}
	}
}
Calendar.prototype.GetMonthIndex=GetMonthIndex;

function IncYear()
{	Cal.Year++;}
Calendar.prototype.IncYear=IncYear;

function DecYear()
{	Cal.Year--;}
Calendar.prototype.DecYear=DecYear;


function IncMonth()
{	
	Cal.Month++;
	if (Cal.Month>=12)
	{
		Cal.Month=0;
		Cal.IncYear();
	}
}
Calendar.prototype.IncMonth=IncMonth;

function DecMonth()
{	
	Cal.Month--;
	if (Cal.Month<0)
	{
		Cal.Month=11;
		Cal.DecYear();
	}
}
Calendar.prototype.DecMonth=DecMonth;
	
function SwitchYr(intYr)
{	
	Cal.Year=intYr;
	RenderCal();
}
Calendar.prototype.SwitchYr=SwitchYr;

function SwitchMth(intMth)
{	
	Cal.Month=intMth;
	RenderCal();
}
Calendar.prototype.SwitchMth=SwitchMth;



function GetMonthName(IsLong)
{
	var Month=MonthName[this.Month];
	if (IsLong)
		return Month;
	else
		return Month.substr(0,3);
}
Calendar.prototype.GetMonthName=GetMonthName;

function GetMonDays()//Get number of days in a month
{
	var DaysInMonth=[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if (this.IsLeapYear())
	{
		DaysInMonth[1]=29;
	}	
	return DaysInMonth[this.Month];	
}
Calendar.prototype.GetMonDays=GetMonDays;

function IsLeapYear()
{
	if ((this.Year%4)==0)
	{
		if ((this.Year%100==0) && (this.Year%400)!=0)
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	else
	{
		return false;
	}
}
Calendar.prototype.IsLeapYear=IsLeapYear;

function FormatDate(pDate)
{
	var MonthDigit=this.Month+1;
	if (PrecedeZero==true)
	{
		if (pDate<10)
			pDate="0"+pDate;
		if (MonthDigit<10)
			MonthDigit="0"+MonthDigit;
	}

	if (this.Format.toUpperCase()=="DDMMYYYY")
		return (pDate+DateSeparator+MonthDigit+DateSeparator+this.Year);
	else if (this.Format.toUpperCase()=="DDMMMYYYY")
		return (pDate+DateSeparator+this.GetMonthName(false)+DateSeparator+this.Year);
	else if (this.Format.toUpperCase()=="MMDDYYYY")
		return (MonthDigit+DateSeparator+pDate+DateSeparator+this.Year);
	else if (this.Format.toUpperCase()=="MMMDDYYYY")
		return (this.GetMonthName(false)+DateSeparator+pDate+DateSeparator+this.Year);
	else if (this.Format.toUpperCase()=="YYYYMMDD")
		return (this.Year+DateSeparator+MonthDigit+DateSeparator+pDate);
	else if (this.Format.toUpperCase()=="YYYYMMMDD")
		return (this.Year+DateSeparator+this.GetMonthName(false)+DateSeparator+pDate);	
	else					
		return (pDate+DateSeparator+(this.Month+1)+DateSeparator+this.Year);
}
function vdpFormatDate(pDate)
{
	var MonthDigit=this.Month+1;
	if (PrecedeZero==true)
	{
		if (pDate<10)
			pDate="0"+pDate;
		if (MonthDigit<10)
			MonthDigit="0"+MonthDigit;
	}

	if (dateFormat=="DDMMYYYY")
		return (pDate+DateSeparator+MonthDigit+DateSeparator+this.Year);
	else if (dateFormat=="DDMMMYYYY")
		return (pDate+DateSeparator+this.GetMonthName(false)+DateSeparator+this.Year);
	else if (dateFormat=="MMDDYYYY")
		return (MonthDigit+DateSeparator+pDate+DateSeparator+this.Year);
	else if (dateFormat=="MMMDDYYYY")
		return (this.GetMonthName(false)+DateSeparator+pDate+DateSeparator+this.Year);
	else if (dateFormat=="YYYYMMDD")
		return (this.Year+DateSeparator+MonthDigit+DateSeparator+pDate);
	else if (dateFormat=="YYYYMMMDD")
		return (this.Year+DateSeparator+this.GetMonthName(false)+DateSeparator+pDate);	
	else					
		return (pDate+DateSeparator+(this.Month+1)+DateSeparator+this.Year);
}
Calendar.prototype.FormatDate=FormatDate;

function dateRemover(fid, hId, minId)
{
	var field=document.getElementById(fid);
	var async_field = document.getElementById("Async_"+fid);
	if(field)
		field.value="";
	if(async_field)
		async_field.value="";

	if(hId!=null && hId!='')
	{
		var hField=document.getElementById(hId);
		if(hField)
			hField.value="-1";
	}
	if(minId!=null && minId!='')
	{
		var minField=document.getElementById(minId);
		if(minField)
			minField.value="-1";
	}
	
	if(field && field.onchange)
		field.onchange();
	if(async_field && async_field.onchange)
		async_field.onchange();
}


