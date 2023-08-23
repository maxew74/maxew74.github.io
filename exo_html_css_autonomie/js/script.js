var appScope = this;

/* **************************************** */
// Chargement d'un fichier
/* **************************************** */
function loadDataFile(path_, type_, callback_)
{
	console.log("loading file '" + path_ + "' (" + type_ + ") ...");

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/" + type_);
    xobj.open('GET', path_, true);
    xobj.onreadystatechange = function ()
	{
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
			console.log("loaded file '" + path_ + "' (" + type_ + ") --> ok");
            callback_(xobj.responseText);
          }else if(xobj.status != "200") {
			  console.warn("Erreur de chargement du fichier : " + path_ + " - readyState : " + xobj.readyState + " | status" + xobj.status);
		  }
	};
	
    xobj.send(null);
}
 
/* **************************************** */
// Document chargé 
/* **************************************** */
var body;
var loader, homepage, summary, content, mainTitle, mainTitle_2, navigation, navList, imgSum;
 
document.addEventListener("DOMContentLoaded", function()
{
	body = document.getElementsByTagName("body")[0];
	
	loader = createAndAddElmnt("div", {"id":"loader"}, body);
	loader.innerText = ".........Loading.........";

	summary = createAndAddElmnt("div", {"id":"summary"}, body);
	//imgSum = createAndAddElmnt("img", {"id":"imgSum", "src":"img/img_background.png"}, summary);
	//logo = createAndAddElmnt("img", {"id":"logo", src:"img/logo.jpg"}, summary);
	navigation = createAndAddElmnt("nav", {"id":"navigation"}, summary);
	navList = createAndAddElmnt("ul", {"id":"navList"}, navigation);
	content = createAndAddElmnt("div", {"id":"content"}, body);
	
	homepage = createAndAddElmnt("div", {"id":"homepage"}, content);
	mainTitle = createAndAddElmnt("h1", {"id":"mainTitle"}, homepage);
	mainTitle_2 = createAndAddElmnt("h2", {"id":"mainTitle_2"}, homepage);
	mainTitle_3 = createAndAddElmnt("h3", {"id":"mainTitle_3"}, homepage);

	let homeLink = createAndAddElmnt("li", {id:"link_" + navList.id + "_accueil"}, navList);
	let homeA = createAndAddElmnt("a", {href:"#"}, homeLink);
	homeA.innerHTML = "Accueil";

	sliceText(loader, {class:"loadingChar", style:"'animation-delay:' + ($i*0.25) + 's'"});
	loadDataFile("data/data.json", "json", onDataLoaded);

});

var templates = [];
var tempLoaded = 0;
var structure;

function onDataLoaded( data_ )
{
	structure = JSON.parse(data_);
	mainTitle.innerHTML = structure.title;
	mainTitle_2.innerHTML = structure.title_2;
	mainTitle_3.innerHTML = structure.title_3;

	document.getElementsByTagName("title")[0].innerText = structure.title + " - " + structure.title_2;

	appScope.parseHierarchy(structure, content, navList);

	startApp();
}

function onTemplateLoaded( html_, container_ )
{
	tempLoaded++;
	if(tempLoaded == templates.length)
	{
		loader.style.display = "none";
	}
	container_.innerHTML = html_ + container_.innerHTML;
	console.log("template loaded : " + html_);
}

appScope.parseHierarchy = function( data_, contentParent_, navParent_ )
{
	if(data_.content)
	{
		for(c in data_.content)
		{
			let content = data_.content[c];
			let navContainer = createAndAddElmnt("li", {id:"link_" + navParent_.id + "_" + content.id}, navParent_);
			let navA = createAndAddElmnt("a", {href:"#" + content.id}, navContainer);
			navA.innerText = content.title;
			console.log("parseHierarchy ", content.id, navParent_.id )
			
			let container = createAndAddElmnt("section", {id:content.id}, contentParent_);
			// Si contentu enfant
			if(content.content){
				let listNav = createAndAddElmnt("ul", {id:"list_" + content.id}, navContainer);
				appScope.parseHierarchy(content, container, listNav);
			}
			
			// Si template associé
			if(content.template){ 
				appScope.templates.push(content.template);
				loadDataFile(content.template, "html", function(res){ onTemplateLoaded(res, container); });
			}
		}
	}
}

function createAndAddElmnt(type_, attr_, parent_)
{
	const elmnt = document.createElement(type_);
	setAttr(elmnt, attr_);
	if(parent_)
	{
		parent_.appendChild(elmnt);
	}
	return elmnt;
}

function sliceText(elmnt_, attr_)
{
	const text = elmnt_.innerText;
	console.log("sliceText(", elmnt_, ") > " + text );
	
	elmnt_.innerText = "";
	
	let idx = 0;
	for(const c of text)
	{
		console.log("text c : " + c);
		let span = document.createElement("span");
		span.innerText = c;
		elmnt_.appendChild(span);

		setAttr(span, attr_, idx);
		idx++;
	}
}

function setAttr(elmnt_, attr_, num_ = 0)
{
	for(const p in attr_)
	{
		let val;
		if(("" + attr_[p]).indexOf("$i") != -1)
		{
			val = eval("" + attr_[p].replace('$i', num_));
		}else{
			val = attr_[p];
		}
		elmnt_.setAttribute(p, val);			
	}
}

function startApp()
{
	loader.style.display = "none";
}