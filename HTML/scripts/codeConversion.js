function convertCode( container_ )
{
    // console.log(container_);
    
    let pagecontent = container_.getElementsByClassName("code");
    //console.log("ELEMENTS", container_, pagecontent);
        for(let el of pagecontent)
        {
            
            let htmlText = el.innerHTML;
            //console.log(htmlText);

            let lines = htmlText.split('\n');

            let newContainer = document.createElement('div');
            newContainer.classList.add('tableDisplay');
            let newContent = "";

                for(let line of lines)
                {
                    /*let l = lines[line].replace(/</g, "&lt;").replace(/>/g, "&gt;");
                    //l = l.replace(/>/g, "&gt;");
                    l = "<div class='line'>" + l.replace("   ", "&#9;") + "</div>";*/

                    let splittedLine = line.split("*");

                    newContent += "<div class='line'>"

                    for(let s of splittedLine)
                    {
                        s = s.replace(/</g, "&lt;");
                        s = s.replace(/>/g, "&gt;");
                        newContent += "<span>" + s + "</span>";
                    }
                    newContent += "</div>";
                    //console.log("line " + l);
                    //newContent += l;// + "\n";
                }

            // Remplacement des "chevrons < >"
            //newContent = pagecontent[el].innerHTML.replace(/</g, "&lt;").replace(/>/g, "&gt;");

            //const comRegEx = /^"/*"$"*/"/g;
            
            // Affectation du 
            newContainer.innerHTML = newContent;
            el.after(newContainer);
            //pagecontent[el].innerHTML = pagecontent[el].innerHTML.replace(/>/g, "&lgt;");
            
        }
    }