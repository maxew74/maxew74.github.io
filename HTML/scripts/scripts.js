var tabSum = new Array();

tabSum.push(new Array("title", "HTML | CSS"));

tabSum.push(new Array("link", "Introduction","intro.html"));
tabSum.push(new Array("link", "Netiquette","netiquette.html"));

tabSum.push(new Array("title", "Généralités"));
tabSum.push(new Array("link", "Principe du web","architecture.html"));
tabSum.push(new Array("link", "Arborescence","arborescence.html"));
tabSum.push(new Array("link", "Outils", "outils.html"));
tabSum.push(new Array("link", "Debug", "debug.html"));

tabSum.push(new Array("exo", "Exercice - Debug", "exercice_outils.html", "dev"));

tabSum.push(new Array("link", "Mise en ligne", "mise_en_ligne.html"));
tabSum.push(new Array("link", "W3C et normes", "w3c.html"));
tabSum.push(new Array("link", "Principe des balises", "balises.html"));
tabSum.push(new Array("link", "Bonnes pratiques", "bonnes_pratiques.html"));
// tabSum.push(new Array("exo", " Exercice - ftp", "exercice_ftp.html"));
tabSum.push(new Array("title", "HTML"));

tabSum.push(new Array("link", "Squelette d'une page html", "squelette_html.html"));
tabSum.push(new Array("link", "Structure et hiérarchie", "structure.html"));
tabSum.push(new Array("exo", " Exercice - Structure", "exercice_structure.html"));
tabSum.push(new Array("link", "Titres", "titres.html"));
tabSum.push(new Array("exo", " Exercice - Ma 1ère page", "exercice_premiere_page.html"));
tabSum.push(new Array("link", "Listes", "listes.html"));
tabSum.push(new Array("exo", " Exercice - Listes", "exercice_listes.html"));
tabSum.push(new Array("link", "Tableaux", "tableaux.html", "dev"));
tabSum.push(new Array("exo", " Exercice - Tableaux", "exercice_tableaux.html"));
tabSum.push(new Array("link", "Liens hypertextes", "liens.html"));
tabSum.push(new Array("exo", " Exercice - Liens", "exercice_liens.html"));
tabSum.push(new Array("link", "Images", "images.html"));
tabSum.push(new Array("link", "Médias", "medias.html"));
tabSum.push(new Array("link", "Formulaires", "formulaires.html", "dev"));
tabSum.push(new Array("link", "Attributs 'id' et 'class' ", "attributs_id_class.html"));

tabSum.push(new Array("title", "CSS"));

tabSum.push(new Array("link", "&Agrave; quoi ça sert ?", "pourquoi_css.html"));
tabSum.push(new Array("link", "Intégrer du code CSS", "link_css.html"));
tabSum.push(new Array("link", "Reset", "reset.html"));
tabSum.push(new Array("link", "Syntaxe", "syntaxe_css.html", "dev"));
tabSum.push(new Array("link", "Sélecteurs avancés", "selecteurs_avances.html", "dev"));
tabSum.push(new Array("link", "Pseudo-classes", "pseudo_classes.html", "dev"));
tabSum.push(new Array("link", "Pseudo-elements", "pseudo_elements.html", "dev"));

tabSum.push(new Array("exo", "Exercice - Sélecteurs", "exercice_selecteurs.html", "dev"));

tabSum.push(new Array("link", "Dimensions", "dimensions.html"));
tabSum.push(new Array("link", "Marges et bordures", "marges_css.html"));
tabSum.push(new Array("link", "Positionnement", "positionnement_css.html"));

tabSum.push(new Array("link", "Textes", "textes_css.html"));
tabSum.push(new Array("link", "Couleurs", "couleurs.html"));
tabSum.push(new Array("link", "Arrière-plan", "arriere_plan.html"));

tabSum.push(new Array("link", "Flexbox", "flexbox.html", "dev"));
tabSum.push(new Array("exo", " Exercice - Flexbox", "exercice_flexbox.html", "dev"));

tabSum.push(new Array("link", "Grilles", "grid.html", "dev"));
tabSum.push(new Array("exo", " Exercice - Grilles", "exercice_grid.html", "dev"));

tabSum.push(new Array("link", "Filtres et effets", "filtres.html", "dev"));
tabSum.push(new Array("link", "Transformations", "transform.html", "dev"));
tabSum.push(new Array("link", "Transitions", "transition.html", "dev"));
tabSum.push(new Array("link", "Animations", "animations.html", "dev"));

tabSum.push(new Array("link", "Media queries", "media_queries.html", "dev"));
tabSum.push(new Array("exo", " Exercice - CSS", "exercice_css.html"));

tabSum.push(new Array("title", "Ressources"));
tabSum.push(new Array("link", "Liens utiles", "20_liens.html"));

tabSum.push(new Array("title", "DEMO"));
tabSum.push(new Array("url", "Exemple", "exemple/index.html"));

/*tabSum.push(new Array("title", "Exemple"));

tabSum.push(new Array("exo", "Recette", "exemple_html/index.html"));
*/

/*tabSum.push(new Array("exo", "Exemple 1 - textes", "exemple/index_0.html"));
tabSum.push(new Array("exo", "Exemple 2 - listes", "exemple/html/musique_0.html"));
tabSum.push(new Array("exo", "Exemple 3 - tableau", "exemple/html/photos_0.html"));
tabSum.push(new Array("exo", "Exemple 4 - liens + images", "exemple/index_1.html"));
tabSum.push(new Array("exo", "Exemple 5 - CSS + Son", "exemple/index.html"));*/

var header;

function createHeader( p_page )
{
	//p_num = getParam()["pageId"] || 0;
	p_num = p_page;

	var i;
	var title1;
	
	var idxLink = 0;
	var idxTitle = 0;
	
	for(i=0; i<tabSum.length; i++)
	{
		if(tabSum[i][0] == "link"){ idxLink++; }
		if(tabSum[i][0] == "title")
		{
			idxTitle++;
			title1 = tabSum[i][1];
		}

		if(i == (p_num))
		{
			/*document.write('<div class="myHeader">');
			document.write(title1 + ' - ' + tabSum[i][1]);
			document.write('</div>');*/
			break;
		}
	}
	
	header = document.createElement("header");
	header.className = "myHeader";
	header.innerHTML = title1 + ' - ' + tabSum[p_num][1];
	console.log("header", header);
	
	document.getElementsByClassName("myContent")[0].append(header);
	
}

// 
function getParam(){	
	var t = location.search.substring(1).split('&');
	var f = [];
	for (var i=0; i<t.length; i++){
		var x = t[ i ].split('=');
		f[x[0]]=x[1];
	}
	return f;
}

function createSum()
{
	var sum = document.createElement("nav");
	sum.id = "sum";

	sum.innerHTML = '<img src="images/_logo.png" alt="logo" title="logo Gobelins" id="logoImg" />';
	sum.innerHTML += '<img src="images/logoHtml.jpg" alt="logo" title="logo HTML 5" id="logoImgHtml" />';
	sum.innerHTML += '<span id="logo"> </span>';

	var i;	
	var idxLink = 0;
	var idxTitle = 0;
	for(i=0; i<tabSum.length; i++)
	{
		if(tabSum[i][0] == "link")
		{
			idxLink++;
			var textNum = "";
			
			if(idxLink<10)
			{
				textNum = "0" + idxLink;
			}else{
				textNum = "" + idxLink;
			}
			sum.innerHTML += '<button class="sumItem"><span class="numSum">' + textNum + '</span><span id="span_' + i + '" onclick="openPage('+i+');" class="aSum ' + (tabSum[i][3] || '' ) + '">'+tabSum[i][1]+'</span></button>';
		}
		if(tabSum[i][0] == "title")
		{
			idxTitle++;
			
			var contentToWrite = "";
			
			if(idxTitle>1)
			{
				contentToWrite = "<hr/>";
			}
			sum.innerHTML += '<span class="sumTitle">'+tabSum[i][1]+'</span>';
		}
		if(tabSum[i][0] == "exo")
		{
			sum.innerHTML += '<button class="sumItem"><span class="exoSum ' + (tabSum[i][3] || '' ) + '" onclick="openPage('+i+');">'+tabSum[i][1]+'</span></button>';
		}
		if(tabSum[i][0] == "url")
		{
			sum.innerHTML += '<button class="sumItem"><span class="exoSum ' + (tabSum[i][3] || '' ) + '"><a href="' + tabSum[i][2] + '" target="_blank">' + tabSum[i][1] + '</a></span></button>';
		}
	}
	//	document.write('</div>');
	sum.innerHTML += '</nav>';
	document.getElementsByTagName("body")[0].append(sum);
}

function includeCSS( path_ )
{
	var styles = document.createElement('link');
	styles.rel = "stylesheet";
	styles.href = path_;
	
	var headTag = document.getElementsByTagName("head")[0];
	
	//headTag.append(fonts);
	headTag.append(styles);
}

function openPage(p_id)
{


	//console.log("openPage" , p_id);
	contentContainer.style.display = "none";
	contentContainer.innerHTML = "";

	if(p_id > currentPageNum)
	{
		contentContainer.style.animationName ="animFromBottom";
	}else {
		contentContainer.style.animationName ="animFromTop";
	}
	currentPageNum = p_id;

	//alert(document.getElementById("sum").scrollTop);
	//window.location = tabSum[p_id][2] + "?pageScroll=" + document.getElementById("sum").scrollTop + "&pageId=" + p_id;
	createHeader(p_id);
	loadDataFile("pages/" + tabSum[p_id][2], "html", function(data_)
	{
		//console.log("loadDataFile");
		contentContainer.innerHTML += (data_);
		convertCode(contentContainer);

		
		
		contentContainer.style.display = "block";
		contentContainer.scrollTo({top:0});
	});

	
}

function loadDataFile(path_, type_, callback_)
 {   
	//console.log("loading file '" + path_ + "' (" + type_ + ") ...");
 
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/" + type_);
    xobj.open('GET', path_, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function ()
	{
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
			//console.log("loaded file '" + path_ + "' (" + type_ + ") --> ok");
            callback_(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

var contentContainer;
/*"https://fonts.googleapis.com/css2?family=Nunito:wght@300;600;900&family=Orbitron:wght@400;600;800&display=swap",*/
var cssPaths = ["https://fonts.googleapis.com/css2?family=Fredoka+One&family=Roboto:wght@300;900&display=swap",
				"css/variables.css",
				"css/styles.css",
				"css/animation.css",
				"css/filtres.css",
				"css/transform.css",
				"css/grid.css",
				"css/code.css",
				"css/exo_outils.css"];

var currentPageNum = 0;

document.addEventListener("DOMContentLoaded", function()
{
	//console.log("DOMContentLoaded");
	contentContainer = document.getElementsByClassName("myContent")[0];
	
	var i = 0;
	for(i=0; i<cssPaths.length; i++)
	{
		includeCSS( cssPaths[i] );
	}
	createHeader(0);
	createSum();
	openPage(1);
	document.getElementsByTagName("body")[0].addEventListener("mouseup", ()=>{console.log("fullscreen"); setFullSreen();});

});

